# DM Screen - Digital Dungeon Master Screen

A customizable, web-based Dungeon Master screen for tabletop RPGs. Build your perfect DM screen with drag-and-drop widgets, export/import functionality, and a clean dark mode interface.

![DM Screen](https://img.shields.io/badge/Status-In%20Development-yellow)
![License](https://img.shields.io/badge/License-MIT-blue)

## Features

### 🎯 Core Functionality
- **Dual Modes**: Switch between Edit mode (customize) and Normal mode (play)
- **Adjustable Grid System**: Customize grid size (default: 30 columns) to fit your needs
- **Infinite Canvas**: Scroll endlessly in any direction - no boundaries
- **Top-Left Anchor**: Coordinate system anchored to top-left (0,0) - widgets stay positioned when grid size changes
- **Drag & Drop**: Intuitive window-style dragging with resize handles
- **Export/Import**: Save and load your custom screens as JSON files
- **Dark Mode**: Beautiful dark theme optimized for low-light gaming sessions

### 📦 Widget Types

1. **Text** - Markdown-formatted text display
2. **Pages** - Multi-page markdown content with navigation
3. **To-Dos** - Interactive checklist for tracking tasks
4. **Countdown** - Number tracker with +/- controls and title
5. **Fractions** - Current/Max tracker (perfect for HP, MP, etc.)
6. **Toggles** - Visual checkbox grid for quick status tracking
7. **Characters** - Container widget for organizing NPC/PC information
8. **Image** - Display images from public URLs with scaling
9. **Notepad** - Plain text editor for quick notes during play

### 🎨 Customization
- **Adjustable Grid Size**: Increase or decrease grid columns (10-100 range)
- **Infinite Scrolling**: Pan and scroll the canvas endlessly in any direction
- Customizable widget colors (background, text, borders)
- Adjustable border radius and width
- Clone widgets for quick duplication
- Zoom controls for better visibility
- Responsive grid snapping with top-left anchor preservation

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js 18+ (for development)
- Git (for cloning)

### Installation

```bash
# Clone the repository
git clone git@github.com:zhongxuank/dm-screen.git
cd dm-screen

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Deployment to GitHub Pages

The project is configured for GitHub Pages deployment. After pushing to the `main` branch, GitHub Actions will automatically build and deploy the site.

Access the live site at: `https://zhongxuank.github.io/dm-screen/`

## Usage

### Creating Your Screen

1. **Enter Edit Mode**: Click the mode toggle to switch to Edit mode
2. **Add Widgets**: Click the "+" button or widget toolbar to add widgets
3. **Arrange Layout**: Drag widgets to position, resize by dragging corners
4. **Customize**: Select widgets to change colors, styles, and content
5. **Save**: Export your screen as JSON for later use

### Using Your Screen

1. **Switch to Normal Mode**: Click the mode toggle
2. **Interact**: Use widgets to track HP, notes, to-dos, etc.
3. **Quick Reset**: Export in "Clean State" to reset all values

### Export/Import

- **Export Current State**: Saves all widget values as they are
- **Export Clean State**: Saves layout but resets all values to defaults
- **Import**: Load a previously exported screen file

## Project Structure

```
dm-screen/
├── src/              # Source code
│   ├── components/   # React components
│   ├── hooks/       # Custom React hooks
│   ├── store/       # State management
│   ├── utils/       # Utility functions
│   └── types/       # TypeScript types
├── public/          # Static assets
├── tests/           # Test files
└── docs/            # Documentation
```

## Development

See [PLAN.md](./PLAN.md) for detailed development plan and [TEST_CASES.md](./TEST_CASES.md) for test specifications.

### Development Phases

1. ✅ **Foundation** - Project setup, basic UI, grid system
2. 🔄 **Widget Implementation** - Build all widget types
3. ⏳ **Edit Mode** - Complete customization features
4. ⏳ **Normal Mode** - Optimize for gameplay
5. ⏳ **Export/Import** - Data persistence
6. ⏳ **Testing & Polish** - Comprehensive testing
7. ⏳ **Deployment** - GitHub Pages setup

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Roadmap

### MVP Features (Current Focus)
- [x] Project setup and planning
- [ ] Core widget system
- [ ] All widget types
- [ ] Export/Import functionality
- [ ] GitHub Pages deployment

### Future Enhancements
- [ ] Widget templates library
- [ ] Collaboration features
- [ ] Print mode
- [ ] Additional widget types (Dice Roller, Timer, etc.)
- [ ] Mobile app version
- [ ] Cloud sync

## Color Palette

### Dark Mode Theme
- **Background**: Deep charcoal (`#1e1e1e`)
- **Panels**: Dark gray (`#2d2d2d`)
- **Accent**: Blue (`#4a9eff`)
- **Text**: Light gray (`#e5e7eb`)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built for tabletop RPG enthusiasts
- Inspired by traditional physical DM screens
- Designed with usability and customization in mind

## Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Happy Gaming! 🎲**

