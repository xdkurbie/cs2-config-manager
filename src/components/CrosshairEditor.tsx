import { CrosshairSettings, CROSSHAIR_STYLES } from '../types/config';
import { useCrosshairRenderer } from '../hooks/useCrosshairRenderer';
import { useFileHandlers } from '../hooks/useFileHandlers';
import { generateCrosshairCode, parseCrosshairCode } from '../lib/crosshairRenderer';
import { useState } from 'react';

const COLORS = [
  { name: 'Green', r: 50, g: 250, b: 50 },
  { name: 'Yellow', r: 250, g: 250, b: 50 },
  { name: 'Red', r: 50, g: 50, b: 250 },
  { name: 'Blue', r: 50, g: 50, b: 250 },
  { name: 'Cyan', r: 50, g: 250, b: 250 },
  { name: 'Pink', r: 250, g: 50, b: 250 },
  { name: 'White', r: 250, g: 250, b: 250 },
  { name: 'Custom', r: 0, g: 0, b: 0 },
];

interface CrosshairEditorProps {
  settings: CrosshairSettings;
  onUpdate: (settings: CrosshairSettings) => void;
}

export function CrosshairEditor({ settings, onUpdate }: CrosshairEditorProps) {
  const { canvasRef, containerRef } = useCrosshairRenderer(settings);
  const { copyToClipboard } = useFileHandlers();
  const [useCustomColor, setUseCustomColor] = useState(false);

  const handleChange = (field: keyof CrosshairSettings, value: any) => {
    onUpdate({ ...settings, [field]: value });
  };

  const handleColorPreset = (r: number, g: number, b: number) => {
    setUseCustomColor(false);
    handleChange('colorR', r);
    handleChange('colorG', g);
    handleChange('colorB', b);
  };

  const handleCustomColor = (field: 'colorR' | 'colorG' | 'colorB', value: number) => {
    setUseCustomColor(true);
    handleChange(field, value);
  };

  const handleExportCode = async () => {
    const code = generateCrosshairCode(settings);
    const success = await copyToClipboard(code);
    if (success) {
      alert('Crosshair code copied to clipboard!');
    }
  };

  const handleImportCode = async () => {
    const code = prompt('Paste crosshair code:');
    if (code) {
      const parsed = parseCrosshairCode(code);
      if (parsed.colorR !== undefined) {
        onUpdate({ ...settings, ...parsed });
        alert('Crosshair imported successfully!');
      } else {
        alert('Invalid crosshair code');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Crosshair Settings</h3>
        <div className="flex space-x-2">
          <button onClick={handleExportCode} className="button button-secondary">
            Export Code
          </button>
          <button onClick={handleImportCode} className="button button-secondary">
            Import Code
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h4 className="text-lg font-medium text-white mb-4">Preview</h4>
          <div
            ref={containerRef}
            className="relative w-full aspect-video bg-[#1b1b1b] rounded-lg overflow-hidden"
          >
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            <div className="absolute bottom-4 right-4 text-xs text-gray-500 bg-black/50 px-2 py-1 rounded">
              In-game preview
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Crosshair Style</label>
            <div className="grid grid-cols-3 gap-2">
              {CROSSHAIR_STYLES.map((style) => (
                <button
                  key={style.id}
                  onClick={() => handleChange('style', style.id)}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    settings.style === style.id
                      ? 'bg-[#de9b35] text-black font-medium'
                      : 'bg-[#0f0f0f] text-gray-400 hover:text-white'
                  }`}
                >
                  {style.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">T-Style</label>
            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3, 4].map((tStyle) => (
                <button
                  key={tStyle}
                  onClick={() => handleChange('tStyle', tStyle)}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    settings.tStyle === tStyle
                      ? 'bg-[#de9b35] text-black font-medium'
                      : 'bg-[#0f0f0f] text-gray-400 hover:text-white'
                  }`}
                >
                  T{tStyle}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Size: {settings.size}</label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.1"
              value={settings.size}
              onChange={(e) => handleChange('size', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Thickness: {settings.thickness}</label>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={settings.thickness}
              onChange={(e) => handleChange('thickness', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Gap: {settings.gap}</label>
            <input
              type="range"
              min="-10"
              max="10"
              step="0.1"
              value={settings.gap}
              onChange={(e) => handleChange('gap', parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="card">
        <h4 className="text-lg font-medium text-white mb-4">Colors</h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Color Presets</label>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleColorPreset(color.r, color.g, color.b)}
                  className={`w-10 h-10 rounded-lg transition-transform hover:scale-110 ${
                    !useCustomColor &&
                    settings.colorR === color.r &&
                    settings.colorG === color.g &&
                    settings.colorB === color.b
                      ? 'ring-2 ring-[#de9b35] ring-offset-2 ring-offset-[#1b1b1b]'
                      : ''
                  }`}
                  style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Custom Color (RGB)</label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Red</label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={settings.colorR}
                  onChange={(e) => handleCustomColor('colorR', parseInt(e.target.value))}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Green</label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={settings.colorG}
                  onChange={(e) => handleCustomColor('colorG', parseInt(e.target.value))}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Blue</label>
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={settings.colorB}
                  onChange={(e) => handleCustomColor('colorB', parseInt(e.target.value))}
                  className="input"
                />
              </div>
            </div>
            <div className="mt-2 w-full h-8 rounded" style={{ backgroundColor: `rgb(${settings.colorR}, ${settings.colorG}, ${settings.colorB})` }} />
          </div>
        </div>
      </div>

      <div className="card">
        <h4 className="text-lg font-medium text-white mb-4">Advanced Settings</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Outline: {settings.outline > 0 ? 'On' : 'Off'}</label>
            <select
              value={settings.outline}
              onChange={(e) => handleChange('outline', parseInt(e.target.value))}
              className="input"
            >
              <option value="0">Off</option>
              <option value="1">On</option>
            </select>
          </div>

          {settings.outline > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Outline Thickness: {settings.outlineThickness}</label>
              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={settings.outlineThickness}
                onChange={(e) => handleChange('outlineThickness', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Alpha: {settings.alpha}</label>
            <input
              type="range"
              min="0"
              max="255"
              step="1"
              value={settings.alpha}
              onChange={(e) => handleChange('alpha', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Dot: {settings.dot > 0 ? 'On' : 'Off'}</label>
            <select
              value={settings.dot}
              onChange={(e) => handleChange('dot', parseInt(e.target.value))}
              className="input"
            >
              <option value="0">Off</option>
              <option value="1">On</option>
            </select>
          </div>

          {settings.dot > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Dot Size: {settings.dotSize}</label>
              <input
                type="range"
                min="0"
                max="3"
                step="0.1"
                value={settings.dotSize}
                onChange={(e) => handleChange('dotSize', parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          )}

          <div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.useAlpha}
                onChange={(e) => handleChange('useAlpha', e.target.checked)}
                className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-[#de9b35] focus:ring-2"
              />
              <span className="text-white">Use Alpha</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.gapUseweaponvalue}
                onChange={(e) => handleChange('gapUseweaponvalue', e.target.checked)}
                className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-[#de9b35] focus:ring-2"
              />
              <span className="text-white">Use Weapon Gap Value</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
