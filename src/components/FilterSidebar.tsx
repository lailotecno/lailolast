import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Category } from '../types/auction';
import { ImoveisFilters } from './filters/ImoveisFilters';
import { VeiculosFilters } from './filters/VeiculosFilters';
import { useParams } from 'react-router-dom';

interface FilterSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
  category: Category;
}

// Default filter states
const defaultImoveisFilters = {
  estado: "",
  cidade: "",
  area: [0, 1000] as [number, number],
  valor: [0, 5000000] as [number, number],
  formato: "",
  origem: [] as string[],
  etapa: [] as string[]
}

const defaultVeiculosFilters = {
  estado: "",
  cidade: "",
  marca: "",
  modelo: "",
  cor: "",
  ano: [1990, 2024] as [number, number],
  preco: [0, 500000] as [number, number],
  formato: "",
  origem: [] as string[],
  etapa: [] as string[]
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  isOpen = true, 
  onClose, 
  isMobile = false,
  category
}) => {
  const { tipo } = useParams<{ tipo: string }>();
  const [imoveisFilters, setImoveisFilters] = useState(defaultImoveisFilters)
  const [veiculosFilters, setVeiculosFilters] = useState(defaultVeiculosFilters)

  const handleImoveisFiltersChange = (newFilters: Partial<typeof defaultImoveisFilters>) => {
    setImoveisFilters(prev => ({ ...prev, ...newFilters }))
  }

  const handleVeiculosFiltersChange = (newFilters: Partial<typeof defaultVeiculosFilters>) => {
    setVeiculosFilters(prev => ({ ...prev, ...newFilters }))
  }

  const handleClearFilters = () => {
    if (category === 'imoveis') {
      setImoveisFilters(defaultImoveisFilters)
    } else {
      setVeiculosFilters(defaultVeiculosFilters)
    }
  }

  const handleApplyFilters = () => {
    // TODO: Apply filters logic
    console.log('Applying filters:', category === 'imoveis' ? imoveisFilters : veiculosFilters)
    if (isMobile && onClose) {
      onClose()
    }
  }

  if (isMobile) {
    return (
      <>
        {/* Backdrop */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={onClose}
          />
        )}
        
        {/* Modal - TELA COMPLETA SEM MOSTRAR LISTAGEM */}
        <div
          className={`fixed inset-0 bg-white z-[70] transform transition-transform duration-300 flex flex-col ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white flex-shrink-0">
            <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filters content - Scrollable area */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
            {category === 'imoveis' ? (
              <ImoveisFilters
                filters={imoveisFilters}
                onFiltersChange={handleImoveisFiltersChange}
              />
            ) : (
              <VeiculosFilters
                filters={veiculosFilters}
                onFiltersChange={handleVeiculosFiltersChange}
                currentVehicleType={tipo || 'todos'}
              />
            )}
          </div>

          {/* Footer - Fixed at bottom */}
          <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
            <div className="flex gap-3">
              <button 
                onClick={handleClearFilters}
                className="flex-1 px-4 py-3 text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Limpar
              </button>
              <button 
                onClick={handleApplyFilters}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                Aplicar
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop version - Compact for notebook screens (768px+)
  return (
    <div className="relative w-full h-full bg-white border-r border-gray-200">
      {/* Header - Compact spacing */}
      <div className="absolute top-4 left-0 right-0 px-4 md:px-6 py-3 border-b border-gray-200 bg-white z-10">
        <h2 className="text-base font-semibold text-gray-900">Filtros</h2>
      </div>

      {/* Filters content - Compact spacing */}
      <div className="absolute top-16 bottom-16 left-0 right-0 overflow-y-auto px-4 md:px-6 py-3 scrollbar-hide">
        {category === 'imoveis' ? (
          <ImoveisFilters
            filters={imoveisFilters}
            onFiltersChange={handleImoveisFiltersChange}
          />
        ) : (
          <VeiculosFilters
            filters={veiculosFilters}
            onFiltersChange={handleVeiculosFiltersChange}
            currentVehicleType={tipo || 'todos'}
          />
        )}
      </div>

      {/* Footer - Compact */}
      <div className="absolute bottom-0 left-0 right-0 px-4 md:px-6 py-3 border-t border-gray-200 bg-white z-10">
        <div className="flex gap-2">
          <button 
            onClick={handleClearFilters}
            className="flex-1 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            Limpar
          </button>
          <button 
            onClick={handleApplyFilters}
            className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
};