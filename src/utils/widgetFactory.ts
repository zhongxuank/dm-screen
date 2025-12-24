import type { Widget, WidgetType } from '@/types'
import type {
  TextWidgetData,
  NotepadWidgetData,
  ImageWidgetData,
  CountdownWidgetData,
  FractionWidgetData,
  TogglesWidgetData,
  TodosWidgetData,
  PagesWidgetData,
  CharacterWidgetData,
} from '@/types'

let widgetIdCounter = 0

function generateId(): string {
  return `widget-${Date.now()}-${++widgetIdCounter}`
}

function getDefaultStyle() {
  return {
    backgroundColor: '#2d2d2d',
    textColor: '#e5e7eb',
    borderColor: '#4a9eff',
    borderWidth: 2,
    borderRadius: 8,
  }
}

export function createDefaultWidget(type: WidgetType): Widget {
  const baseWidget: Omit<Widget, 'type' | 'data'> = {
    id: generateId(),
    position: { x: 5, y: 5 }, // Default position near top-left
    size: { width: 6, height: 4 }, // Default size in grid units
    style: getDefaultStyle(),
    zIndex: 1,
  }

  switch (type) {
    case 'text':
      return {
        ...baseWidget,
        type: 'text',
        data: {
          content: '# Text Widget\n\nAdd your markdown content here.',
        } as TextWidgetData,
      }

    case 'notepad':
      return {
        ...baseWidget,
        type: 'notepad',
        data: {
          content: '',
        } as NotepadWidgetData,
      }

    case 'image':
      return {
        ...baseWidget,
        type: 'image',
        size: { width: 8, height: 6 }, // Larger default for images
        data: {
          url: '',
          scale: 1,
        } as ImageWidgetData,
      }

    case 'countdown':
      return {
        ...baseWidget,
        type: 'countdown',
        size: { width: 4, height: 3 },
        data: {
          title: 'Countdown',
          value: 0,
          min: 0,
        } as CountdownWidgetData,
      }

    case 'fraction':
      return {
        ...baseWidget,
        type: 'fraction',
        size: { width: 4, height: 3 },
        data: {
          title: 'HP',
          current: 10,
          max: 10,
        } as FractionWidgetData,
      }

    case 'toggles':
      return {
        ...baseWidget,
        type: 'toggles',
        size: { width: 6, height: 4 },
        data: {
          count: 5,
          toggles: Array(5).fill(false),
          style: 'circle',
        } as TogglesWidgetData,
      }

    case 'todos':
      return {
        ...baseWidget,
        type: 'todos',
        size: { width: 6, height: 5 },
        data: {
          items: [
            { id: generateId(), text: 'Task 1', completed: false },
            { id: generateId(), text: 'Task 2', completed: false },
          ],
        } as TodosWidgetData,
      }

    case 'pages':
      return {
        ...baseWidget,
        type: 'pages',
        size: { width: 8, height: 6 },
        data: {
          pages: [
            {
              id: generateId(),
              content: '# Page 1\n\nContent goes here.',
            },
          ],
          currentPage: 0,
        } as PagesWidgetData,
      }

    case 'character':
      return {
        ...baseWidget,
        type: 'character',
        size: { width: 10, height: 8 },
        data: {
          name: 'Character',
          iconColor: '#4a9eff',
          widgets: [],
          collapsed: false,
        } as CharacterWidgetData,
      }

    default:
      throw new Error(`Unknown widget type: ${type}`)
  }
}

