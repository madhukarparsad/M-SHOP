// import { useQuery } from '@tanstack/react-query';
// import { mapFakeStoreProductToProduct, mapDummyJsonProductToProduct } from '../utils/helpers';

// const FAKESTORE = 'https://fakestoreapi.com';
// const DUMMYJSON = 'https://dummyjson.com';

// export const useProductsQuery = (category?: string) => {
//   return useQuery({
//     queryKey: ['products', category ?? 'all'],
//     queryFn: async () => {
//       // Prefer DummyJSON for higher volume (100 products); fallback to FakeStore if needed
//       const url = category && category !== 'all'
//         ? `${DUMMYJSON}/products/category/${encodeURIComponent(category.replace(/-/g, ' '))}`
//         : `${DUMMYJSON}/products?limit=100`;
//       const res = await fetch(url);
//       if (!res.ok) throw new Error('Failed to fetch products');
//       const data = await res.json();
//       const items = Array.isArray(data) ? data : (data.products ?? []);
//       let mapped = (items as any[]).map(mapDummyJsonProductToProduct);

//       // If DummyJSON returned 0 for a custom category, try FakeStore as a fallback
//       if ((!mapped || mapped.length === 0) && category && category !== 'all') {
//         const res2 = await fetch(`${FAKESTORE}/products/category/${encodeURIComponent(category.replace(/-/g, ' '))}`);
//         if (res2.ok) {
//           const data2 = await res2.json();
//           mapped = (data2 as any[]).map(mapFakeStoreProductToProduct);
//         }
//       }
//       return mapped;
//     },
//     staleTime: 1000 * 60 * 5,
//   });
// };

// export const useProductQuery = (id: string | undefined) => {
//   return useQuery({
//     queryKey: ['product', id],
//     enabled: Boolean(id),
//     queryFn: async () => {
//       // Try DummyJSON first
//       let res = await fetch(`${DUMMYJSON}/products/${id}`);
//       if (res.ok) {
//         const data = await res.json();
//         return mapDummyJsonProductToProduct(data);
//       }
//       // Fallback to FakeStore
//       res = await fetch(`${FAKESTORE}/products/${id}`);
//       if (!res.ok) throw new Error('Failed to fetch product');
//       const data2 = await res.json();
//       return mapFakeStoreProductToProduct(data2);
//     },
//     staleTime: 1000 * 60 * 5,
//   });
// };

// export const useCategoriesQuery = () => {
//   return useQuery({
//     queryKey: ['categories'],
//     queryFn: async () => {
//       // DummyJSON categories
//       const res = await fetch(`${DUMMYJSON}/products/categories`);
//       if (res.ok) {
//         const data = await res.json();
//         // data can be array of objects in v2, normalize to strings
//         const list = Array.isArray(data)
//           ? data.map((c: any) => (typeof c === 'string' ? c : c.slug || c.name)).filter(Boolean)
//           : [];
//         if (list.length) return list;
//       }
//       // Fallback to FakeStore categories (strings)
//       const res2 = await fetch(`${FAKESTORE}/products/categories`);
//       if (!res2.ok) throw new Error('Failed to fetch categories');
//       const data2 = await res2.json();
//       return data2 as string[];
//     },
//     staleTime: 1000 * 60 * 60,
//   });
// };






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
