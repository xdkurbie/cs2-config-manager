import { useState } from 'react';
import { Search, Plus, FileDown, Upload, Trash2, Copy, User, Settings, Package, TrendingUp, Clock } from 'lucide-react';
import { CS2Config } from '../types/config';
import { useConfigStorage } from '../hooks/useConfigStorage';
import { useFileHandlers } from '../hooks/useFileHandlers';
import { cn } from '../lib/utils';
import { generateConfigFile } from '../lib/configParser';

interface DashboardProps {
  configs: CS2Config[];
  onConfigSelect: (id: string) => void;
}

export function Dashboard({ configs, onConfigSelect }: DashboardProps) {
  const { createConfig, deleteConfig, duplicateConfig, exportAllConfigs, importBackup } = useConfigStorage();
  const { downloadFile, copyToClipboard, importConfig, isDragging, handleDragOver, handleDragLeave, handleDrop } = useFileHandlers();
  const [searchQuery, setSearchQuery] = useState('');
  const [showPresetOnly, setShowPresetOnly] = useState(false);
  const [newConfigName, setNewConfigName] = useState('');

  const filteredConfigs = configs.filter(config => {
    const matchesSearch = config.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPreset = !showPresetOnly || config.isPreset;
    return matchesSearch && matchesPreset;
  });

  const handleCreateConfig = () => {
    if (!newConfigName.trim()) return;
    const config = createConfig(newConfigName.trim());
    setNewConfigName('');
    onConfigSelect(config.id);
  };

  const handleDeleteConfig = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this config?')) {
      deleteConfig(id);
    }
  };

  const handleDuplicateConfig = (e: React.MouseEvent, config: CS2Config) => {
    e.stopPropagation();
    const name = prompt('Enter name for the duplicated config:', `${config.name} (copy)`);
    if (name) {
      duplicateConfig(config.id, name);
    }
  };

  const handleExportConfig = (e: React.MouseEvent, config: CS2Config) => {
    e.stopPropagation();
    const content = generateConfigFile(config);
    downloadFile(content, `${config.name}.cfg`);
  };

  const handleCopyConfig = async (e: React.MouseEvent, config: CS2Config) => {
    e.stopPropagation();
    const content = generateConfigFile(config);
    const success = await copyToClipboard(content);
    if (success) {
      alert('Config copied to clipboard!');
    }
  };

  const handleImportBackup = async () => {
    const result = await importConfig();
    if (result) {
      const count = importBackup(result.content);
      if (count > 0) {
        alert(`Successfully imported ${count} configs!`);
      } else {
        alert('Failed to import configs. Please check the file format.');
      }
    }
  };

  const handleImportSingleConfig = async () => {
    const result = await importConfig();
    if (result && result.filename.endsWith('.cfg')) {
      alert('Single config import feature coming soon. Please use the raw config editor in a config.');
    }
  };

  const handleFileDrop = (content: string, filename: string) => {
    if (filename.endsWith('.json')) {
      const count = importBackup(content);
      if (count > 0) {
        alert(`Successfully imported ${count} configs!`);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Config Dashboard</h2>
          <p className="text-gray-400 mt-1">Manage your CS2 configurations</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card stat-card" style={{ '--index': 0 }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Configs</p>
              <p className="text-2xl font-bold text-white">{configs.length}</p>
            </div>
            <div className="w-12 h-12 bg-[#de9b35]/20 rounded-lg flex items-center justify-center hover-glow">
              <Settings size={24} className="text-[#de9b35]" />
            </div>
          </div>
        </div>

        <div className="card stat-card" style={{ '--index': 1 }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Pro Presets</p>
              <p className="text-2xl font-bold text-white">{configs.filter(c => c.isPreset).length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center hover-glow">
              <User size={24} className="text-blue-500" />
            </div>
          </div>
        </div>

        <div className="card stat-card" style={{ '--index': 2 }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Custom Configs</p>
              <p className="text-2xl font-bold text-white">{configs.filter(c => !c.isPreset).length}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center hover-glow">
              <Package size={24} className="text-green-500" />
            </div>
          </div>
        </div>

        <div className="card stat-card" style={{ '--index': 3 }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Recently Updated</p>
              <p className="text-2xl font-bold text-white">
                {configs.filter(c => {
                  const daysSinceUpdate = (Date.now() - new Date(c.updatedAt).getTime()) / (1000 * 60 * 60 * 24);
                  return daysSinceUpdate <= 7;
                }).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center hover-glow">
              <Clock size={24} className="text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-400 mb-2">New Config Name</label>
            <input
              type="text"
              value={newConfigName}
              onChange={(e) => setNewConfigName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateConfig()}
              placeholder="My Config"
              className="input"
            />
          </div>
          <button onClick={handleCreateConfig} className="button button-primary">
            <Plus size={18} />
            <span>Create Config</span>
          </button>
        </div>
      </div>

      <div className="card space-y-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search configs..."
              className="input pl-10"
            />
          </div>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showPresetOnly}
              onChange={(e) => setShowPresetOnly(e.target.checked)}
              className="w-4 h-4 bg-gray-700 border-gray-600 rounded focus:ring-[#de9b35] focus:ring-2"
            />
            <span className="text-sm text-gray-400">Show presets only</span>
          </label>

          <div className="flex space-x-2">
            <button onClick={handleImportSingleConfig} className="button button-secondary">
              <Upload size={18} />
              <span>Import .cfg</span>
            </button>
            <button onClick={handleImportBackup} className="button button-secondary">
              <Upload size={18} />
              <span>Import Backup</span>
            </button>
            <button onClick={() => {
              const backup = exportAllConfigs();
              downloadFile(backup, 'cs2-configs-backup.json');
            }} className="button button-secondary">
              <FileDown size={18} />
              <span>Export Backup</span>
            </button>
          </div>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, handleFileDrop)}
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center transition-colors',
            isDragging ? 'border-[#de9b35] bg-[#de9b35]/10' : 'border-gray-700'
          )}
        >
          {isDragging ? (
            <p className="text-[#de9b35] font-medium">Drop your config file here...</p>
          ) : (
            <p className="text-gray-500">Drag and drop config files here to import</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 staggered-list">
          {filteredConfigs.map((config, index) => (
            <div
              key={config.id}
              onClick={() => onConfigSelect(config.id)}
              className="group relative bg-[#0f0f0f] border border-gray-800 rounded-lg p-4 cursor-pointer config-card hover:border-[#de9b35] transition-all hover:shadow-lg hover:shadow-[#de9b35]/10"
              style={{ '--index': index }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-white truncate">{config.name}</h3>
                  {config.author && (
                    <div className="flex items-center space-x-1 text-xs text-gray-500 mt-1">
                      <User size={12} />
                      <span>{config.author}</span>
                    </div>
                  )}
                  {config.isPreset && (
                    <span className="inline-block px-2 py-0.5 text-xs bg-[#de9b35]/20 text-[#de9b35] rounded mt-2">
                      Preset
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                Last updated: {new Date(config.updatedAt).toLocaleDateString()}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-800 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-1">
                  <button
                    onClick={(e) => handleExportConfig(e, config)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    title="Export"
                  >
                    <FileDown size={16} />
                  </button>
                  <button
                    onClick={(e) => handleCopyConfig(e, config)}
                    className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy size={16} />
                  </button>
                  {!config.isPreset && (
                    <>
                      <button
                        onClick={(e) => handleDuplicateConfig(e, config)}
                        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        title="Duplicate"
                      >
                        <Copy size={16} />
                      </button>
                      <button
                        onClick={(e) => handleDeleteConfig(e, config.id)}
                        className="p-2 hover:bg-red-900/50 text-red-500 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {filteredConfigs.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <p className="text-gray-500 text-lg">No configs found</p>
              <p className="text-gray-600 text-sm mt-2">
                {searchQuery ? 'Try a different search query' : 'Create a new config to get started'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
