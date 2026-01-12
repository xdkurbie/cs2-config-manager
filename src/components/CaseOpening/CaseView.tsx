import React from 'react';
import { CaseItem } from '../../types/config';
import { RARITY_COLORS } from '../../types/config';

interface CaseViewProps {
  caseData: any;
  onOpen: () => void;
  disabled: boolean;
}

export function CaseView({ caseData, onOpen, disabled }: CaseViewProps) {
  return (
    <button
      onClick={onOpen}
      disabled={disabled}
      className={`p-4 rounded-lg border-2 transition-all ${
        disabled
          ? 'opacity-50 cursor-not-allowed border-gray-800'
          : 'border-gray-700 hover:border-[#de9b35]'
      }`}
    >
      <div className="text-center">
        <div className="text-4xl mb-2">📦</div>
        <div className="text-sm font-medium text-white">{caseData.name}</div>
        <div className="text-xs text-gray-400 mt-1">{caseData.items.length} items</div>
      </div>
    </button>
  );
}

export default CaseView;
