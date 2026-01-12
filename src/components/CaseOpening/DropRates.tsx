import React from 'react';
import { RARITY_COLORS } from '../../types/config';

interface DropRatesProps {
  show: boolean;
}

const RATES = [
  { rarity: 'blue' as const, name: 'Mil-Spec', rate: 79.92 },
  { rarity: 'purple' as const, name: 'Restricted', rate: 15.98 },
  { rarity: 'pink' as const, name: 'Classified', rate: 3.20 },
  { rarity: 'red' as const, name: 'Covert', rate: 0.64 },
  { rarity: 'gold' as const, name: 'Special', rate: 0.26 },
];

export function DropRates({ show }: DropRatesProps) {
  if (!show) return null;

  return (
    <div className="card">
      <h3 className="text-lg font-medium text-white mb-4">Drop Rates</h3>
      <div className="space-y-3">
        {RATES.map((item) => (
          <div key={item.rarity} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: RARITY_COLORS[item.rarity] }}
              ></div>
              <span className="text-gray-300">{item.name}</span>
            </div>
            <span className="text-sm font-mono text-gray-400">{item.rate.toFixed(2)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DropRates;
