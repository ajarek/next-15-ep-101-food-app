import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Recipe } from '@/types/type-recipe'

type RecipeState = {
  items: Recipe[]
  addItemToCart: (item: Recipe) => void
  removeItemFromCart: (id: string) => void
  total: () => number
  removeAll: () => void
  increment: (id: string) => void
  decrement: (id: string) => void
  removeAllFromCart: () => void
}

export const useCartStore = create<RecipeState>()(
  persist(
    (set, get) => ({
      items: [],

      addItemToCart: (item: Recipe) =>
        set((state) => ({
          items: [item, ...state.items],
        })),

      removeItemFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      removeAllFromCart: () => set({ items: [] }),

      total: () =>
        get().items.reduce(
          (acc, item) => acc + item.price * (item.quantity ?? 1),
          0
        ),
      removeAll: () => set({ items: [] }),

      increment: (id: string) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, quantity: (item.quantity ?? 1) + 1 }
              : item
          ),
        })),
      decrement: (id: string) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity:
                    item.quantity && item.quantity > 1 ? item.quantity - 1 : 1,
                }
              : item
          ),
        })),
    }),

    { name: 'cartStore', storage: createJSONStorage(() => localStorage) }
  )
)
