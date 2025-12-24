import { GridContainer } from './components/common/GridContainer'
import { ModeToggle } from './components/common/ModeToggle'
import { GridSizeControls } from './components/common/GridSizeControls'
import { ZoomControls } from './components/common/ZoomControls'
import { WidgetToolbar } from './components/common/WidgetToolbar'
import { WidgetFactory } from './components/widgets/WidgetFactory'
import { useScreenStore } from './store/screenStore'

function App() {
  const { widgets } = useScreenStore()

  return (
    <div className="app">
      <div className="controls-bar">
        <ModeToggle />
        <GridSizeControls />
        <ZoomControls />
      </div>
      <div className="main-content">
        <WidgetToolbar />
        <GridContainer>
          {widgets.map((widget) => (
            <WidgetFactory key={widget.id} widget={widget} />
          ))}
        </GridContainer>
      </div>
    </div>
  )
}

export default App
