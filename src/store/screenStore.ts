import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Widget, Viewport, Theme } from '@/types'
import { DEFAULT_GRID_SIZE, MIN_GRID_SIZE, MAX_GRID_SIZE } from '@/utils/grid'

interface ScreenState {
  // Screen configuration
  gridSize: number
  zoom: number
  mode: 'normal' | 'edit'
  viewport: Viewport
  canvasSize: { width: number; height: number }
  widgets: Widget[]
  theme: Theme

  // Actions
  setGridSize: (size: number) => void
  setZoom: (zoom: number) => void
  setMode: (mode: 'normal' | 'edit') => void
  setViewport: (viewport: Viewport) => void
  updateViewport: (deltaX: number, deltaY: number) => void
  setCanvasSize: (size: { width: number; height: number }) => void
  addWidget: (widget: Widget) => void
  updateWidget: (id: string, updates: Partial<Widget>) => void
  deleteWidget: (id: string) => void
  cloneWidget: (id: string) => void
  setTheme: (theme: Partial<Theme>) => void
}

const defaultTheme: Theme = {
  backgroundColor: '#1e1e1e',
  panelColor: '#2d2d2d',
  textColor: '#e5e7eb',
  accentColor: '#4a9eff',
}

export const useScreenStore = create<ScreenState>()(
  persist(
    (set, get) => ({
      // Initial state
      gridSize: DEFAULT_GRID_SIZE,
      zoom: 1,
      mode: 'edit',
      viewport: { x: 0, y: 0 },
      canvasSize: { width: DEFAULT_GRID_SIZE, height: DEFAULT_GRID_SIZE },
      widgets: [],
      theme: defaultTheme,

      // Actions
      setGridSize: (size: number) => {
        const clampedSize = Math.max(
          MIN_GRID_SIZE,
          Math.min(MAX_GRID_SIZE, size)
        )
        set({ gridSize: clampedSize })
      },

      setZoom: (zoom: number) => {
        const clampedZoom = Math.max(0.5, Math.min(2, zoom))
        set({ zoom: clampedZoom })
      },

      setMode: (mode: 'normal' | 'edit') => {
        set({ mode })
      },

      setViewport: (viewport: Viewport) => {
        // Constrain to top-left: only allow scrolling down and right
        set({
          viewport: {
            x: Math.max(0, viewport.x),
            y: Math.max(0, viewport.y),
          },
        })
      },

      updateViewport: (deltaX: number, deltaY: number) => {
        const { viewport } = get()
        // Constrain to top-left: only allow scrolling down and right
        set({
          viewport: {
            x: Math.max(0, viewport.x + deltaX),
            y: Math.max(0, viewport.y + deltaY),
          },
        })
      },

      setCanvasSize: (size: { width: number; height: number }) => {
        set({ canvasSize: size })
      },

      addWidget: (widget: Widget) => {
        set((state) => ({
          widgets: [...state.widgets, widget],
        }))
      },

      updateWidget: (id: string, updates: Partial<Widget>) => {
        set((state) => ({
          widgets: state.widgets.map((widget) =>
            widget.id === id ? { ...widget, ...updates } : widget
          ),
        }))
      },

      deleteWidget: (id: string) => {
        set((state) => ({
          widgets: state.widgets.filter((widget) => widget.id !== id),
        }))
      },

      cloneWidget: (id: string) => {
        const { widgets } = get()
        const widget = widgets.find((w) => w.id === id)
        if (!widget) return

        // Deep clone widget
        const cloned = JSON.parse(JSON.stringify(widget))
        cloned.id = `${widget.id}-clone-${Date.now()}`
        cloned.position = {
          x: widget.position.x + 2,
          y: widget.position.y + 2,
        }
        cloned.zIndex = Math.max(...widgets.map((w) => w.zIndex), 0) + 1

        // Handle nested widgets in Character widgets
        if (widget.type === 'character') {
          cloned.data.widgets = cloned.data.widgets.map((nested: Widget) => ({
            ...nested,
            id: `${nested.id}-clone-${Date.now()}`,
          }))
        }

        set((state) => ({
          widgets: [...state.widgets, cloned],
        }))
      },

      setTheme: (theme: Partial<Theme>) => {
        set((state) => ({
          theme: { ...state.theme, ...theme },
        }))
      },
    }),
    {
      name: 'dm-screen-storage',
      partialize: (state) => ({
        gridSize: state.gridSize,
        zoom: state.zoom,
        mode: state.mode,
        viewport: state.viewport,
        widgets: state.widgets,
        theme: state.theme,
      }),
    }
  )
)

