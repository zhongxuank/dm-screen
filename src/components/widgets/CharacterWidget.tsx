import { useState } from 'react'
import { BaseWidget } from './BaseWidget'
import { useScreenStore } from '@/store/screenStore'
import { WidgetFactory } from './WidgetFactory'
import { createDefaultWidget } from '@/utils/widgetFactory'
import type { Widget, CharacterWidgetData } from '@/types'

interface CharacterWidgetProps {
  widget: Widget
}

export function CharacterWidget({ widget }: CharacterWidgetProps) {
  const { mode, updateWidget, addWidget, deleteWidget } = useScreenStore()
  const data = widget.data as CharacterWidgetData
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(data)
  const [showAddMenu, setShowAddMenu] = useState(false)

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

  const handleAddWidget = (type: any) => {
    const newWidget = createDefaultWidget(type)
    // Position nested widget relative to character widget
    newWidget.position = {
      x: widget.position.x + 1,
      y: widget.position.y + 1,
    }
    newWidget.zIndex = widget.zIndex + 1

    const updatedData = {
      ...data,
      widgets: [...data.widgets, newWidget],
    }
    updateWidget(widget.id, { data: updatedData })
    setShowAddMenu(false)
  }

  const handleDeleteNestedWidget = (nestedWidgetId: string) => {
    const updatedData = {
      ...data,
      widgets: data.widgets.filter((w) => w.id !== nestedWidgetId),
    }
    updateWidget(widget.id, { data: updatedData })
  }

  const handleUpdateNestedWidget = (nestedWidgetId: string, updates: Partial<Widget>) => {
    const updatedData = {
      ...data,
      widgets: data.widgets.map((w) =>
        w.id === nestedWidgetId ? { ...w, ...updates } : w
      ),
    }
    updateWidget(widget.id, { data: updatedData })
  }

  const handleToggleCollapse = () => {
    updateWidget(widget.id, {
      data: { ...data, collapsed: !data.collapsed },
    })
  }

  return (
    <BaseWidget widget={widget} onEdit={() => setIsEditing(true)}>
      <div className="character-widget-content">
        {mode === 'edit' && isEditing ? (
          <div className="character-widget-editor">
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Character Name:
              <input
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
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
              Icon Color:
              <input
                type="color"
                value={editData.iconColor}
                onChange={(e) =>
                  setEditData({ ...editData, iconColor: e.target.value })
                }
                style={{
                  width: '100%',
                  padding: '0.25rem',
                  marginTop: '0.25rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  border: `1px solid ${widget.style.borderColor}`,
                  borderRadius: '4px',
                }}
              />
            </label>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>
              Icon Number:
              <input
                type="number"
                min="1"
                value={editData.iconNumber || ''}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    iconNumber: e.target.value ? parseInt(e.target.value) : undefined,
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
          <>
            {/* Character header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '4px',
                marginBottom: '0.5rem',
              }}
            >
              <div
                style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  backgroundColor: data.iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.875rem',
                }}
              >
                {data.iconNumber || data.name.charAt(0).toUpperCase()}
              </div>
              <div style={{ flex: 1, fontWeight: 'bold' }}>{data.name}</div>
              {mode === 'edit' && (
                <button
                  onClick={handleToggleCollapse}
                  style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: 'transparent',
                    color: widget.style.textColor,
                    border: `1px solid ${widget.style.borderColor}`,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                  }}
                >
                  {data.collapsed ? '▶' : '▼'}
                </button>
              )}
            </div>

            {/* Nested widgets */}
            {!data.collapsed && (
              <div className="character-nested-widgets">
                {mode === 'edit' && (
                  <div style={{ position: 'relative', marginBottom: '0.5rem' }}>
                    <button
                      onClick={() => setShowAddMenu(!showAddMenu)}
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        color: widget.style.textColor,
                        border: `1px dashed ${widget.style.borderColor}`,
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                    >
                      + Add Widget
                    </button>
                    {showAddMenu && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          right: 0,
                          backgroundColor: widget.style.backgroundColor,
                          border: `1px solid ${widget.style.borderColor}`,
                          borderRadius: '4px',
                          padding: '0.5rem',
                          marginTop: '0.25rem',
                          zIndex: 1000,
                          maxHeight: '200px',
                          overflowY: 'auto',
                        }}
                      >
                        {['text', 'notepad', 'countdown', 'fraction', 'toggles', 'todos'].map(
                          (type) => (
                            <button
                              key={type}
                              onClick={() => handleAddWidget(type as any)}
                              style={{
                                width: '100%',
                                padding: '0.5rem',
                                marginBottom: '0.25rem',
                                backgroundColor: 'transparent',
                                color: widget.style.textColor,
                                border: `1px solid ${widget.style.borderColor}`,
                                borderRadius: '4px',
                                cursor: 'pointer',
                                textAlign: 'left',
                              }}
                            >
                              {type}
                            </button>
                          )
                        )}
                      </div>
                    )}
                  </div>
                )}
                {data.widgets.length === 0 ? (
                  <div
                    style={{
                      textAlign: 'center',
                      opacity: 0.5,
                      padding: '1rem',
                    }}
                  >
                    {mode === 'edit' ? 'No widgets. Click "Add Widget" to add.' : 'No widgets'}
                  </div>
                ) : (
                  <div>
                    {data.widgets.map((nestedWidget) => (
                      <div key={nestedWidget.id} style={{ marginBottom: '0.5rem' }}>
                        <WidgetFactory widget={nestedWidget} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </BaseWidget>
  )
}

