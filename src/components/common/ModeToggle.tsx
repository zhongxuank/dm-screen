import { useScreenStore } from '@/store/screenStore'

export function ModeToggle() {
  const { mode, setMode } = useScreenStore()

  return (
    <div className="mode-toggle">
      <button
        className={`mode-button ${mode === 'edit' ? 'active' : ''}`}
        onClick={() => setMode('edit')}
      >
        Edit
      </button>
      <button
        className={`mode-button ${mode === 'normal' ? 'active' : ''}`}
        onClick={() => setMode('normal')}
      >
        Normal
      </button>
    </div>
  )
}

