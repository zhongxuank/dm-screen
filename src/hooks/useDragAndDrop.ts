import { useRef, useState, useEffect } from 'react'
import { useScreenStore } from '@/store/screenStore'
import { pixelsToGrid } from '@/utils/grid'

export function useDragAndDrop(widgetId: string) {
  const { mode, gridSize, zoom, updateWidget } = useScreenStore()
  const [isDragging, setIsDragging] = useState(false)
  const dragStartRef = useRef<{ x: number; y: number } | null>(null)
  const widgetStartPosRef = useRef<{ x: number; y: number } | null>(null)

  const handleDragStart = (e: React.MouseEvent) => {
    if (mode !== 'edit') return

    setIsDragging(true)
    dragStartRef.current = { x: e.clientX, y: e.clientY }

    const widget = useScreenStore.getState().widgets.find(
      (w) => w.id === widgetId
    )
    if (widget) {
      widgetStartPosRef.current = { ...widget.position }
    }

    e.preventDefault()
    e.stopPropagation()
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragStartRef.current || !widgetStartPosRef.current) return

      const deltaX = e.clientX - dragStartRef.current.x
      const deltaY = e.clientY - dragStartRef.current.y

      // Convert pixel delta to grid coordinates (accounting for zoom in the transform)
      const baseGridUnit = window.innerWidth / gridSize
      const gridDeltaX = deltaX / baseGridUnit / zoom
      const gridDeltaY = deltaY / baseGridUnit / zoom

      // Snap to grid
      const newPosition = {
        x: Math.round(widgetStartPosRef.current.x + gridDeltaX),
        y: Math.round(widgetStartPosRef.current.y + gridDeltaY),
      }

      // Ensure positions are non-negative (top-left anchor)
      newPosition.x = Math.max(0, newPosition.x)
      newPosition.y = Math.max(0, newPosition.y)

      updateWidget(widgetId, { position: newPosition })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      dragStartRef.current = null
      widgetStartPosRef.current = null
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, gridSize, zoom, widgetId, updateWidget])

  return {
    isDragging,
    dragHandlers: {
      onMouseDown: handleDragStart,
    },
  }
}

