import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  ArrowRight,
  Trash2,
  ShieldCheck,
  Truck,
  CreditCard,
  X,
  RotateCcw,
  Heart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartItem } from "../components/cart/CartItem";
import { useCartStore } from "../store/useStore";
import { formatPrice } from "../utils/helpers";

export const Cart: React.FC = () => {
  const { items, clearCart, getTotalItems, getTotalPrice, restoreCart } = useCartStore();

  const subtotal = getTotalPrice();
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const total = subtotal + tax + shipping;
  const freeShippingThreshold = 50;
  const amountToFreeShipping = freeShippingThreshold - subtotal;

  // Recently removed items (for undo functionality)
  const [recentlyRemoved, setRecentlyRemoved] = React.useState<any[]>([]);
  const [showUndo, setShowUndo] = React.useState(false);

  const handleClearCart = () => {
    setRecentlyRemoved([...items]);
    clearCart();
    setShowUndo(true);
    
    // Hide undo after 5 seconds
    setTimeout(() => {
      setShowUndo(false);
      setRecentlyRemoved([]);
    }, 5000);
  };

  const handleUndoClear = () => {
    if (recentlyRemoved.length > 0) {
      recentlyRemoved.forEach(item => {
        // You would need to implement a restore function in your store
        restoreCart(item);
      });
      setRecentlyRemoved([]);
      setShowUndo(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center bg-white/90 backdrop-blur-xl p-12 rounded-3xl shadow-xl border border-gray-200"
          >
            <div className="w-28 h-28 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <ShoppingBag className="w-14 h-14 text-white drop-shadow-lg" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
              Discover our curated collection of premium products and find something special for yourself.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold text-base shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Start Shopping
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              <Link
                to="/category/bestsellers"
                className="inline-flex items-center justify-center border-2 border-gray-300 text-gray-700 hover:border-gray-900 hover:text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                View Best Sellers
              </Link>
            </div>
            
            {/* Recently viewed or recommendations could go here */}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-10"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  Shopping Cart
                </h1>
                <p className="text-gray-600">
                  {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"} in your cart
                </p>
              </div>
              
              <button
                onClick={handleClearCart}
                className="flex items-center text-gray-500 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-red-50"
              >
                <Trash2 className="w-5 h-5 mr-2" />
                Clear Cart
              </button>
            </div>
          </motion.div>

          {/* Undo Notification */}
          <AnimatePresence>
            {showUndo && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <RotateCcw className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-blue-800">Cart cleared. </span>
                  <button 
                    onClick={handleUndoClear}
                    className="ml-2 text-blue-600 font-semibold hover:text-blue-800 underline"
                  >
                    Undo
                  </button>
                </div>
                <button 
                  onClick={() => setShowUndo(false)}
                  className="text-blue-400 hover:text-blue-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </AnimatePresence>

              {/* Save for Later / Recently Viewed could be added here */}
            </div>

            {/* Cart Summary */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span className="font-medium">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Tax (8%)</span>
                    <span className="font-medium">{formatPrice(tax)}</span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span
                      className={
                        shipping === 0
                          ? "text-green-600 font-semibold"
                          : "font-medium"
                      }
                    >
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>

                  {shipping > 0 && amountToFreeShipping > 0 && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center text-blue-800 text-sm mb-2">
                        <Truck className="w-4 h-4 mr-2" />
                        Add {formatPrice(amountToFreeShipping)} more for free shipping!
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(subtotal / freeShippingThreshold) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <hr className="border-gray-200" />

                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 px-6 rounded-xl font-semibold text-base shadow-md transition-all duration-300 mb-4 flex items-center justify-center"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Checkout
                </motion.button>

                {/* Continue Shopping */}
                <Link
                  to="/"
                  className="block w-full text-center py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-900 hover:text-gray-900 transition-all duration-300 mb-6"
                >
                  Continue Shopping
                </Link>

                {/* Trust Badges */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 gap-3 text-sm text-gray-600">
                    <div className="flex items-center">
                      <ShieldCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span>Secure SSL Encryption & Payment</span>
                    </div>
                    <div className="flex items-center">
                      <Truck className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                      <span>Free shipping on orders over $50</span>
                    </div>
                    <div className="flex items-center">
                      <RotateCcw className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
                      <span>30-day hassle-free returns</span>
                    </div>
                  </div>
                </div>

                {/* Promo Code Section */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Have a promo code?</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    />
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors">
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              {/* Save for Later Section */}
              <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Heart className="w-5 h-5 text-red-400 mr-2" />
                  Saved Items (2)
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Items you've saved for later
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  View all saved items →
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};