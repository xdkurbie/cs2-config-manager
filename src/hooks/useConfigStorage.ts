import { useState, useEffect } from 'react';
import { CS2Config } from '../types/config';
import { PRO_PRESETS } from '../lib/proPresets';
import { generateConfigFile } from '../lib/configParser';

const STORAGE_KEY = 'cs2-configs';

export function useConfigStorage() {
  const [configs, setConfigs] = useState<CS2Config[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setConfigs([...PRO_PRESETS, ...parsed]);
      } else {
        setConfigs([...PRO_PRESETS]);
      }
    } catch (error) {
      console.error('Failed to load configs:', error);
      setConfigs([...PRO_PRESETS]);
    }
    setIsLoading(false);
  };

  const saveConfigs = (newConfigs: CS2Config[]) => {
    const userConfigs = newConfigs.filter(c => !c.isPreset);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userConfigs));
    setConfigs(newConfigs);
  };

  const createConfig = (name: string): CS2Config => {
    const newConfig: CS2Config = {
      ...PRO_PRESETS[0],
      id: `config-${Date.now()}`,
      name,
      isPreset: false,
      author: undefined,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      rawConfig: '',
    };
    
    newConfig.rawConfig = generateConfigFile(newConfig);
    
    const updated = [...configs, newConfig];
    saveConfigs(updated);
    return newConfig;
  };

  const updateConfig = (id: string, updates: Partial<CS2Config>): void => {
    const updated = configs.map(c => {
      if (c.id === id) {
        const updatedConfig = { ...c, ...updates, updatedAt: Date.now() };
        updatedConfig.rawConfig = generateConfigFile(updatedConfig);
        return updatedConfig;
      }
      return c;
    });
    saveConfigs(updated);
  };

  const deleteConfig = (id: string): void => {
    const updated = configs.filter(c => c.id !== id);
    saveConfigs(updated);
  };

  const duplicateConfig = (id: string, newName: string): CS2Config | null => {
    const config = configs.find(c => c.id === id);
    if (!config) return null;

    const duplicated: CS2Config = {
      ...JSON.parse(JSON.stringify(config)),
      id: `config-${Date.now()}`,
      name: newName,
      isPreset: false,
      author: undefined,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const updated = [...configs, duplicated];
    saveConfigs(updated);
    return duplicated;
  };

  const exportConfig = (config: CS2Config): string => {
    return generateConfigFile(config);
  };

  const exportAllConfigs = (): string => {
    const userConfigs = configs.filter(c => !c.isPreset);
    return JSON.stringify(userConfigs, null, 2);
  };

  const importConfig = (content: string): CS2Config | null => {
    try {
      const parsed = JSON.parse(content);
      if (!parsed.name || !parsed.id) return null;

      const imported: CS2Config = {
        ...parsed,
        id: `config-${Date.now()}`,
        isPreset: false,
        author: undefined,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        rawConfig: generateConfigFile(parsed),
      };

      const updated = [...configs, imported];
      saveConfigs(updated);
      return imported;
    } catch {
      return null;
    }
  };

  const importBackup = (backupContent: string): number => {
    try {
      const imported = JSON.parse(backupContent) as CS2Config[];
      const withNewIds = imported.map(c => ({
        ...c,
        id: `config-${Date.now()}-${Math.random()}`,
        isPreset: false,
        author: undefined,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      }));

      const updated = [...configs, ...withNewIds];
      saveConfigs(updated);
      return withNewIds.length;
    } catch {
      return 0;
    }
  };

  return {
    configs,
    isLoading,
    createConfig,
    updateConfig,
    deleteConfig,
    duplicateConfig,
    exportConfig,
    exportAllConfigs,
    importConfig,
    importBackup,
    refresh: loadConfigs,
  };
}
