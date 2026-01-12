import { useState } from 'react';
import { GameplaySettings as GameplaySettingsType } from '../types/config';

interface GameplaySettingsProps {
  settings: GameplaySettingsType;
  onUpdate: (settings: GameplaySettingsType) => void;
}

export function GameplaySettings({ settings, onUpdate }: GameplaySettingsProps) {
  const [showBinds, setShowBinds] = useState(false);

  const handleChange = (field: keyof GameplaySettingsType, value: any) => {
    onUpdate({ ...settings, [field]: value });
  };

  const handleBindChange = (key: string, value: string) => {
    onUpdate({
      ...settings,
      binds: { ...settings.binds, [key]: value }
    });
  };

  const handleBindDelete = (key: string) => {
    const newBinds = { ...settings.binds };
    delete newBinds[key];
    onUpdate({ ...settings, binds: newBinds });
  };

  const handleAddBind = () => {
    const key = prompt('Enter key to bind:');
    const command = prompt('Enter command:');
    if (key && command) {
      handleBindChange(key, command);
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">Gameplay Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Sensitivity</label>
          <input
            type="text"
            value={settings.sensitivity}
            onChange={(e) => handleChange('sensitivity', e.target.value)}
            className="input"
            placeholder="e.g., 1.5, 2.0, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Mouse Yaw</label>
          <input
            type="number"
            step="0.001"
            min="0"
            max="1"
            value={settings.mYaw}
            onChange={(e) => handleChange('mYaw', parseFloat(e.target.value))}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Mouse Accel</label>
          <input
            type="number"
            min="0"
            max="10"
            value={settings.mCustomaccel}
            onChange={(e) => handleChange('mCustomaccel', parseInt(e.target.value))}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Accel Scale: {settings.mCustomaccelScale.toFixed(3)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={settings.mCustomaccelScale}
            onChange={(e) => handleChange('mCustomaccelScale', parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Max Accel</label>
          <input
            type="number"
            min="0"
            max="100"
            value={settings.mCustomaccelMax}
            onChange={(e) => handleChange('mCustomaccelMax', parseInt(e.target.value))}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Zoom Sensitivity</label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="10"
            value={settings.zoomSensitivity}
            onChange={(e) => handleChange('zoomSensitivity', parseFloat(e.target.value))}
            className="input"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium text-white">Key Binds</h4>
          <button
            onClick={() => setShowBinds(!showBinds)}
            className="button button-secondary"
          >
            {showBinds ? 'Hide Binds' : 'Show Binds'}
          </button>
        </div>

        {showBinds && (
          <div className="space-y-4">
            <button onClick={handleAddBind} className="button button-primary">
              Add Bind
            </button>

            {Object.keys(settings.binds).length > 0 ? (
              <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-custom">
                {Object.entries(settings.binds).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2 bg-[#0f0f0f] rounded-lg p-3">
                    <span className="px-3 py-1 bg-[#de9b35] text-black rounded font-mono text-sm">
                      {key}
                    </span>
                    <span className="text-gray-400">→</span>
                    <span className="flex-1 font-mono text-sm text-white">{value}</span>
                    <button
                      onClick={() => handleBindDelete(key)}
                      className="p-2 text-red-500 hover:bg-red-900/50 rounded-lg"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No binds configured</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
