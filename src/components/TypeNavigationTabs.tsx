import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Car, 
  Bike, 
  Truck, 
  Bus, 
  Ship, 
  Wrench, 
  Home, 
  Building, 
  TreePine, 
  Store, 
  Warehouse, 
  Mountain, 
  Building2, 
  HelpCircle,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Category } from '../types/auction';
import { 
  VEHICLE_TYPES, 
  PROPERTY_TYPES, 
  VehicleType, 
  PropertyType,
  getVehicleTypeLabel,
  getPropertyTypeLabel,
  isValidVehicleType,
  isValidPropertyType
} from '../utils/typeNormalization';

interface TypeNavigationTabsProps {
  category: Category;
}

interface TabItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  route: string;
}

export const TypeNavigationTabs: React.FC<TypeNavigationTabsProps> = ({ category }) => {
  const navigate = useNavigate();
  const { tipo } = useParams<{ tipo: string }>();
  
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // Normalizar e validar o tipo atual
  const getCurrentType = (): string => {
    if (!tipo) return 'todos';
    
    if (category === 'veiculos') {
      return isValidVehicleType(tipo) ? tipo : 'todos';
    } else {
      return isValidPropertyType(tipo) ? tipo : 'todos';
    }
  };

  const currentType = getCurrentType();

  // Redirecionar se o tipo for inválido
  useEffect(() => {
    if (tipo && tipo !== currentType) {
      navigate(`/buscador/${category}/${currentType}`, { replace: true });
    }
  }, [tipo, currentType, category, navigate]);

  // Usar useMemo para estabilizar o array de tabs e evitar recriações desnecessárias
  const tabs = useMemo((): TabItem[] => {
    if (category === 'veiculos') {
      const vehicleIcons: Record<VehicleType, React.ComponentType<{ className?: string }>> = {
        'todos': MoreHorizontal,
        'carros': Car,
        'motos': Bike,
        'caminhoes': Truck,
        'embarcacoes': Ship,
        'maquinas': Wrench,
        'onibus': Bus,
        'reboques': Truck,
        'recreativos': Car,
        'sucata': Wrench,
        'nao-informado': HelpCircle,
      };

      return VEHICLE_TYPES.map(type => ({
        id: type,
        label: getVehicleTypeLabel(type),
        icon: vehicleIcons[type],
        route: `/buscador/veiculos/${type}`
      }));
    } else {
      const propertyIcons: Record<PropertyType, React.ComponentType<{ className?: string }>> = {
        'todos': MoreHorizontal,
        'apartamentos': Building,
        'casas': Home,
        'comerciais': Store,
        'compactos': Building2,
        'condominios': Building,
        'galpoes': Warehouse,
        'garagem': Car,
        'hospedagem': Building,
        'industriais': Warehouse,
        'mistos': Building2,
        'predios': Building,
        'rurais': TreePine,
        'terrenos': Mountain,
        'nao-informado': HelpCircle,
      };

      return PROPERTY_TYPES.map(type => ({
        id: type,
        label: getPropertyTypeLabel(type),
        icon: propertyIcons[type],
        route: `/buscador/imoveis/${type}`
      }));
    }
  }, [category]); // Dependência apenas da category

  // Funções para rolar horizontalmente
  const handleScrollLeft = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (tabsContainerRef.current) {
      tabsContainerRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handleTabClick = (route: string) => {
    navigate(route);
  };

  const TabButton: React.FC<{ tab: TabItem; isActive: boolean }> = ({ tab, isActive }) => {
    return (
      <button
        onClick={() => handleTabClick(tab.route)}
        className={`
          px-4 py-2.5 text-sm font-medium transition-all duration-200 
          whitespace-nowrap flex-shrink-0 rounded-full border
          ${isActive
            ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 border-gray-200'
          }
        `}
      >
        {tab.label}
      </button>
    );
  };

  return (
    <div className="w-full">
      {/* Desktop version - SEMPRE VISÍVEL a partir de 768px */}
      <div className="hidden min-[768px]:block">
        <div className="relative w-full">
          {/* Container das tabs com scroll */}
          <div 
            ref={tabsContainerRef}
            className="flex overflow-x-auto scrollbar-hide gap-3 py-4"
            style={{
              /* Máscara CSS para esconder o conteúdo que transborda à direita */
              maskImage: 'linear-gradient(to right, black 0%, black calc(100% - 100px), transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, black 0%, black calc(100% - 100px), transparent 100%)'
            }}
          >
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                tab={tab}
                isActive={currentType === tab.id}
              />
            ))}
          </div>
          
          {/* Botões de scroll - POSIÇÃO ABSOLUTA FIXA no canto direito */}
          <div className="absolute top-0 right-0 bottom-0 w-24 flex items-center justify-end gap-2 bg-gradient-to-l from-white via-white/95 to-transparent z-20 pr-2">
            <button
              onClick={handleScrollLeft}
              className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow active:scale-95"
              title="Rolar para a esquerda"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleScrollRight}
              className="w-8 h-8 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow active:scale-95"
              title="Rolar para a direita"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile version - APENAS abaixo de 768px */}
      <div className="max-[767px]:block min-[768px]:hidden">
        <div className="flex overflow-x-auto scrollbar-hide gap-3 py-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {tabs.map((tab) => (
            <div key={tab.id} className="flex-shrink-0">
              <TabButton
                tab={tab}
                isActive={currentType === tab.id}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};