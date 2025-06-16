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
  
  // Estados para controlar a visibilidade dos botões com atraso
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  
  // Refs para armazenar os timeouts
  const leftScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rightScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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

  // Verificar se precisa mostrar os botões de scroll com atraso no desaparecimento
  useEffect(() => {
    const checkOverflow = () => {
      if (!tabsContainerRef.current) return;
      
      const container = tabsContainerRef.current;
      const { scrollLeft, scrollWidth, clientWidth } = container;
      
      // Determinar se os botões devem ser visíveis
      const shouldShowLeft = scrollLeft > 0;
      const shouldShowRight = scrollLeft + clientWidth < scrollWidth;
      
      // Gerenciar botão esquerdo
      if (shouldShowLeft) {
        // Limpar timeout pendente e mostrar imediatamente
        if (leftScrollTimeoutRef.current) {
          clearTimeout(leftScrollTimeoutRef.current);
          leftScrollTimeoutRef.current = null;
        }
        setShowLeftButton(true);
      } else {
        // Se deve esconder e está atualmente visível, iniciar timeout
        if (showLeftButton) {
          if (leftScrollTimeoutRef.current) {
            clearTimeout(leftScrollTimeoutRef.current);
          }
          leftScrollTimeoutRef.current = setTimeout(() => {
            setShowLeftButton(false);
            leftScrollTimeoutRef.current = null;
          }, 500); // 500ms de atraso
        }
      }
      
      // Gerenciar botão direito
      if (shouldShowRight) {
        // Limpar timeout pendente e mostrar imediatamente
        if (rightScrollTimeoutRef.current) {
          clearTimeout(rightScrollTimeoutRef.current);
          rightScrollTimeoutRef.current = null;
        }
        setShowRightButton(true);
      } else {
        // Se deve esconder e está atualmente visível, iniciar timeout
        if (showRightButton) {
          if (rightScrollTimeoutRef.current) {
            clearTimeout(rightScrollTimeoutRef.current);
          }
          rightScrollTimeoutRef.current = setTimeout(() => {
            setShowRightButton(false);
            rightScrollTimeoutRef.current = null;
          }, 500); // 500ms de atraso
        }
      }
    };

    checkOverflow();
    
    const handleResize = () => {
      checkOverflow();
    };

    const handleScroll = () => {
      checkOverflow();
    };

    window.addEventListener('resize', handleResize);
    
    // Adicionar listener de scroll ao container
    if (tabsContainerRef.current) {
      tabsContainerRef.current.addEventListener('scroll', handleScroll);
    }

    // Observer para mudanças no conteúdo
    const observer = new MutationObserver(checkOverflow);
    if (tabsContainerRef.current) {
      observer.observe(tabsContainerRef.current, { 
        childList: true, 
        subtree: true, 
        attributes: true 
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (tabsContainerRef.current) {
        tabsContainerRef.current.removeEventListener('scroll', handleScroll);
      }
      observer.disconnect();
      
      // Limpar timeouts pendentes
      if (leftScrollTimeoutRef.current) {
        clearTimeout(leftScrollTimeoutRef.current);
      }
      if (rightScrollTimeoutRef.current) {
        clearTimeout(rightScrollTimeoutRef.current);
      }
    };
  }, [tabs, showLeftButton, showRightButton]);

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
    <div className="bg-white border-b border-gray-100">
      <div className="w-full px-4 md:px-8">
        <div className="hidden md:block">
          <div className="flex items-center relative">
            {/* Botão de scroll para a esquerda - sempre no DOM com fade */}
            <div className={`absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white via-white to-transparent pl-0 pr-4 py-2 z-10 transition-opacity duration-300 ${
              showLeftButton ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}>
              <button
                onClick={handleScrollLeft}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md active:scale-95"
                title="Rolar para a esquerda"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            {/* Container das tabs com scroll */}
            <div 
              ref={tabsContainerRef}
              className={`flex flex-nowrap overflow-x-auto scrollbar-hide space-x-1 py-2 flex-1 ${
                showLeftButton ? 'pl-16' : ''
              } ${showRightButton ? 'pr-16' : ''}`}
            >
              {tabs.map((tab) => (
                <TabButton
                  key={tab.id}
                  tab={tab}
                  isActive={currentType === tab.id}
                />
              ))}
            </div>
            
            {/* Botão de scroll para a direita - sempre no DOM com fade */}
            <div className={`absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white via-white to-transparent pr-0 pl-4 py-2 z-10 transition-opacity duration-300 ${
              showRightButton ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}>
              <button
                onClick={handleScrollRight}
                className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md active:scale-95"
                title="Rolar para a direita"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
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