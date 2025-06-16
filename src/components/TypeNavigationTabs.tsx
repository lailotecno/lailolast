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
  MoreHorizontal
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
  const [showMore, setShowMore] = useState(false);
  const [visibleTabs, setVisibleTabs] = useState<TabItem[]>([]);
  const [hiddenTabs, setHiddenTabs] = useState<TabItem[]>([]);
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

  useEffect(() => {
    const calculateVisibleTabs = () => {
      if (!tabsContainerRef.current) return;

      const container = tabsContainerRef.current;
      const containerWidth = container.offsetWidth;
      const moreButtonWidth = 60; // Largura do botão circular "Mais"
      const availableWidth = containerWidth - moreButtonWidth - 16; // 16px de margem

      let currentWidth = 0;
      const visible: TabItem[] = [];
      const hidden: TabItem[] = [];

      // Sempre mostrar "Todos" primeiro
      const todosTab = tabs[0];
      visible.push(todosTab);
      currentWidth += 120;

      // Adicionar outras abas até esgotar o espaço
      for (let i = 1; i < tabs.length; i++) {
        const estimatedTabWidth = 120;
        if (currentWidth + estimatedTabWidth <= availableWidth) {
          visible.push(tabs[i]);
          currentWidth += estimatedTabWidth;
        } else {
          hidden.push(tabs[i]);
        }
      }

      setVisibleTabs(visible);
      setHiddenTabs(hidden);
    };

    calculateVisibleTabs();
    
    const handleResize = () => {
      calculateVisibleTabs();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [tabs]);

  const handleTabClick = (route: string) => {
    navigate(route);
    setShowMore(false);
  };

  const TabButton: React.FC<{ tab: TabItem; isActive: boolean }> = ({ tab, isActive }) => {
    const Icon = tab.icon;
    
    return (
      <button
        onClick={() => handleTabClick(tab.route)}
        className={`flex flex-col items-center justify-center min-w-[90px] px-4 py-4 text-sm font-medium transition-all duration-200 relative group h-20 ${
          isActive
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-600 hover:text-gray-900 border-b-2 border-transparent hover:bg-gray-50'
        }`}
      >
        <Icon className={`w-5 h-5 mb-2 transition-colors ${isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'}`} />
        <span className={`text-xs leading-tight text-center ${isActive ? 'font-semibold' : ''}`}>
          {tab.label}
        </span>
      </button>
    );
  };

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="w-full px-4 md:px-8">
        <div className="hidden md:block">
          <div ref={tabsContainerRef} className="flex items-center justify-between">
            <div className="flex items-center overflow-hidden min-w-0 flex-1">
              <div className="flex space-x-1">
                {visibleTabs.map((tab) => (
                  <TabButton
                    key={tab.id}
                    tab={tab}
                    isActive={currentType === tab.id}
                  />
                ))}
              </div>
            </div>
            
            {/* Botão "Mais" circular inspirado no Airbnb - só aparece quando necessário */}
            {hiddenTabs.length > 0 && (
              <div className="relative flex-shrink-0 ml-4">
                <button
                  onClick={() => setShowMore(!showMore)}
                  className="w-12 h-12 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md active:scale-95"
                  title="Ver mais tipos"
                >
                  <MoreHorizontal className="w-5 h-5 text-gray-600" />
                </button>
                
                {showMore && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowMore(false)}
                    />
                    <div className="absolute top-full right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-20 min-w-[220px] overflow-hidden">
                      <div className="py-2">
                        {hiddenTabs.map((tab) => {
                          const Icon = tab.icon;
                          const isActive = currentType === tab.id;
                          
                          return (
                            <button
                              key={tab.id}
                              onClick={() => handleTabClick(tab.route)}
                              className={`w-full flex items-center px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${
                                isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                              }`}
                            >
                              <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                              <span className={isActive ? 'font-semibold' : 'font-medium'}>{tab.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

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
    </div>
  );
};