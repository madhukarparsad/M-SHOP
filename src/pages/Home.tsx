// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight,  Shield, Truck, Award, Heart } from 'lucide-react';
// import { ProductCard } from '../components/product/ProductCard';
// import { Product } from '../types';
// import { useProductsQuery } from '../hooks/useProducts';

// export const Home: React.FC = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const { data: productsApi } = useProductsQuery('all');
//   const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
//   useEffect(() => {
//     if (productsApi && productsApi.length) {
//       setFeaturedProducts(productsApi.slice(0, 8));
//     }
//   }, [productsApi]);

//   // Auto-advance hero carousel
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev + 1) % 3);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, []);

//   const heroSlides = [
//     {
//       title: "Discover Quality Products",
//       subtitle: "Curated collections for modern living",
//       image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1400&h=800&fit=crop",
//       cta: "Shop Now",
//       secondaryCta: "Learn More"
//     },
//     {
//       title: "Premium Shopping Experience", 
//       subtitle: "Fast shipping, easy returns, exceptional service",
//       image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&h=800&fit=crop",
//       cta: "Explore Products",
//       secondaryCta: "View Categories"
//     },
//     {
//       title: "Trusted by Thousands",
//       subtitle: "Join our community of satisfied customers",
//       image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1400&h=800&fit=crop",
//       cta: "Start Shopping", 
//       secondaryCta: "Read Reviews"
//     }
//   ];

//   const features = [
//     { icon: Shield, title: "Premium Quality", description: "Carefully selected products" },
//     { icon: Truck, title: "Fast Shipping", description: "Free shipping on orders over $50" },
//     { icon: Award, title: "Best Prices", description: "Competitive pricing guaranteed" },
//     { icon: Heart, title: "Customer Love", description: "99% satisfaction rate" }
//   ];

//   const categories = [
//     { name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop", count: 12 },
//     { name: "Clothing", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop", count: 18 },
//     { name: "Home & Garden", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop", count: 15 },
//     { name: "Sports & Outdoors", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop", count: 10 }
//   ];

//   return (
//     <div className="min-h-screen bg-white">
//       {/* Hero Section */}
//       <section className="relative h-[500px] md:h-[600px] overflow-hidden">
//         <div className="absolute inset-0">
//           <img 
//             src={heroSlides[currentSlide].image} 
//             alt="Hero background"
//             className="w-full h-full object-cover object-center"
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>
//         </div>
        
//         <div className="relative z-10 flex items-center h-full px-4">
//           <div className="max-w-6xl mx-auto w-full">
//             <div className="max-w-2xl">
//               <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white leading-tight">
//                 {heroSlides[currentSlide].title}
//               </h1>
//               <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed">
//                 {heroSlides[currentSlide].subtitle}
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4">
//                                  <button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg">
//                   {heroSlides[currentSlide].cta}
//                 </button>
//                 <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all">
//                   {heroSlides[currentSlide].secondaryCta}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Hero Navigation Dots */}
//         <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
//           {heroSlides.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               className={`w-3 h-3 rounded-full transition-all ${
//                 index === currentSlide ? 'bg-white scale-110' : 'bg-white/50'
//               }`}
//             />
//           ))}
//         </div>
//       </section>


//       {/* Product Features Bar */}
//       <section className="py-8 bg-white">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {features.map((feature, index) => (
//               <div key={index} className="text-center">
//                                  <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3">
//                    <feature.icon className="w-6 h-6 text-sky-600" />
//                 </div>
//                 <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
//                 <p className="text-sm text-gray-600">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Category Showcase */}
//       <section className="py-10 bg-gray-50">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-8">
//             Shop by Category
//           </h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {categories.map((category, index) => (
//               <Link 
//                 key={index} 
//                 to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
//                 className="group block"
//               >
//                 <div className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
//                   <img 
//                     src={category.image} 
//                     alt={category.name}
//                     className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-200"
//                   />
//                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
//                   <div className="absolute bottom-3 left-3 text-white">
//                     <h3 className="font-semibold">{category.name}</h3>
//                     <p className="text-sm opacity-90">{category.count} products</p>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Featured Products */}
//       <section className="py-10 bg-white">
//         <div className="max-w-6xl mx-auto px-4">
//           <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-8">
//             Featured Products
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             {featuredProducts.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//           <div className="text-center mt-8">
//             <Link 
//               to="/category/all"
//               className="inline-flex items-center bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
//             >
//               View All Products
//               <ArrowRight className="ml-2 w-4 h-4" />
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };




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