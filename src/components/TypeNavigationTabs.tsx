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
    const Icon = tab.icon;
    
    return (
      <button
        onClick={() => handleTabClick(tab.route)}
        className={`flex flex-col items-center justify-center min-w-[90px] px-4 py-3 text-sm font-medium transition-all duration-200 relative group ${
          isActive
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:bg-gray-50'
        }`}
        style={{ minHeight: '44px' }}
      >
        <Icon className={`w-5 h-5 mb-1 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
        <span className={`text-xs leading-tight text-center whitespace-nowrap ${isActive ? 'font-semibold' : ''}`}>
          {tab.label}
        </span>
      </button>
    );
  };

  return (
    <div className="w-full">
      {/* Desktop version - Always visible */}
      <div className="hidden md:block">
        <div className="flex items-center relative">
          {/* Container das tabs com scroll */}
          <div 
            ref={tabsContainerRef}
            className="flex flex-nowrap overflow-x-auto scrollbar-hide space-x-1 py-2 flex-1"
          >
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                tab={tab}
                isActive={currentType === tab.id}
              />
            ))}
          </div>
          
          {/* Botões de scroll no final - lado a lado e menores */}
          <div className="flex items-center gap-1 ml-4 flex-shrink-0">
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

      {/* Mobile version */}
      <div className="md:hidden">
        <div className="flex overflow-x-auto scrollbar-hide space-x-1 py-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
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