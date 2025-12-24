// Grid system with adjustable size and infinite canvas
// Top-left corner (0,0) is the anchor point

export const DEFAULT_GRID_SIZE = 30
export const MIN_GRID_SIZE = 10
export const MAX_GRID_SIZE = 100

export interface GridConfig {
  size: number // Number of columns (default: 30)
  zoom: number // Zoom level (default: 1)
}

export interface Viewport {
  x: number // Scroll position X (pixels)
  y: number // Scroll position Y (pixels)
}

/**
 * Calculate grid unit size in pixels based on viewport width
 * Grid size determines how many columns fit across the screen
 */
export function getGridUnitSize(gridSize: number, zoom: number = 1): number {
  return window.innerWidth / gridSize / zoom
}

/**
 * Convert pixel coordinates to grid coordinates
 * Top-left (0,0) is the anchor point
 */
export function pixelsToGrid(
  pixels: number,
  gridSize: number,
  zoom: number = 1
): number {
  const gridUnit = getGridUnitSize(gridSize, zoom)
  return Math.round(pixels / gridUnit)
}

/**
 * Convert grid coordinates to pixel coordinates
 */
export function gridToPixels(
  gridUnits: number,
  gridSize: number,
  zoom: number = 1
): number {
  const gridUnit = getGridUnitSize(gridSize, zoom)
  return gridUnits * gridUnit
}

/**
 * Snap pixel value to nearest grid line
 */
export function snapToGrid(
  value: number,
  gridSize: number,
  zoom: number = 1
): number {
  const gridUnit = getGridUnitSize(gridSize, zoom)
  return Math.round(value / gridUnit) * gridUnit
}

/**
 * When grid size changes, widget positions remain anchored to top-left
 * This function ensures positions stay correct when grid size changes
 */
export function adjustWidgetPositionForGridChange(
  oldGridSize: number,
  newGridSize: number,
  widgetPosition: { x: number; y: number }
): { x: number; y: number } {
  // Positions are already in grid coordinates, so they don't change
  // The grid unit size changes, but widget positions stay the same
  // because they're relative to the grid, not pixels
  return widgetPosition
}

/**
 * Calculate canvas bounds based on widget positions
 * Used for infinite scrolling
 */
export function calculateCanvasBounds(
  widgets: Array<{
    position: { x: number; y: number }
    size: { width: number; height: number }
  }>,
  gridSize: number,
  zoom: number = 1
): { minX: number; maxX: number; minY: number; maxY: number } {
  if (widgets.length === 0) {
    return { minX: 0, maxX: gridSize, minY: 0, maxY: gridSize }
  }

  let minX = Infinity,
    maxX = -Infinity
  let minY = Infinity,
    maxY = -Infinity

  widgets.forEach((widget) => {
    const x = widget.position.x
    const y = widget.position.y
    const width = widget.size.width
    const height = widget.size.height

    minX = Math.min(minX, x)
    maxX = Math.max(maxX, x + width)
    minY = Math.min(minY, y)
    maxY = Math.max(maxY, y + height)
  })

  // Add padding
  const padding = 5
  return {
    minX: Math.max(0, minX - padding),
    maxX: maxX + padding,
    minY: Math.max(0, minY - padding),
    maxY: maxY + padding,
  }
}

