import { useState } from 'react'
import { BaseWidget } from './BaseWidget'
import { useScreenStore } from '@/store/screenStore'
import { gridToPixels } from '@/utils/grid'
import type { Widget, TogglesWidgetData } from '@/types'

interface TogglesWidgetProps {
  widget: Widget
}

export function TogglesWidget({ widget }: TogglesWidgetProps) {
  const { mode, updateWidget, gridSize, zoom } = useScreenStore()
  const data = widget.data as TogglesWidgetData
  const [isEditing, setIsEditing] = useState(false)
  const [editCount, setEditCount] = useState(data.count)
  const [editStyle, setEditStyle] = useState(data.style)

  // Calculate container dimensions in pixels
  const containerWidth = gridToPixels(widget.size.width, gridSize, 1)
  const containerHeight = gridToPixels(widget.size.height, gridSize, 1)
  const headerHeight = (window.innerWidth / gridSize) / 2 // Half grid unit
  const availableHeight = containerHeight - headerHeight - 16 // Subtract header and padding

  const handleSave = () => {
    const newToggles = Array(editCount).fill(false)
    // Preserve existing toggles up to the new count
    for (let i = 0; i < Math.min(editCount, data.toggles.length); i++) {
      newToggles[i] = data.toggles[i]
    }
    updateWidget(widget.id, {
      data: {
        count: editCount,
        toggles: newToggles,
        style: editStyle,
      },
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditCount(data.count)
    setEditStyle(data.style)
    setIsEditing(false)
  }

  const handleToggle = (index: number) => {
    if (mode === 'edit') return
    const newToggles = [...data.toggles]
    newToggles[index] = !newToggles[index]
    updateWidget(widget.id, {
      data: { ...data, toggles: newToggles },
    })
  }

  return (
    <BaseWidget widget={widget} onEdit={() => setIsEditing(true)}>
      <div className="toggles-widget-content">
        {mode === 'edit' && isEditing ? (
          <div className="toggles-widget-editor">
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Number of Toggles:
              <input
                type="number"
                min="1"
                max="50"
                value={editCount}
                onChange={(e) => setEditCount(Math.max(1, parseInt(e.target.value) || 1))}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  marginTop: '0.25rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  color: widget.style.textColor,
                  border: `1px solid ${widget.style.borderColor}`,
                  borderRadius: '4px',
                }}
              />
            </label>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Style:
              <select
                value={editStyle}
                onChange={(e) => setEditStyle(e.target.value as 'circle' | 'box')}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  marginTop: '0.25rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  color: widget.style.textColor,
                  border: `1px solid ${widget.style.borderColor}`,
                  borderRadius: '4px',
                }}
              >
                <option value="circle">Circle</option>
                <option value="box">Box</option>
              </select>
            </label>
            <div className="editor-actions">
              <button onClick={handleSave} className="save-button">
                Save
              </button>
              <button onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div
            className="toggles-display"
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fill, minmax(min(100%, ${Math.max(1.5, Math.sqrt(data.toggles.length))}rem), 1fr))`,
              gap: '0.25rem',
              padding: '0.25rem',
              height: '100%',
              alignContent: 'start',
            }}
          >
            {data.toggles.map((toggled, index) => {
              // Calculate optimal size based on container and number of toggles
              const cols = Math.ceil(Math.sqrt(data.toggles.length))
              const rows = Math.ceil(data.toggles.length / cols)
              const gap = 4 // 0.25rem = 4px
              const padding = 8 // 0.25rem = 4px on each side
              const maxWidth = (containerWidth - padding * 2 - gap * (cols - 1)) / cols
              const maxHeight = (availableHeight - gap * (rows - 1)) / rows
              const toggleSizePx = Math.max(20, Math.min(maxWidth, maxHeight, 40)) // Between 20px and 40px
              const toggleSizeRem = toggleSizePx / 16 // Convert to rem
              
              return (
                <button
                  key={index}
                  onClick={() => handleToggle(index)}
                  disabled={mode === 'edit'}
                  style={{
                    width: `${toggleSizePx}px`,
                    height: `${toggleSizePx}px`,
                    minWidth: '20px',
                    minHeight: '20px',
                    backgroundColor: toggled
                      ? widget.style.borderColor
                      : 'rgba(0, 0, 0, 0.2)',
                    border: `2px solid ${widget.style.borderColor}`,
                    borderRadius: data.style === 'circle' ? '50%' : '4px',
                    cursor: mode === 'edit' ? 'default' : 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: widget.style.textColor,
                    fontSize: `${toggleSizeRem * 0.4}rem`,
                    margin: 'auto',
                  }}
                  onMouseEnter={(e) => {
                    if (mode !== 'edit') {
                      e.currentTarget.style.opacity = '0.8'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1'
                  }}
                >
                  {toggled ? '✓' : ''}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </BaseWidget>
  )
}

