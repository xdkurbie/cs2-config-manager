import { HUDSettings as HUDSettingsType } from '../types/config';

interface HUDSettingsProps {
  settings: HUDSettingsType;
  onUpdate: (settings: HUDSettingsType) => void;
}

export function HUDSettings({ settings, onUpdate }: HUDSettingsProps) {
  const handleChange = (field: keyof HUDSettingsType, value: any) => {
    onUpdate({ ...settings, [field]: value });
  };

  const HUD_COLORS = [
    { name: 'Yellow', value: 0 },
    { name: 'Purple', value: 1 },
    { name: 'Green', value: 2 },
    { name: 'Blue', value: 3 },
    { name: 'Orange', value: 4 },
    { name: 'Red', value: 5 },
    { name: 'White', value: 6 },
    { name: 'Light Blue', value: 7 },
    { name: 'Dark Blue', value: 8 },
    { name: 'Grey', value: 9 },
    { name: 'Dark Blue 2', value: 10 },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">HUD Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            HUD Scaling: {settings.hudScaling.toFixed(2)}
          </label>
          <input
            type="range"
            min="0.5"
            max="1.2"
            step="0.01"
            value={settings.hudScaling}
            onChange={(e) => handleChange('hudScaling', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Background Alpha: {settings.clHudBackgroundAlpha.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={settings.clHudBackgroundAlpha}
            onChange={(e) => handleChange('clHudBackgroundAlpha', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Fade Remove Distance: {settings.hudFadeRemovedistance}
          </label>
          <input
            type="number"
            min="0"
            max="5000"
            value={settings.hudFadeRemovedistance}
            onChange={(e) => handleChange('hudFadeRemovedistance', parseInt(e.target.value))}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Player Count Position</label>
          <select
            value={settings.clHudPlayerCountPos}
            onChange={(e) => handleChange('clHudPlayerCountPos', parseInt(e.target.value))}
            className="input"
          >
            <option value="0">Bottom Right</option>
            <option value="1">Top Right</option>
            <option value="2">Top Left</option>
            <option value="3">Bottom Left</option>
          </select>
        </div>
      </div>

      <div className="card">
        <h4 className="text-lg font-medium text-white mb-4">HUD Color</h4>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
          {HUD_COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => handleChange('clHudColor', color.value)}
              className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                settings.clHudColor === color.value
                  ? 'bg-[#de9b35] text-black font-medium'
                  : 'bg-[#0f0f0f] text-gray-400 hover:text-white'
              }`}
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <h4 className="text-lg font-medium text-white mb-4">Toggle Options</h4>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.hudShowtargetid}
              onChange={(e) => handleChange('hudShowtargetid', e.target.checked)}
              className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-[#de9b35] focus:ring-2"
            />
            <span className="text-white">Show Target ID</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.clHudPlayerCountShowcount}
              onChange={(e) => handleChange('clHudPlayerCountShowcount', e.target.checked)}
              className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-[#de9b35] focus:ring-2"
            />
            <span className="text-white">Show Player Count</span>
          </label>
        </div>
      </div>
    </div>
  );
}
