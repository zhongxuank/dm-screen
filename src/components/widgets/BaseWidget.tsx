import { ReactNode } from 'react'
import { useScreenStore } from '@/store/screenStore'
import { gridToPixels } from '@/utils/grid'
import { useDragAndDrop } from '@/hooks/useDragAndDrop'
import { useResize } from '@/hooks/useResize'
import type { Widget } from '@/types'

interface BaseWidgetProps {
  widget: Widget
  children: ReactNode
}

export function BaseWidget({ widget, children }: BaseWidgetProps) {
  const { mode, gridSize, zoom, deleteWidget, cloneWidget } = useScreenStore()
  const { dragHandlers } = useDragAndDrop(widget.id)
  const { resizeHandlers } = useResize(widget.id)

  const isEditMode = mode === 'edit'

  // Convert grid position to pixels
  const left = gridToPixels(widget.position.x, gridSize, zoom)
  const top = gridToPixels(widget.position.y, gridSize, zoom)
  const width = gridToPixels(widget.size.width, gridSize, zoom)
  const height = gridToPixels(widget.size.height, gridSize, zoom)

  const handleDelete = () => {
    if (confirm('Delete this widget?')) {
      deleteWidget(widget.id)
    }
  }

  const handleClone = () => {
    cloneWidget(widget.id)
  }

  return (
    <div
      className="base-widget"
      style={{
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: widget.style.backgroundColor,
        color: widget.style.textColor,
        border: `${widget.style.borderWidth}px solid ${widget.style.borderColor}`,
        borderRadius: `${widget.style.borderRadius}px`,
        zIndex: widget.zIndex,
        padding: '0.5rem',
        overflow: 'hidden',
      }}
    >
      {isEditMode && (
        <>
          <div
            className="widget-header"
            {...dragHandlers}
            style={{ cursor: 'move' }}
          >
            <div className="widget-drag-handle">⋮⋮</div>
            <div className="widget-title">{widget.type}</div>
            <div className="widget-actions">
              <button
                className="widget-button clone"
                onClick={handleClone}
                aria-label="Clone widget"
              >
                📋
              </button>
              <button
                className="widget-button delete"
                onClick={handleDelete}
                aria-label="Delete widget"
              >
                ×
              </button>
            </div>
          </div>
          <div
            className="widget-resize-handle"
            {...resizeHandlers}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: '20px',
              height: '20px',
              cursor: 'nwse-resize',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            }}
          />
        </>
      )}
      <div className="widget-content">{children}</div>
    </div>
  )
}

