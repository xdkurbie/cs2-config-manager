import React from 'react';
import { CaseItem } from '../../types/config';
import { RARITY_COLORS } from '../../types/config';

interface ItemCardProps {
  item: CaseItem;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <div
      className="relative bg-[#1b1b1b] border-2 rounded-lg p-4 hover:scale-105 transition-transform"
      style={{ borderColor: RARITY_COLORS[item.rarity] }}
    >
      <div className="text-center">
        <div className="w-full aspect-square bg-[#0f0f0f] rounded-lg flex items-center justify-center mb-3">
          <span className="text-5xl">🔫</span>
        </div>
        <div className="text-sm font-bold text-white mb-1">{item.name}</div>
        {item.wear && (
          <div className="text-xs text-gray-400 capitalize">{item.wear}</div>
        )}
        <div
          className="text-sm font-medium mt-2"
          style={{ color: RARITY_COLORS[item.rarity] }}
        >
          {item.rarity.charAt(0).toUpperCase() + item.rarity.slice(1)}
        </div>
        {item.value && (
          <div className="text-lg font-bold text-[#de9b35] mt-1">
            ${item.value.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
