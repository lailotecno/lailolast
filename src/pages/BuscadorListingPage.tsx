import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Grid3x3, LayoutList, ChevronDown, SlidersHorizontal, ArrowUpDown, Search, X } from 'lucide-react';
import { AuctionCard } from '../components/AuctionCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { SortPopover } from '../components/SortPopover';
import { TypeNavigationTabs } from '../components/TypeNavigationTabs';
import { Pagination } from '../components/Pagination';
import { getAuctionsByCategory } from '../data/mockAuctions';
import { ViewMode, SortOption, Category } from '../types/auction';
import { isValidVehicleType, isValidPropertyType } from '../utils/typeNormalization';

interface BuscadorListingPageProps {
  category: Category;
}

const ITEMS_PER_PAGE = 30;

export const BuscadorListingPage: React.FC<BuscadorListingPageProps> = ({ category }) => {
  const { tipo } = useParams<{ tipo: string }>();
  const [viewMode, setViewMode] = useState<ViewMode>('horizontal');
  const [showFilters, setShowFilters] = useState(false);
  const [showSortPopover, setShowSortPopover] = useState(false);
  const [selectedSort, setSelectedSort] = useState<SortOption>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Validar e normalizar o tipo
  const getCurrentType = (): string => {
    if (!tipo) return 'todos';
    
    if (category === 'veiculos') {
      return isValidVehicleType(tipo) ? tipo : 'todos';
    } else {
      return isValidPropertyType(tipo) ? tipo : 'todos';
    }
  };

  const currentType = getCurrentType();
  const allAuctions = getAuctionsByCategory(category, currentType);
  
  // Calculate pagination
  const totalPages = Math.ceil(allAuctions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentAuctions = allAuctions.slice(startIndex, endIndex);
  
  const getStatusText = () => {
    const count = allAuctions.length;
    const newCount = allAuctions.filter(auction => auction.isNew).length;
    return `Encontramos ${count} leilões em 8 sites • ${newCount} novos hoje`;
  };

  const getSortLabel = (sort: SortOption) => {
    const labels = {
      'newest': 'Mais recentes',
      'lowest-bid': 'Menor valor',
      'highest-bid': 'Maior valor',
      'highest-discount': 'Maior desconto',
      'nearest': 'Mais próximos',
    };
    return labels[sort];
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'vertical' ? 'horizontal' : 'vertical');
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (showSearch) {
      setSearchQuery('');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Search query:', searchQuery);
  };

  return (
    <div className="flex flex-col h-screen pb-20 md:pb-0 md:pl-20 overflow-x-hidden">
      {/* Type Navigation Tabs with View Toggle - Desktop Only */}
      <div className="hidden lg:block">
        <div className="bg-white border-b border-gray-100">
          <div className="w-full px-4 md:px-8">
            <div className="flex items-center">
              <div className="flex-1">
                <TypeNavigationTabs category={category} />
              </div>
              
              {/* Divider */}
              <div className="h-8 w-px bg-gray-200 mx-4"></div>
              
              {/* View Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1 flex-shrink-0">
                <button
                  onClick={() => setViewMode('horizontal')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'horizontal'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  title="Visualização horizontal"
                >
                  <LayoutList className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('vertical')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'vertical'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  title="Visualização em grade"
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Action Bar - Fixed at top with consistent height */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-30 h-16">
        {showSearch ? (
          // Search Bar Mode
          <div className="px-4 py-3 h-full flex items-center">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-3 w-full">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Busque por palavra-chave"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  autoFocus
                />
              </div>
              <button
                type="button"
                onClick={handleSearchToggle}
                className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          // Normal Action Bar Mode
          <div className="px-4 py-3 h-full flex items-center">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSearchToggle}
                  className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => setShowSortPopover(true)}
                  className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => setShowFilters(true)}
                  className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>
              
              <div className="bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('horizontal')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'horizontal'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <LayoutList className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('vertical')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'vertical'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-1 min-h-0 overflow-x-hidden">
        {/* Desktop Sidebar - Fixed height with internal scroll */}
        <div className="hidden lg:block w-[35%] max-w-md flex-shrink-0">
          <FilterSidebar category={category} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-0 min-w-0 overflow-x-hidden">
          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden pt-16 lg:pt-0">
            {/* Mobile Type Navigation Tabs - Inside scrollable area */}
            <div className="lg:hidden overflow-x-hidden">
              <TypeNavigationTabs category={category} />
            </div>
            
            <main className="w-full px-4 md:px-8 overflow-x-hidden">
              {/* Header with status and desktop sort control */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4 gap-4 w-full">
                <div className="min-w-0 flex-1">
                  <p className="text-gray-600 text-sm break-words">
                    Encontramos <span className="font-semibold text-blue-600">{allAuctions.length}</span> leilões em <span className="font-semibold text-blue-600">8</span> sites • <span className="font-semibold text-blue-600">{allAuctions.filter(auction => auction.isNew).length}</span> novos hoje
                  </p>
                </div>
                
                {/* Desktop Sort Control Only */}
                <div className="hidden lg:flex items-center flex-shrink-0">
                  <div className="relative">
                    <button
                      onClick={() => setShowSortPopover(!showSortPopover)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
                    >
                      <span>{getSortLabel(selectedSort)}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    
                    <SortPopover
                      isOpen={showSortPopover}
                      onClose={() => setShowSortPopover(false)}
                      selectedSort={selectedSort}
                      onSortChange={setSelectedSort}
                    />
                  </div>
                </div>
              </div>

              {/* Auction Cards */}
              <div className={
                viewMode === 'horizontal'
                  ? 'space-y-3 md:space-y-4 w-full'
                  : 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4 w-full'
              }>
                {currentAuctions.map((auction) => (
                  <AuctionCard
                    key={auction.id}
                    auction={auction}
                    viewMode={viewMode}
                  />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 md:mt-12 mb-8 w-full overflow-x-auto">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <FilterSidebar
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        isMobile={true}
        category={category}
      />

      {/* Mobile Sort Popover */}
      <SortPopover
        isOpen={showSortPopover}
        onClose={() => setShowSortPopover(false)}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
        isMobile={true}
      />
    </div>
  );
};