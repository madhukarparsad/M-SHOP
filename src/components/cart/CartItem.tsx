// import React from 'react';
// import { Minus, Plus, Trash2 } from 'lucide-react';
// import { CartItem as CartItemType } from '../../types';
// import { useCartStore } from '../../store/useStore';
// import { formatPrice} from '../../utils/helpers';


// interface CartItemProps {
//   item: CartItemType;
// }

// export const CartItem: React.FC<CartItemProps> = ({ item }) => {
//   const { updateQuantity, removeItem } = useCartStore();
//   const { product, quantity } = item;

//   const handleQuantityChange = (newQuantity: number) => {
//     if (newQuantity > 0) {
//       updateQuantity(product.id, newQuantity);
//     }
//   };

//   const handleRemove = () => {
//     removeItem(product.id);
//   };

//   const itemTotal = product.price * quantity;
//   const hasDiscount = product.originalPrice && product.originalPrice > product.price;

//   return (
//     <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-all duration-200">
//       <div className="flex items-center gap-4">
//         {/* Product Image */}
//         <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
//           <img 
//             src={product.images[0]} 
//             alt={product.name}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Product Info */}
//         <div className="flex-1 min-w-0">
//           <div className="flex items-start justify-between mb-2">
//             <div className="flex-1 min-w-0">
//               <h3 className="font-medium text-gray-900 text-sm line-clamp-1 mb-1">
//                 {product.name}
//               </h3>
//               <p className="text-gray-500 text-xs mb-1">{product.brand}</p>
              
//               {/* Price */}
//               <div className="flex items-center gap-2">
//                 {hasDiscount && (
//                   <span className="text-xs text-gray-400 line-through">
//                     {formatPrice(product.originalPrice!)}
//                   </span>
//                 )}
//                 <span className="font-semibold text-gray-900 text-sm">
//                   {formatPrice(product.price)}
//                 </span>
//               </div>
//             </div>

//             {/* Remove Button */}
//             <button
//               onClick={handleRemove}
//               className="p-1 text-gray-400 hover:text-red-500 transition-colors"
//               title="Remove item"
//             >
//               <Trash2 className="w-4 h-4" />
//             </button>
//           </div>

//           {/* Quantity Controls and Total */}
//           <div className="flex items-center justify-between">
//             {/* Quantity Controls */}
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => handleQuantityChange(quantity - 1)}
//                 disabled={quantity <= 1}
//                 className={`w-7 h-7 rounded border flex items-center justify-center text-sm ${
//                   quantity <= 1
//                     ? 'border-gray-200 text-gray-300 cursor-not-allowed'
//                     : 'border-gray-300 text-gray-600 hover:bg-gray-50'
//                 }`}
//               >
//                 <Minus className="w-3 h-3" />
//               </button>
              
//               <span className="w-8 text-center font-medium text-sm">
//                 {quantity}
//               </span>
              
//               <button
//                 onClick={() => handleQuantityChange(quantity + 1)}
//                 className="w-7 h-7 rounded border border-gray-300 text-gray-600 hover:bg-gray-50 flex items-center justify-center"
//               >
//                 <Plus className="w-3 h-3" />
//               </button>
//             </div>

//             {/* Item Total */}
//             <div className="text-right">
//               <div className="font-semibold text-gray-900 text-sm">
//                 {formatPrice(itemTotal)}
//               </div>
//               {quantity > 1 && (
//                 <div className="text-xs text-gray-500">
//                   {quantity} × {formatPrice(product.price)}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };







import React, { useState } from "react";
import { Minus, Plus, Trash2, Heart, Share2, Link } from "lucide-react";
import { motion } from "framer-motion";
import { CartItem as CartItemType } from "../../types";
import { useCartStore } from "../../store/useStore";
import { formatPrice } from "../../utils/helpers";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem, saveForLater } = useCartStore();
  const { product, quantity } = item;
  const [isRemoving, setIsRemoving] = useState(false);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= 10) {
      updateQuantity(product.id, newQuantity);
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeItem(product.id);
    }, 300);
  };

  const handleSaveForLater = () => {
    saveForLater(product);
    removeItem(product.id);
  };

  const itemTotal = product.price * quantity;
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
      exit={{ opacity: 0, x: -100, transition: { duration: 0.3 } }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="flex items-start gap-5">
        {/* Product Image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shadow-inner flex-shrink-0"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {hasDiscount && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              SALE
            </div>
          )}
        </motion.div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0 mr-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-semibold text-gray-900 text-base hover:text-blue-600 transition-colors line-clamp-2 mb-2">
                  {product.name}
                </h3>
              </Link>
              
              <p className="text-gray-500 text-sm mb-2">{product.brand}</p>

              {/* Price */}
              <div className="flex items-center gap-2 mb-3">
                {hasDiscount && (
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(product.originalPrice!)}
                  </span>
                )}
                <span className="font-bold text-gray-900 text-lg">
                  {formatPrice(product.price)}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-red-600 font-semibold">
                    Save {formatPrice(product.originalPrice! - product.price)}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleRemove}
                className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                title="Remove item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleSaveForLater}
                className="p-2 rounded-lg text-gray-400 hover:text-pink-500 hover:bg-pink-50 transition-colors"
                title="Save for later"
              >
                <Heart className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                title="Share product"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quantity Controls and Total */}
          <div className="flex items-center justify-between">
            {/* Quantity Controls */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-medium mr-3">Qty:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className={`w-8 h-8 flex items-center justify-center transition-colors ${
                    quantity <= 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <span className="w-8 text-center font-semibold text-sm bg-white">
                  {quantity}
                </span>

                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                  className={`w-8 h-8 flex items-center justify-center transition-colors ${
                    quantity >= 10
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Item Total */}
            <div className="text-right">
              <div className="font-bold text-gray-900 text-lg">
                {formatPrice(itemTotal)}
              </div>
              {quantity > 1 && (
                <div className="text-xs text-gray-500">
                  {quantity} × {formatPrice(product.price)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};