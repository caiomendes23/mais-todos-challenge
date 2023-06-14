import { create } from 'zustand';

const useStore = create((set) => ({
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
}));

export default useStore;
