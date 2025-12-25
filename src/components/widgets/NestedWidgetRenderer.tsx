import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { useScreenStore } from '@/store/screenStore'
import type { Widget, NotepadWidgetData, ImageWidgetData, CountdownWidgetData, FractionWidgetData, TogglesWidgetData, TodosWidgetData, PagesWidgetData, TextWidgetData } from '@/types'

interface NestedWidgetRendererProps {
  widget: Widget
  characterWidget: Widget
  index: number
  onUpdate: (updates: Partial<Widget>) => void
  onDelete: () => void
}

// Notepad content component (needs state)
function NotepadContent({ widget, data, onUpdate }: { widget: Widget; data: NotepadWidgetData; onUpdate: (data: any) => void }) {
  const { mode } = useScreenStore()
  const [content, setContent] = useState(data.content)

  return (
    <div className="notepad-widget-content" style={{ height: '100%' }}>
      <textarea
        value={content}
        onChange={(e) => {
          const newContent = e.target.value
          setContent(newContent)
          onUpdate({ ...data, content: newContent })
        }}
        placeholder="Type your notes here..."
        disabled={mode === 'edit'}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          color: widget.style.textColor,
          border: 'none',
          outline: 'none',
          resize: 'none',
          fontFamily: 'inherit',
          fontSize: '0.875rem',
          lineHeight: '1.5',
        }}
      />
    </div>
  )
}

/**
 * Renders a nested widget inside a Character widget
 * Uses relative positioning instead of absolute
 */
export function NestedWidgetRenderer({
  widget,
  characterWidget,
  onUpdate,
  onDelete,
}: NestedWidgetRendererProps) {
  const { gridSize, mode, updateWidget } = useScreenStore()
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Convert grid size to pixels for relative positioning
  const baseGridUnit = window.innerWidth / gridSize
  const width = widget.size.width * baseGridUnit
  const height = widget.size.height * baseGridUnit

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

  const handleDelete = () => {
    if (confirm('Delete this widget?')) {
      onDelete()
    }
    setShowMenu(false)
  }

  const updateWidgetData = (newData: any) => {
    onUpdate({ data: newData })
  }

  // Render widget content based on type
  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'text': {
        const data = widget.data as TextWidgetData
        // For nested widgets, just show content - editing handled via main widget
        return (
          <div className="text-widget-content" style={{ height: '100%', overflow: 'auto' }}>
            <div className="markdown-content">
              <ReactMarkdown>{data.content}</ReactMarkdown>
            </div>
          </div>
        )
      }

      case 'notepad': {
        const data = widget.data as NotepadWidgetData
        return (
          <NotepadContent widget={widget} data={data} onUpdate={updateWidgetData} />
        )
      }

      case 'countdown': {
        const data = widget.data as CountdownWidgetData
        return (
          <div className="countdown-widget-content" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '0.5rem' }}>
              {data.title}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={() => {
                  const newValue = data.min !== undefined ? Math.max(data.min, data.value - 1) : data.value - 1
                  updateWidgetData({ ...data, value: newValue })
                }}
                disabled={mode === 'edit'}
                style={{
                  width: '2rem',
                  height: '2rem',
                  fontSize: '1.5rem',
                  backgroundColor: mode === 'edit' ? 'transparent' : 'rgba(0, 0, 0, 0.3)',
                  color: widget.style.textColor,
                  border: `1px solid ${widget.style.borderColor}`,
                  borderRadius: '4px',
                  cursor: mode === 'edit' ? 'default' : 'pointer',
                }}
              >
                −
              </button>
              <input
                type="number"
                value={data.value}
                onChange={(e) => {
                  const newValue = parseInt(e.target.value) || 0
                  updateWidgetData({ ...data, value: newValue })
                }}
                disabled={mode === 'edit'}
                style={{
                  width: '4rem',
                  padding: '0.5rem',
                  fontSize: '1.5rem',
                  textAlign: 'center',
                  backgroundColor: mode === 'edit' ? 'transparent' : 'rgba(0, 0, 0, 0.2)',
                  color: widget.style.textColor,
                  border: `1px solid ${widget.style.borderColor}`,
                  borderRadius: '4px',
                }}
              />
              <button
                onClick={() => {
                  const newValue = data.max !== undefined ? Math.min(data.max, data.value + 1) : data.value + 1
                  updateWidgetData({ ...data, value: newValue })
                }}
                disabled={mode === 'edit'}
                style={{
                  width: '2rem',
                  height: '2rem',
                  fontSize: '1.5rem',
                  backgroundColor: mode === 'edit' ? 'transparent' : 'rgba(0, 0, 0, 0.3)',
                  color: widget.style.textColor,
                  border: `1px solid ${widget.style.borderColor}`,
                  borderRadius: '4px',
                  cursor: mode === 'edit' ? 'default' : 'pointer',
                }}
              >
                +
              </button>
            </div>
          </div>
        )
      }

      case 'fraction': {
        const data = widget.data as FractionWidgetData
        return (
          <div className="fraction-widget-content" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '0.875rem', opacity: 0.7, marginBottom: '0.5rem' }}>
              {data.title}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={() => {
                  const newCurrent = Math.max(0, data.current - 1)
                  updateWidgetData({ ...data, current: newCurrent })
                }}
                disabled={mode === 'edit'}
                style={{
                  width: '2rem',
                  height: '2rem',
                  fontSize: '1.5rem',
                  backgroundColor: mode === 'edit' ? 'transparent' : 'rgba(0, 0, 0, 0.3)',
                  color: widget.style.textColor,
                  border: `1px solid ${widget.style.borderColor}`,
                  borderRadius: '4px',
                  cursor: mode === 'edit' ? 'default' : 'pointer',
                }}
              >
                −
              </button>
              <div style={{ fontSize: '1.5rem', fontWeight: 'bold', minWidth: '4rem', textAlign: 'center' }}>
                {data.current}/{data.max}
              </div>
              <button
                onClick={() => {
                  const newCurrent = Math.min(data.max, data.current + 1)
                  updateWidgetData({ ...data, current: newCurrent })
                }}
                disabled={mode === 'edit' || data.current >= data.max}
                style={{
                  width: '2rem',
                  height: '2rem',
                  fontSize: '1.5rem',
                  backgroundColor: mode === 'edit' || data.current >= data.max ? 'transparent' : 'rgba(0, 0, 0, 0.3)',
                  color: widget.style.textColor,
                  border: `1px solid ${widget.style.borderColor}`,
                  borderRadius: '4px',
                  cursor: mode === 'edit' || data.current >= data.max ? 'default' : 'pointer',
                }}
              >
                +
              </button>
            </div>
          </div>
        )
      }

      case 'toggles': {
        const data = widget.data as TogglesWidgetData
        const cols = Math.ceil(Math.sqrt(data.toggles.length))
        const toggleSizePx = Math.max(20, Math.min(40, (width - 16) / cols))
        return (
          <div className="toggles-widget-content" style={{ height: '100%', overflow: 'auto', padding: '0.25rem' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, ${toggleSizePx}px)`,
                gap: '0.25rem',
                justifyContent: 'start',
              }}
            >
              {data.toggles.map((toggled, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (mode !== 'edit') {
                      const newToggles = [...data.toggles]
                      newToggles[index] = !newToggles[index]
                      updateWidgetData({ ...data, toggles: newToggles })
                    }
                  }}
                  disabled={mode === 'edit'}
                  style={{
                    width: `${toggleSizePx}px`,
                    height: `${toggleSizePx}px`,
                    backgroundColor: toggled ? widget.style.borderColor : 'rgba(0, 0, 0, 0.2)',
                    border: `2px solid ${widget.style.borderColor}`,
                    borderRadius: data.style === 'circle' ? '50%' : '4px',
                    cursor: mode === 'edit' ? 'default' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: widget.style.textColor,
                    fontSize: `${toggleSizePx * 0.4}px`,
                  }}
                >
                  {toggled ? '✓' : ''}
                </button>
              ))}
            </div>
          </div>
        )
      }

      case 'todos': {
        const data = widget.data as TodosWidgetData
        return (
          <div className="todos-widget-content" style={{ height: '100%', overflow: 'auto' }}>
            {data.items.length === 0 ? (
              <div style={{ textAlign: 'center', opacity: 0.5, padding: '1rem' }}>
                No items
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {data.items.map((item) => (
                  <label
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: mode === 'edit' ? 'default' : 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => {
                        if (mode !== 'edit') {
                          const newItems = data.items.map((i) =>
                            i.id === item.id ? { ...i, completed: !i.completed } : i
                          )
                          updateWidgetData({ ...data, items: newItems })
                        }
                      }}
                      disabled={mode === 'edit'}
                    />
                    <span style={{ textDecoration: item.completed ? 'line-through' : 'none', opacity: item.completed ? 0.6 : 1 }}>
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )
      }

      case 'pages': {
        const data = widget.data as PagesWidgetData
        return (
          <div className="pages-widget-content" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
                paddingBottom: '0.5rem',
                borderBottom: `1px solid ${widget.style.borderColor}`,
              }}
            >
              <button
                onClick={() => {
                  if (data.currentPage > 0 && mode !== 'edit') {
                    updateWidgetData({ ...data, currentPage: data.currentPage - 1 })
                  }
                }}
                disabled={data.currentPage === 0 || mode === 'edit'}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: mode === 'edit' || data.currentPage === 0 ? 'transparent' : 'rgba(0, 0, 0, 0.3)',
                  color: widget.style.textColor,
                  border: `1px solid ${widget.style.borderColor}`,
                  borderRadius: '4px',
                  cursor: mode === 'edit' || data.currentPage === 0 ? 'default' : 'pointer',
                }}
              >
                ← Prev
              </button>
              <div style={{ fontSize: '0.875rem', opacity: 0.7 }}>
                Page {data.currentPage + 1} of {data.pages.length}
              </div>
              <button
                onClick={() => {
                  if (data.currentPage < data.pages.length - 1 && mode !== 'edit') {
                    updateWidgetData({ ...data, currentPage: data.currentPage + 1 })
                  }
                }}
                disabled={data.currentPage >= data.pages.length - 1 || mode === 'edit'}
                style={{
                  padding: '0.25rem 0.5rem',
                  backgroundColor: mode === 'edit' || data.currentPage >= data.pages.length - 1 ? 'transparent' : 'rgba(0, 0, 0, 0.3)',
                  color: widget.style.textColor,
                  border: `1px solid ${widget.style.borderColor}`,
                  borderRadius: '4px',
                  cursor: mode === 'edit' || data.currentPage >= data.pages.length - 1 ? 'default' : 'pointer',
                }}
              >
                Next →
              </button>
            </div>
            <div className="markdown-content" style={{ flex: 1, overflow: 'auto' }}>
              <ReactMarkdown>{data.pages[data.currentPage]?.content || 'No content'}</ReactMarkdown>
            </div>
          </div>
        )
      }

      case 'image': {
        const data = widget.data as ImageWidgetData
        return (
          <div className="image-widget-content" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {data.url ? (
              <img
                src={data.url}
                alt="Widget image"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : (
              <div style={{ opacity: 0.5 }}>No image</div>
            )}
          </div>
        )
      }

      default:
        return <div>Unknown widget type: {widget.type}</div>
    }
  }

  return (
    <div
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        marginBottom: '0.5rem',
        backgroundColor: widget.style.backgroundColor,
        color: widget.style.textColor,
        border: `${widget.style.borderWidth}px solid ${widget.style.borderColor}`,
        borderRadius: `${widget.style.borderRadius}px`,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Thin header bar */}
      {mode === 'edit' && (
        <div
          style={{
            height: `${baseGridUnit / 2}px`,
            minHeight: `${baseGridUnit / 2}px`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '0 0.25rem',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderBottom: `1px solid ${widget.style.borderColor}`,
            userSelect: 'none',
          }}
        >
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
        </div>
      )}

      {/* Widget content */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: '0.375rem',
          position: 'relative',
        }}
      >
        {renderWidgetContent()}
      </div>
    </div>
  )
}
