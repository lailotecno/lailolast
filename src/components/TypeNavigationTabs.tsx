import React, { useState, useRef, useEffect } from 'react';
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
  ChevronRight,
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

  const getTabsData = (): TabItem[] => {
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
  };

  const tabs = getTabsData();

  useEffect(() => {
    const calculateVisibleTabs = () => {
      if (!tabsContainerRef.current) return;

      const container = tabsContainerRef.current;
      const containerWidth = container.offsetWidth;
      const moreButtonWidth = 120;
      const availableWidth = containerWidth - moreButtonWidth;

      let currentWidth = 0;
      const visible: TabItem[] = [];
      const hidden: TabItem[] = [];

      const todosTab = tabs[0];
      visible.push(todosTab);
      currentWidth += 120;

      for (let i = 1; i < tabs.length - 1; i++) {
        const estimatedTabWidth = 120;
        if (currentWidth + estimatedTabWidth <= availableWidth) {
          visible.push(tabs[i]);
          currentWidth += estimatedTabWidth;
        } else {
          hidden.push(tabs[i]);
        }
      }

      const lastTab = tabs[tabs.length - 1];
      if (currentWidth + 120 <= availableWidth) {
        visible.push(lastTab);
      } else {
        hidden.push(lastTab);
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
            <div className="flex items-center overflow-hidden min-w-0">
              <div className="flex space-x-1">
                {visibleTabs.map((tab) => (
                  <TabButton
                    key={tab.id}
                    tab={tab}
                    isActive={currentType === tab.id}
                  />
                ))}
              </div>
              
              {/* Reservar espaço fixo para o botão "Mais" para evitar layout shift */}
              <div className="relative ml-2 flex-shrink-0 w-[120px] h-20 flex items-center">
                {hiddenTabs.length > 0 && (
                  <button
                    onClick={() => setShowMore(!showMore)}
                    className="flex items-center px-4 py-4 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <ChevronRight className="w-4 h-4 mr-1" />
                    <span>Mais</span>
                  </button>
                )}
                
                {showMore && hiddenTabs.length > 0 && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowMore(false)}
                    />
                    <div className="absolute top-full right-0 mt-1 bg-white rounded-2xl shadow-xl border border-gray-100 z-20 min-w-[220px] overflow-hidden">
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
            </div>
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