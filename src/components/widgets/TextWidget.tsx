import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { BaseWidget } from './BaseWidget'
import { useScreenStore } from '@/store/screenStore'
import type { Widget, TextWidgetData } from '@/types'

interface TextWidgetProps {
  widget: Widget
}

export function TextWidget({ widget }: TextWidgetProps) {
  const { mode, updateWidget } = useScreenStore()
  const data = widget.data as TextWidgetData
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(data.content)

  const isEditMode = mode === 'edit'

  const handleSave = () => {
    updateWidget(widget.id, {
      data: { ...data, content: editContent },
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditContent(data.content)
    setIsEditing(false)
  }

  if (isEditMode && isEditing) {
    return (
      <BaseWidget widget={widget}>
        <div className="text-widget-editor">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="text-editor"
            placeholder="Enter markdown content..."
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
              color: widget.style.textColor,
              border: 'none',
              outline: 'none',
              resize: 'none',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
            }}
          />
          <div className="editor-actions">
            <button onClick={handleSave} className="save-button">
              Save
            </button>
            <button onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
          </div>
        </div>
      </BaseWidget>
    )
  }

  return (
    <BaseWidget widget={widget}>
      <div className="text-widget-content">
        {isEditMode && (
          <button
            className="edit-button"
            onClick={() => setIsEditing(true)}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              padding: '0.25rem 0.5rem',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              color: widget.style.textColor,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.75rem',
            }}
          >
            Edit
          </button>
        )}
        <div
          className="markdown-content"
          style={{
            paddingTop: isEditMode ? '2rem' : '0',
            overflow: 'auto',
            height: '100%',
          }}
        >
          <ReactMarkdown>{data.content}</ReactMarkdown>
        </div>
      </div>
    </BaseWidget>
  )
}

