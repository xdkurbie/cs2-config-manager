import { useState } from 'react';
import { Save, Download, Copy, RefreshCw } from 'lucide-react';
import { CS2Config } from '../types/config';
import { useConfigStorage } from '../hooks/useConfigStorage';
import { useFileHandlers } from '../hooks/useFileHandlers';
import { VideoSettings } from './VideoSettings';
import { AudioSettings } from './AudioSettings';
import { GameplaySettings } from './GameplaySettings';
import { CrosshairEditor } from './CrosshairEditor';
import { ViewModelSettings } from './ViewModelSettings';
import { NetworkSettings } from './NetworkSettings';
import { HUDSettings } from './HUDSettings';
import { RadarSettings } from './RadarSettings';
import { RawConfigEditor } from './RawConfigEditor';
import { cn } from '../lib/utils';
import { generateConfigFile } from '../lib/configParser';

type Tab = 'video' | 'audio' | 'gameplay' | 'crosshair' | 'viewmodel' | 'network' | 'hud' | 'radar' | 'raw';

const TABS = [
  { id: 'video' as Tab, label: 'Video' },
  { id: 'audio' as Tab, label: 'Audio' },
  { id: 'gameplay' as Tab, label: 'Gameplay' },
  { id: 'crosshair' as Tab, label: 'Crosshair' },
  { id: 'viewmodel' as Tab, label: 'ViewModel' },
  { id: 'network' as Tab, label: 'Network' },
  { id: 'hud' as Tab, label: 'HUD' },
  { id: 'radar' as Tab, label: 'Radar' },
  { id: 'raw' as Tab, label: 'Raw Config' },
];

interface ConfigEditorProps {
  config: CS2Config;
}

export function ConfigEditor({ config: initialConfig }: ConfigEditorProps) {
  const { updateConfig } = useConfigStorage();
  const { downloadFile, copyToClipboard } = useFileHandlers();
  const [config, setConfig] = useState<CS2Config>(initialConfig);
  const [activeTab, setActiveTab] = useState<Tab>('video');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleUpdate = (updates: Partial<CS2Config>) => {
    const updated = { ...config, ...updates, updatedAt: Date.now() };
    setConfig(updated);
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    updateConfig(config.id, config);
    setHasUnsavedChanges(false);
  };

  const handleExport = () => {
    const content = generateConfigFile(config);
    downloadFile(content, `${config.name}.cfg`);
  };

  const handleCopy = async () => {
    const content = generateConfigFile(config);
    const success = await copyToClipboard(content);
    if (success) {
      alert('Config copied to clipboard!');
    }
  };

  const handleRawConfigUpdate = (rawConfig: string) => {
    setConfig(prev => ({ ...prev, rawConfig, updatedAt: Date.now() }));
    setHasUnsavedChanges(true);
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <input
              type="text"
              value={config.name}
              onChange={(e) => handleUpdate({ name: e.target.value })}
              className="text-2xl font-bold bg-transparent border-none text-white focus:outline-none focus:ring-0 w-full"
            />
            {config.author && (
              <p className="text-sm text-gray-500 mt-1">Author: {config.author}</p>
            )}
          </div>

          <div className="flex space-x-2">
            {hasUnsavedChanges && (
              <button onClick={handleSave} className="button button-primary">
                <Save size={18} />
                <span>Save</span>
              </button>
            )}
            <button onClick={handleExport} className="button button-secondary">
              <Download size={18} />
              <span>Export</span>
            </button>
            <button onClick={handleCopy} className="button button-secondary">
              <Copy size={18} />
              <span>Copy</span>
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-wrap gap-2 border-b border-gray-800 pb-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'tab',
                activeTab === tab.id ? 'tab-active' : 'tab-inactive'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === 'video' && (
            <VideoSettings settings={config.video} onUpdate={(video) => handleUpdate({ video })} />
          )}
          
          {activeTab === 'audio' && (
            <AudioSettings settings={config.audio} onUpdate={(audio) => handleUpdate({ audio })} />
          )}
          
          {activeTab === 'gameplay' && (
            <GameplaySettings settings={config.gameplay} onUpdate={(gameplay) => handleUpdate({ gameplay })} />
          )}
          
          {activeTab === 'crosshair' && (
            <CrosshairEditor settings={config.crosshair} onUpdate={(crosshair) => handleUpdate({ crosshair })} />
          )}
          
          {activeTab === 'viewmodel' && (
            <ViewModelSettings settings={config.viewmodel} onUpdate={(viewmodel) => handleUpdate({ viewmodel })} />
          )}
          
          {activeTab === 'network' && (
            <NetworkSettings settings={config.network} onUpdate={(network) => handleUpdate({ network })} />
          )}
          
          {activeTab === 'hud' && (
            <HUDSettings settings={config.hud} onUpdate={(hud) => handleUpdate({ hud })} />
          )}
          
          {activeTab === 'radar' && (
            <RadarSettings settings={config.radar} onUpdate={(radar) => handleUpdate({ radar })} />
          )}
          
          {activeTab === 'raw' && (
            <RawConfigEditor
              config={config}
              onUpdate={handleRawConfigUpdate}
            />
          )}
        </div>
      </div>
    </div>
  );
}
