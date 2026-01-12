import { useState } from 'react';
import { Settings, FolderOpen, Package, X } from 'lucide-react';
import { useConfigStorage } from './hooks/useConfigStorage';
import { Dashboard } from './components/Dashboard';
import { ConfigEditor } from './components/ConfigEditor';
import { CaseOpeningSimulator } from './components/CaseOpeningSimulator';
import { cn } from './lib/utils';

type Tab = 'dashboard' | 'configs' | 'cases';

function App() {
  const { configs, isLoading } = useConfigStorage();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [selectedConfigId, setSelectedConfigId] = useState<string | null>(null);

  const selectedConfig = configs.find(c => c.id === selectedConfigId);

  const handleConfigSelect = (id: string) => {
    setSelectedConfigId(id);
    setActiveTab('configs');
  };

  const handleBackToDashboard = () => {
    setSelectedConfigId(null);
    setActiveTab('dashboard');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f0f0f] text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#de9b35] mx-auto mb-4"></div>
          <p>Loading configs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-gray-100">
      <header className="bg-[#1b1b1b] border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <h1 className="text-2xl font-bold text-[#de9b35]">CS2 Config Manager</h1>
            </div>

            <nav className="flex space-x-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={cn(
                  'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
                  activeTab === 'dashboard'
                    ? 'bg-[#de9b35] text-black'
                    : 'hover:bg-gray-800'
                )}
              >
                <FolderOpen size={18} />
                <span>Dashboard</span>
              </button>
              
              <button
                onClick={() => {
                  setActiveTab('configs');
                  setSelectedConfigId(null);
                }}
                className={cn(
                  'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
                  activeTab === 'configs'
                    ? 'bg-[#de9b35] text-black'
                    : 'hover:bg-gray-800'
                )}
              >
                <Settings size={18} />
                <span>Configs</span>
              </button>
              
              <button
                onClick={() => setActiveTab('cases')}
                className={cn(
                  'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
                  activeTab === 'cases'
                    ? 'bg-[#de9b35] text-black'
                    : 'hover:bg-gray-800'
                )}
              >
                <Package size={18} />
                <span>Case Opening</span>
              </button>
            </nav>

            <div className="text-sm text-gray-400">
              {configs.length} configs loaded
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {selectedConfigId && activeTab === 'configs' ? (
          <div>
            <button
              onClick={handleBackToDashboard}
              className="flex items-center space-x-2 text-gray-400 hover:text-white mb-4 transition-colors"
            >
              <X size={18} />
              <span>Close Config</span>
            </button>
            {selectedConfig && <ConfigEditor config={selectedConfig} />}
          </div>
        ) : (
          <>
            {activeTab === 'dashboard' && (
              <Dashboard configs={configs} onConfigSelect={handleConfigSelect} />
            )}
            
            {activeTab === 'configs' && (
              <Dashboard configs={configs} onConfigSelect={handleConfigSelect} />
            )}
            
            {activeTab === 'cases' && <CaseOpeningSimulator />}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
