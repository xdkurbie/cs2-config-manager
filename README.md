# CS2 Config Manager

A comprehensive web-based configuration manager for Counter-Strike 2, featuring full customization of all game settings, pro player presets, and a fun case opening simulator.

## Features

### 🎮 Config Management
- **Dashboard**: View, create, duplicate, and delete your configs
- **Import/Export**: Save configs as .cfg files or backup everything as JSON
- **Search & Filter**: Quickly find your configs by name
- **Auto-save**: Changes are saved to browser's localStorage

### ⚙️ Settings Tabs

#### 🖥️ Video Settings
- Resolution, Aspect Ratio, Display Mode
- Graphics Quality (Low to Ultra)
- FPS limits, Brightness, Gamma
- Fullscreen & V-Sync toggles

#### 🔊 Audio Settings
- Master volume, Music volume, Game volume
- Voice chat settings
- Headphone pan exponent
- Sound mix ahead

#### 🎯 Gameplay Settings
- Sensitivity with DPI awareness
- Mouse acceleration settings
- Key binds manager
- Zoom sensitivity

#### 🎯 Crosshair Editor
- All 5 CS2 crosshair styles
- Full customization (size, thickness, gap, outline, colors)
- Real-time canvas preview
- Crosshair share codes (import/export)

#### 🖼️ ViewModel Settings
- FOV and offset controls
- Pitch, Yaw, Roll adjustments
- Recoil compensation
- Preset positions (Classic, Couch, Cyberpunk)

#### 🌐 Network Settings
- Rate, Cmdrate, Updaterate
- Interpolation settings
- Auto-optimize for 64/128 tick servers
- Lag compensation

#### 📊 HUD Settings
- HUD scaling and positioning
- Color themes
- Background transparency
- Target ID display

#### 📡 Radar Settings
- Scale, rotation, opacity
- Centering options
- Square mode with scoreboard
- Preset radar styles

#### 📝 Raw Config Editor
- Monaco-powered code editor
- Syntax highlighting
- Auto-format and validation
- Real-time sync with other tabs

### 👥 Pro Presets
- Pre-configured settings from top pro players:
  - s1mple (Natus Vincere)
  - ZywOo (Vitality)
  - NiKo (G2 Esports)
  - device (Astralis)
  - ropz (FaZe Clan)

### 📦 Case Opening Simulator
- Interactive case opening with animations
- Real CS2 drop rates
- Item rarity system (Blue → Gold)
- Inventory system with value tracking
- Multiple case types

## Getting Started

### Prerequisites

**Node.js 18+** is required to run this project.

#### Installing Node.js (Windows):
1. Visit https://nodejs.org/
2. Download and install the **LTS** (Long Term Support) version
3. During installation, accept all defaults
4. Restart your computer after installation

#### Verify Installation:
Open Command Prompt or PowerShell and run:
```bash
node --version  # Should show v18.x.x or higher
npm --version   # Should show 9.x.x or higher
```

### Installation

Since the project is already created on your Desktop at:
```
C:\Users\Shrood\Desktop\cs2-config-manager
```

1. Open Command Prompt or PowerShell

2. Navigate to the project directory:
```bash
cd C:\Users\Shrood\Desktop\cs2-config-manager
```

3. Install dependencies:
```bash
npm install
```

This will install all required packages:
- React 18.2
- Vite 5.0
- TypeScript 5.2
- Tailwind CSS 3.3
- Monaco Editor (VS Code's editor)
- Lucide React (icons)

4. Start the development server:
```bash
npm run dev
```

5. Open your browser to `http://localhost:3000`

The browser should open automatically. If not, manually navigate to the URL above.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor (@monaco-editor/react)
- **Icons**: Lucide React
- **Storage**: localStorage (client-side only)

## File Structure

```
src/
├── components/           # React components
│   ├── Dashboard.tsx
│   ├── ConfigEditor.tsx
│   ├── VideoSettings.tsx
│   ├── AudioSettings.tsx
│   ├── GameplaySettings.tsx
│   ├── CrosshairEditor.tsx
│   ├── ViewModelSettings.tsx
│   ├── NetworkSettings.tsx
│   ├── HUDSettings.tsx
│   ├── RadarSettings.tsx
│   ├── RawConfigEditor.tsx
│   └── CaseOpeningSimulator.tsx
├── hooks/              # Custom React hooks
│   ├── useConfigStorage.ts
│   ├── useCrosshairRenderer.ts
│   └── useFileHandlers.ts
├── lib/                # Utility functions
│   ├── configParser.ts
│   ├── configExporter.ts
│   ├── configValidator.ts
│   ├── crosshairRenderer.ts
│   ├── crosshairShareCode.ts
│   ├── cs2Settings.ts
│   ├── proPresets.ts
│   ├── caseData.ts
│   ├── cs2Commands.ts
│   └── utils.ts
├── types/              # TypeScript types
│   └── config.ts
├── App.tsx
└── main.tsx
```

## Features in Detail

### Crosshair System
- Renders crosshair accurately to CS2
- Supports all crosshair styles and T-styles
- Custom RGB colors with presets
- Alpha transparency
- Outline and dot options
- Import/export via base64 share codes

### Config Parsing
- Parses CS2 .cfg files into structured data
- Validates commands and syntax
- Auto-formats config files
- Generates valid .cfg files from UI settings

### Storage
- Uses localStorage for persistence
- Configs stored as JSON
- Auto-backup on every change
- Export/import for backup sharing

## Privacy

This application runs entirely in your browser:
- No cloud storage
- No data collection
- No internet connection required (after initial build)
- Configs stay on your device

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- CS2 and Counter-Strike are trademarks of Valve Corporation
- Pro player configs are publicly available configurations
- Case drop rates based on CS2 loot tables

## Support

For issues or questions, please open an issue on the GitHub repository.
