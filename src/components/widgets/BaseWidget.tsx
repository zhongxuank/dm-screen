import { ReactNode, useState, useRef, useEffect } from 'react'
import { useScreenStore } from '@/store/screenStore'
import { useDragAndDrop } from '@/hooks/useDragAndDrop'
import { useResize } from '@/hooks/useResize'
import type { Widget } from '@/types'

interface BaseWidgetProps {
  widget: Widget
  children: ReactNode
  onEdit?: () => void
}

export function BaseWidget({ widget, children, onEdit }: BaseWidgetProps) {
  const { mode, gridSize, zoom, deleteWidget, cloneWidget } = useScreenStore()
  const { dragHandlers } = useDragAndDrop(widget.id)
  const { resizeHandlers } = useResize(widget.id)
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const isEditMode = mode === 'edit'

  // Convert grid position to pixels (without zoom - zoom is applied via CSS transform)
  const baseGridUnit = window.innerWidth / gridSize
  const left = widget.position.x * baseGridUnit
  const top = widget.position.y * baseGridUnit
  const width = widget.size.width * baseGridUnit
  const height = widget.size.height * baseGridUnit

  const handleDelete = () => {
    if (confirm('Delete this widget?')) {
      deleteWidget(widget.id)
    }
    setShowMenu(false)
  }

  const handleClone = () => {
    cloneWidget(widget.id)
    setShowMenu(false)
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit()
    }
    setShowMenu(false)
  }

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showMenu])

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
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Permanent thin header bar - half grid size */}
      <div
        className={`widget-header ${isEditMode ? 'editable' : ''}`}
        {...(isEditMode ? dragHandlers : {})}
        style={{
          height: `${baseGridUnit / 2}px`,
          minHeight: `${baseGridUnit / 2}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 0.25rem',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          borderBottom: `1px solid ${widget.style.borderColor}`,
          cursor: isEditMode ? 'move' : 'default',
          userSelect: 'none',
        }}
      >
        {isEditMode && (
          <div className="widget-menu-container" ref={menuRef}>
            <button
              className="widget-menu-button"
              onClick={(e) => {
                e.stopPropagation()
                setShowMenu(!showMenu)
              }}
              style={{
                background: 'none',
                border: 'none',
                color: widget.style.textColor,
                cursor: 'pointer',
                padding: '0.125rem 0.25rem',
                fontSize: '0.875rem',
                opacity: 0.7,
                display: 'flex',
                alignItems: 'center',
                lineHeight: 1,
              }}
              aria-label="Widget options"
            >
              ⋯
            </button>
            {showMenu && (
              <div
                className="widget-menu"
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 4px)',
                  right: 0,
                  backgroundColor: widget.style.backgroundColor,
                  border: `1px solid ${widget.style.borderColor}`,
                  borderRadius: '4px',
                  padding: '0.25rem 0',
                  minWidth: '120px',
                  zIndex: 10000,
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                }}
              >
                {onEdit && (
                  <button
                    className="menu-item"
                    onClick={handleEdit}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      background: 'none',
                      border: 'none',
                      color: widget.style.textColor,
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: '0.875rem',
                    }}
                  >
                    ✏️ Edit
                  </button>
                )}
                <button
                  className="menu-item"
                  onClick={handleClone}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    background: 'none',
                    border: 'none',
                    color: widget.style.textColor,
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                  }}
                >
                  📋 Clone
                </button>
                <button
                  className="menu-item"
                  onClick={handleDelete}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    background: 'none',
                    border: 'none',
                    color: '#f87171',
                    cursor: 'pointer',
                    textAlign: 'left',
                    fontSize: '0.875rem',
                  }}
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Widget content */}
      <div
        className="widget-content"
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '0.375rem',
        }}
      >
        {children}
      </div>

      {/* Resize handle (Edit mode only) */}
      {isEditMode && (
        <div
          className="widget-resize-handle"
          {...resizeHandlers}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: '16px',
            height: '16px',
            cursor: 'nwse-resize',
            backgroundColor: widget.style.borderColor,
            opacity: 0.5,
            borderRadius: '0 0 4px 0',
          }}
        />
      )}
    </div>
  )
}
