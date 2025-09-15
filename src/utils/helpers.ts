import { Product, FilterOptions } from '../types';

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price);
};

// API mappers for fakestoreapi -> Product
export const mapFakeStoreProductToProduct = (p: any): Product => {
  return {
    id: String(p.id),
    name: p.title,
    description: p.description,
    price: p.price,
    originalPrice: undefined,
    category: p.category,
    brand: 'Generic',
    images: [p.image],
    rating: p.rating?.rate ?? 0,
    reviewCount: p.rating?.count ?? 0,
    inStock: true,
    features: [],
    specifications: {},
    tags: [],
  };
};

// Mapper for dummyjson.com API -> Product
export const mapDummyJsonProductToProduct = (p: any): Product => {
  return {
    id: String(p.id),
    name: p.title,
    description: p.description,
    price: p.price,
    originalPrice: p.discountPercentage ? Math.round((p.price * 100) / (100 - p.discountPercentage)) : undefined,
    category: p.category,
    brand: p.brand ?? 'Generic',
    images: Array.isArray(p.images) && p.images.length ? p.images : [p.thumbnail].filter(Boolean),
    rating: p.rating ?? 0,
    reviewCount: p.reviews?.length ?? p.stock ?? 0,
    inStock: (p.stock ?? 0) > 0,
    features: [],
    specifications: {},
    tags: [],
  };
};

export const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export const filterProducts = (
  products: Product[],
  filters: FilterOptions,
  searchQuery: string = ''
): Product[] => {
  let filtered = products;

  // Search filter
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query) ||
      product.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Price range filter
  filtered = filtered.filter(product =>
    product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
  );

  // Brand filter
  if (filters.brands.length > 0) {
    filtered = filtered.filter(product => filters.brands.includes(product.brand));
  }

  // Rating filter
  if (filters.rating > 0) {
    filtered = filtered.filter(product => product.rating >= filters.rating);
  }

  return filtered;
};

export const sortProducts = (products: Product[], sortBy: string): Product[] => {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    case 'popular':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
    default:
      return sorted;
  }
};

export const getUniqueBrands = (products: Product[]): string[] => {
  return [...new Set(products.map(product => product.brand))].sort();
};

export const getCategories = (products: Product[]): string[] => {
  return [...new Set(products.map(product => product.category))].sort();
};

export const paginateProducts = (products: Product[], page: number, perPage: number = 12) => {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  return {
    products: products.slice(startIndex, endIndex),
    totalPages: Math.ceil(products.length / perPage),
    currentPage: page
  };
};

export const generateProductSlug = (name: string): string => {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};
