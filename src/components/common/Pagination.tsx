// import React from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';


// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
//   maxVisiblePages?: number;
// }

// export const Pagination: React.FC<PaginationProps> = ({ 
//   currentPage, 
//   totalPages, 
//   onPageChange, 
//   maxVisiblePages = 5 
// }) => {
//   if (totalPages <= 1) return null;

//   const getVisiblePages = () => {
//     const pages: (number | string)[] = [];
//     const halfVisible = Math.floor(maxVisiblePages / 2);

//     if (totalPages <= maxVisiblePages) {
  //       // Show all pages if total is less than max visible
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       // Always show first page
//       pages.push(1);

//       if (currentPage > halfVisible + 1) {
//         pages.push('...');
//       }

//       // Show pages around current page
//       const start = Math.max(2, currentPage - halfVisible);
//       const end = Math.min(totalPages - 1, currentPage + halfVisible);

//       for (let i = start; i <= end; i++) {
//         if (i > 1 && i < totalPages) {
//           pages.push(i);
//         }
//       }

//       if (currentPage < totalPages - halfVisible - 1) {
//         pages.push('...');
//       }

//       // Always show last page
//       if (totalPages > 1) {
//         pages.push(totalPages);
//       }
//     }

//     return pages;
//   };

//   const visiblePages = getVisiblePages();

//   return (
//     <div className="flex items-center justify-center space-x-2">
//       {/* Previous button */}
//       <button
//         onClick={() => onPageChange(currentPage - 1)}
//         disabled={currentPage === 1}
//         className={`p-2 rounded-lg transition-all duration-200 ${
//           currentPage === 1
//             ? 'text-gray-300 cursor-not-allowed'
//             : 'text-[#718096] hover:text-[#2D3748] hover:bg-gray-100'
//         }`}
//         aria-label="Previous page"
//       >
//         <ChevronLeft className="w-5 h-5" />
//       </button>

//       {/* Page numbers */}
//       {visiblePages.map((page, index) => (
//         <React.Fragment key={index}>
//           {page === '...' ? (
//             <span className="px-3 py-2 text-[#718096]">...</span>
//           ) : (
//             <button
//               onClick={() => onPageChange(page as number)}
//               className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
//                 page === currentPage
//                   ? 'bg-[#5BA4B0] text-white shadow-lg'
//                   : 'text-[#718096] hover:text-[#2D3748] hover:bg-gray-100'
//               }`}
//               aria-label={`Page ${page}`}
//               aria-current={page === currentPage ? 'page' : undefined}
//             >
//               {page}
//             </button>
//           )}
//         </React.Fragment>
//       ))}

//       {/* Next button */}
//       <button
//         onClick={() => onPageChange(currentPage + 1)}
//         disabled={currentPage === totalPages}
//         className={`p-2 rounded-lg transition-all duration-200 ${
//           currentPage === totalPages
//             ? 'text-gray-300 cursor-not-allowed'
//             : 'text-[#718096] hover:text-[#2D3748] hover:bg-gray-100'
//         }`}
//         aria-label="Next page"
//       >
//         <ChevronRight className="w-5 h-5" />
//       </button>
//     </div>
//   );
// };







import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  className?: string;
  showPageNumbers?: boolean;
  showNavigationLabels?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  maxVisiblePages = 5,
  className = '',
  showPageNumbers = true,
  showNavigationLabels = false
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > halfVisible + 2) pages.push('...');

      const start = Math.max(2, currentPage - halfVisible);
      const end = Math.min(totalPages - 1, currentPage + halfVisible);
      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - halfVisible - 1) pages.push('...');
      if (totalPages > 1) pages.push(totalPages);
    }
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav 
      className={`flex items-center justify-between gap-2 py-4 ${className}`}
      aria-label="Pagination"
    >
      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
          currentPage === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-teal-50 hover:text-teal-700'
        }`}
        aria-label={showNavigationLabels ? 'Previous page' : undefined}
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        {showNavigationLabels && 'Previous'}
      </button>

      {/* Page numbers */}
      {showPageNumbers && (
        <div className="hidden sm:flex items-center gap-1">
          {visiblePages.map((page, idx) =>
            page === '...' ? (
              <span key={idx} className="px-2 py-1 text-gray-400" aria-hidden="true">...</span>
            ) : (
              <button
                key={idx}
                onClick={() => onPageChange(page as number)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                  page === currentPage
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-teal-50'
                }`}
                aria-label={`Page ${page}${page === currentPage ? ', current page' : ''}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            )
          )}
        </div>
      )}

      {/* Page info for mobile */}
      {showPageNumbers && (
        <div className="sm:hidden text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
          currentPage === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-teal-50 hover:text-teal-700'
        }`}
        aria-label={showNavigationLabels ? 'Next page' : undefined}
      >
        {showNavigationLabels && 'Next'}
        <ChevronRight className="w-4 h-4 ml-1" />
      </button>
    </nav>
  );
};
