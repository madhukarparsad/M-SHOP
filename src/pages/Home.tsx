
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play, Info, Star, Shield, Truck, Headphones } from "lucide-react";
import { ProductCard } from "../components/product/ProductCard";
import { Product } from "../types";
import { useProductsQuery } from "../hooks/useProducts";
import { LoadingSpinner, ProductCardSkeleton } from "../components/common/LoadingSpinner";

export const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { data: productsApi, isLoading } = useProductsQuery("all");
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (productsApi?.length) setFeaturedProducts(productsApi.slice(0, 20));
  }, [productsApi]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const heroSlides = [
    {
      title: "Elevate Your Lifestyle with Premium Essentials",
      subtitle: "Discover curated collections that blend sophistication with everyday functionality",
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&h=900&fit=crop",
      cta: "Explore Collection",
      ctaSecondary: "Learn More"
    },
    {
      title: "Where Style Meets Uncompromising Comfort",
      subtitle: "Experience fashion that doesn't sacrifice comfort for aesthetics",
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&h=900&fit=crop",
      cta: "Shop New Arrivals",
      ctaSecondary: "View Lookbook"
    },
    {
      title: "Join Thousands of Satisfied Customers",
      subtitle: "Experience the difference of premium quality and exceptional service",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&h=900&fit=crop",
      cta: "Start Shopping",
      ctaSecondary: "Read Reviews"
    },
  ];

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Quality Guaranteed",
      description: "All products undergo rigorous quality checks"
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Free Shipping",
      description: "On orders over $50 within the continental US"
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Our customer service team is always available"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Premium Selection",
      description: "Curated collection of the finest products"
    }
  ];

  return (
    <div className="bg-gray-950 text-white min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroSlides[currentSlide].image}
            alt="Premium lifestyle products showcase"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 to-gray-950/50"></div>
        </div>

        <div className="relative z-10 flex items-center h-full px-6 md:px-12 lg:px-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-sm mb-6 border border-red-600/30">
              <Star className="w-4 h-4 mr-2 fill-current" />
              New Collection Available
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300 leading-relaxed max-w-lg">
              {heroSlides[currentSlide].subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium text-base shadow-lg transition-all duration-300 transform hover:scale-105">
                <Play className="w-5 h-5 mr-2" fill="currentColor" />
                {heroSlides[currentSlide].cta}
              </button>
              <button className="flex items-center justify-center bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium text-base backdrop-blur-sm transition-all duration-300 border border-white/20">
                <Info className="w-5 h-5 mr-2" />
                {heroSlides[currentSlide].ctaSecondary}
              </button>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === currentSlide 
                  ? "bg-red-600 w-8 scale-110" 
                  : "bg-gray-400 hover:bg-gray-300"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-12 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We're committed to providing an exceptional shopping experience with premium products and outstanding service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-red-500/30 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-red-500 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray-400">Carefully selected items that represent our quality standards</p>
            </div>
            <Link 
              to="/category/all" 
              className="text-red-500 hover:text-red-400 flex items-center text-sm font-medium transition-colors"
            >
              View all <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <ProductCardSkeleton count={5} />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {featuredProducts.slice(0, 5).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trending Now */}
      <section className="py-16 px-6 md:px-12 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Trending Now</h2>
              <p className="text-gray-400">Discover what's currently popular among our community</p>
            </div>
            <Link 
              to="/category/all" 
              className="text-red-500 hover:text-red-400 flex items-center text-sm font-medium transition-colors"
            >
              View all <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <ProductCardSkeleton count={5} />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {featuredProducts.slice(5, 10).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recommended For You */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Recommended For You</h2>
              <p className="text-gray-400">Personalized selections based on popular preferences</p>
            </div>
            <Link 
              to="/category/all" 
              className="text-red-500 hover:text-red-400 flex items-center text-sm font-medium transition-colors"
            >
              View all <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <ProductCardSkeleton count={5} />
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {featuredProducts.slice(10, 15).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-r from-gray-900 to-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Elevate Your Experience?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have discovered the difference with our premium products and exceptional service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/category/all"
              className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-medium transition-colors transform hover:scale-105"
            >
              Explore Our Collections
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 px-8 py-3 rounded-lg font-medium transition-colors backdrop-blur-sm border border-white/20"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};