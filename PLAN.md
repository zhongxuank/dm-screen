# DM Screen Project - Development Plan

## Project Overview
A web-based, customizable Dungeon Master screen with drag-and-drop functionality, multiple widget types, and export/import capabilities. Designed for GitHub Pages deployment.

## Technology Stack

### Core Technologies
- **Frontend Framework**: Vanilla JavaScript (ES6+) or React (recommended for component reusability)
- **Styling**: CSS3 with CSS Grid/Flexbox, CSS Variables for theming
- **Drag & Drop**: HTML5 Drag API or a lightweight library (react-dnd, interact.js)
- **Markdown Parsing**: marked.js or markdown-it
- **State Management**: Local state (React Context/State) or Redux for complex state
- **Build Tool**: Vite (fast, simple) or Webpack
- **Deployment**: GitHub Pages (static hosting)

### Recommended Stack
- **React** + **TypeScript** (type safety, better DX)
- **Vite** (fast dev server, optimized builds)
- **CSS Modules** or **Tailwind CSS** (styling)
- **Zustand** or **React Context** (state management)
- **react-beautiful-dnd** or **@dnd-kit/core** (drag and drop)

## Architecture Overview

### Data Structure
```typescript
interface DMScreen {
  version: string;
  gridSize: number; // default: 30, user-adjustable
  zoom: number; // default: 1
  mode: 'normal' | 'edit';
  viewport: { x: number; y: number }; // scroll position (pixels)
  canvasSize: { width: number; height: number }; // grid units (infinite)
  widgets: Widget[];
  theme: Theme;
}

interface Widget {
  id: string;
  type: WidgetType;
  position: { x: number; y: number }; // grid coordinates (top-left anchor, 0,0 = top-left)
  size: { width: number; height: number }; // grid units
  style: WidgetStyle;
  data: WidgetData;
  zIndex: number;
}

type WidgetType = 
  | 'text' 
  | 'pages' 
  | 'todos' 
  | 'countdown' 
  | 'fraction' 
  | 'toggles' 
  | 'character' 
  | 'image' 
  | 'notepad';

interface WidgetStyle {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
}
```

## Development Phases

### Phase 1: Foundation & Setup (Week 1)
**Goal**: Set up project structure, basic UI, and core systems

#### 1.1 Project Initialization
- [ ] Initialize Git repository
- [ ] Set up build tool (Vite/Webpack)
- [ ] Configure TypeScript (if using)
- [ ] Set up ESLint/Prettier
- [ ] Create folder structure
- [ ] Set up GitHub Pages configuration

#### 1.2 Basic UI Framework
- [ ] Create dark mode theme system
- [ ] Design color palette (3-5 panel color options)
- [ ] Build main layout container with infinite scroll canvas
- [ ] Implement grid system (default: 30 columns, user-adjustable)
- [ ] Implement coordinate system (top-left anchor at 0,0)
- [ ] Add grid size adjustment controls
- [ ] Create mode toggle (Normal/Edit)
- [ ] Add zoom controls
- [ ] Implement infinite scrolling viewport

#### 1.3 Core Widget System
- [ ] Create base Widget component
- [ ] Implement widget positioning system (grid-based, top-left anchor)
- [ ] Build widget container with drag handle
- [ ] Implement resize handles (bottom-right corner)
- [ ] Add z-index management
- [ ] Create widget selection system
- [ ] Implement grid size change handler (preserve top-left positions)

### Phase 2: Widget Implementation (Week 2-3)
**Goal**: Implement all widget types with full functionality

#### 2.1 Basic Widgets
- [ ] **Text Widget**
  - Markdown rendering
  - Text wrapping
  - Edit mode: markdown editor
  - Normal mode: read-only display
  
- [ ] **Notepad Widget**
  - Plain text editing (Normal mode)
  - Auto-save to state
  - Edit mode: styling options

- [ ] **Image Widget**
  - URL input (Edit mode)
  - Image loading and display
  - Scale/crop controls
  - Error handling for invalid URLs

#### 2.2 Interactive Widgets
- [ ] **Countdown Widget**
  - Number input (scroll/type)
  - +/- buttons
  - Title field
  - Edit mode: configure title, default value
  - Normal mode: interactive controls

- [ ] **Fraction Widget**
  - Current/Max number inputs
  - +/- for current value
  - Visual representation (e.g., HP: 45/60)
  - Edit mode: configure title, max value

- [ ] **Toggles Widget**
  - Configurable number of toggles
  - Checkbox/circle style
  - Edit mode: set count, style
  - Normal mode: toggle on/off

- [ ] **To-Dos Widget**
  - Add/remove items
  - Toggle completion
  - Edit mode: manage list items
  - Normal mode: check/uncheck items

#### 2.3 Advanced Widgets
- [ ] **Pages Widget**
  - Multiple markdown pages
  - Page navigation (prev/next)
  - Add/remove pages (Edit mode)
  - Page indicators

- [ ] **Character Widget** (Container)
  - Nested widget support
  - Name and icon label
  - Color picker for differentiation
  - Number badge option
  - Collapse/expand functionality
  - Move as unit

### Phase 3: Edit Mode Features (Week 3-4)
**Goal**: Complete edit mode functionality

#### 3.1 Widget Management
- [ ] Widget creation panel/toolbar
- [ ] Add widget dialog with type selection
- [ ] Widget deletion
- [ ] Widget cloning (including nested widgets in Characters)
- [ ] Widget duplication

#### 3.2 Styling & Customization
- [ ] Widget style editor panel
- [ ] Color picker for background/text/border
- [ ] Border width/radius controls
- [ ] Preview in real-time

#### 3.3 Layout Management
- [ ] Grid snap system
- [ ] Widget alignment helpers
- [ ] Grid size adjustment UI (increase/decrease columns)
- [ ] Grid size change handler (anchor widgets to top-left)
- [ ] Infinite canvas scrolling
- [ ] Viewport position tracking
- [ ] Undo/redo functionality
- [ ] Clear all widgets option

### Phase 4: Normal Mode Features (Week 4)
**Goal**: Optimize normal mode for gameplay

#### 4.1 Interaction Optimization
- [ ] Disable drag in normal mode
- [ ] Optimize widget interactions
- [ ] Keyboard shortcuts for common actions
- [ ] Quick reset options per widget

#### 4.2 Visual Polish
- [ ] Hide edit controls in normal mode
- [ ] Smooth transitions
- [ ] Focus states for interactive elements

### Phase 5: Export/Import System (Week 5)
**Goal**: Implement data persistence

#### 5.1 Data Serialization
- [ ] Design export data schema
- [ ] Implement state to JSON conversion
- [ ] Handle nested widgets (Characters)
- [ ] Version the data format

#### 5.2 Export Functionality
- [ ] Export button/menu
- [ ] Export options:
  - Current state (with all values)
  - Clean state (reset to defaults)
- [ ] File download (JSON format)
- [ ] Filename with timestamp

#### 5.3 Import Functionality
- [ ] File upload/import button
- [ ] JSON validation
- [ ] Error handling for invalid files
- [ ] Version migration (if needed)
- [ ] Import confirmation dialog

### Phase 6: Testing & Polish (Week 6)
**Goal**: Comprehensive testing and refinement

#### 6.1 Testing
- [ ] Unit tests for core functions
- [ ] Integration tests for widgets
- [ ] E2E tests for critical flows
- [ ] Cross-browser testing
- [ ] Mobile responsiveness (if applicable)

#### 6.2 Performance Optimization
- [ ] Widget rendering optimization
- [ ] Drag performance improvements
- [ ] Memory leak checks
- [ ] Bundle size optimization

#### 6.3 Documentation
- [ ] User guide
- [ ] Developer documentation
- [ ] Example screens/templates
- [ ] Video tutorials (optional)

### Phase 7: Deployment (Week 6)
**Goal**: Deploy to GitHub Pages

#### 7.1 GitHub Pages Setup
- [ ] Configure GitHub Actions for auto-deploy
- [ ] Set up custom domain (if needed)
- [ ] Test deployment
- [ ] Add deployment badge to README

#### 7.2 Final Polish
- [ ] Error boundaries
- [ ] Loading states
- [ ] Empty state messages
- [ ] Accessibility improvements (ARIA labels, keyboard nav)

## Additional Features to Consider

### Enhanced Functionality
1. **Templates System**: Pre-built screen layouts
2. **Widget Library**: Save custom widgets for reuse
3. **Collaboration**: Share screens via URL (future)
4. **Print Mode**: Optimized layout for printing
5. **Keyboard Shortcuts**: Quick actions
6. **Widget Groups**: Select and move multiple widgets
7. **Fullscreen Mode**: Hide browser UI
9. **Widget Animations**: Visual feedback
10. **Search Function**: Find text across widgets

### Advanced Widget Ideas
1. **Dice Roller**: Roll dice with history
2. **Timer**: Countdown/count-up timer
3. **Random Generator**: Random name/item generator
4. **Initiative Tracker**: Combat order management
5. **Notes with Tags**: Categorized notes
6. **Weather Widget**: Track in-game weather
7. **Calendar**: In-game date tracking

## Color Palette Suggestions (Dark Mode)

### Primary Panel Colors
1. **Deep Blue**: `#1a2332` (background), `#2d3a4f` (panel)
2. **Charcoal**: `#1e1e1e` (background), `#2d2d2d` (panel)
3. **Dark Purple**: `#1a1625` (background), `#2a2340` (panel)
4. **Forest Green**: `#1a2419` (background), `#2a3a2a` (panel)
5. **Crimson Dark**: `#24191a` (background), `#3a2a2a` (panel)

### Accent Colors
- Primary: `#4a9eff` (blue)
- Success: `#4ade80` (green)
- Warning: `#fbbf24` (yellow)
- Danger: `#f87171` (red)
- Text: `#e5e7eb` (light gray)

## File Structure

```
dm-screen/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── widgets/
│   │   │   ├── TextWidget.tsx
│   │   │   ├── NotepadWidget.tsx
│   │   │   ├── ImageWidget.tsx
│   │   │   ├── CountdownWidget.tsx
│   │   │   ├── FractionWidget.tsx
│   │   │   ├── TogglesWidget.tsx
│   │   │   ├── TodosWidget.tsx
│   │   │   ├── PagesWidget.tsx
│   │   │   ├── CharacterWidget.tsx
│   │   │   └── BaseWidget.tsx
│   │   ├── WidgetToolbar.tsx
│   │   ├── StyleEditor.tsx
│   │   ├── ModeToggle.tsx
│   │   └── ZoomControls.tsx
│   ├── hooks/
│   │   ├── useDragAndDrop.ts
│   │   ├── useResize.ts
│   │   └── useGrid.ts
│   ├── store/
│   │   ├── screenStore.ts
│   │   └── widgetStore.ts
│   ├── utils/
│   │   ├── export.ts
│   │   ├── import.ts
│   │   ├── grid.ts
│   │   └── validation.ts
│   ├── types/
│   │   └── index.ts
│   ├── styles/
│   │   ├── theme.css
│   │   └── components.css
│   ├── App.tsx
│   └── main.tsx
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/
│   └── USER_GUIDE.md
├── .github/
│   └── workflows/
│       └── deploy.yml
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Success Criteria

1. ✅ All widget types functional
2. ✅ Smooth drag and resize
3. ✅ Export/import works correctly
4. ✅ Responsive and performant
5. ✅ Works on GitHub Pages
6. ✅ Dark mode implemented
7. ✅ No critical bugs
8. ✅ User-friendly interface

## Risk Mitigation

1. **Complexity**: Start with simplest widgets first
2. **Performance**: Use virtualization if many widgets
3. **Browser Compatibility**: Test early and often
4. **Data Loss**: Auto-save to localStorage
5. **State Management**: Keep state structure simple initially

## Timeline Estimate

- **Total Duration**: 6 weeks (part-time) or 2-3 weeks (full-time)
- **MVP**: 4 weeks (core widgets + export/import)
- **Polish**: 2 weeks (testing, optimization, docs)

