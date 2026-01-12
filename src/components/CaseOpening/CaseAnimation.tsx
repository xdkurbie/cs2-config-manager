import React, { useEffect, useState } from 'react';
import { Case, CaseItem } from '../../types/config';
import { RARITY_COLORS } from '../../types/config';

interface CaseAnimationProps {
  caseData: Case;
  result: CaseItem | null;
  isOpening: boolean;
}

export function CaseAnimation({ caseData, result, isOpening }: CaseAnimationProps) {
  const [spinning, setSpinning] = useState(false);
  const [displayItems, setDisplayItems] = useState<CaseItem[]>([]);

  useEffect(() => {
    if (isOpening) {
      setSpinning(true);
      setDisplayItems(caseData.items);
    }
  }, [isOpening, caseData]);

  if (!result) {
    return (
      <div className="text-center text-gray-500 py-12">
        <div className="text-6xl mb-4">📦</div>
        <p>Select a case and click "Open Case"</p>
      </div>
    );
  }

  return (
    <div className="text-center py-8 animate-fade-in">
      <div
        className="w-32 h-32 mx-auto mb-4 rounded-lg border-4 animate-bounce"
        style={{
          borderColor: RARITY_COLORS[result.rarity],
        }}
      >
        <div className="w-full h-full bg-[#1b1b1b] flex items-center justify-center">
          <span className="text-6xl">🔫</span>
        </div>
      </div>
      <div
        className="text-3xl font-bold mb-2"
        style={{ color: RARITY_COLORS[result.rarity] }}
      >
        {result.name}
      </div>
      <div className="text-lg text-gray-400 capitalize mb-2">{result.wear}</div>
      {result.value && (
        <div className="text-3xl font-bold text-[#de9b35]">
          ${result.value.toFixed(2)}
        </div>
      )}
      <div className="text-sm text-gray-500 capitalize mt-2">{result.rarity}</div>
    </div>
  );
}

export default CaseAnimation;
