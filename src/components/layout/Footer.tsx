// import React from 'react';
// import { Link } from 'react-router-dom';

// export const Footer: React.FC = () => {
//   return (
//     <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           {/* Brand */}
//           <div className="md:col-span-1">
//             <div className="flex items-center space-x-2 mb-3">
//               <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
//                 <span className="text-white font-bold">S</span>
//               </div>
//               <span className="text-lg font-bold text-gray-900">Shoply</span>
//             </div>
//             <p className="text-sm text-gray-600">
//               Your premium shopping destination for quality products.
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="font-semibold text-gray-900 mb-3">Shop</h3>
//             <ul className="space-y-2 text-sm">
//               <li><Link to="/category/electronics" className="text-gray-600 hover:text-gray-900">Electronics</Link></li>
//               <li><Link to="/category/clothing" className="text-gray-600 hover:text-gray-900">Clothing</Link></li>
//               <li><Link to="/category/home-garden" className="text-gray-600 hover:text-gray-900">Home & Garden</Link></li>
//               <li><Link to="/category/sports-outdoors" className="text-gray-600 hover:text-gray-900">Sports</Link></li>
//             </ul>
//           </div>

//           {/* Customer Service */}
//           <div>
//             <h3 className="font-semibold text-gray-900 mb-3">Support</h3>
//             <ul className="space-y-2 text-sm">
//               <li><Link to="/help" className="text-gray-600 hover:text-gray-900">Help Center</Link></li>
//               <li><Link to="/shipping" className="text-gray-600 hover:text-gray-900">Shipping Info</Link></li>
//               <li><Link to="/returns" className="text-gray-600 hover:text-gray-900">Returns</Link></li>
//               <li><Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact Us</Link></li>
//             </ul>
//           </div>

//           {/* Company */}
//           <div>
//             <h3 className="font-semibold text-gray-900 mb-3">Company</h3>
//             <ul className="space-y-2 text-sm">
//               <li><Link to="/about" className="text-gray-600 hover:text-gray-900">About Us</Link></li>
//               <li><Link to="/careers" className="text-gray-600 hover:text-gray-900">Careers</Link></li>
//               <li><Link to="/privacy" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
//               <li><Link to="/terms" className="text-gray-600 hover:text-gray-900">Terms of Service</Link></li>
//             </ul>
//           </div>
//         </div>

//         <div className="border-t border-gray-200 mt-6 pt-6 text-center">
//           <p className="text-sm text-gray-600">
//             © {new Date().getFullYear()} Shoply. All rights reserved.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };



import React from "react";
import { Link } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard,
  Shield,
  Truck,
  ArrowRight,
  Heart
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 mt-auto">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-950 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-white mb-2">
                Join Our Exclusive Community
              </h3>
              <p className="text-gray-400 max-w-md">
                Subscribe to our newsletter for early access to new collections, special offers, and style inspiration.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent flex-1 min-w-64"
              />
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center">
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <span className="text-2xl font-bold text-white bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Shop
              </span>
            </div>
            
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Your premier destination for curated luxury products and exceptional shopping experiences. 
              We bring together quality, style, and innovation in every collection.
            </p>
            
            <div className="flex items-center space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-gray-800 rounded-lg hover:bg-gray-700">
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-3" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-3" />
                <span className="text-sm">support@nexify.com</span>
              </div>
              <div className="flex items-start text-gray-400">
                <MapPin className="w-4 h-4 mr-3 mt-1 flex-shrink-0" />
                <span className="text-sm">123 Commerce Street, Suite 456<br />New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Shopping */}
          <div>
            <h3 className="font-semibold text-white mb-6 text-lg relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-red-500">
              Shop
            </h3>
            <ul className="space-y-3">
              {[
                { name: "New Arrivals", path: "/new-arrivals" },
                { name: "Best Sellers", path: "/bestsellers" },
                { name: "Electronics", path: "/category/electronics" },
                { name: "Fashion", path: "/category/clothing" },
                { name: "Home & Living", path: "/category/home-garden" },
                { name: "Sports & Outdoors", path: "/category/sports-outdoors" },
                { name: "Sale", path: "/sale" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full mr-3 group-hover:bg-red-500 transition-colors"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-6 text-lg relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-red-500">
              Support
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Help Center", path: "/help" },
                { name: "Order Tracking", path: "/track-order" },
                { name: "Shipping Information", path: "/shipping" },
                { name: "Returns & Exchanges", path: "/returns" },
                { name: "Size Guide", path: "/size-guide" },
                { name: "FAQs", path: "/faqs" },
                { name: "Contact Us", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full mr-3 group-hover:bg-red-500 transition-colors"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-6 text-lg relative pb-2 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-red-500">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", path: "/about" },
                { name: "Our Story", path: "/story" },
                { name: "Careers", path: "/careers" },
                { name: "Press & Media", path: "/press" },
                { name: "Sustainability", path: "/sustainability" },
                { name: "Affiliate Program", path: "/affiliate" },
                { name: "Gift Cards", path: "/gift-cards" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center group"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full mr-3 group-hover:bg-red-500 transition-colors"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-800">
          <div className="flex items-center">
            <div className="bg-gray-800 p-3 rounded-lg mr-4">
              <Truck className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h4 className="font-medium text-white text-sm">Free Shipping</h4>
              <p className="text-gray-400 text-xs">On orders over $50</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-gray-800 p-3 rounded-lg mr-4">
              <Shield className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h4 className="font-medium text-white text-sm">Secure Payment</h4>
              <p className="text-gray-400 text-xs">256-bit encryption</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="bg-gray-800 p-3 rounded-lg mr-4">
              <CreditCard className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h4 className="font-medium text-white text-sm">Easy Returns</h4>
              <p className="text-gray-400 text-xs">30-day money back guarantee</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <h4 className="text-gray-400 text-sm font-medium mb-4">We Accept</h4>
          <div className="flex flex-wrap gap-3">
            {['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay', 'Google Pay'].map((method) => (
              <div key={method} className="bg-gray-800 px-4 py-2 rounded-lg">
                <span className="text-gray-300 text-xs font-medium">{method}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Nexify. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
            
            <p className="text-gray-400 text-sm flex items-center">
              Made with <Heart className="w-4 h-4 text-red-500 mx-1" /> in New York
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};