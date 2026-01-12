import React from 'react';
import { Inventory, CaseItem } from '../../types/config';
import { RARITY_COLORS } from '../../types/config';
import { Trash2, Package } from 'lucide-react';

interface InventoryProps {
  inventory: Inventory;
  onDeleteItem: (id: string) => void;
  onReset: () => void;
}

export function InventoryView({ inventory, onDeleteItem, onReset }: InventoryProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Package size={20} className="text-[#de9b35]" />
          <h3 className="text-lg font-medium text-white">Inventory</h3>
        </div>
        <button
          onClick={onReset}
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
                style={{ borderColor: RARITY_COLORS[item.rarity], borderWidth: '2px' }}
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
                  onClick={() => onDeleteItem(item.id)}
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
  );
}

export default InventoryView;
