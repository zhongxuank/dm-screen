import { useState } from 'react'
import { BaseWidget } from './BaseWidget'
import { useScreenStore } from '@/store/screenStore'
import type { Widget, FractionWidgetData } from '@/types'

interface FractionWidgetProps {
  widget: Widget
}

export function FractionWidget({ widget }: FractionWidgetProps) {
  const { mode, updateWidget } = useScreenStore()
  const data = widget.data as FractionWidgetData
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(data)

  const handleSave = () => {
    // Ensure current doesn't exceed max
    const clampedCurrent = Math.min(editData.max, editData.current)
    updateWidget(widget.id, {
      data: { ...editData, current: clampedCurrent },
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(data)
    setIsEditing(false)
  }

  const handleIncrement = () => {
    const newCurrent = Math.min(data.max, data.current + 1)
    updateWidget(widget.id, {
      data: { ...data, current: newCurrent },
    })
  }

  const handleDecrement = () => {
    const newCurrent = Math.max(0, data.current - 1)
    updateWidget(widget.id, {
      data: { ...data, current: newCurrent },
    })
  }

  const handleCurrentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCurrent = parseInt(e.target.value) || 0
    const clampedCurrent = Math.max(0, Math.min(data.max, newCurrent))
    updateWidget(widget.id, {
      data: { ...data, current: clampedCurrent },
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
      <div className="fraction-widget-content">
        {mode === 'edit' && isEditing ? (
          <div className="fraction-widget-editor">
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
              Max Value:
              <input
                type="number"
                value={editData.max}
                onChange={(e) => {
                  const newMax = parseInt(e.target.value) || 0
                  setEditData({
                    ...editData,
                    max: newMax,
                    current: Math.min(editData.current, newMax),
                  })
                }}
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
              Current Value:
              <input
                type="number"
                value={editData.current}
                onChange={(e) => {
                  const newCurrent = parseInt(e.target.value) || 0
                  setEditData({
                    ...editData,
                    current: Math.min(editData.max, Math.max(0, newCurrent)),
                  })
                }}
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
            className="fraction-display"
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
              <div
                style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  minWidth: '4rem',
                  textAlign: 'center',
                }}
                onWheel={handleWheel}
              >
                {data.current}/{data.max}
              </div>
              <button
                onClick={handleIncrement}
                disabled={mode === 'edit' || data.current >= data.max}
                style={{
                  width: '2rem',
                  height: '2rem',
                  fontSize: '1.5rem',
                  backgroundColor:
                    mode === 'edit' || data.current >= data.max
                      ? 'transparent'
                      : 'rgba(0, 0, 0, 0.3)',
                  color: widget.style.textColor,
                  border: `1px solid ${widget.style.borderColor}`,
                  borderRadius: '4px',
                  cursor: mode === 'edit' || data.current >= data.max ? 'default' : 'pointer',
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

