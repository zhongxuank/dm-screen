import { useRef, useState, useEffect } from 'react'
import { useScreenStore } from '@/store/screenStore'
import { pixelsToGrid } from '@/utils/grid'

const MIN_SIZE = 2 // Minimum size in grid units

export function useResize(widgetId: string) {
  const { mode, gridSize, zoom, updateWidget } = useScreenStore()
  const [isResizing, setIsResizing] = useState(false)
  const resizeStartRef = useRef<{ x: number; y: number } | null>(null)
  const widgetStartSizeRef = useRef<{ width: number; height: number } | null>(
    null
  )

  const handleResizeStart = (e: React.MouseEvent) => {
    if (mode !== 'edit') return

    setIsResizing(true)
    resizeStartRef.current = { x: e.clientX, y: e.clientY }

    const widget = useScreenStore.getState().widgets.find(
      (w) => w.id === widgetId
    )
    if (widget) {
      widgetStartSizeRef.current = { ...widget.size }
    }

    e.preventDefault()
    e.stopPropagation()
  }

  useEffect(() => {
    if (!isResizing) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!resizeStartRef.current || !widgetStartSizeRef.current) return

      const deltaX = e.clientX - resizeStartRef.current.x
      const deltaY = e.clientY - resizeStartRef.current.y

      // Convert pixel delta to grid coordinates (accounting for zoom in the transform)
      const baseGridUnit = window.innerWidth / gridSize
      const gridDeltaX = deltaX / baseGridUnit / zoom
      const gridDeltaY = deltaY / baseGridUnit / zoom

      // Snap to grid
      const newSize = {
        width: Math.max(
          MIN_SIZE,
          Math.round(widgetStartSizeRef.current.width + gridDeltaX)
        ),
        height: Math.max(
          MIN_SIZE,
          Math.round(widgetStartSizeRef.current.height + gridDeltaY)
        ),
      }

      updateWidget(widgetId, { size: newSize })
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      resizeStartRef.current = null
      widgetStartSizeRef.current = null
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizing, gridSize, zoom, widgetId, updateWidget])

  return {
    isResizing,
    resizeHandlers: {
      onMouseDown: handleResizeStart,
    },
  }
}

