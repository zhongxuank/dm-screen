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


  return (
    <BaseWidget widget={widget} onEdit={() => setIsEditing(true)}>
      <div className="text-widget-content">
        {isEditMode && isEditing ? (
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
        ) : (
          <div className="markdown-content">
            <ReactMarkdown>{data.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </BaseWidget>
  )
}

