
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../../types';
import { Rating } from '../common/Rating';
import { formatPrice, calculateDiscount } from '../../utils/helpers';
import { useCartStore, useCompareStore } from '../../store/useStore';
import { Link, useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact';
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'default',
  onQuickView,
}) => {
  const { addItem } = useCartStore();
  const compareItems = useCompareStore((s) => s.items);
  const toggleCompare = useCompareStore((s) => s.toggle);
  const isInCompare = useCompareStore((s) => s.isInCompare);
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    navigate('/cart');
  };

  // ---- Compact variant ----
  if (variant === 'compact') {
    return (
      <Link
        to={`/product/${product.id}`}
        className="group block bg-white/90 rounded-xl border border-gray-100 hover:border-sky-400 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] transform-gpu"
      >
        <div className="p-4 flex items-center gap-3">
          {/* Image */}
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 shadow-inner flex-shrink-0">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 truncate group-hover:text-sky-600 transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 truncate">{product.brand}</p>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1">
                <Rating rating={product.rating} size="sm" />
                <span className="text-xs text-gray-500">
                  ({product.reviewCount})
                </span>
              </div>
              <div className="text-right">
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xs text-gray-400 line-through mr-1">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="font-semibold text-gray-800">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // ---- Default variant ----
  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:border-sky-400 hover:-translate-y-2 transform-gpu max-w-sm">
      {/* Image */}
      <div className="relative aspect-[16/10] bg-gray-50 overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </Link>

        {/* Discount Badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-md">
            -{calculateDiscount(product.originalPrice, product.price)}%
          </div>
        )}

        {/* Compare Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!isInCompare(product.id) && compareItems.length >= 3) return;
            toggleCompare(product.id);
          }}
          className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-xs font-medium shadow-md backdrop-blur-sm transition-colors ${
            isInCompare(product.id)
              ? 'bg-sky-600 text-white'
              : compareItems.length >= 3
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-white/90 text-gray-700 hover:bg-sky-100'
          }`}
        >
          {isInCompare(product.id) ? 'In Compare' : 'Compare'}
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 text-base line-clamp-2 mb-1 group-hover:text-sky-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 mb-2">{product.brand}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Rating rating={product.rating} size="sm" />
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
          <span className="font-semibold text-gray-900 text-lg">
            {formatPrice(product.price)}
          </span>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`inline-flex items-center justify-center py-2 px-3 rounded-lg text-sm font-semibold transition-all shadow-sm ${
              product.inStock
                ? 'bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:shadow-md hover:scale-[1.03]'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>

          <button
            onClick={handleBuyNow}
            disabled={!product.inStock}
            className={`inline-flex items-center justify-center py-2 px-3 rounded-lg text-sm font-semibold transition-all border shadow-sm ${
              product.inStock
                ? 'bg-white text-sky-600 border-sky-300 hover:bg-sky-50 hover:shadow-md hover:scale-[1.03]'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
