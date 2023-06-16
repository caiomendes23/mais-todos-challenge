import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useCart = create(persist(
  (set) => ({
    cartItems: [],
    addToCart: (product) => {
      set((state) => ({
        cartItems: [...state.cartItems, product],
      }));
    },
    removeFromCart: (productId) => {
      set((state) => ({
        cartItems: state.cartItems.filter((item) => item.id !== productId),
      }));
    },
  }),
  {
    name: 'cart',
    storage: createJSONStorage(() => localStorage),
  }
));

export default useCart;