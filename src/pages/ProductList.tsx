// import React, { useState, useEffect } from 'react';
// import { useParams, useSearchParams, Link } from 'react-router-dom';
// import { Filter, Grid, List, ChevronDown } from 'lucide-react';
// import { ProductCard } from '../components/product/ProductCard';
// import { FilterSidebar } from '../components/product/FilterSidebar';
// import { Pagination } from '../components/common/Pagination';
// import { LoadingSpinner, ProductCardSkeleton } from '../components/common/LoadingSpinner';
// import { Product, FilterOptions } from '../types';
// import { filterProducts, sortProducts, paginateProducts, getUniqueBrands } from '../utils/helpers';
// import { useFilterStore } from '../store/useStore';
// import { useProductsQuery } from '../hooks/useProducts';

// export const ProductList: React.FC = () => {
//   const { categoryName } = useParams<{ categoryName: string }>();
//   const [searchParams] = useSearchParams();
//   const searchQuery = searchParams.get('q') || '';
  
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
//   const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const { filters, setFilters } = useFilterStore();

//   const { data, isLoading, isError } = useProductsQuery(categoryName);

//   useEffect(() => {
//     if (data) setProducts(data);
//     setLoading(isLoading);
//   }, [data, isLoading]);

//   useEffect(() => {
//     // Apply filters and search
//     let filtered = filterProducts(products, filters, searchQuery);
//     filtered = sortProducts(filtered, filters.sortBy);
//     setFilteredProducts(filtered);
//     setCurrentPage(1); // Reset to first page when filters change
//   }, [products, filters, searchQuery]);

//   const handleFilterChange = (newFilters: FilterOptions) => {
//     setFilters(newFilters);
//   };

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const getPageTitle = () => {
//     if (searchQuery) {
//       return `Search Results for "${searchQuery}"`;
//     }
//     if (categoryName && categoryName !== 'all') {
//       const categoryDisplay = categoryName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
//       return `${categoryDisplay} Products`;
//     }
//     return 'All Products';
//   };

//   const getPageDescription = () => {
//     if (searchQuery) {
//       return `Found ${filteredProducts.length} products matching "${searchQuery}"`;
//     }
//     if (categoryName && categoryName !== 'all') {
//       return `Browse our collection of ${categoryName.replace(/-/g, ' ')} products`;
//     }
//     return 'Discover amazing products across all categories';
//   };

//   const brands = getUniqueBrands(products);
//   const { products: paginatedProducts, totalPages } = paginateProducts(filteredProducts, currentPage, 12);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-10">
//         <div className="container mx-auto px-4">
//           <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto">
//             {/* Header skeleton */}
//             <div className="mb-6">
//               <div className="bg-gray-200 h-8 w-1/3 rounded animate-pulse mb-2"></div>
//               <div className="bg-gray-200 h-6 w-1/2 rounded animate-pulse"></div>
//             </div>
            
//             {/* Content skeleton */}
//             <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//               {/* Filter skeleton */}
//               <div className="lg:col-span-1">
//                 <div className="bg-white rounded-xl border border-gray-100 p-5">
//                   <div className="space-y-4">
//                     {[...Array(4)].map((_, i) => (
//                       <div key={i}>
//                         <div className="bg-gray-200 h-4 w-24 rounded animate-pulse mb-3"></div>
//                         {[...Array(3)].map((_, j) => (
//                           <div key={j} className="bg-gray-200 h-3 w-full rounded animate-pulse mb-2"></div>
//                         ))}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
              
//               {/* Products skeleton */}
//               <div className="lg:col-span-3">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {[...Array(6)].map((_, i) => (
//                     <ProductCardSkeleton key={i} />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-10">
//         <div className="container mx-auto px-4">
//           <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto text-center">
//             <p className="text-gray-600">Failed to load products. Please try again.</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="container mx-auto px-4">
//         <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto">
//           {/* Page Header */}
//           <div className="mb-6">
//             <h1 className="text-3xl font-bold text-[#2D3748] mb-1">{getPageTitle()}</h1>
//             <p className="text-base text-[#718096]">{getPageDescription()}</p>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//             {/* Mobile Filter Toggle */}
//             <div className="lg:hidden">
//               <button
//                 onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
//                 className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-[#2D3748] font-medium hover:bg-gray-50 transition-colors"
//               >
//                 <Filter className="w-5 h-5" />
//                 <span>Filters & Sort</span>
//                 <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${
//                   isMobileFilterOpen ? 'rotate-180' : ''
//                 }`} />
//               </button>
//             </div>

//             {/* Mobile Filters */}
//             {isMobileFilterOpen && (
//               <div className="lg:hidden col-span-1">
//                 <FilterSidebar
//                   filters={filters}
//                   brands={brands}
//                   onFilterChange={handleFilterChange}
//                   totalProducts={filteredProducts.length}
//                 />
//               </div>
//             )}

//             {/* Desktop Filters */}
//             <div className="hidden lg:block lg:col-span-1">
//               <FilterSidebar
//                 filters={filters}
//                 brands={brands}
//                 onFilterChange={handleFilterChange}
//                 totalProducts={filteredProducts.length}
//               />
//             </div>

//             {/* Products Section */}
//             <div className="lg:col-span-3">
//               {/* Results Header */}
//               <div className="bg-white rounded-xl border border-gray-100 p-3 mb-4">
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
//                   <div className="flex items-center space-x-3">
//                     <span className="text-sm text-[#718096]">
//                       {filteredProducts.length} products found
//                     </span>
//                     {searchQuery && (
//                       <span className="text-sm text-[#718096]">
//                         for "{searchQuery}"
//                       </span>
//                     )}
//                   </div>
                  
//                   <div className="flex items-center space-x-2">
//                     {/* View Mode Toggle */}
//                     <div className="flex items-center bg-gray-100 rounded-lg p-1">
//                       <button
//                         onClick={() => setViewMode('grid')}
//                         className={`p-2 rounded-md transition-all duration-200 ${
//                           viewMode === 'grid'
//                             ? 'bg-white text-[#5BA4B0] shadow-sm'
//                             : 'text-[#718096] hover:text-[#2D3748]'
//                         }`}
//                         title="Grid view"
//                       >
//                         <Grid className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => setViewMode('list')}
//                         className={`p-2 rounded-md transition-all duration-200 ${
//                           viewMode === 'list'
//                             ? 'bg-white text-[#5BA4B0] shadow-sm'
//                             : 'text-[#718096] hover:text-[#2D3748]'
//                         }`}
//                         title="List view"
//                       >
//                         <List className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Products Grid */}
//               {filteredProducts.length === 0 ? (
//                 <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
//                   <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <Filter className="w-10 h-10 text-[#718096]" />
//                   </div>
//                   <h3 className="text-lg font-semibold text-[#2D3748] mb-2">No products found</h3>
//                   <p className="text-[#718096] mb-4">
//                     Try adjusting your filters or search terms to find what you're looking for.
//                   </p>
//                   <button
//                     onClick={() => setFilters({
//                       priceRange: [0, 1000],
//                       brands: [],
//                       rating: 0,
//                       sortBy: 'popular'
//                     })}
//                     className="inline-flex items-center bg-[#5BA4B0] hover:bg-[#4A8A94] text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-200"
//                   >
//                     Clear All Filters
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <div className={`grid gap-4 ${
//                     viewMode === 'grid'
//                       ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
//                       : 'grid-cols-1'
//                   }`}>
//                     {paginatedProducts.map((product) => (
//                       <ProductCard 
//                         key={product.id} 
//                         product={product} 
//                         variant={viewMode === 'list' ? 'compact' : 'default'}
//                       />
//                     ))}
//                   </div>

//                   {/* Pagination */}
//                   {totalPages > 1 && (
//                     <div className="mt-8">
//                       <Pagination
//                         currentPage={currentPage}
//                         totalPages={totalPages}
//                         onPageChange={handlePageChange}
//                       />
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown, AlertCircle } from 'lucide-react';
import { ProductCard } from '../components/product/ProductCard';
import { FilterSidebar } from '../components/product/FilterSidebar';
import { Pagination } from '../components/common/Pagination';
import { ProductCardSkeleton } from '../components/common/LoadingSpinner';
import { Product, FilterOptions } from '../types';
import { filterProducts, sortProducts, paginateProducts, getUniqueBrands } from '../utils/helpers';
import { useFilterStore } from '../store/useStore';
import { useProductsQuery } from '../hooks/useProducts';

export const ProductList: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const { filters, setFilters } = useFilterStore();
  const { data, isLoading, isError, isFetching } = useProductsQuery(categoryName);

  // Sync API results into local state
  useEffect(() => {
    if (data) setProducts(data);
  }, [data]);

  // Apply filters and search
  useEffect(() => {
    let filtered = filterProducts(products, filters, searchQuery);
    filtered = sortProducts(filtered, filters.sortBy);
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, filters, searchQuery]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageTitle = () => {
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    if (categoryName && categoryName !== 'all') {
      const categoryDisplay = categoryName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      return `${categoryDisplay} Products`;
    }
    return 'All Products';
  };

  const getPageDescription = () => {
    if (searchQuery) return `Found ${filteredProducts.length} products matching "${searchQuery}"`;
    if (categoryName && categoryName !== 'all')
      return `Browse our collection of ${categoryName.replace(/-/g, ' ')} products`;
    return 'Discover amazing products across all categories';
  };

  const brands = getUniqueBrands(products);
  const { products: paginatedProducts, totalPages } = paginateProducts(filteredProducts, currentPage, 12);

  // ---------- UI STATES ----------

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto">
            <div className="mb-6">
              <div className="bg-gray-200 h-8 w-1/3 rounded animate-pulse mb-2"></div>
              <div className="bg-gray-200 h-6 w-1/2 rounded animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i}>
                      <div className="bg-gray-200 h-4 w-24 rounded animate-pulse mb-3"></div>
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="bg-gray-200 h-3 w-full rounded animate-pulse mb-2"></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 py-10 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Failed to load products</h2>
          <p className="text-gray-600 mb-4">Please refresh the page or try again later.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ---------- MAIN RENDER ----------

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#2D3748] mb-1">{getPageTitle()}</h1>
            <p className="text-base text-[#718096]">{getPageDescription()}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-[#2D3748] font-medium hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>Filters & Sort</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isMobileFilterOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* Mobile Filters Drawer */}
            {isMobileFilterOpen && (
              <div className="lg:hidden col-span-1 bg-white rounded-xl border border-gray-100 p-5">
                <FilterSidebar
                  filters={filters}
                  brands={brands}
                  onFilterChange={handleFilterChange}
                  totalProducts={filteredProducts.length}
                />
              </div>
            )}

            {/* Desktop Filters */}
            <div className="hidden lg:block lg:col-span-1">
              <FilterSidebar
                filters={filters}
                brands={brands}
                onFilterChange={handleFilterChange}
                totalProducts={filteredProducts.length}
              />
            </div>

            {/* Products Section */}
            <div className="lg:col-span-3">
              {/* Results Header */}
              <div className="bg-white rounded-xl border border-gray-100 p-3 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-sm text-[#718096]">
                  <span>{filteredProducts.length} products found</span>
                  {searchQuery && <span>for "{searchQuery}"</span>}
                  {isFetching && <span className="text-xs text-sky-500">Updating...</span>}
                </div>

                <div className="flex items-center space-x-2">
                  {/* View Mode Toggle */}
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-md ${
                        viewMode === 'grid'
                          ? 'bg-white text-sky-600 shadow-sm'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                      title="Grid view"
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-md ${
                        viewMode === 'list'
                          ? 'bg-white text-sky-600 shadow-sm'
                          : 'text-gray-500 hover:text-gray-800'
                      }`}
                      title="List view"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Products */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-10 h-10 text-[#718096]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#2D3748] mb-2">No products found</h3>
                  <p className="text-[#718096] mb-4">
                    Try adjusting your filters or search terms to find what you're looking for.
                  </p>
                  <button
                    onClick={() =>
                      setFilters({
                        priceRange: [0, 2000],
                        brands: [],
                        rating: 0,
                        sortBy: 'newest',
                      })
                    }
                    className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <>
                  <div
                    className={`grid gap-4 ${
                      viewMode === 'grid'
                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        : 'grid-cols-1'
                    }`}
                  >
                    {paginatedProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        variant={viewMode === 'list' ? 'compact' : 'default'}
                      />
                    ))}
                  </div>

                  {totalPages > 1 && (
                    <div className="mt-8">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



