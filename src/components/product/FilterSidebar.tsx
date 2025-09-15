// import React from 'react';
// import { Star, X } from 'lucide-react';
// import { FilterOptions } from '../../types';

// interface FilterSidebarProps {
//   filters: FilterOptions;
//   brands: string[];
//   onFilterChange: (filters: FilterOptions) => void;
//   totalProducts: number;
// }

// export const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
//   filters, 
//   brands, 
//   onFilterChange, 
//   totalProducts 
// }) => {
//   const handlePriceChange = (min: number, max: number) => {
//     onFilterChange({ ...filters, priceRange: [min, max] });
//   };

//   const handleBrandToggle = (brand: string) => {
//     const newBrands = filters.brands.includes(brand)
//       ? filters.brands.filter(b => b !== brand)
//       : [...filters.brands, brand];
//     onFilterChange({ ...filters, brands: newBrands });
//   };

//   const handleRatingChange = (rating: number) => {
//     onFilterChange({ ...filters, rating });
//   };

//   const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
//     onFilterChange({ ...filters, sortBy });
//   };

//   const resetFilters = () => {
//     onFilterChange({
//       priceRange: [0, 1000],
//       brands: [],
//       rating: 0,
//       sortBy: 'popular'
//     });
//   };

//   const hasActiveFilters = filters.brands.length > 0 || 
//                           filters.rating > 0 || 
//                           filters.priceRange[0] > 0 || 
//                           filters.priceRange[1] < 1000;

//   return (
//     <div className="bg-white rounded-xl border border-gray-100 p-4">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <h3 className="text-base font-semibold text-[#2D3748]">Filters</h3>
//         <span className="text-xs text-[#718096]">{totalProducts} products</span>
//       </div>

//       {/* Active Filters */}
//       {hasActiveFilters && (
//         <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//           <div className="flex items-center justify-between mb-2">
//             <span className="text-xs font-medium text-[#2D3748]">Active Filters</span>
//             <button
//               onClick={resetFilters}
//               className="text-xs text-[#5BA4B0] hover:text-[#4A8A94] transition-colors"
//             >
//               Clear All
//             </button>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {filters.brands.map(brand => (
//               <span key={brand} className="inline-flex items-center px-2.5 py-0.5 bg-[#5BA4B0]/10 text-[#5BA4B0] text-[11px] rounded-full">
//                 {brand}
//                 <button
//                   onClick={() => handleBrandToggle(brand)}
//                   className="ml-1.5 hover:text-[#4A8A94]"
//                 >
//                   <X className="w-3 h-3" />
//                 </button>
//               </span>
//             ))}
//             {filters.rating > 0 && (
//               <span className="inline-flex items-center px-2.5 py-0.5 bg-[#F5D547]/10 text-[#F5D547] text-[11px] rounded-full">
//                 {filters.rating}+ stars
//                 <button
//                   onClick={() => handleRatingChange(0)}
//                   className="ml-1.5 hover:text-[#E5C437]"
//                 >
//                   <X className="w-3 h-3" />
//                 </button>
//               </span>
//             )}
//             {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
//               <span className="inline-flex items-center px-2.5 py-0.5 bg-[#48BB78]/10 text-[#48BB78] text-[11px] rounded-full">
//                 ${filters.priceRange[0]} - ${filters.priceRange[1]}
//                 <button
//                   onClick={() => handlePriceChange(0, 1000)}
//                   className="ml-1.5 hover:text-[#38A068]"
//                 >
//                   <X className="w-3 h-3" />
//                 </button>
//               </span>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Sort Options */}
//       <div className="mb-4">
//         <h4 className="font-medium text-[#2D3748] mb-2 text-sm">Sort By</h4>
//         <div className="space-y-1.5">
//           {[
//             { value: 'popular', label: 'Most Popular' },
//             { value: 'rating', label: 'Highest Rated' },
//             { value: 'price-low', label: 'Price: Low to High' },
//             { value: 'price-high', label: 'Price: High to Low' },
//             { value: 'newest', label: 'Newest First' }
//           ].map(option => (
//             <label key={option.value} className="flex items-center cursor-pointer">
//               <input
//                 type="radio"
//                 name="sort"
//                 value={option.value}
//                 checked={filters.sortBy === option.value}
//                 onChange={() => handleSortChange(option.value as FilterOptions['sortBy'])}
//                 className="w-4 h-4 text-[#5BA4B0] border-gray-300 focus:ring-[#5BA4B0] focus:ring-2"
//               />
//               <span className="ml-2 text-sm text-[#718096]">{option.label}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Price Range */}
//       <div className="mb-4">
//         <h4 className="font-medium text-[#2D3748] mb-2 text-sm">Price Range</h4>
//         <div className="space-y-2">
//           <div className="flex items-center space-x-2">
//             <input
//               type="number"
//               placeholder="Min"
//               value={filters.priceRange[0] || ''}
//               onChange={(e) => handlePriceChange(Number(e.target.value) || 0, filters.priceRange[1])}
//               className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#5BA4B0] focus:border-[#5BA4B0] outline-none"
//             />
//             <span className="text-[#718096]">-</span>
//             <input
//               type="number"
//               placeholder="Max"
//               value={filters.priceRange[1] || ''}
//               onChange={(e) => handlePriceChange(filters.priceRange[0], Number(e.target.value) || 1000)}
//               className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-[#5BA4B0] focus:border-[#5BA4B0] outline-none"
//             />
//           </div>
//           <div className="text-xs text-[#718096]">
//             Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
//           </div>
//         </div>
//       </div>

//       {/* Brands */}
//       <div className="mb-4">
//         <h4 className="font-medium text-[#2D3748] mb-2 text-sm">Brands</h4>
//         <div className="space-y-1.5 max-h-48 overflow-y-auto">
//           {brands.map(brand => (
//             <label key={brand} className="flex items-center cursor-pointer">
//               <input
//                 type="checkbox"
//                 checked={filters.brands.includes(brand)}
//                 onChange={() => handleBrandToggle(brand)}
//                 className="w-4 h-4 text-[#5BA4B0] border-gray-300 rounded focus:ring-[#5BA4B0] focus:ring-2"
//               />
//               <span className="ml-2 text-sm text-[#718096]">{brand}</span>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Rating Filter */}
//       <div className="mb-4">
//         <h4 className="font-medium text-[#2D3748] mb-2 text-sm">Minimum Rating</h4>
//         <div className="space-y-1.5">
//           {[4, 3, 2, 1].map(rating => (
//             <label key={rating} className="flex items-center cursor-pointer">
//               <input
//                 type="radio"
//                 name="rating"
//                 value={rating}
//                 checked={filters.rating === rating}
//                 onChange={() => handleRatingChange(rating)}
//                 className="w-4 h-4 text-[#5BA4B0] border-gray-300 focus:ring-[#5BA4B0] focus:ring-2"
//               />
//               <span className="ml-2 text-sm text-[#718096]">{rating}+ stars</span>
//               <div className="ml-2 flex items-center">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-3 h-3 ${
//                       i < rating ? 'text-[#F5D547] fill-current' : 'text-gray-300'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </label>
//           ))}
//         </div>
//       </div>

//       {/* Reset Button */}
//       {hasActiveFilters && (
//         <button
//           onClick={resetFilters}
//           className="w-full py-2.5 px-3 border border-[#5BA4B0] text-[#5BA4B0] rounded-lg font-medium hover:bg-[#5BA4B0] hover:text-white transition-all duration-200"
//         >
//           Reset All Filters
//         </button>
//       )}
//     </div>
//   );
// };




import React from 'react';
import { Star, X } from 'lucide-react';
import { FilterOptions } from '../../types';

interface FilterSidebarProps {
  filters: FilterOptions;
  brands: string[];
  onFilterChange: (filters: FilterOptions) => void;
  totalProducts: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  brands,
  onFilterChange,
  totalProducts
}) => {
  const handlePriceChange = (min: number, max: number) => {
    onFilterChange({ ...filters, priceRange: [min, max] });
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: newBrands });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({ ...filters, rating });
  };

  const handleSortChange = (sortBy: FilterOptions['sortBy']) => {
    onFilterChange({ ...filters, sortBy });
  };

  const resetFilters = () => {
    onFilterChange({
      priceRange: [0, 1000],
      brands: [],
      rating: 0,
      sortBy: 'popular'
    });
  };

  const hasActiveFilters =
    filters.brands.length > 0 ||
    filters.rating > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 1000;

  return (
    <div
      className="
        bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-lg
        border border-gray-200 rounded-2xl shadow-[8px_8px_20px_rgba(0,0,0,0.05),-6px_-6px_16px_rgba(255,255,255,0.9)]
        p-5 transition-all duration-300
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
        <span className="text-xs font-medium text-gray-500">
          {totalProducts} products
        </span>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mb-5 p-3 bg-gray-100/70 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-700">
              Active Filters
            </span>
            <button
              onClick={resetFilters}
              className="text-xs text-sky-600 hover:text-sky-700 transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.brands.map((brand) => (
              <span
                key={brand}
                className="inline-flex items-center px-2.5 py-0.5 bg-sky-100 text-sky-600 text-[11px] rounded-full shadow-sm"
              >
                {brand}
                <button
                  onClick={() => handleBrandToggle(brand)}
                  className="ml-1.5 hover:text-sky-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filters.rating > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 bg-yellow-100 text-yellow-500 text-[11px] rounded-full shadow-sm">
                {filters.rating}+ stars
                <button
                  onClick={() => handleRatingChange(0)}
                  className="ml-1.5 hover:text-yellow-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
              <span className="inline-flex items-center px-2.5 py-0.5 bg-emerald-100 text-emerald-600 text-[11px] rounded-full shadow-sm">
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
                <button
                  onClick={() => handlePriceChange(0, 1000)}
                  className="ml-1.5 hover:text-emerald-700"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Sort Options */}
      <div className="mb-5">
        <h4 className="font-medium text-gray-800 mb-2 text-sm">Sort By</h4>
        <div className="space-y-2">
          {[
            { value: 'popular', label: 'Most Popular' },
            { value: 'rating', label: 'Highest Rated' },
            { value: 'price-low', label: 'Price: Low to High' },
            { value: 'price-high', label: 'Price: High to Low' },
            { value: 'newest', label: 'Newest First' }
          ].map((option) => (
            <label
              key={option.value}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="radio"
                name="sort"
                value={option.value}
                checked={filters.sortBy === option.value}
                onChange={() =>
                  handleSortChange(option.value as FilterOptions['sortBy'])
                }
                className="w-4 h-4 text-sky-600 border-gray-300 focus:ring-sky-500 focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-5">
        <h4 className="font-medium text-gray-800 mb-2 text-sm">Price Range</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.priceRange[0] || ''}
              onChange={(e) =>
                handlePriceChange(
                  Number(e.target.value) || 0,
                  filters.priceRange[1]
                )
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max"
              value={filters.priceRange[1] || ''}
              onChange={(e) =>
                handlePriceChange(
                  filters.priceRange[0],
                  Number(e.target.value) || 1000
                )
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>
          <div className="text-xs text-gray-500">
            Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="mb-5">
        <h4 className="font-medium text-gray-800 mb-2 text-sm">Brands</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.brands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500 focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-5">
        <h4 className="font-medium text-gray-800 mb-2 text-sm">
          Minimum Rating
        </h4>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="flex items-center cursor-pointer group"
            >
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={filters.rating === rating}
                onChange={() => handleRatingChange(rating)}
                className="w-4 h-4 text-sky-600 border-gray-300 focus:ring-sky-500 focus:ring-2"
              />
              <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800">
                {rating}+ stars
              </span>
              <div className="ml-2 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="w-full py-2.5 px-3 border border-sky-600 text-sky-600 rounded-lg font-medium hover:bg-sky-600 hover:text-white shadow-md hover:shadow-lg transition-all duration-200"
        >
          Reset All Filters
        </button>
      )}
    </div>
  );
};
