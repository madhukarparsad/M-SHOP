import { useQuery } from '@tanstack/react-query';
import { 
  mapFakeStoreProductToProduct, 
  mapDummyJsonProductToProduct 
} from '../utils/helpers';

const FAKESTORE = 'https://fakestoreapi.com';
const DUMMYJSON = 'https://dummyjson.com';


// const FAKESTORE = 'https://api.escuelajs.co/api/v1';
// const DUMMYJSON = 'https://api.escuelajs.co/api/v1';




// ---------- Types ----------
export interface Product {
  id: string;
  name: string;
  brand?: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  category?: string;
}

export type Category = string;

// ---------- Helpers ----------
async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch (err) {
    console.error(`Fetch failed: ${url}`, err);
    return null;
  }
}

// ---------- Queries ----------

export const useProductsQuery = (category?: string) => {
  return useQuery<Product[]>({
    queryKey: ['products', category ?? 'all'],
    queryFn: async () => {
      const url =
        category && category !== 'all'
          ? `${DUMMYJSON}/products/category/${encodeURIComponent(
              category.replace(/-/g, ' ')
            )}`
          : `${DUMMYJSON}/products?limit=100`;

      const data = await safeFetch<any>(url);
      const items = Array.isArray(data) ? data : data?.products ?? [];
      let mapped = items.map(mapDummyJsonProductToProduct);

      // Fallback if no results
      if ((!mapped || mapped.length === 0) && category && category !== 'all') {
        const data2 = await safeFetch<any[]>(`${FAKESTORE}/products/category/${encodeURIComponent(
          category.replace(/-/g, ' ')
        )}`);
        mapped = (data2 ?? []).map(mapFakeStoreProductToProduct);
      }

      return mapped ?? [];
    },
    staleTime: 1000 * 60 * 5, // 5 min
    retry: false,
  });
};

export const useProductQuery = (id: string | undefined) => {
  return useQuery<Product>({
    queryKey: ['product', id],
    enabled: Boolean(id),
    queryFn: async () => {
      if (!id) throw new Error('No product ID provided');

      // Try DummyJSON
      const data = await safeFetch<any>(`${DUMMYJSON}/products/${id}`);
      if (data) return mapDummyJsonProductToProduct(data);

      // Fallback: FakeStore
      const data2 = await safeFetch<any>(`${FAKESTORE}/products/${id}`);
      if (!data2) throw new Error('Product not found');
      return mapFakeStoreProductToProduct(data2);
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

export const useCategoriesQuery = () => {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      // DummyJSON
      const data = await safeFetch<any[]>(`${DUMMYJSON}/products/categories`);
      if (Array.isArray(data)) {
        const list = data
          .map((c: any) =>
            typeof c === 'string' ? c : c.slug || c.name
          )
          .filter(Boolean);
        if (list.length > 0) return list;
      }

      // Fallback: FakeStore
      const data2 = await safeFetch<string[]>(`${FAKESTORE}/products/categories`);
      return data2 ?? [];
    },
    staleTime: 1000 * 60 * 60, // 1 hour
    retry: false,
  });
};
