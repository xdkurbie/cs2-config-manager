import { RadarSettings as RadarSettingsType } from '../types/config';

interface RadarSettingsProps {
  settings: RadarSettingsType;
  onUpdate: (settings: RadarSettingsType) => void;
}

export function RadarSettings({ settings, onUpdate }: RadarSettingsProps) {
  const handleChange = (field: keyof RadarSettingsType, value: any) => {
    onUpdate({ ...settings, [field]: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">Radar Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Radar Scale: {settings.clRadarScale.toFixed(2)}
          </label>
          <input
            type="range"
            min="0.25"
            max="1"
            step="0.01"
            value={settings.clRadarScale}
            onChange={(e) => handleChange('clRadarScale', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Radar Opacity: {settings.clRadarRadarOpacity.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={settings.clRadarRadarOpacity}
            onChange={(e) => handleChange('clRadarRadarOpacity', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Icon Scale: {settings.clRadarIconScaleMin.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={settings.clRadarIconScaleMin}
            onChange={(e) => handleChange('clRadarIconScaleMin', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Height Pct: {settings.clRadarHudHeightPct.toFixed(2)}
          </label>
          <input
            type="range"
            min="0.1"
          max="1"
            step="0.01"
            value={settings.clRadarHudHeightPct}
            onChange={(e) => handleChange('clRadarHudHeightPct', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Width Pct: {settings.clRadarHudWidthPct.toFixed(2)}
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.01"
            value={settings.clRadarHudWidthPct}
            onChange={(e) => handleChange('clRadarHudWidthPct', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="card">
        <h4 className="text-lg font-medium text-white mb-4">Toggle Options</h4>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.clRadarRotate}
              onChange={(e) => handleChange('clRadarRotate', e.target.checked)}
              className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-[#de9b35] focus:ring-2"
            />
            <span className="text-white">Rotate Radar</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.clRadarSquareWithScoreboard}
              onChange={(e) => handleChange('clRadarSquareWithScoreboard', e.target.checked)}
              className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-[#de9b35] focus:ring-2"
            />
            <span className="text-white">Square with Scoreboard</span>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.clRadarAlwaysCentered}
              onChange={(e) => handleChange('clRadarAlwaysCentered', e.target.checked)}
              className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-[#de9b35] focus:ring-2"
            />
            <span className="text-white">Always Centered</span>
          </label>
        </div>
      </div>

      <div className="card">
        <h4 className="text-lg font-medium text-white mb-4">Preset Radar Styles</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => onUpdate({
              ...settings,
              clRadarScale: 0.6,
              clRadarRotate: true,
              clRadarAlwaysCentered: true,
              clRadarSquareWithScoreboard: false,
            })}
            className="px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg hover:border-[#de9b35] transition-colors text-left"
          >
            <div className="font-medium text-white">Classic Pro</div>
            <div className="text-xs text-gray-500 mt-1">Centered, Rotating, Scale: 0.6</div>
          </button>

          <button
            onClick={() => onUpdate({
              ...settings,
              clRadarScale: 0.8,
              clRadarRotate: false,
              clRadarAlwaysCentered: false,
              clRadarSquareWithScoreboard: false,
            })}
            className="px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg hover:border-[#de9b35] transition-colors text-left"
          >
            <div className="font-medium text-white">Static Full</div>
            <div className="text-xs text-gray-500 mt-1">Not Centered, No Rotation, Scale: 0.8</div>
          </button>

          <button
            onClick={() => onUpdate({
              ...settings,
              clRadarScale: 0.5,
              clRadarRotate: true,
              clRadarAlwaysCentered: true,
              clRadarSquareWithScoreboard: true,
            })}
            className="px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg hover:border-[#de9b35] transition-colors text-left"
          >
            <div className="font-medium text-white">Zoomed In</div>
            <div className="text-xs text-gray-500 mt-1">Centered, Rotating, Square, Scale: 0.5</div>
          </button>

          <button
            onClick={() => onUpdate({
              ...settings,
              clRadarScale: 0.9,
              clRadarRotate: false,
              clRadarAlwaysCentered: false,
              clRadarSquareWithScoreboard: true,
            })}
            className="px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg hover:border-[#de9b35] transition-colors text-left"
          >
            <div className="font-medium text-white">Max Coverage</div>
            <div className="text-xs text-gray-500 mt-1">Not Centered, No Rotation, Scale: 0.9</div>
          </button>
        </div>
      </div>
    </div>
  );
}
