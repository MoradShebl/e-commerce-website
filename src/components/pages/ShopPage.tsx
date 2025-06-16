import { useParams } from 'react-router-dom';
import items from '../../../items.json';
import ProductCard from '../ProductCard';
import { useState, useMemo, useCallback } from 'react';

const ShopPage = () => {
  const { dress_style } = useParams<{ dress_style?: string }>();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);

  const prices = items.map((i) => i.offer_price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const [priceRange, setPriceRange] = useState<number>(maxPrice);

  // Memoize filtered items to avoid recalculation on every render
  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        (!dress_style || item.dress_style === dress_style) &&
        (selectedColor === '' || item.colors.includes(selectedColor)) &&
        (selectedType === '' || item.type === selectedType) &&
        (selectedSizes.length === 0 || selectedSizes.some((size) => item.sizes.includes(size))) &&
        item.offer_price <= priceRange
    );
  }, [dress_style, selectedColor, selectedType, selectedSizes, priceRange]);

  const typefilteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        (!dress_style || item.dress_style === dress_style) &&
        (selectedColor === '' || item.colors.includes(selectedColor))
    );
  }, [dress_style, selectedColor]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFilterChange = useCallback((filterSetter: any, value: any) => {
    filterSetter(value);
    setCurrentPage(1);
  }, []);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of products section
    document.querySelector('main')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (count: number) => {
    setItemsPerPage(count);
    setCurrentPage(1);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-6 px-4 sm:px-6 lg:px-16 py-4 sm:py-8">
      {/* Breadcrumb Navigation */}
      <nav className="mb-4 sm:mb-6 lg:mb-8 text-sm text-gray-600">
        <a href='/' className="hover:text-gray-800 transition-colors">Home</a> 
        <span className="mx-2">/</span>
        <a href={`/shop/${dress_style}`} className="hover:text-gray-800 transition-colors">
          {dress_style}
        </a>
      </nav>

      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-4">
        <button
          onClick={toggleFilters}
          className="flex items-center justify-center w-full py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
          </svg>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      <div className='flex flex-col lg:flex-row gap-4 lg:gap-6'>
        {/* Filters Sidebar */}
        <aside className={`w-full lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-bold satoshi">Filters</h2>
              <button
                onClick={toggleFilters}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <hr className='border-gray-300' />

            {/* Type Filter */}
            <div className="py-4">
              <h3 className="font-medium satoshi mb-3 text-gray-700">Type</h3>
              <div className="space-y-2">
                {[...new Set(typefilteredItems.map((item: any) => item.type))].map((type, idx) => (
                  <button
                    key={idx}
                    className={`w-full text-left p-2 rounded-md transition-colors ${
                      selectedType === type 
                        ? 'bg-black text-white' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => handleFilterChange(setSelectedType, type)}
                  >
                    {type}
                  </button>
                ))}
                <button 
                  className={`w-full text-left p-2 rounded-md transition-colors ${
                    selectedType === '' 
                      ? 'bg-black text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => handleFilterChange(setSelectedType, "")}
                >
                  All Types
                </button>
              </div>
            </div>

            <hr className='border-gray-300' />

            {/* Price Range Filter */}
            <div className="py-4">
              <label className="block text-gray-700 font-medium satoshi mb-3">
                Max Price: <span className="font-bold">${priceRange}</span>
              </label>
              <input
                type="range"
                className="w-full accent-black"
                min={minPrice}
                max={maxPrice}
                value={priceRange}
                onChange={(e) => handleFilterChange(setPriceRange, Number(e.target.value))}
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>${minPrice}</span>
                <span>${maxPrice}</span>
              </div>
            </div>

            <hr className='border-gray-300' />

            {/* Color Filter */}
            <div className="py-4">
              <label className="block text-gray-700 font-medium satoshi mb-3">Color</label>
              <div className="flex gap-2 flex-wrap">
                {[...new Set(items.flatMap((item) => item.colors))].map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColor === color 
                        ? 'ring-2 ring-black ring-offset-2' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                    onClick={() => handleFilterChange(setSelectedColor, color)}
                    title={color}
                  ></button>
                ))}
                <button
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    selectedColor === '' 
                      ? 'bg-black text-white border-black' 
                      : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                  }`}
                  onClick={() => handleFilterChange(setSelectedColor, '')}
                >
                  All
                </button>
              </div>
            </div>

            <hr className='border-gray-300' />

            {/* Size Filter */}
            <div className="py-4">
              <label className="block text-gray-700 font-medium satoshi mb-3">Size</label>
              <div className="flex flex-wrap gap-2">
                {[...new Set(items.flatMap((item) => item.sizes || []))].map((size) => {
                  const isSelected = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      className={`py-2 px-3 text-sm rounded-full font-medium transition-all ${
                        isSelected 
                          ? 'bg-black text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      onClick={() => {
                        const newSizes = isSelected 
                          ? selectedSizes.filter((s) => s !== size) 
                          : [...selectedSizes, size];
                        handleFilterChange(setSelectedSizes, newSizes);
                      }}
                    >
                      {size}
                    </button>
                  );
                })}
                <button
                  className="py-2 px-3 text-sm rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                  onClick={() => handleFilterChange(setSelectedSizes, [])}
                >
                  All
                </button>
              </div>
            </div>

            {/* Clear All Filters Button */}
            <div className="pt-4 border-t border-gray-300">
              <button
                onClick={() => {
                  setSelectedColor('');
                  setSelectedType('');
                  setSelectedSizes([]);
                  setPriceRange(maxPrice);
                  setCurrentPage(1);
                }}
                className="w-full py-2 px-4 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full lg:w-3/4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold satoshi mb-2 sm:mb-0">
              {dress_style}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <div className="text-sm text-gray-600">
                {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
              </div>
              
              {/* Items per page selector */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-600">Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6 mb-8">
            {currentItems.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-lg text-gray-600 mb-2">No items found</p>
                <p className="text-sm text-gray-500">Try adjusting your filters to see more results</p>
              </div>
            ) : (
              currentItems.map((item: any, idx: number) => {
                const firstColor = Object.keys(item.images)[0];
                const image = item.images[selectedColor === '' ? firstColor : selectedColor] || [item.images[firstColor]?.[0]];
                return (
                  <ProductCard
                    key={`${item.id}-${idx}`}
                    images={image}
                    name={item.name}
                    stars={item.stars}
                    offer_price={item.offer_price}
                    price={item.price}
                  />
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} of {filteredItems.length} items
              </div>
              
              <div className="flex items-center gap-2">
                {/* Previous button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>

                {/* Page numbers */}
                <div className="flex gap-1">
                  {getPageNumbers().map((page, idx) => (
                    page === '...' ? (
                      <span key={idx} className="px-3 py-2 text-sm text-gray-400">...</span>
                    ) : (
                      <button
                        key={idx}
                        onClick={() => handlePageChange(page as number)}
                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-black text-white'
                            : 'border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    )
                  ))}
                </div>

                {/* Next button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-sm border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopPage;