// Core Screen Types
export interface DMScreen {
  version: string
  gridSize: number // default: 30, user-adjustable
  zoom: number // default: 1
  mode: 'normal' | 'edit'
  viewport: Viewport // scroll position (pixels)
  canvasSize: { width: number; height: number } // grid units (infinite)
  widgets: Widget[]
  theme: Theme
}

export interface Viewport {
  x: number // Scroll position X (pixels)
  y: number // Scroll position Y (pixels)
}

export interface Theme {
  backgroundColor: string
  panelColor: string
  textColor: string
  accentColor: string
}

// Widget Types
export type WidgetType =
  | 'text'
  | 'pages'
  | 'todos'
  | 'countdown'
  | 'fraction'
  | 'toggles'
  | 'character'
  | 'image'
  | 'notepad'

export interface Widget {
  id: string
  type: WidgetType
  position: { x: number; y: number } // grid coordinates (top-left anchor, 0,0 = top-left)
  size: { width: number; height: number } // grid units
  style: WidgetStyle
  data: WidgetData
  zIndex: number
}

export interface WidgetStyle {
  backgroundColor: string
  textColor: string
  borderColor: string
  borderWidth: number
  borderRadius: number
}

// Widget Data Types
export interface TextWidgetData {
  content: string
}

export interface NotepadWidgetData {
  content: string
}

export interface ImageWidgetData {
  url: string
  scale?: number
}

export interface CountdownWidgetData {
  title: string
  value: number
  min?: number
  max?: number
}

export interface FractionWidgetData {
  title: string
  current: number
  max: number
}

export interface TogglesWidgetData {
  count: number
  toggles: boolean[]
  style: 'circle' | 'box'
}

export interface TodoItem {
  id: string
  text: string
  completed: boolean
}

export interface TodosWidgetData {
  items: TodoItem[]
}

export interface Page {
  id: string
  content: string
}

export interface PagesWidgetData {
  pages: Page[]
  currentPage: number
}

export interface CharacterWidgetData {
  name: string
  iconColor: string
  iconNumber?: number
  widgets: Widget[]
  collapsed: boolean
}

// Union type for all widget data
export type WidgetData =
  | TextWidgetData
  | NotepadWidgetData
  | ImageWidgetData
  | CountdownWidgetData
  | FractionWidgetData
  | TogglesWidgetData
  | TodosWidgetData
  | PagesWidgetData
  | CharacterWidgetData

