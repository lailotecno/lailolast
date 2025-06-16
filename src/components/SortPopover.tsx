import React from 'react';
import { Check, X, ChevronDown } from 'lucide-react';
import { SortOption } from '../types/auction';

interface SortPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  isMobile?: boolean;
}

export const SortPopover: React.FC<SortPopoverProps> = ({
  isOpen,
  onClose,
  selectedSort,
  onSortChange,
  isMobile = false
}) => {
  const sortOptions = [
    { value: 'newest' as SortOption, label: 'Mais recentes' },
    { value: 'lowest-bid' as SortOption, label: 'Menor valor' },
    { value: 'highest-bid' as SortOption, label: 'Maior valor' },
    { value: 'highest-discount' as SortOption, label: 'Maior desconto' },
    { value: 'nearest' as SortOption, label: 'Mais próximos' },
  ];

  const handleSelect = (value: SortOption) => {
    onSortChange(value);
    onClose();
  };

  if (!isOpen) return null;

  if (isMobile) {
    return (
      <>
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={onClose}
        />
        
        <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-xl z-50 p-6 shadow-2xl">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <ChevronDown className="w-5 h-5 text-blue-600" />
              <h3 className="text-xl font-bold text-gray-900">Ordenar por</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="w-full flex items-center justify-between px-4 py-4 text-left hover:bg-gray-50 rounded-xl transition-colors"
              >
                <span className="text-gray-900 font-medium">{option.label}</span>
                {selectedSort === option.value && (
                  <Check className="w-5 h-5 text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <ChevronDown className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-gray-900">Ordenar por</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      <div className="py-2">
        {sortOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-900 font-medium">{option.label}</span>
            {selectedSort === option.value && (
              <Check className="w-4 h-4 text-blue-600" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};