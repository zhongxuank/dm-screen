# DM Screen - Step-by-Step Development Guide

This guide provides detailed, actionable steps for implementing each phase of the DM Screen project.

## Prerequisites Setup

### Step 1: Initialize Project with Build Tool

```bash
# Using Vite (recommended)
npm create vite@latest . -- --template react-ts

# Or using Create React App
npx create-react-app . --template typescript

# Install additional dependencies
npm install zustand react-markdown marked
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
npm install --save-dev @types/react @types/react-dom
```

### Step 2: Configure GitHub Pages

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Update `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/dm-screen/',
  // ... other config
})
```

## Phase 1: Foundation & Setup

### Step 1.1: Create Project Structure

```bash
mkdir -p src/{components/{widgets,common},hooks,store,utils,types,styles}
mkdir -p public tests/{unit,integration,e2e}
```

### Step 1.2: Set Up Type Definitions

Create `src/types/index.ts`:
```typescript
// Copy types from PLAN.md
// Implement all interfaces for Widget, DMScreen, etc.
```

### Step 1.3: Create Theme System

Create `src/styles/theme.css`:
```css
:root {
  --bg-primary: #1e1e1e;
  --bg-secondary: #2d2d2d;
  --bg-panel-blue: #1a2332;
  --bg-panel-charcoal: #2d2d2d;
  --bg-panel-purple: #2a2340;
  --bg-panel-green: #2a3a2a;
  --bg-panel-crimson: #3a2a2a;
  
  --text-primary: #e5e7eb;
  --text-secondary: #9ca3af;
  --accent-blue: #4a9eff;
  --accent-green: #4ade80;
  --accent-yellow: #fbbf24;
  --accent-red: #f87171;
  
  --grid-size: 30;
  --grid-unit: calc(100vw / var(--grid-size));
}
```

### Step 1.4: Build Grid System

Create `src/utils/grid.ts`:
```typescript
export const GRID_SIZE = 30;

export function pixelsToGrid(pixels: number, zoom: number = 1): number {
  const gridUnit = window.innerWidth / GRID_SIZE;
  return Math.round(pixels / gridUnit / zoom);
}

export function gridToPixels(gridUnits: number, zoom: number = 1): number {
  const gridUnit = window.innerWidth / GRID_SIZE;
  return gridUnits * gridUnit * zoom;
}

export function snapToGrid(value: number, zoom: number = 1): number {
  return pixelsToGrid(value, zoom) * gridToPixels(1, zoom);
}
```

### Step 1.5: Create Main Layout Component

Create `src/components/common/GridContainer.tsx`:
```typescript
// Implement grid overlay
// Handle zoom functionality
// Provide grid context
```

### Step 1.6: Implement Mode Toggle

Create `src/components/common/ModeToggle.tsx`:
```typescript
// Toggle between 'normal' and 'edit' modes
// Store mode in global state
// Update UI based on mode
```

## Phase 2: Widget Implementation

### Step 2.1: Create Base Widget Component

Create `src/components/widgets/BaseWidget.tsx`:
```typescript
interface BaseWidgetProps {
  widget: Widget;
  mode: 'normal' | 'edit';
  onUpdate: (widget: Widget) => void;
  onDelete: () => void;
  onClone: () => void;
}

// Features:
// - Drag handle (Edit mode only)
// - Resize handle (bottom-right, Edit mode only)
// - Selection border
// - Style editor panel
// - Delete/clone buttons
```

### Step 2.2: Implement Drag & Drop

Create `src/hooks/useDragAndDrop.ts`:
```typescript
// Use @dnd-kit/core
// Handle drag start/end
// Update widget position
// Snap to grid
```

### Step 2.3: Implement Resize Functionality

Create `src/hooks/useResize.ts`:
```typescript
// Handle mouse down on resize handle
// Track mouse movement
// Calculate new size
// Snap to grid
// Update widget size
```

### Step 2.4: Build Individual Widgets

For each widget type, follow this pattern:

1. **Create widget component** (`src/components/widgets/[WidgetName]Widget.tsx`)
2. **Define widget data type** (`src/types/index.ts`)
3. **Create edit panel** (if needed)
4. **Implement normal mode interactions**
5. **Add to widget factory** (`src/components/widgets/WidgetFactory.tsx`)

#### Example: Countdown Widget

```typescript
// 1. Create component
export function CountdownWidget({ widget, mode, onUpdate }: Props) {
  const data = widget.data as CountdownData;
  
  if (mode === 'edit') {
    return <CountdownEditPanel widget={widget} onUpdate={onUpdate} />;
  }
  
  return (
    <div className="countdown-widget">
      <h3>{data.title}</h3>
      <div className="countdown-controls">
        <button onClick={() => updateValue(-1)}>-</button>
        <input 
          type="number" 
          value={data.value}
          onChange={(e) => updateValue(Number(e.target.value))}
          onWheel={(e) => updateValue(e.deltaY > 0 ? -1 : 1)}
        />
        <button onClick={() => updateValue(1)}>+</button>
      </div>
    </div>
  );
}

// 2. Define type
interface CountdownData {
  title: string;
  value: number;
  min?: number;
  max?: number;
}

// 3. Create edit panel
function CountdownEditPanel({ widget, onUpdate }: Props) {
  // Form for editing title, default value, min/max
}
```

### Step 2.5: Widget Implementation Order

Implement widgets in this order (simplest to most complex):

1. ✅ **Text Widget** - Simple markdown display
2. ✅ **Notepad Widget** - Plain text input
3. ✅ **Image Widget** - URL-based image display
4. ✅ **Countdown Widget** - Number with controls
5. ✅ **Fraction Widget** - Two numbers (current/max)
6. ✅ **Toggles Widget** - Checkbox grid
7. ✅ **To-Dos Widget** - List with checkboxes
8. ✅ **Pages Widget** - Multi-page markdown
9. ✅ **Character Widget** - Container with nested widgets

## Phase 3: Edit Mode Features

### Step 3.1: Widget Toolbar

Create `src/components/common/WidgetToolbar.tsx`:
```typescript
// List of all widget types
// Click to add new widget
// Show widget icons/names
// Position: sidebar or floating panel
```

### Step 3.2: Widget Creation Flow

```typescript
// 1. User clicks widget type in toolbar
// 2. Create default widget data
// 3. Generate unique ID
// 4. Set default position (center or next available)
// 5. Add to widget store
// 6. Widget appears on screen
```

### Step 3.3: Style Editor

Create `src/components/common/StyleEditor.tsx`:
```typescript
// Color pickers for background, text, border
// Sliders for border width, radius
// Live preview
// Apply button or auto-apply
```

### Step 3.4: Widget Cloning

```typescript
function cloneWidget(widget: Widget): Widget {
  const cloned = {
    ...widget,
    id: generateId(),
    position: { 
      x: widget.position.x + 2, 
      y: widget.position.y + 2 
    }
  };
  
  if (widget.type === 'character') {
    cloned.data.widgets = widget.data.widgets.map(cloneWidget);
  }
  
  return cloned;
}
```

## Phase 4: Normal Mode Optimization

### Step 4.1: Hide Edit Controls

```typescript
// In BaseWidget, conditionally render:
{mode === 'edit' && (
  <>
    <DragHandle />
    <ResizeHandle />
    <DeleteButton />
    <CloneButton />
  </>
)}
```

### Step 4.2: Disable Dragging

```typescript
// In useDragAndDrop hook:
if (mode === 'normal') {
  return; // Don't enable drag
}
```

### Step 4.3: Add Keyboard Shortcuts

Create `src/hooks/useKeyboardShortcuts.ts`:
```typescript
// Space: Toggle mode
// Delete: Delete selected widget (Edit mode)
// Ctrl+D: Clone widget (Edit mode)
// Esc: Deselect widget
```

## Phase 5: Export/Import System

### Step 5.1: Design Data Schema

Create `src/utils/export.ts`:
```typescript
export interface ExportData {
  version: string;
  exportedAt: string;
  gridSize: number;
  widgets: Widget[];
  theme: Theme;
}

export function exportScreen(
  screen: DMScreen, 
  includeState: boolean = true
): ExportData {
  const widgets = screen.widgets.map(widget => {
    if (!includeState) {
      return resetWidgetToDefaults(widget);
    }
    return widget;
  });
  
  return {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    gridSize: screen.gridSize,
    widgets,
    theme: screen.theme
  };
}
```

### Step 5.2: Implement Export

```typescript
function handleExport(includeState: boolean) {
  const data = exportScreen(screenState, includeState);
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dm-screen-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}
```

### Step 5.3: Implement Import

Create `src/utils/import.ts`:
```typescript
export function importScreen(file: File): Promise<DMScreen> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        validateImportData(data);
        const screen = convertToScreen(data);
        resolve(screen);
      } catch (error) {
        reject(new Error('Invalid file format'));
      }
    };
    reader.readAsText(file);
  });
}

function validateImportData(data: any): void {
  if (!data.version || !data.widgets) {
    throw new Error('Invalid export format');
  }
  // Additional validation
}
```

### Step 5.4: Add Export/Import UI

Create `src/components/common/ExportImportPanel.tsx`:
```typescript
// Export buttons (Current State / Clean State)
// Import file input
// Confirmation dialogs
// Error messages
```

## Phase 6: Testing & Polish

### Step 6.1: Unit Tests

Create test files for each utility function:
```typescript
// tests/unit/grid.test.ts
describe('grid utilities', () => {
  test('pixelsToGrid converts correctly', () => {
    // Test implementation
  });
});

// tests/unit/export.test.ts
describe('export functionality', () => {
  test('exports with current state', () => {
    // Test implementation
  });
});
```

### Step 6.2: Component Tests

```typescript
// tests/unit/widgets/CountdownWidget.test.tsx
describe('CountdownWidget', () => {
  test('increments value on + click', () => {
    // Test implementation
  });
});
```

### Step 6.3: Integration Tests

```typescript
// tests/integration/dragAndDrop.test.tsx
describe('Drag and Drop', () => {
  test('moves widget to new position', () => {
    // Test implementation
  });
});
```

### Step 6.4: E2E Tests

Using Playwright:
```typescript
// tests/e2e/workflow.spec.ts
test('complete screen creation workflow', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="mode-toggle"]');
  await page.click('[data-testid="add-widget-text"]');
  // ... continue workflow
});
```

## Phase 7: Deployment

### Step 7.1: Configure Build

Ensure `package.json` has:
```json
{
  "scripts": {
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Step 7.2: Test Build Locally

```bash
npm run build
npm run preview
# Verify everything works
```

### Step 7.3: Push to GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
# GitHub Actions will auto-deploy
```

### Step 7.4: Enable GitHub Pages

1. Go to repository Settings
2. Navigate to Pages section
3. Select source: "GitHub Actions"
4. Verify deployment status

## Development Best Practices

### Code Organization
- One widget per file
- Shared utilities in `utils/`
- Custom hooks in `hooks/`
- Types centralized in `types/`

### State Management
- Use Zustand for global state
- Keep widget data immutable
- Use React Context for mode/theme

### Performance
- Memoize expensive calculations
- Virtualize if many widgets (>50)
- Debounce resize operations
- Lazy load markdown parser

### Error Handling
- Validate all user inputs
- Handle network errors (image loading)
- Graceful degradation for unsupported features
- User-friendly error messages

### Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation support
- Focus management
- Screen reader compatibility

## Debugging Tips

### Common Issues

1. **Widgets not dragging**
   - Check mode is 'edit'
   - Verify drag handle is rendered
   - Check z-index conflicts

2. **Grid snapping not working**
   - Verify grid calculations
   - Check zoom factor
   - Ensure grid size is correct

3. **Export/Import failing**
   - Validate JSON structure
   - Check for circular references
   - Verify data types match

4. **Styles not applying**
   - Check CSS specificity
   - Verify inline styles vs classes
   - Check theme variables

## Next Steps After MVP

1. Add widget templates
2. Implement undo/redo
3. Add widget groups
4. Create print mode
5. Add collaboration features
6. Build widget library
7. Add more widget types

---

**Remember**: Build incrementally, test frequently, and iterate based on user feedback!

