import { useScreenStore } from '@/store/screenStore'

export function ZoomControls() {
  const { zoom, setZoom } = useScreenStore()

  const handleZoomIn = () => {
    setZoom(Math.min(2, zoom + 0.1))
  }

  const handleZoomOut = () => {
    setZoom(Math.max(0.5, zoom - 0.1))
  }

  const handleResetZoom = () => {
    setZoom(1)
  }

  return (
    <div className="zoom-controls">
      <button onClick={handleZoomOut} aria-label="Zoom out">
        −
      </button>
      <span>{Math.round(zoom * 100)}%</span>
      <button onClick={handleZoomIn} aria-label="Zoom in">
        +
      </button>
      <button onClick={handleResetZoom} aria-label="Reset zoom">
        Reset
      </button>
    </div>
  )
}

