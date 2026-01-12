# CS2 Config Manager - Setup Instructions

## Prerequisites

### 1. Install Node.js

This project requires Node.js (version 18 or higher) to run.

#### Windows Installation:
1. Visit https://nodejs.org/
2. Download and install the LTS (Long Term Support) version
3. During installation, accept all defaults
4. Restart your computer

#### Verify Installation:
Open Command Prompt or PowerShell and run:
```bash
node --version
npm --version
```

You should see version numbers (e.g., v18.17.0, 9.6.7)

## Project Setup

### Step 1: Install Dependencies

Navigate to the project directory in Command Prompt or PowerShell:
```bash
cd C:\Users\Shrood\Desktop\cs2-config-manager
```

Then install dependencies:
```bash
npm install
```

This will install all required packages:
- React 18
- Vite (build tool)
- TypeScript
- Tailwind CSS
- Monaco Editor (code editor)
- Lucide React (icons)

### Step 2: Run Development Server

After installation is complete, run:
```bash
npm run dev
```

This will start the development server on `http://localhost:3000`

The browser should open automatically. If not, manually open:
```
http://localhost:3000
```

### Step 3: Build for Production

To create a production build:
```bash
npm run build
```

The optimized files will be in the `dist` folder.

To preview the production build:
```bash
npm run preview
```

## Project Structure

```
cs2-config-manager/
├── src/
│   ├── components/          # React components
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── types/             # TypeScript types
│   ├── App.tsx            # Main application
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── index.html            # HTML template
├── package.json          # Project config
├── vite.config.ts        # Vite config
├── tailwind.config.js    # Tailwind CSS config
├── tsconfig.json         # TypeScript config
└── README.md            # Documentation
```

## Features Overview

### 📊 Dashboard
- View all saved configs
- Create, duplicate, delete configs
- Search and filter
- Import/export configs
- Drag and drop file upload

### ⚙️ Config Editor
- **Video Tab**: Resolution, aspect ratio, graphics quality
- **Audio Tab**: Volume controls, audio settings
- **Gameplay Tab**: Sensitivity, key binds, mouse settings
- **Crosshair Tab**: Full crosshair customization with preview
- **ViewModel Tab**: FOV, offsets, preset positions
- **Network Tab**: Rate, cmdrate, interpolation, auto-optimize
- **HUD Tab**: HUD scaling, colors, transparency
- **Radar Tab**: Radar settings, presets
- **Raw Config**: Monaco editor with validation

### 👥 Pro Presets
- s1mple (Natus Vincere)
- ZywOo (Vitality)
- NiKo (G2 Esports)
- device (Astralis)
- ropz (FaZe Clan)

### 📦 Case Opening Simulator
- Interactive case opening
- Real CS2 drop rates
- Inventory system
- Value tracking

## Troubleshooting

### Problem: "node: command not found"
**Solution**: Install Node.js from https://nodejs.org/

### Problem: "Module not found"
**Solution**: Run `npm install` to install dependencies

### Problem: Port 3000 already in use
**Solution**: Vite will automatically use another port (3001, 3002, etc.)

### Problem: White screen on load
**Solution**: 
1. Check browser console for errors (F12)
2. Clear browser cache
3. Try a different browser

### Problem: Tailwind CSS not working
**Solution**: 
1. Run `npm run dev` again
2. Check that `tailwind.config.js` is present
3. Verify `index.css` imports Tailwind

## Development Tips

### Hot Reloading
The development server automatically reloads when you save changes.

### Console Logs
Open browser console (F12) to see:
- Error messages
- Warning messages
- Debug output

### Browser Compatibility
Works best on:
- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

## Data Storage

All configs are stored in your browser's localStorage:
- No server required
- Works offline (after first load)
- Data persists between sessions

To export all configs: Use "Export Backup" button on Dashboard
To restore configs: Use "Import Backup" button on Dashboard

## File Formats

### .cfg Files
Standard CS2 configuration files that can be:
- Copied to your CS2 cfg folder
- Pasted into CS2 console
- Shared with other players

### JSON Backup
Complete backup of all configs including:
- All config data
- Inventory from case simulator
- Can be imported to restore everything

## Next Steps

1. Install Node.js (if not already installed)
2. Navigate to project directory
3. Run `npm install`
4. Run `npm run dev`
5. Open browser to http://localhost:3000

Enjoy managing your CS2 configs!
