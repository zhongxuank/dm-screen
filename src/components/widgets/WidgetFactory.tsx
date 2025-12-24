import type { Widget } from '@/types'
import { TextWidget } from './TextWidget'
import { NotepadWidget } from './NotepadWidget'
import { ImageWidget } from './ImageWidget'
import { CountdownWidget } from './CountdownWidget'
import { FractionWidget } from './FractionWidget'
import { TogglesWidget } from './TogglesWidget'
import { TodosWidget } from './TodosWidget'
import { PagesWidget } from './PagesWidget'
import { CharacterWidget } from './CharacterWidget'

interface WidgetFactoryProps {
  widget: Widget
}

export function WidgetFactory({ widget }: WidgetFactoryProps) {
  switch (widget.type) {
    case 'text':
      return <TextWidget widget={widget} />
    case 'notepad':
      return <NotepadWidget widget={widget} />
    case 'image':
      return <ImageWidget widget={widget} />
    case 'countdown':
      return <CountdownWidget widget={widget} />
    case 'fraction':
      return <FractionWidget widget={widget} />
    case 'toggles':
      return <TogglesWidget widget={widget} />
    case 'todos':
      return <TodosWidget widget={widget} />
    case 'pages':
      return <PagesWidget widget={widget} />
    case 'character':
      return <CharacterWidget widget={widget} />
    default:
      return (
        <div>
          Widget type "{widget.type}" not implemented yet.
        </div>
      )
  }
}

