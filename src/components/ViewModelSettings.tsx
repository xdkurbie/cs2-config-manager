import { ViewModelSettings as ViewModelSettingsType } from '../types/config';

interface ViewModelSettingsProps {
  settings: ViewModelSettingsType;
  onUpdate: (settings: ViewModelSettingsType) => void;
}

export function ViewModelSettings({ settings, onUpdate }: ViewModelSettingsProps) {
  const handleChange = (field: keyof ViewModelSettingsType, value: any) => {
    onUpdate({ ...settings, [field]: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">ViewModel Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">FOV: {settings.fov}</label>
          <input
            type="range"
            min="54"
            max="68"
            step="1"
            value={settings.fov}
            onChange={(e) => handleChange('fov', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Offset X: {settings.offsetX.toFixed(1)}</label>
          <input
            type="range"
            min="-2.5"
            max="2.5"
            step="0.1"
            value={settings.offsetX}
            onChange={(e) => handleChange('offsetX', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Offset Y: {settings.offsetY.toFixed(1)}</label>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.1"
            value={settings.offsetY}
            onChange={(e) => handleChange('offsetY', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Offset Z: {settings.offsetZ.toFixed(1)}</label>
          <input
            type="range"
            min="-16"
            max="16"
            step="0.5"
            value={settings.offsetZ}
            onChange={(e) => handleChange('offsetZ', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Pitch: {settings.pitch.toFixed(0)}</label>
          <input
            type="range"
            min="-10"
            max="10"
            step="1"
            value={settings.pitch}
            onChange={(e) => handleChange('pitch', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Yaw: {settings.yaw.toFixed(0)}</label>
          <input
            type="range"
            min="-10"
            max="10"
            step="1"
            value={settings.yaw}
            onChange={(e) => handleChange('yaw', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Roll: {settings.roll.toFixed(0)}</label>
          <input
            type="range"
            min="-10"
            max="10"
            step="1"
            value={settings.roll}
            onChange={(e) => handleChange('roll', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Recoil: {settings.recoil.toFixed(1)}</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={settings.recoil}
            onChange={(e) => handleChange('recoil', parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <div className="card">
        <h4 className="text-lg font-medium text-white mb-4">Preset Positions</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { name: 'Classic', fov: 68, x: 2.5, y: 0, z: -1.5 },
            { name: 'Classic 2', fov: 68, x: 0, y: -1.5, z: -2 },
            { name: 'Couch', fov: 54, x: -2.5, y: -2, z: -4.5 },
            { name: 'Cyberpunk', fov: 68, x: 2.5, y: -2, z: -1.5 },
          ].map((preset) => (
            <button
              key={preset.name}
              onClick={() => onUpdate({
                ...settings,
                fov: preset.fov,
                offsetX: preset.x,
                offsetY: preset.y,
                offsetZ: preset.z,
                pitch: 0,
                yaw: 0,
                roll: 0,
              })}
              className="px-3 py-2 bg-[#0f0f0f] border border-gray-700 rounded-lg hover:border-[#de9b35] transition-colors"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
