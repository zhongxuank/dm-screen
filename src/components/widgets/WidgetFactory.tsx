import type { Widget } from '@/types'
import { TextWidget } from './TextWidget'
// Import other widgets as we create them
// import { NotepadWidget } from './NotepadWidget'
// import { ImageWidget } from './ImageWidget'
// etc.

interface WidgetFactoryProps {
  widget: Widget
}

export function WidgetFactory({ widget }: WidgetFactoryProps) {
  switch (widget.type) {
    case 'text':
      return <TextWidget widget={widget} />

    // Add other widget types as we implement them
    // case 'notepad':
    //   return <NotepadWidget widget={widget} />
    // case 'image':
    //   return <ImageWidget widget={widget} />
    // etc.

    default:
      return (
        <div>
          Widget type "{widget.type}" not implemented yet.
        </div>
      )
  }
}

