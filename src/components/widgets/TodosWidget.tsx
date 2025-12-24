import { useState } from 'react'
import { BaseWidget } from './BaseWidget'
import { useScreenStore } from '@/store/screenStore'
import type { Widget, TodosWidgetData, TodoItem } from '@/types'

interface TodosWidgetProps {
  widget: Widget
}

export function TodosWidget({ widget }: TodosWidgetProps) {
  const { mode, updateWidget } = useScreenStore()
  const data = widget.data as TodosWidgetData
  const [isEditing, setIsEditing] = useState(false)
  const [newItemText, setNewItemText] = useState('')

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleToggle = (itemId: string) => {
    if (mode === 'edit') return
    const newItems = data.items.map((item) =>
      item.id === itemId ? { ...item, completed: !item.completed } : item
    )
    updateWidget(widget.id, {
      data: { ...data, items: newItems },
    })
  }

  const handleAddItem = () => {
    if (!newItemText.trim()) return
    const newItem: TodoItem = {
      id: `todo-${Date.now()}-${Math.random()}`,
      text: newItemText.trim(),
      completed: false,
    }
    updateWidget(widget.id, {
      data: { ...data, items: [...data.items, newItem] },
    })
    setNewItemText('')
  }

  const handleDeleteItem = (itemId: string) => {
    const newItems = data.items.filter((item) => item.id !== itemId)
    updateWidget(widget.id, {
      data: { ...data, items: newItems },
    })
  }

  const handleEditItem = (itemId: string, newText: string) => {
    const newItems = data.items.map((item) =>
      item.id === itemId ? { ...item, text: newText } : item
    )
    updateWidget(widget.id, {
      data: { ...data, items: newItems },
    })
  }

  return (
    <BaseWidget widget={widget} onEdit={() => setIsEditing(true)}>
      <div className="todos-widget-content">
        {mode === 'edit' && isEditing ? (
          <div className="todos-widget-editor">
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <input
                  type="text"
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddItem()
                    }
                  }}
                  placeholder="Add new item..."
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    color: widget.style.textColor,
                    border: `1px solid ${widget.style.borderColor}`,
                    borderRadius: '4px',
                  }}
                />
                <button
                  onClick={handleAddItem}
                  className="save-button"
                  style={{ padding: '0.5rem 1rem' }}
                >
                  Add
                </button>
              </div>
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {data.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      alignItems: 'center',
                      padding: '0.5rem',
                      marginBottom: '0.25rem',
                      backgroundColor: 'rgba(0, 0, 0, 0.1)',
                      borderRadius: '4px',
                    }}
                  >
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => handleEditItem(item.id, e.target.value)}
                      style={{
                        flex: 1,
                        padding: '0.25rem',
                        backgroundColor: 'transparent',
                        color: widget.style.textColor,
                        border: 'none',
                        outline: 'none',
                      }}
                    />
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      style={{
                        padding: '0.25rem 0.5rem',
                        backgroundColor: 'transparent',
                        color: '#f87171',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="editor-actions">
              <button onClick={handleSave} className="save-button">
                Done
              </button>
              <button onClick={handleCancel} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="todos-display">
            {data.items.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  opacity: 0.5,
                  padding: '1rem',
                }}
              >
                {mode === 'edit' ? 'No items. Click Edit to add items.' : 'No items'}
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
                      padding: '0.25rem',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleToggle(item.id)}
                      disabled={mode === 'edit'}
                      style={{
                        width: '1.25rem',
                        height: '1.25rem',
                        cursor: mode === 'edit' ? 'default' : 'pointer',
                      }}
                    />
                    <span
                      style={{
                        flex: 1,
                        textDecoration: item.completed ? 'line-through' : 'none',
                        opacity: item.completed ? 0.6 : 1,
                      }}
                    >
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </BaseWidget>
  )
}

