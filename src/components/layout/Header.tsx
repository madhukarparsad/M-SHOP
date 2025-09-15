// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ShoppingCart, Search, Menu, X, User } from 'lucide-react';
// import { useCartStore } from '../../store/useStore';
// import { SearchBar } from '../common/SearchBar';

// export const Header: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isSearchOpen, setIsSearchOpen] = useState(false);
//   const { getTotalItems } = useCartStore();
//   const navigate = useNavigate();

//   const categories = [
//     { name: 'Electronics', href: '/category/electronics' },
//     { name: 'Clothing', href: '/category/clothing' },
//     { name: 'Home & Garden', href: '/category/home-garden' },
//     { name: 'Sports & Outdoors', href: '/category/sports-outdoors' },
//     { name: 'Books & Media', href: '/category/books-media' },
//     { name: 'Beauty & Personal', href: '/category/beauty-personal' }
//   ];

//   const handleSearch = (query: string) => {
//     if (query.trim()) {
//       navigate(`/search?q=${encodeURIComponent(query)}`);
//       setIsSearchOpen(false);
//     }
//   };

//   return (
//     <header className="w-full bg-white shadow-sm sticky top-0 z-50">
//       {/* Main Header */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center flex-shrink-0">
//             <Link to="/" className="flex items-center space-x-2">
//               <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold text-xl">S</span>
//               </div>
//               <span className="text-2xl font-bold text-gray-900 hidden sm:block">Shoply</span>
//             </Link>
//           </div>

//           {/* Desktop Navigation - Show fewer items on smaller screens */}
//           <nav className="hidden lg:flex space-x-4">
//             {categories.slice(0, 4).map((category) => (
//               <Link
//                 key={category.name}
//                 to={category.href}
//                 className="text-gray-600 hover:text-gray-900 px-2 py-2 text-sm font-medium whitespace-nowrap"
//               >
//                 {category.name}
//               </Link>
//             ))}
//             {/* More dropdown for remaining categories */}
//             <div className="relative group">
//               <button className="text-gray-600 hover:text-gray-900 px-2 py-2 text-sm font-medium">
//                 More
//               </button>
//               <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                 <div className="py-2">
//                   {categories.slice(4).map((category) => (
//                     <Link
//                       key={category.name}
//                       to={category.href}
//                       className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50"
//                     >
//                       {category.name}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </nav>

//           {/* Right Side Icons */}
//           <div className="flex items-center space-x-2">
//             {/* Desktop Search - Smaller width */}
//             <div className="hidden xl:block">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search..."
//                   className="w-48 pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
//                   onKeyPress={(e) => {
//                     if (e.key === 'Enter') {
//                       handleSearch(e.currentTarget.value);
//                     }
//                   }}
//                 />
//                 <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//               </div>
//             </div>

//             {/* Mobile/Tablet Search Button */}
//             <button
//               onClick={() => setIsSearchOpen(!isSearchOpen)}
//               className="xl:hidden p-2 text-gray-600 hover:text-gray-900"
//             >
//               <Search className="h-5 w-5" />
//             </button>

//             {/* Wishlist removed */}

//             {/* Cart */}
//             <Link
//               to="/cart"
//               className="p-2 text-gray-600 hover:text-gray-900 relative"
//             >
//               <ShoppingCart className="h-5 w-5" />
//               {getTotalItems() > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
//                   {getTotalItems()}
//                 </span>
//               )}
//             </Link>


//             {/* User - Hide on small screens */}
//             <Link
//               to="/profile"
//               className="hidden sm:block p-2 text-gray-600 hover:text-gray-900"
//             >
//               <User className="h-5 w-5" />
//             </Link>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
//             >
//               {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Search Bar */}
//         {isSearchOpen && (
//           <div className="xl:hidden py-3 border-t border-gray-200">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-sm"
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter') {
//                     handleSearch(e.currentTarget.value);
//                   }
//                 }}
//               />
//               <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Mobile Navigation Menu */}
//       {isMobileMenuOpen && (
//         <div className="lg:hidden border-t border-gray-200 bg-white">
//           <div className="px-4 py-3 space-y-1">
//             {categories.map((category) => (
//               <Link
//                 key={category.name}
//                 to={category.href}
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md text-sm"
//               >
//                 {category.name}
//               </Link>
//             ))}
//             <hr className="my-2 border-gray-200" />
//             {/* Wishlist removed from mobile menu */}
//             <Link
//               to="/profile"
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md text-sm"
//             >
//               Profile
//             </Link>
//             <Link
//               to="/orders"
//               onClick={() => setIsMobileMenuOpen(false)}
//               className="block px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md text-sm"
//             >
//               Orders
//             </Link>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };






import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, Menu, X, User, ChevronDown } from "lucide-react";
import { useCartStore } from "../../store/useStore";

type Category = {
  name: string;
  href: string;
};

// Modern dynamic category mapping
const categoryNames: string[] = [
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports & Outdoors",
  "Books & Media",
  "Beauty & Personal",
];

const categories: Category[] = categoryNames.map((name) => ({
  name,
  href: `/category/${name.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")}`,
}));

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { getTotalItems } = useCartStore();
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="w-full fixed top-0 z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-red-600 rounded-md flex items-center justify-center shadow-md shadow-red-500/40">
                <span className="text-white font-extrabold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold text-white hidden sm:block">Shop</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6">
            {categories.slice(0, 4).map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="text-gray-300 hover:text-white transition-colors text-sm font-medium"
              >
                {category.name}
              </Link>
            ))}

            {/* More dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-300 hover:text-white text-sm font-medium">
                <span>More</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-52 bg-neutral-900 border border-neutral-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {categories.slice(4).map((category) => (
                    <Link
                      key={category.name}
                      to={category.href}
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-neutral-800"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-3">
            {/* Desktop Search */}
            <div className="hidden xl:block relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-56 pl-10 pr-4 py-2 bg-neutral-800 text-gray-200 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-sm placeholder-gray-400"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(e.currentTarget.value);
                  }
                }}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>

            {/* Mobile/Tablet Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="xl:hidden p-2 text-gray-300 hover:text-white"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Cart */}
            <Link to="/cart" className="p-2 text-gray-300 hover:text-white relative">
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center shadow-md">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* User */}
            <Link to="/profile" className="hidden sm:block p-2 text-gray-300 hover:text-white">
              <User className="h-5 w-5" />
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-300 hover:text-white"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="xl:hidden py-3 border-t border-neutral-700">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-neutral-800 text-gray-200 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-transparent text-sm placeholder-gray-400"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(e.currentTarget.value);
                  }
                }}
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-700 bg-black">
          <div className="px-4 py-3 space-y-1">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-neutral-800 rounded-md text-sm"
              >
                {category.name}
              </Link>
            ))}
            <hr className="my-2 border-neutral-700" />
            <Link
              to="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-neutral-800 rounded-md text-sm"
            >
              Profile
            </Link>
            <Link
              to="/orders"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-neutral-800 rounded-md text-sm"
            >
              Orders
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
