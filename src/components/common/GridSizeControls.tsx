import { useScreenStore } from '@/store/screenStore'
import { MIN_GRID_SIZE, MAX_GRID_SIZE } from '@/utils/grid'

export function GridSizeControls() {
  const { gridSize, setGridSize } = useScreenStore()

  const handleGridSizeChange = (newSize: number) => {
    const clampedSize = Math.max(
      MIN_GRID_SIZE,
      Math.min(MAX_GRID_SIZE, newSize)
    )
    setGridSize(clampedSize)
  }

  return (
    <div className="grid-size-controls">
      <label>
        Grid Size: {gridSize} columns
        <input
          type="range"
          min={MIN_GRID_SIZE}
          max={MAX_GRID_SIZE}
          value={gridSize}
          onChange={(e) => handleGridSizeChange(Number(e.target.value))}
        />
      </label>
      <div className="grid-size-buttons">
        <button onClick={() => handleGridSizeChange(gridSize - 5)}>-5</button>
        <button onClick={() => handleGridSizeChange(gridSize - 1)}>-1</button>
        <button onClick={() => handleGridSizeChange(gridSize + 1)}>+1</button>
        <button onClick={() => handleGridSizeChange(gridSize + 5)}>+5</button>
      </div>
    </div>
  )
}

