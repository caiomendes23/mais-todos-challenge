import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useStore = create(persist(
  (set) => ({
    products: [],
    fetchProducts: async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        set({ products: data });
      } catch (error) {
        console.error(error);
      }
    },
    editProduct: (productId, updatedProduct) =>
      set((state) => ({
        products: state.products.map((product) =>
          product.id === Number(productId) ? { ...product, ...updatedProduct } : product
        ),
      })),
    deleteProduct: (productId) =>
      set((state) => ({
        products: state.products.filter((product) => product.id !== Number(productId)),
      })),
  }),
  {
    name: 'store',
    storage: createJSONStorage(() => localStorage),
  }
));

export default useStore;
