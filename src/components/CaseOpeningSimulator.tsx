import { useState, useEffect } from 'react';
import { Package, RotateCcw, Trash2 } from 'lucide-react';
import { CASES, getRandomItem } from '../lib/caseData';
import { Case, CaseItem, Inventory } from '../types/config';
import { RARITY_COLORS } from '../types/config';

export function CaseOpeningSimulator() {
  const [selectedCase, setSelectedCase] = useState<Case | null>(CASES[0]);
  const [isOpening, setIsOpening] = useState(false);
  const [result, setResult] = useState<CaseItem | null>(null);
  const [animationStep, setAnimationStep] = useState(0);
  const [inventory, setInventory] = useState<Inventory>({
    items: [],
    totalValue: 0,
  });

  useEffect(() => {
    const saved = localStorage.getItem('cs2-case-inventory');
    if (saved) {
      setInventory(JSON.parse(saved));
    }
  }, []);

  const saveInventory = (newInventory: Inventory) => {
    localStorage.setItem('cs2-case-inventory', JSON.stringify(newInventory));
    setInventory(newInventory);
  };

  const openCase = () => {
    if (!selectedCase) return;

    setIsOpening(true);
    setAnimationStep(0);
    setResult(null);

    const animationDuration = 3000;
    const steps = 30;
    const interval = animationDuration / steps;

    const timer = setInterval(() => {
      setAnimationStep((prev) => {
        if (prev >= steps) {
          clearInterval(timer);
          const item = getRandomItem(selectedCase);
          setResult(item);
          setIsOpening(false);
          
          const newItem = {
            ...item,
            id: `item-${Date.now()}-${Math.random()}`,
            acquiredAt: Date.now(),
          };
          
          saveInventory({
            items: [...inventory.items, newItem],
            totalValue: inventory.totalValue + (item.value || 0),
          });
          
          return 0;
        }
        return prev + 1;
      });
    }, interval);
  };

  const resetInventory = () => {
    if (confirm('Are you sure you want to reset your inventory?')) {
      const emptyInventory: Inventory = { items: [], totalValue: 0 };
      saveInventory(emptyInventory);
    }
  };

  const deleteItem = (id: string) => {
    const newItems = inventory.items.filter((item) => item.id !== id);
    const itemToDelete = inventory.items.find((item) => item.id === id);
    saveInventory({
      items: newItems,
      totalValue: inventory.totalValue - (itemToDelete?.value || 0),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white">Case Opening Simulator</h2>
          <p className="text-gray-400 mt-1">Try your luck! (100% free)</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-400">Total Value</div>
          <div className="text-2xl font-bold text-[#de9b35]">
            ${inventory.totalValue.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card">
            <h3 className="text-lg font-medium text-white mb-4">Select a Case</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {CASES.map((caseData) => (
                <button
                  key={caseData.id}
                  onClick={() => setSelectedCase(caseData)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedCase?.id === caseData.id
                      ? 'border-[#de9b35] bg-[#de9b35]/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <Package className="mx-auto mb-2" size={48} />
                  <div className="text-sm font-medium text-white">{caseData.name}</div>
                  <div className="text-xs text-gray-400 mt-1">{caseData.items.length} items</div>
                </button>
              ))}
            </div>
          </div>

          {selectedCase && (
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-white">{selectedCase.name}</h3>
                  <p className="text-sm text-gray-400">{selectedCase.items.length} items available</p>
                </div>
                <button
                  onClick={openCase}
                  disabled={isOpening}
                  className="button button-primary text-lg px-8 py-3"
                >
                  {isOpening ? 'Opening...' : 'Open Case'}
                </button>
              </div>

              <div className="relative bg-[#0f0f0f] border border-gray-700 rounded-lg p-8 min-h-[400px] flex items-center justify-center overflow-hidden">
                {isOpening && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#de9b35]"></div>
                  </div>
                )}

                {!isOpening && result && (
                  <div className="text-center animate-pulse">
                    <div
                      className="w-32 h-32 mx-auto mb-4 rounded-lg border-4"
                      style={{
                        borderColor: RARITY_COLORS[result.rarity],
                      }}
                    >
                      <div className="w-full h-full bg-[#1b1b1b] flex items-center justify-center">
                        <span className="text-4xl">🔫</span>
                      </div>
                    </div>
                    <div
                      className="text-2xl font-bold mb-2"
                      style={{ color: RARITY_COLORS[result.rarity] }}
                    >
                      {result.name}
                    </div>
                    <div className="text-sm text-gray-400 capitalize">{result.wear}</div>
                    {result.value && (
                      <div className="text-xl font-bold text-[#de9b35] mt-2">
                        ${result.value.toFixed(2)}
                      </div>
                    )}
                    <div className="text-sm text-gray-500 capitalize mt-1">{result.rarity}</div>
                  </div>
                )}

                {!isOpening && !result && (
                  <div className="text-center text-gray-500">
                    <Package size={64} className="mx-auto mb-4" />
                    <p>Select a case and click "Open Case"</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {selectedCase && (
            <div className="card">
              <h3 className="text-lg font-medium text-white mb-4">Drop Rates</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: RARITY_COLORS.blue }}></div>
                    <span className="text-gray-300">Mil-Spec</span>
                  </div>
                  <span className="text-sm font-mono">79.92%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: RARITY_COLORS.purple }}></div>
                    <span className="text-gray-300">Restricted</span>
                  </div>
                  <span className="text-sm font-mono">15.98%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: RARITY_COLORS.pink }}></div>
                    <span className="text-gray-300">Classified</span>
                  </div>
                  <span className="text-sm font-mono">3.20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: RARITY_COLORS.red }}></div>
                    <span className="text-gray-300">Covert</span>
                  </div>
                  <span className="text-sm font-mono">0.64%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: RARITY_COLORS.gold }}></div>
                    <span className="text-gray-300">Special</span>
                  </div>
                  <span className="text-sm font-mono">0.26%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-white">Inventory</h3>
              <button
                onClick={resetInventory}
                className="p-2 text-red-500 hover:bg-red-900/50 rounded-lg"
                title="Reset Inventory"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {inventory.items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 text-sm">No items yet</p>
                <p className="text-gray-600 text-xs mt-1">Open some cases!</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[500px] overflow-y-auto scrollbar-custom">
                {[...inventory.items].reverse().map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-3 bg-[#0f0f0f] border-l-4 rounded-lg p-3 hover:bg-gray-800 transition-colors"
                    style={{ borderLeftColor: RARITY_COLORS[item.rarity] }}
                  >
                    <div
                      className="w-10 h-10 rounded bg-[#1b1b1b] flex items-center justify-center text-lg"
                      style={{ borderColor: RARITY_COLORS[item.rarity] }}
                    >
                      🔫
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-white truncate">{item.name}</div>
                      <div className="text-xs text-gray-500 capitalize">
                        {item.wear} • {item.rarity}
                      </div>
                    </div>
                    <div className="text-right">
                      {item.value && (
                        <div className="text-sm font-bold text-[#de9b35]">
                          ${item.value.toFixed(2)}
                        </div>
                      )}
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-1 text-red-500 hover:bg-red-900/50 rounded mt-1"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="card">
            <h3 className="text-lg font-medium text-white mb-4">Statistics</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Items</span>
                <span className="text-white font-medium">{inventory.items.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Value</span>
                <span className="text-[#de9b35] font-bold">
                  ${inventory.totalValue.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Average Value</span>
                <span className="text-white font-medium">
                  ${inventory.items.length > 0 ? (inventory.totalValue / inventory.items.length).toFixed(2) : '0.00'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
