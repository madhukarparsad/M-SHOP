// import React, { useState, useRef, useEffect } from 'react';
// import { Search, X } from 'lucide-react';


// interface SearchBarProps {
//   onSearch: (query: string) => void;
//   placeholder?: string;
//   className?: string;
// }

// export const SearchBar: React.FC<SearchBarProps> = ({ 
//   onSearch, 
//   placeholder = "Search products...", 
//   className = "" 
// }) => {
//   const [query, setQuery] = useState('');
//   const [isFocused, setIsFocused] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (query.trim()) {
//       onSearch(query.trim());
//     }
//   };

//   const handleClear = () => {
//     setQuery('');
//     inputRef.current?.focus();
//   };

//   useEffect(() => {
//     const handleEscape = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') {
//         inputRef.current?.blur();
//       }
//     };

//     document.addEventListener('keydown', handleEscape);
//     return () => document.removeEventListener('keydown', handleEscape);
//   }, []);

//   return (
//     <form onSubmit={handleSubmit} className={`relative ${className}`}>
//       <div className={`relative flex items-center transition-all duration-200 ${
//         isFocused 
//           ? 'ring-2 ring-[#5BA4B0] ring-opacity-50' 
//           : 'hover:ring-1 hover:ring-gray-300'
//       } bg-white border border-gray-200 rounded-lg overflow-hidden`}>
//         <div className="pl-4 pr-3">
//           <Search className="w-5 h-5 text-[#718096]" />
//         </div>
        
//         <input
//           ref={inputRef}
//           type="text"
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//           onFocus={() => setIsFocused(true)}
//           onBlur={() => setIsFocused(false)}
//           placeholder={placeholder}
//           className="flex-1 py-3 px-2 text-[#2D3748] placeholder-[#718096] focus:outline-none bg-transparent"
//         />
        
//         {query && (
//           <button
//             type="button"
//             onClick={handleClear}
//             className="p-2 text-[#718096] hover:text-[#2D3748] transition-colors duration-200"
//             title="Clear search"
//           >
//             <X className="w-4 h-4" />
//           </button>
//         )}

//         <button
//           type="submit"
//           className="px-4 py-3 bg-[#5BA4B0] text-white hover:bg-[#4A8A94] transition-colors duration-200 font-medium"
//           disabled={!query.trim()}
//         >
//           Search
//         </button>
//       </div>
//     </form>
//   );
// };









import { Search, X } from "lucide-react";
import { useRef, useState,useEffect } from "react";
interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  debounceDelay?: number;
  showClearButton?: boolean;
  variant?: 'default' | 'minimal';
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search products...", 
  className = "",
  debounceDelay = 300,
  showClearButton = true,
  variant = 'default',
  autoFocus = false
}) => {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleInputChange = (value: string) => {
    setQuery(value);
    
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout for debounced search
    if (value.trim()) {
      timeoutRef.current = setTimeout(() => {
        onSearch(value.trim());
      }, debounceDelay);
    } else {
      onSearch('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (query.trim()) onSearch(query.trim());
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
    inputRef.current?.focus();
  };

  useEffect(() => {
    const escapeHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        inputRef.current?.blur();
      }
    };
    
    document.addEventListener('keydown', escapeHandler);
    return () => {
      document.removeEventListener('keydown', escapeHandler);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const isMinimal = variant === 'minimal';

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative ${isMinimal ? 'w-full max-w-md' : 'w-full max-w-xl'} ${className}`}
      role="search"
    >
      <div
        className={`flex items-center bg-white rounded-2xl transition-all duration-200 ${
          isMinimal 
            ? 'border-0 shadow-none' 
            : `border shadow-sm ${focused ? 'ring-2 ring-teal-500 ring-offset-1 border-transparent' : 'border-gray-300 hover:border-gray-400'}`
        }`}
      >
        <div className={`${isMinimal ? 'pl-3' : 'pl-4'} text-gray-500`}>
          <Search className="w-5 h-5" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`flex-1 ${isMinimal ? 'py-2 px-2' : 'py-3 px-2'} text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent`}
          aria-label="Search input"
        />

        {showClearButton && query && (
          <button
            type="button"
            onClick={clearSearch}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {!isMinimal && (
          <button
            type="submit"
            className="px-6 py-3 bg-teal-500 text-white font-semibold rounded-r-2xl hover:bg-teal-600 transition-colors"
            disabled={!query.trim()}
            aria-label="Submit search"
          >
            Search
          </button>
        )}
      </div>
    </form>
  );
};