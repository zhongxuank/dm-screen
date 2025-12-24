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

  // Calculate canvas size based on widget positions
  useEffect(() => {
    const bounds = calculateCanvasBounds(widgets, gridSize, zoom)
    const canvasWidth = Math.max(
      gridSize,
      bounds.maxX - bounds.minX + gridSize
    )
    const canvasHeight = Math.max(
      gridSize,
      bounds.maxY - bounds.minY + gridSize
    )
    setCanvasSize({ width: canvasWidth, height: canvasHeight })
  }, [widgets, gridSize, zoom, setCanvasSize])

  const canvasBounds = calculateCanvasBounds(widgets, gridSize, zoom)
  const canvasWidth = gridToPixels(
    Math.max(gridSize, canvasBounds.maxX - canvasBounds.minX + gridSize),
    gridSize,
    zoom
  )
  const canvasHeight = gridToPixels(
    Math.max(gridSize, canvasBounds.maxY - canvasBounds.minY + gridSize),
    gridSize,
    zoom
  )

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
      setViewport({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  // Handle wheel scrolling
  const handleWheel = (e: React.WheelEvent) => {
    if (e.shiftKey) {
      // Horizontal scroll
      setViewport({
        x: viewport.x - e.deltaY,
        y: viewport.y,
      })
    } else {
      // Vertical scroll
      setViewport({
        x: viewport.x,
        y: viewport.y - e.deltaY,
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
  const gridUnit = getGridUnitSize(gridSize, zoom)
  const gridLines: JSX.Element[] = []

  // Generate grid lines (optimize: only render visible ones)
  const maxLines = Math.ceil(window.innerWidth / gridUnit) + 10
  for (let i = 0; i <= maxLines; i++) {
    gridLines.push(
      <div
        key={`v-${i}`}
        className="grid-line vertical"
        style={{
          position: 'absolute',
          left: `${i * gridUnit}px`,
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
          top: `${i * gridUnit}px`,
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

