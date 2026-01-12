import { useState } from 'react';
import { Settings, FolderOpen, Package, X, Heart, ExternalLink } from 'lucide-react';
import { useConfigStorage } from './hooks/useConfigStorage';
import { useGlobalShortcuts } from './hooks/useKeyboardShortcuts';
import { Dashboard } from './components/Dashboard';
import { ConfigEditor } from './components/ConfigEditor';
import { CaseOpeningSimulator } from './components/CaseOpeningSimulator';
import { ToastNotifications, useToast } from './components/ToastNotifications';
import { cn } from './lib/utils';
import './styles/animations.css';

type Tab = 'dashboard' | 'configs' | 'cases';

function App() {
  const { configs, isLoading } = useConfigStorage();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [selectedConfigId, setSelectedConfigId] = useState<string | null>(null);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationStatus, setDonationStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const toast = useToast();

  const selectedConfig = configs.find(c => c.id === selectedConfigId);

  // Initialize keyboard shortcuts
  useGlobalShortcuts(toast);

  const handleConfigSelect = (id: string) => {
    setSelectedConfigId(id);
    setActiveTab('configs');
  };

  const handleBackToDashboard = () => {
    setSelectedConfigId(null);
    setActiveTab('dashboard');
  };

  const handleDonation = (amount: number, method: 'paypal' | 'github') => {
    setDonationStatus('processing');
    
    if (method === 'paypal') {
      // PayPal integration - would redirect to PayPal or use PayPal SDK
      window.open(`https://www.paypal.com/donate?amount=${amount}`, '_blank');
      toast.info('Redirecting to PayPal...', 'Complete your donation on the PayPal page.');
    } else if (method === 'github') {
      // GitHub Sponsors
      window.open('https://github.com/sponsors/xdkurbie', '_blank');
      toast.info('Redirecting to GitHub Sponsors...', 'Support development through GitHub Sponsors.');
    }
    
    // Simulate processing
    setTimeout(() => {
      setDonationStatus('success');
      toast.success('Thank you for your support!', 'Your donation helps keep this project free and open-source.');
      setTimeout(() => {
        setShowDonationModal(false);
        setDonationStatus('idle');
      }, 2000);
    }, 1500);
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
      <header className="bg-[#1b1b1b] border-b border-gray-800 header">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#de9b35] rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">CS2</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#de9b35]">Config Manager</h1>
                <span className="text-xs text-gray-400 hidden sm:inline">Professional CS2 Configuration Tool</span>
              </div>
            </div>

            <nav className="flex space-x-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={cn(
                  'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors nav-button',
                  activeTab === 'dashboard'
                    ? 'bg-[#de9b35] text-black active'
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
                  'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors nav-button',
                  activeTab === 'configs'
                    ? 'bg-[#de9b35] text-black active'
                    : 'hover:bg-gray-800'
                )}
              >
                <Settings size={18} />
                <span>Configs</span>
              </button>
              
              <button
                onClick={() => setActiveTab('cases')}
                className={cn(
                  'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors nav-button',
                  activeTab === 'cases'
                    ? 'bg-[#de9b35] text-black active'
                    : 'hover:bg-gray-800'
                )}
              >
                <Package size={18} />
                <span>Case Opening</span>
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowDonationModal(true)}
                className="flex items-center space-x-2 px-3 py-2 bg-[#de9b35] text-black rounded-lg hover:bg-[#e8b050] transition-colors donation-button"
              >
                <Heart size={16} className="fill-current" />
                <span className="hidden sm:inline">Support</span>
              </button>
              
              <div className="text-sm text-gray-400">
                {configs.length} configs
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Donation Modal */}
      {showDonationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 modal-backdrop">
          <div className="bg-[#1b1b1b] border border-gray-800 rounded-xl p-6 max-w-md w-full mx-4 modal-content donation-modal">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#de9b35]">Support Development</h2>
              <button
                onClick={() => setShowDonationModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-gray-300 mb-6">
              Help keep CS2 Config Manager free and open-source. Your support allows me to continue developing new features and improvements.
            </p>
            
            {donationStatus === 'success' ? (
              <div className="text-center py-8">
                <div className="text-green-400 mb-2 loading-pulse">
                  <Heart size={48} className="fill-current mx-auto" />
                </div>
                <p className="text-green-400 font-semibold">Thank you for your support!</p>
                <p className="text-gray-400 text-sm mt-2">Your donation is greatly appreciated.</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-6">
                  <div className="text-sm text-gray-400 mb-2">Choose amount:</div>
                  <div className="grid grid-cols-3 gap-2">
                    {['$5', '$10', '$25'].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleDonation(parseInt(amount.replace('$', '')), 'paypal')}
                        disabled={donationStatus === 'processing'}
                        className="py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed donation-button"
                      >
                        {amount}
                      </button>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    {['$50', '$100'].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleDonation(parseInt(amount.replace('$', '')), 'paypal')}
                        disabled={donationStatus === 'processing'}
                        className="py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed donation-button"
                      >
                        {amount}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={() => handleDonation(0, 'github')}
                    disabled={donationStatus === 'processing'}
                    className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed donation-button"
                  >
                    <ExternalLink size={16} />
                    <span>GitHub Sponsors</span>
                  </button>
                  
                  {donationStatus === 'processing' && (
                    <div className="text-center text-gray-400">
                      <div className="loading-spinner rounded-full h-4 w-4 border-b-2 border-[#de9b35] mx-auto mb-2"></div>
                      Processing donation...
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-6 tab-content">
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

      {/* Toast Notifications */}
      <ToastNotifications toasts={toast.toasts} onRemove={toast.removeToast} />
    </div>
  );
}

export default App;
