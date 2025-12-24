import { GridContainer } from './components/common/GridContainer'
import { ModeToggle } from './components/common/ModeToggle'
import { GridSizeControls } from './components/common/GridSizeControls'
import { ZoomControls } from './components/common/ZoomControls'

function App() {
  return (
    <div className="app">
      <div className="controls-bar">
        <ModeToggle />
        <GridSizeControls />
        <ZoomControls />
      </div>
      <GridContainer>
        {/* Widgets will be rendered here */}
      </GridContainer>
    </div>
  )
}

export default App
