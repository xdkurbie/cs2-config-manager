import { NetworkSettings as NetworkSettingsType } from '../types/config';

interface NetworkSettingsProps {
  settings: NetworkSettingsType;
  onUpdate: (settings: NetworkSettingsType) => void;
}

export function NetworkSettings({ settings, onUpdate }: NetworkSettingsProps) {
  const handleChange = (field: keyof NetworkSettingsType, value: any) => {
    onUpdate({ ...settings, [field]: value });
  };

  const calculateOptimalSettings = () => {
    onUpdate({
      ...settings,
      rate: 786432,
      clCmdrate: 128,
      clUpdaterate: 128,
      clInterp: 0.007813,
      clInterpRatio: 1,
      clLagcompensation: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">Network Settings</h3>
        <button onClick={calculateOptimalSettings} className="button button-primary">
          Auto-Optimize (128 tick)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Rate: {settings.rate}</label>
          <input
            type="number"
            min="8000"
            max="1048576"
            value={settings.rate}
            onChange={(e) => handleChange('rate', parseInt(e.target.value))}
            className="input"
          />
          <p className="text-xs text-gray-500 mt-1">Bytes per second</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Cmdrate: {settings.clCmdrate}</label>
          <input
            type="number"
            min="1"
            max="128"
            value={settings.clCmdrate}
            onChange={(e) => handleChange('clCmdrate', parseInt(e.target.value))}
            className="input"
          />
          <p className="text-xs text-gray-500 mt-1">Commands per second</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Updaterate: {settings.clUpdaterate}</label>
          <input
            type="number"
            min="1"
            max="128"
            value={settings.clUpdaterate}
            onChange={(e) => handleChange('clUpdaterate', parseInt(e.target.value))}
            className="input"
          />
          <p className="text-xs text-gray-500 mt-1">Updates per second</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Interp: {settings.clInterp.toFixed(6)}</label>
          <input
            type="number"
            step="0.001"
            min="0"
            max="0.5"
            value={settings.clInterp}
            onChange={(e) => handleChange('clInterp', parseFloat(e.target.value))}
            className="input"
          />
          <p className="text-xs text-gray-500 mt-1">Interpolation time</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Interp Ratio: {settings.clInterpRatio}</label>
          <input
            type="number"
            min="0"
            max="2"
            value={settings.clInterpRatio}
            onChange={(e) => handleChange('clInterpRatio', parseInt(e.target.value))}
            className="input"
          />
          <p className="text-xs text-gray-500 mt-1">0 = auto, 1-2 = manual</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Max Reliable Payload: {settings.netUdpClientMaxReliablePayloadSize}
          </label>
          <input
            type="number"
            min="120"
            max="1200"
            value={settings.netUdpClientMaxReliablePayloadSize}
            onChange={(e) => handleChange('netUdpClientMaxReliablePayloadSize', parseInt(e.target.value))}
            className="input"
          />
          <p className="text-xs text-gray-500 mt-1">Network packet size</p>
        </div>
      </div>

      <div className="card">
        <h4 className="text-lg font-medium text-white mb-4">Advanced</h4>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.clLagcompensation}
            onChange={(e) => handleChange('clLagcompensation', e.target.checked)}
            className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-[#de9b35] focus:ring-2"
          />
          <span className="text-white">Lag Compensation</span>
        </label>
      </div>

      <div className="card">
        <h4 className="text-lg font-medium text-white mb-4">Recommended Settings</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => onUpdate({
              ...settings,
              rate: 786432,
              clCmdrate: 64,
              clUpdaterate: 64,
              clInterp: 0.015625,
              clInterpRatio: 2,
            })}
            className="px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg hover:border-[#de9b35] transition-colors text-left"
          >
            <div className="font-medium text-white">64 Tick</div>
            <div className="text-xs text-gray-500 mt-1">cmdrate: 64, updaterate: 64</div>
          </button>

          <button
            onClick={() => onUpdate({
              ...settings,
              rate: 786432,
              clCmdrate: 128,
              clUpdaterate: 128,
              clInterp: 0.007813,
              clInterpRatio: 1,
            })}
            className="px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg hover:border-[#de9b35] transition-colors text-left"
          >
            <div className="font-medium text-white">128 Tick</div>
            <div className="text-xs text-gray-500 mt-1">cmdrate: 128, updaterate: 128</div>
          </button>

          <button
            onClick={() => onUpdate({
              ...settings,
              rate: 196608,
              clCmdrate: 30,
              clUpdaterate: 30,
              clInterp: 0.033333,
              clInterpRatio: 1,
            })}
            className="px-4 py-3 bg-[#0f0f0f] border border-gray-700 rounded-lg hover:border-[#de9b35] transition-colors text-left"
          >
            <div className="font-medium text-white">Low Bandwidth</div>
            <div className="text-xs text-gray-500 mt-1">cmdrate: 30, updaterate: 30</div>
          </button>
        </div>
      </div>
    </div>
  );
}
