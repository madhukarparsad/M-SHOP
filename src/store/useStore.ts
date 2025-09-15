import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, FilterOptions } from '../types';

/* ---------------- CART STORE ---------------- */
interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.product.id === product.id);
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          }
          return {
            items: [...state.items, { id: product.id, product, quantity }]
          };
        });
      },
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter(item => item.product.id !== productId)
        }));
      },
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          )
        }));
      },
      clearCart: () => set({ items: [] }),
      getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
      getTotalPrice: () => get().items.reduce((total, item) => total + (item.product.price * item.quantity), 0)
    }),
    { name: 'cart-storage' }
  )
);

/* ---------------- FILTER STORE ---------------- */
interface FilterStore {
  filters: FilterOptions;
  setFilters: (filters: Partial<FilterOptions>) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>()(
  persist(
    (set) => ({
      filters: {
        priceRange: [0, 2000],
        brands: [],
        rating: 0,
        sortBy: 'newest'
      },
      setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
      })),
      resetFilters: () => set({
        filters: { priceRange: [0, 2000], brands: [], rating: 0, sortBy: 'newest' }
      })
    }),
    { name: 'filter-storage' }
  )
);

/* ---------------- WISHLIST STORE ---------------- */
interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product: Product) => {
        set((state) => ({
          items: state.items.find(p => p.id === product.id)
            ? state.items
            : [...state.items, product]
        }));
      },
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter(p => p.id !== productId)
        }));
      },
      isInWishlist: (productId: string) => get().items.some(p => p.id === productId)
    }),
    { name: 'wishlist-storage' }
  )
);

/* ---------------- COMPARE STORE ---------------- */
interface CompareStore {
  items: Product[];
  add: (product: Product) => void; // respects max of 3
  remove: (productId: string) => void;
  toggle: (product: Product) => void;
  clear: () => void;
  isInCompare: (productId: string) => boolean;
  getCount: () => number;
}

export const useCompareStore = create<CompareStore>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product: Product) => {
        set((state) => {
          if (state.items.find(p => p.id === product.id)) return state;
          if (state.items.length >= 3) return state; // enforce max 3
          return { items: [...state.items, product] };
        });
      },
      remove: (productId: string) => {
        set((state) => ({ items: state.items.filter(p => p.id !== productId) }));
      },
      toggle: (product: Product) => {
        const { items } = get();
        if (items.find(p => p.id === product.id)) {
          set({ items: items.filter(p => p.id !== product.id) });
        } else {
          if (items.length >= 3) return;
          set({ items: [...items, product] });
        }
      },
      clear: () => set({ items: [] }),
      isInCompare: (productId: string) => get().items.some(p => p.id === productId),
      getCount: () => get().items.length,
    }),
    { name: 'compare-storage' }
  )
);
