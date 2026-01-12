import { AudioSettings as AudioSettingsType } from '../types/config';

interface AudioSettingsProps {
  settings: AudioSettingsType;
  onUpdate: (settings: AudioSettingsType) => void;
}

export function AudioSettings({ settings, onUpdate }: AudioSettingsProps) {
  const handleChange = (field: keyof AudioSettingsType, value: any) => {
    onUpdate({ ...settings, [field]: value });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">Audio Settings</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Master Volume: {Math.round(settings.masterVolume * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={settings.masterVolume}
            onChange={(e) => handleChange('masterVolume', parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Music Volume: {Math.round(settings.musicVolume * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={settings.musicVolume}
            onChange={(e) => handleChange('musicVolume', parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Game Volume: {Math.round(settings.volume * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={settings.volume}
            onChange={(e) => handleChange('volume', parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Voice Chat Volume: {Math.round(settings.voiceScale * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={settings.voiceScale}
            onChange={(e) => handleChange('voiceScale', parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Headphone Pan Exponent: {settings.sndHeadphonePanExponent.toFixed(1)}
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={settings.sndHeadphonePanExponent}
            onChange={(e) => handleChange('sndHeadphonePanExponent', parseFloat(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Sound Mix Ahead: {(settings.sndMixAhead * 1000).toFixed(0)}ms
          </label>
          <input
            type="range"
            min="0"
            max="0.1"
            step="0.005"
            value={settings.sndMixAhead}
            onChange={(e) => handleChange('sndMixAhead', parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.voiceEnable}
            onChange={(e) => handleChange('voiceEnable', e.target.checked)}
            className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-[#de9b35] focus:ring-2"
          />
          <span className="text-white">Enable Voice Chat</span>
        </label>
      </div>
    </div>
  );
}
