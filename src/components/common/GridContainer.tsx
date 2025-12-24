import { useState, useRef, useEffect, ReactNode } from 'react'
import { useScreenStore } from '@/store/screenStore'
import { gridToPixels, getGridUnitSize, calculateCanvasBounds } from '@/utils/grid'
import type { Widget } from '@/types'

interface GridContainerProps {
  children: ReactNode
}

export function GridContainer({ children }: GridContainerProps) {
  const {
    gridSize,
    zoom,
    viewport,
    setViewport,
    widgets,
    setCanvasSize,
  } = useScreenStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Calculate canvas size based on widget positions (in grid units)
  useEffect(() => {
    const bounds = calculateCanvasBounds(widgets, gridSize, 1) // Use zoom=1 for grid calculations
    const canvasWidth = Math.max(
      gridSize,
      bounds.maxX - bounds.minX + gridSize
    )
    const canvasHeight = Math.max(
      gridSize,
      bounds.maxY - bounds.minY + gridSize
    )
    setCanvasSize({ width: canvasWidth, height: canvasHeight })
  }, [widgets, gridSize, setCanvasSize])

  // Calculate canvas size in base pixels (zoom applied via transform)
  const baseGridUnit = window.innerWidth / gridSize
  const canvasBounds = calculateCanvasBounds(widgets, gridSize, 1) // Use zoom=1 for calculations
  const canvasWidth =
    Math.max(gridSize, canvasBounds.maxX - canvasBounds.minX + gridSize) *
    baseGridUnit
  const canvasHeight =
    Math.max(gridSize, canvasBounds.maxY - canvasBounds.minY + gridSize) *
    baseGridUnit

  // Handle pan/scroll with mouse drag
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      // Middle mouse or Alt+Left
      setIsDragging(true)
      setDragStart({
        x: e.clientX - viewport.x,
        y: e.clientY - viewport.y,
      })
      e.preventDefault()
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x
      const newY = e.clientY - dragStart.y
      // Constrain to top-left: only allow scrolling down and right (non-negative)
      setViewport({
        x: Math.max(0, newX),
        y: Math.max(0, newY),
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Handle wheel scrolling
  const handleWheel = (e: React.WheelEvent) => {
    if (e.shiftKey) {
      // Horizontal scroll (only right)
      const newX = viewport.x - e.deltaY
      setViewport({
        x: Math.max(0, newX), // Constrain to non-negative
        y: viewport.y,
      })
    } else {
      // Vertical scroll (only down)
      const newY = viewport.y - e.deltaY
      setViewport({
        x: viewport.x,
        y: Math.max(0, newY), // Constrain to non-negative
      })
    }
    e.preventDefault()
  }

  return (
    <div
      ref={containerRef}
      className="grid-container"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        cursor: isDragging ? 'grabbing' : 'grab',
        flex: 1,
      }}
    >
      <div
        className="canvas"
        style={{
          position: 'absolute',
          width: `${canvasWidth}px`,
          height: `${canvasHeight}px`,
          transform: `translate(${-viewport.x}px, ${-viewport.y}px) scale(${zoom})`,
          transformOrigin: 'top left',
        }}
      >
        <GridOverlay gridSize={gridSize} zoom={zoom} />
        {children}
      </div>
    </div>
  )
}

function GridOverlay({
  gridSize,
  zoom,
}: {
  gridSize: number
  zoom: number
}) {
  // Base grid unit (zoom applied via CSS transform)
  const baseGridUnit = window.innerWidth / gridSize
  const gridLines: JSX.Element[] = []

  // Generate grid lines (optimize: only render visible ones)
  const maxLines = Math.ceil(window.innerWidth / baseGridUnit) + 10
  for (let i = 0; i <= maxLines; i++) {
    gridLines.push(
      <div
        key={`v-${i}`}
        className="grid-line vertical"
        style={{
          position: 'absolute',
          left: `${i * baseGridUnit}px`,
          top: 0,
          width: '1px',
          height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          pointerEvents: 'none',
        }}
      />
    )
    gridLines.push(
      <div
        key={`h-${i}`}
        className="grid-line horizontal"
        style={{
          position: 'absolute',
          top: `${i * baseGridUnit}px`,
          left: 0,
          height: '1px',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          pointerEvents: 'none',
        }}
      />
    )
  }

  return <>{gridLines}</>
}

