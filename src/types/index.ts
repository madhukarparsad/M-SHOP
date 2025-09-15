export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  brand: string;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  features: string[];
  specifications: Record<string, string | undefined>;
  tags: string[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface Category {
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

export interface FilterOptions {
  priceRange: [number, number];
  brands: string[];
  rating: number;
  sortBy: 'price-low' | 'price-high' | 'rating' | 'newest' | 'popular';
}

export interface SearchParams {
  query: string;
  category?: string;
  filters: FilterOptions;
  page: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}
