import { VideoSettings as VideoSettingsType } from '../types/config';
import { RESOLUTIONS, ASPECT_RATIOS, GRAPHICS_QUALITIES, DISPLAY_MODES } from '../lib/cs2Settings';

interface VideoSettingsProps {
  settings: VideoSettingsType;
  onUpdate: (settings: VideoSettingsType) => void;
}

export function VideoSettings({ settings, onUpdate }: VideoSettingsProps) {
  const handleChange = (field: keyof VideoSettingsType, value: any) => {
    onUpdate({ ...settings, [field]: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">Video Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Resolution</label>
          <select
            value={settings.resolution}
            onChange={(e) => handleChange('resolution', e.target.value)}
            className="input"
          >
            {RESOLUTIONS.map((res) => (
              <option key={res} value={res}>
                {res}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Aspect Ratio</label>
          <select
            value={settings.aspectRatio}
            onChange={(e) => handleChange('aspectRatio', e.target.value)}
            className="input"
          >
            {ASPECT_RATIOS.map((ratio) => (
              <option key={ratio} value={ratio}>
                {ratio}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Display Mode</label>
          <select
            value={settings.displayMode}
            onChange={(e) => handleChange('displayMode', e.target.value)}
            className="input"
          >
            {DISPLAY_MODES.map((mode) => (
              <option key={mode} value={mode}>
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Graphics Quality</label>
          <select
            value={settings.graphicsQuality}
            onChange={(e) => handleChange('graphicsQuality', e.target.value)}
            className="input"
          >
            {GRAPHICS_QUALITIES.map((quality) => (
              <option key={quality} value={quality}>
                {quality}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Max FPS (0 = Unlimited)</label>
          <input
            type="number"
            min="0"
            max="500"
            value={settings.fpsMax}
            onChange={(e) => handleChange('fpsMax', parseInt(e.target.value) || 0)}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Brightness</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="3"
            value={settings.brightness}
            onChange={(e) => handleChange('brightness', parseFloat(e.target.value))}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Gamma</label>
          <input
            type="number"
            step="0.1"
            min="1.6"
            max="2.6"
            value={settings.gamma}
            onChange={(e) => handleChange('gamma', parseFloat(e.target.value))}
            className="input"
          />
        </div>

        <div className="space-y-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.fullscreen}
              onChange={(e) => handleChange('fullscreen', e.target.checked)}
              className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-[#de9b35] focus:ring-2"
            />
            <span className="text-white">Fullscreen</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.vsync}
              onChange={(e) => handleChange('vsync', e.target.checked)}
              className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-[#de9b35] focus:ring-2"
            />
            <span className="text-white">V-Sync</span>
          </label>
        </div>
      </div>
    </div>
  );
}
