


import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  Share2,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { ProductCard } from "../components/product/ProductCard";
import { Rating } from "../components/common/Rating";
import { useCartStore, useWishlistStore } from "../store/useStore";
import { formatPrice, calculateDiscount } from "../utils/helpers";
import { useProductQuery, useProductsQuery } from "../hooks/useProducts";
import { Product } from "../types";

export const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { addItem } = useCartStore();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlistStore();

  const { data, isLoading, isError } = useProductQuery(productId);
  useEffect(() => {
    setProduct(data ?? null);
    setLoading(isLoading);
    setError(isError ? "Failed to load product" : null);
  }, [data, isLoading, isError]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const { data: allProducts } = useProductsQuery("all");
  const getRelatedProducts = () => {
    if (!product || !allProducts) return [];
    return allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  };

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-sky-100/50 rounded-2xl animate-pulse"></div>
            <div className="space-y-6">
              <div className="h-10 bg-sky-100/50 rounded-xl animate-pulse"></div>
              <div className="h-6 bg-sky-100/50 w-1/2 rounded-lg animate-pulse"></div>
              <div className="h-6 bg-sky-100/50 w-1/3 rounded-lg animate-pulse"></div>
              <div className="h-32 bg-sky-100/50 rounded-xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 py-16 flex items-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            Product Not Found
          </h1>
          <p className="text-lg text-gray-500 mb-8">
            {error || "The product you are looking for does not exist."}
          </p>
          <Link
            to="/"
            className="inline-flex items-center bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);
  const hasDiscount =
    product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-sky-100 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-10">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <Link
                  to="/"
                  className="hover:text-sky-600 font-medium transition-colors"
                >
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <Link
                  to={`/category/${product.category
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="hover:text-sky-600 font-medium transition-colors"
                >
                  {product.category}
                </Link>
              </li>
              <li className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-1" />
                <span className="text-gray-800 font-semibold">
                  {product.name}
                </span>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-white rounded-3xl shadow-[0_8px_30px_rgba(56,189,248,0.15)] border border-sky-100 overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square bg-white rounded-xl border-2 overflow-hidden transition-all duration-200 ${
                        index === selectedImage
                          ? "border-sky-500 ring-2 ring-sky-200"
                          : "border-gray-200 hover:border-sky-400"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand + Category */}
              <div className="flex items-center space-x-3 text-sm text-gray-500">
                <span>{product.brand}</span>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <span>{product.category}</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-3">
                <Rating rating={product.rating} size="lg" showNumber />
                <span className="text-gray-500">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-xl text-gray-400 line-through">
                        {formatPrice(product.originalPrice!)}
                      </span>
                      <span className="bg-yellow-300 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold shadow-sm">
                        Save{" "}
                        {calculateDiscount(
                          product.originalPrice!,
                          product.price
                        )}
                        %
                      </span>
                    </>
                  )}
                </div>
                {hasDiscount && (
                  <p className="text-sm text-green-600 font-medium">
                    Limited time offer! Save{" "}
                    {formatPrice(product.originalPrice! - product.price)} today.
                  </p>
                )}
              </div>

              {/* Stock Status */}
              <div
                className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold ${
                  product.inStock
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              {product.features.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Key Features
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-2 text-gray-600"
                      >
                        <div className="w-1.5 h-1.5 bg-sky-500 rounded-full mt-2"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quantity + Actions */}
              <div className="space-y-4">
                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <label className="font-medium text-gray-900">Quantity:</label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 ${
                        quantity <= 1
                          ? "border-gray-200 text-gray-300 cursor-not-allowed"
                          : "border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white"
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="w-16 text-center font-medium text-gray-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="w-10 h-10 rounded-xl border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white transition-all duration-200 flex items-center justify-center"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 py-4 px-6 rounded-2xl font-semibold text-lg flex items-center justify-center space-x-2 transition-all duration-300 ${
                      product.inStock
                        ? "bg-gradient-to-r from-sky-500 to-sky-600 text-white hover:from-sky-600 hover:to-sky-700 shadow-lg transform hover:scale-[1.02]"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </span>
                  </button>

                  <button
                    onClick={handleWishlistToggle}
                    className={`px-6 py-4 rounded-2xl border-2 flex items-center justify-center space-x-2 font-semibold transition-all duration-300 ${
                      isWishlisted
                        ? "border-red-500 text-red-500 hover:bg-red-50"
                        : "border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white"
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted ? "fill-current" : ""
                      }`}
                    />
                    <span>{isWishlisted ? "Saved" : "Save"}</span>
                  </button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Truck className="w-6 h-6 text-sky-600" />
                  </div>
                  <p className="text-xs text-gray-500">Free Shipping</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-6 h-6 text-sky-600" />
                  </div>
                  <p className="text-xs text-gray-500">Secure Payment</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <RotateCcw className="w-6 h-6 text-sky-600" />
                  </div>
                  <p className="text-xs text-gray-500">Easy Returns</p>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          {Object.keys(product.specifications).length > 0 && (
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl border border-sky-100 shadow-[0_8px_30px_rgba(56,189,248,0.1)] p-10 mb-20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between py-3 border-b border-gray-100 last:border-b-0"
                  >
                    <span className="font-medium text-gray-900">{key}</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Products */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getRelatedProducts().map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
