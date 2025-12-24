import { useScreenStore } from '@/store/screenStore'
import type { WidgetType } from '@/types'
import { createDefaultWidget } from '@/utils/widgetFactory'

const WIDGET_TYPES: Array<{
  type: WidgetType
  name: string
  icon: string
  description: string
}> = [
  { type: 'text', name: 'Text', icon: '📄', description: 'Markdown text display' },
  { type: 'notepad', name: 'Notepad', icon: '📝', description: 'Plain text editor' },
  { type: 'image', name: 'Image', icon: '🖼️', description: 'Image from URL' },
  { type: 'countdown', name: 'Countdown', icon: '🔢', description: 'Number tracker' },
  { type: 'fraction', name: 'Fraction', icon: '📊', description: 'Current/Max tracker' },
  { type: 'toggles', name: 'Toggles', icon: '☑️', description: 'Checkbox grid' },
  { type: 'todos', name: 'To-Dos', icon: '✅', description: 'Task checklist' },
  { type: 'pages', name: 'Pages', icon: '📚', description: 'Multi-page content' },
  { type: 'character', name: 'Character', icon: '👤', description: 'Character container' },
]

export function WidgetToolbar() {
  const { mode, addWidget } = useScreenStore()

  if (mode !== 'edit') {
    return null
  }

  const handleAddWidget = (type: WidgetType) => {
    const widget = createDefaultWidget(type)
    addWidget(widget)
  }

  return (
    <div className="widget-toolbar">
      <h3>Add Widget</h3>
      <div className="widget-type-list">
        {WIDGET_TYPES.map((widgetType) => (
          <button
            key={widgetType.type}
            className="widget-type-button"
            onClick={() => handleAddWidget(widgetType.type)}
            title={widgetType.description}
          >
            <span className="widget-icon">{widgetType.icon}</span>
            <span className="widget-name">{widgetType.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

