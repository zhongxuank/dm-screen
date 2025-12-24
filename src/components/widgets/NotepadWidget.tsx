import { useState } from 'react'
import { BaseWidget } from './BaseWidget'
import { useScreenStore } from '@/store/screenStore'
import type { Widget, NotepadWidgetData } from '@/types'

interface NotepadWidgetProps {
  widget: Widget
}

export function NotepadWidget({ widget }: NotepadWidgetProps) {
  const { mode, updateWidget } = useScreenStore()
  const data = widget.data as NotepadWidgetData
  const [content, setContent] = useState(data.content)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setContent(newContent)
    // Auto-save
    updateWidget(widget.id, {
      data: { ...data, content: newContent },
    })
  }

  return (
    <BaseWidget widget={widget}>
      <div className="notepad-widget-content">
        <textarea
          value={content}
          onChange={handleChange}
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
    </BaseWidget>
  )
}

