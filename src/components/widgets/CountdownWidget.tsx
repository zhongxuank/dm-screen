import { useState } from 'react'
import { BaseWidget } from './BaseWidget'
import { useScreenStore } from '@/store/screenStore'
import type { Widget, CountdownWidgetData } from '@/types'

interface CountdownWidgetProps {
  widget: Widget
}

export function CountdownWidget({ widget }: CountdownWidgetProps) {
  const { mode, updateWidget } = useScreenStore()
  const data = widget.data as CountdownWidgetData
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(data)

  const handleSave = () => {
    updateWidget(widget.id, {
      data: editData,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(data)
    setIsEditing(false)
  }

  const handleIncrement = () => {
    const newValue =
      data.max !== undefined
        ? Math.min(data.max, data.value + 1)
        : data.value + 1
    updateWidget(widget.id, {
      data: { ...data, value: newValue },
    })
  }

  const handleDecrement = () => {
    const newValue =
      data.min !== undefined
        ? Math.max(data.min, data.value - 1)
        : data.value - 1
    updateWidget(widget.id, {
      data: { ...data, value: newValue },
    })
  }

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0
    const clampedValue =
      data.min !== undefined && data.max !== undefined
        ? Math.max(data.min, Math.min(data.max, newValue))
        : data.min !== undefined
          ? Math.max(data.min, newValue)
          : data.max !== undefined
            ? Math.min(data.max, newValue)
            : newValue
    updateWidget(widget.id, {
      data: { ...data, value: clampedValue },
    })
  }

  const handleWheel = (e: React.WheelEvent) => {
    if (mode === 'normal') {
      e.preventDefault()
      if (e.deltaY > 0) {
        handleDecrement()
      } else {
        handleIncrement()
      }
    }
  }

  return (
    <BaseWidget widget={widget} onEdit={() => setIsEditing(true)}>
      <div className="countdown-widget-content">
        {mode === 'edit' && isEditing ? (
          <div className="countdown-widget-editor">
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Title:
              <input
                type="text"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
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
              Default Value:
              <input
                type="number"
                value={editData.value}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    value: parseInt(e.target.value) || 0,
                  })
                }
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
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <label style={{ flex: 1 }}>
                Min:
                <input
                  type="number"
                  value={editData.min ?? ''}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      min: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
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
              <label style={{ flex: 1 }}>
                Max:
                <input
                  type="number"
                  value={editData.max ?? ''}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      max: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
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
            </div>
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
            className="countdown-display"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <div
              style={{
                fontSize: '0.875rem',
                opacity: 0.7,
                marginBottom: '0.5rem',
              }}
            >
              {data.title}
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <button
                onClick={handleDecrement}
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                −
              </button>
              <input
                type="number"
                value={data.value}
                onChange={handleValueChange}
                onWheel={handleWheel}
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
                  cursor: mode === 'edit' ? 'default' : 'text',
                }}
              />
              <button
                onClick={handleIncrement}
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>
    </BaseWidget>
  )
}

