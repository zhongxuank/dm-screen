# DM Screen - Test Cases

## Test Categories

### 1. Core Functionality Tests

#### 1.1 Mode Switching
- **TC-001**: Switch from Normal to Edit mode
  - **Steps**: Click mode toggle
  - **Expected**: Edit controls appear, widgets become draggable
  - **Priority**: High

- **TC-002**: Switch from Edit to Normal mode
  - **Steps**: Click mode toggle
  - **Expected**: Edit controls hidden, widgets locked in place
  - **Priority**: High

- **TC-003**: Mode state persists after page reload
  - **Steps**: Switch mode, reload page
  - **Expected**: Last mode is restored
  - **Priority**: Medium

#### 1.2 Grid System
- **TC-004**: Grid displays correctly (default: 30 columns)
  - **Steps**: Load page in Edit mode
  - **Expected**: Grid overlay shows 30 columns
  - **Priority**: High

- **TC-005**: Widgets snap to grid
  - **Steps**: Drag widget in Edit mode
  - **Expected**: Widget aligns to grid lines
  - **Priority**: High

- **TC-006**: Widgets resize to grid units
  - **Steps**: Resize widget by dragging corner
  - **Expected**: Size increments match grid units
  - **Priority**: High

- **TC-006a**: Increase grid size
  - **Steps**: Edit mode → Increase grid size (e.g., 30 to 40)
  - **Expected**: Grid becomes finer (more columns), widgets stay anchored to top-left
  - **Priority**: High

- **TC-006b**: Decrease grid size
  - **Steps**: Edit mode → Decrease grid size (e.g., 30 to 20)
  - **Expected**: Grid becomes coarser (fewer columns), widgets stay anchored to top-left
  - **Priority**: High

- **TC-006c**: Grid size change preserves widget positions (top-left anchor)
  - **Steps**: 
    1. Create widget at position (5, 5)
    2. Change grid size from 30 to 50
    3. Verify widget position
  - **Expected**: Widget remains at grid position (5, 5), visually appears in same relative location
  - **Priority**: High

- **TC-006d**: Grid size limits enforced
  - **Steps**: Try to set grid size below minimum or above maximum
  - **Expected**: Grid size clamped to valid range (e.g., 10-100)
  - **Priority**: Medium

- **TC-006e**: Coordinate system uses top-left anchor (0,0)
  - **Steps**: Create widget → Check position coordinates
  - **Expected**: Top-left corner of screen is (0, 0), coordinates increase right/down
  - **Priority**: High

- **TC-006f**: Infinite scrolling canvas
  - **Steps**: Scroll/pan canvas in any direction
  - **Expected**: Canvas scrolls smoothly, no boundaries
  - **Priority**: High

- **TC-006g**: Canvas expands based on widget positions
  - **Steps**: Place widgets far from origin → Scroll to find them
  - **Expected**: Canvas size adjusts to accommodate all widgets
  - **Priority**: Medium

- **TC-006h**: Pan canvas with mouse drag
  - **Steps**: Alt+Click and drag (or middle mouse button)
  - **Expected**: Canvas pans smoothly
  - **Priority**: Medium

- **TC-006i**: Scroll canvas with mouse wheel
  - **Steps**: Scroll mouse wheel over canvas
  - **Expected**: Canvas scrolls vertically (or horizontally with Shift)
  - **Priority**: Medium

- **TC-006j**: Viewport position persists
  - **Steps**: Scroll canvas → Switch modes → Return
  - **Expected**: Viewport position maintained
  - **Priority**: Low

### 2. Widget Creation & Management

#### 2.1 Widget Creation
- **TC-007**: Create Text widget
  - **Steps**: Edit mode → Add widget → Select Text
  - **Expected**: Text widget appears, can be edited
  - **Priority**: High

- **TC-008**: Create all widget types
  - **Steps**: Create each widget type from list
  - **Expected**: All widgets render correctly
  - **Priority**: High

- **TC-009**: Widget appears at default position
  - **Steps**: Create new widget
  - **Expected**: Widget appears in visible area, not overlapping
  - **Priority**: Medium

#### 2.2 Widget Deletion
- **TC-010**: Delete widget in Edit mode
  - **Steps**: Select widget → Click delete button
  - **Expected**: Widget removed, state updated
  - **Priority**: High

- **TC-011**: Delete Character widget with nested widgets
  - **Steps**: Create Character → Add widgets inside → Delete Character
  - **Expected**: Character and all nested widgets deleted
  - **Priority**: High

#### 2.3 Widget Cloning
- **TC-012**: Clone simple widget
  - **Steps**: Select widget → Click clone → Position new widget
  - **Expected**: Identical widget created with new ID
  - **Priority**: Medium

- **TC-013**: Clone Character widget with nested widgets
  - **Steps**: Clone Character container
  - **Expected**: All nested widgets cloned with new IDs
  - **Priority**: Medium

- **TC-014**: Clone preserves widget state
  - **Steps**: Set widget values → Clone
  - **Expected**: Clone has same values
  - **Priority**: Low

### 3. Drag & Drop

#### 3.1 Basic Dragging
- **TC-015**: Drag widget in Edit mode
  - **Steps**: Click drag handle → Move mouse → Release
  - **Expected**: Widget moves to new position, snaps to grid
  - **Priority**: High

- **TC-016**: Drag widget in Normal mode
  - **Steps**: Try to drag widget in Normal mode
  - **Expected**: Widget does not move
  - **Priority**: High

- **TC-017**: Drag widget beyond viewport
  - **Steps**: Drag widget to edge of viewport and continue
  - **Expected**: Canvas auto-scrolls or widget can be placed anywhere (infinite canvas)
  - **Priority**: Medium

#### 3.2 Resize Functionality
- **TC-018**: Resize widget by dragging corner
  - **Steps**: Click resize handle → Drag → Release
  - **Expected**: Widget resizes, maintains aspect ratio (if applicable)
  - **Priority**: High

- **TC-019**: Resize snaps to grid
  - **Steps**: Resize widget
  - **Expected**: Size changes in grid unit increments
  - **Priority**: High

- **TC-020**: Minimum widget size enforced
  - **Steps**: Try to resize widget very small
  - **Expected**: Widget stops at minimum size (e.g., 2x2 grid units)
  - **Priority**: Medium

- **TC-021**: Resize disabled in Normal mode
  - **Steps**: Try to resize in Normal mode
  - **Expected**: Resize handles not visible/functional
  - **Priority**: High

### 4. Widget-Specific Tests

#### 4.1 Text Widget
- **TC-022**: Edit text content in Edit mode
  - **Steps**: Select Text widget → Edit markdown
  - **Expected**: Markdown renders correctly
  - **Priority**: High

- **TC-023**: Text wraps within widget bounds
  - **Steps**: Add long text → Resize widget smaller
  - **Expected**: Text wraps, no overflow
  - **Priority**: High

- **TC-024**: Markdown formatting works
  - **Steps**: Add markdown (bold, italic, lists)
  - **Expected**: Formatting renders correctly
  - **Priority**: Medium

- **TC-025**: Text read-only in Normal mode
  - **Steps**: Switch to Normal mode → Try to edit
  - **Expected**: Text is display-only
  - **Priority**: High

#### 4.2 Notepad Widget
- **TC-026**: Edit notepad in Normal mode
  - **Steps**: Normal mode → Click notepad → Type
  - **Expected**: Text appears, saves to state
  - **Priority**: High

- **TC-027**: Notepad auto-saves
  - **Steps**: Type in notepad → Switch mode → Return
  - **Expected**: Text persists
  - **Priority**: High

- **TC-028**: Notepad has no markdown
  - **Steps**: Type markdown syntax
  - **Expected**: Renders as plain text
  - **Priority**: Medium

#### 4.3 Countdown Widget
- **TC-029**: Increment countdown value
  - **Steps**: Click + button
  - **Expected**: Number increases
  - **Priority**: High

- **TC-030**: Decrement countdown value
  - **Steps**: Click - button
  - **Expected**: Number decreases (no negative if min=0)
  - **Priority**: High

- **TC-031**: Edit countdown by typing
  - **Steps**: Click number → Type new value
  - **Expected**: Value updates
  - **Priority**: High

- **TC-032**: Edit countdown by scrolling
  - **Steps**: Hover number → Scroll mouse wheel
  - **Expected**: Value increments/decrements
  - **Priority**: Medium

- **TC-033**: Title displays correctly
  - **Steps**: Set title in Edit mode → View in Normal mode
  - **Expected**: Title appears above number
  - **Priority**: Medium

#### 4.4 Fraction Widget
- **TC-034**: Edit current value
  - **Steps**: Use +/- or type
  - **Expected**: Current value updates
  - **Priority**: High

- **TC-035**: Edit max value (Edit mode only)
  - **Steps**: Edit mode → Change max value
  - **Expected**: Max updates, current adjusts if needed
  - **Priority**: High

- **TC-036**: Current cannot exceed max
  - **Steps**: Try to set current > max
  - **Expected**: Current capped at max
  - **Priority**: High

- **TC-037**: Visual representation (e.g., "45/60")
  - **Steps**: Set values
  - **Expected**: Displays as "current/max"
  - **Priority**: Medium

#### 4.5 Toggles Widget
- **TC-038**: Toggle individual items
  - **Steps**: Click toggle circle/box
  - **Expected**: Toggles on/off
  - **Priority**: High

- **TC-039**: Configure toggle count (Edit mode)
  - **Steps**: Edit mode → Set number of toggles
  - **Expected**: Correct number of toggles appear
  - **Priority**: High

- **TC-040**: Toggle state persists
  - **Steps**: Toggle items → Switch mode → Return
  - **Expected**: Toggle states preserved
  - **Priority**: High

#### 4.6 To-Dos Widget
- **TC-041**: Add todo item (Edit mode)
  - **Steps**: Edit mode → Add item → Enter text
  - **Expected**: Item added to list
  - **Priority**: High

- **TC-042**: Remove todo item (Edit mode)
  - **Steps**: Edit mode → Click delete on item
  - **Expected**: Item removed
  - **Priority**: High

- **TC-043**: Toggle completion (Normal mode)
  - **Steps**: Normal mode → Click checkbox
  - **Expected**: Item marked complete/incomplete
  - **Priority**: High

- **TC-044**: Visual distinction for completed items
  - **Steps**: Mark item complete
  - **Expected**: Strikethrough or different style
  - **Priority**: Medium

#### 4.7 Pages Widget
- **TC-045**: Add new page (Edit mode)
  - **Steps**: Edit mode → Add page button
  - **Expected**: New page created, can add content
  - **Priority**: High

- **TC-046**: Navigate between pages (Normal mode)
  - **Steps**: Normal mode → Click next/prev
  - **Expected**: Content changes, page indicator updates
  - **Priority**: High

- **TC-047**: Delete page (Edit mode)
  - **Steps**: Edit mode → Delete current page
  - **Expected**: Page removed, navigate to adjacent page
  - **Priority**: Medium

- **TC-048**: Cannot delete last page
  - **Steps**: Only one page → Try to delete
  - **Expected**: Delete disabled or prevented
  - **Priority**: Medium

#### 4.8 Image Widget
- **TC-049**: Load image from URL (Edit mode)
  - **Steps**: Edit mode → Enter image URL
  - **Expected**: Image loads and displays
  - **Priority**: High

- **TC-050**: Handle invalid image URL
  - **Steps**: Enter invalid URL
  - **Expected**: Error message or placeholder shown
  - **Priority**: High

- **TC-051**: Scale image to fit widget
  - **Steps**: Resize widget
  - **Expected**: Image scales appropriately
  - **Priority**: Medium

- **TC-052**: Crop/position image (if implemented)
  - **Steps**: Adjust crop controls
  - **Expected**: Image position updates
  - **Priority**: Low

#### 4.9 Character Widget
- **TC-053**: Create Character widget
  - **Steps**: Add Character widget
  - **Expected**: Container with name/icon area appears
  - **Priority**: High

- **TC-054**: Set Character name and icon
  - **Steps**: Edit mode → Set name → Select color/number
  - **Expected**: Name and icon display correctly
  - **Priority**: High

- **TC-055**: Add widgets inside Character
  - **Steps**: Edit mode → Add widget → Drop inside Character
  - **Expected**: Widget nested, moves with Character
  - **Priority**: High

- **TC-056**: Move Character as unit
  - **Steps**: Drag Character container
  - **Expected**: All nested widgets move together
  - **Priority**: High

- **TC-057**: Collapse/expand Character
  - **Steps**: Click collapse button
  - **Expected**: Nested widgets hidden/shown
  - **Priority**: Medium

- **TC-058**: Clone Character with nested widgets
  - **Steps**: Clone Character container
  - **Expected**: All nested widgets cloned
  - **Priority**: Medium

### 5. Styling & Customization

#### 5.1 Widget Styling
- **TC-059**: Change widget background color
  - **Steps**: Edit mode → Select widget → Style editor → Change color
  - **Expected**: Background updates, preview shows change
  - **Priority**: High

- **TC-060**: Change text color
  - **Steps**: Edit mode → Style editor → Text color
  - **Expected**: Text color updates
  - **Priority**: High

- **TC-061**: Change border color and width
  - **Steps**: Edit mode → Style editor → Border options
  - **Expected**: Border updates
  - **Priority**: Medium

- **TC-062**: Change border radius
  - **Steps**: Edit mode → Style editor → Border radius
  - **Expected**: Corners round appropriately
  - **Priority**: Low

- **TC-063**: Style changes persist
  - **Steps**: Change style → Switch mode → Return
  - **Expected**: Styles preserved
  - **Priority**: High

### 6. Zoom Functionality

#### 6.1 Zoom Controls
- **TC-064**: Zoom in
  - **Steps**: Click zoom in button or use scroll
  - **Expected**: Screen zooms, widgets scale proportionally
  - **Priority**: Medium

- **TC-065**: Zoom out
  - **Steps**: Click zoom out button
  - **Expected**: Screen zooms out
  - **Priority**: Medium

- **TC-066**: Reset zoom
  - **Steps**: Click reset zoom button
  - **Expected**: Returns to 100% (1.0)
  - **Priority**: Medium

- **TC-067**: Zoom limits enforced
  - **Steps**: Zoom in/out to extremes
  - **Expected**: Stops at min/max (e.g., 0.5x to 2x)
  - **Priority**: Low

### 7. Export/Import

#### 7.1 Export Functionality
- **TC-068**: Export screen (current state)
  - **Steps**: Click export → Select "Current State" → Download
  - **Expected**: JSON file downloads with all widget states
  - **Priority**: High

- **TC-069**: Export screen (clean state)
  - **Steps**: Click export → Select "Clean State" → Download
  - **Expected**: JSON file downloads with default values
  - **Priority**: High

- **TC-070**: Export includes all widget types
  - **Steps**: Create all widget types → Export
  - **Expected**: All widgets in export file
  - **Priority**: High

- **TC-071**: Export includes nested widgets
  - **Steps**: Create Character with nested widgets → Export
  - **Expected**: Character and nested widgets in export
  - **Priority**: High

- **TC-072**: Export includes styling
  - **Steps**: Style widgets → Export
  - **Expected**: Style data in export file
  - **Priority**: High

- **TC-073**: Export filename includes timestamp
  - **Steps**: Export screen
  - **Expected**: Filename like "dm-screen-2024-01-15-143022.json"
  - **Priority**: Low

#### 7.2 Import Functionality
- **TC-074**: Import valid screen file
  - **Steps**: Click import → Select valid JSON → Confirm
  - **Expected**: Screen recreates with all widgets
  - **Priority**: High

- **TC-075**: Import replaces current screen
  - **Steps**: Create widgets → Import new file
  - **Expected**: Old widgets removed, new ones loaded
  - **Priority**: High

- **TC-076**: Import preserves widget states (current state export)
  - **Steps**: Set widget values → Export current → Clear → Import
  - **Expected**: All values restored
  - **Priority**: High

- **TC-077**: Import resets to defaults (clean state export)
  - **Steps**: Set values → Export clean → Import
  - **Expected**: Widgets have default values
  - **Priority**: High

- **TC-078**: Handle invalid import file
  - **Steps**: Import corrupted/invalid JSON
  - **Expected**: Error message, screen unchanged
  - **Priority**: High

- **TC-079**: Handle import with missing fields
  - **Steps**: Import JSON with incomplete data
  - **Expected**: Graceful handling, defaults used
  - **Priority**: Medium

- **TC-080**: Import with version mismatch
  - **Steps**: Import older format version
  - **Expected**: Migration or error message
  - **Priority**: Medium

### 8. Edge Cases & Error Handling

#### 8.1 Widget Overlap
- **TC-081**: Widgets can overlap
  - **Steps**: Drag widget over another
  - **Expected**: Widgets stack, z-index determines visibility
  - **Priority**: Medium

- **TC-082**: Bring widget to front
  - **Steps**: Click widget → Bring to front option
  - **Expected**: Widget moves to top layer
  - **Priority**: Low

#### 8.2 Performance
- **TC-083**: Handle many widgets (50+)
  - **Steps**: Create 50+ widgets → Interact
  - **Expected**: Smooth performance, no lag
  - **Priority**: Medium

- **TC-084**: Handle large text content
  - **Steps**: Add very long text to Text widget
  - **Expected**: Renders correctly, no performance issues
  - **Priority**: Medium

#### 8.3 Browser Compatibility
- **TC-085**: Works in Chrome
  - **Steps**: Test all features in Chrome
  - **Expected**: All features work
  - **Priority**: High

- **TC-086**: Works in Firefox
  - **Steps**: Test all features in Firefox
  - **Expected**: All features work
  - **Priority**: High

- **TC-087**: Works in Safari
  - **Steps**: Test all features in Safari
  - **Expected**: All features work
  - **Priority**: Medium

- **TC-088**: Works in Edge
  - **Steps**: Test all features in Edge
  - **Expected**: All features work
  - **Priority**: Medium

#### 8.4 Data Persistence
- **TC-089**: Auto-save to localStorage
  - **Steps**: Make changes → Check localStorage
  - **Expected**: State saved automatically
  - **Priority**: Medium

- **TC-090**: Restore from localStorage on load
  - **Steps**: Create screen → Reload page
  - **Expected**: Screen restored from localStorage
  - **Priority**: Medium

- **TC-091**: Handle localStorage quota exceeded
  - **Steps**: Create very large screen → Try to save
  - **Expected**: Error message, export suggested
  - **Priority**: Low

### 9. User Experience

#### 9.1 Visual Feedback
- **TC-092**: Widget selection highlight
  - **Steps**: Click widget in Edit mode
  - **Expected**: Widget highlighted/bordered
  - **Priority**: Medium

- **TC-093**: Drag preview
  - **Steps**: Start dragging widget
  - **Expected**: Visual feedback during drag
  - **Priority**: Medium

- **TC-094**: Resize cursor
  - **Steps**: Hover resize handle
  - **Expected**: Cursor changes to resize indicator
  - **Priority**: Low

#### 9.2 Accessibility
- **TC-095**: Keyboard navigation
  - **Steps**: Use Tab to navigate → Enter to select
  - **Expected**: Can navigate without mouse
  - **Priority**: Low

- **TC-096**: Screen reader support
  - **Steps**: Use screen reader
  - **Expected**: Widgets announced correctly
  - **Priority**: Low

- **TC-097**: ARIA labels present
  - **Steps**: Inspect elements
  - **Expected**: ARIA labels on interactive elements
  - **Priority**: Low

### 10. Integration Tests

#### 10.1 Complete Workflows
- **TC-098**: Create complete DM screen workflow
  - **Steps**: 
    1. Create multiple widgets
    2. Arrange layout
    3. Style widgets
    4. Set initial values
    5. Export
    6. Clear screen
    7. Import
  - **Expected**: Screen restored exactly
  - **Priority**: High

- **TC-099**: Character management workflow
  - **Steps**:
    1. Create Character
    2. Add nested widgets
    3. Set values
    4. Clone Character
    5. Modify clone
    6. Export
    7. Import
  - **Expected**: Both Characters restored correctly
  - **Priority**: High

- **TC-100**: Mode switching workflow
  - **Steps**:
    1. Edit mode: Create and arrange widgets
    2. Normal mode: Use widgets
    3. Edit mode: Make changes
    4. Normal mode: Continue using
  - **Expected**: Smooth transitions, state preserved
  - **Priority**: High

## Test Execution Strategy

### Priority Levels
- **High**: Critical functionality, must pass for MVP
- **Medium**: Important features, should pass before release
- **Low**: Nice-to-have, can be addressed post-MVP

### Testing Phases
1. **Unit Tests**: Test individual functions/components
2. **Integration Tests**: Test widget interactions
3. **E2E Tests**: Test complete user workflows
4. **Manual Testing**: Visual/UX validation

### Test Automation
- Use Jest/Vitest for unit tests
- Use Playwright/Cypress for E2E tests
- Run tests in CI/CD pipeline

## Bug Reporting Template

```
**Widget Type**: [Text/Countdown/etc]
**Mode**: [Normal/Edit]
**Steps to Reproduce**:
1. 
2. 
3.

**Expected Behavior**:
**Actual Behavior**:
**Screenshot**: [if applicable]
**Browser**: [Chrome/Firefox/etc]
**Priority**: [High/Medium/Low]
```

