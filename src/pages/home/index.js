import React, { useEffect } from 'react';
import useCart from '../../store/cart';
import useStore from '../../store/store';
import CartIcon from '../../components/cartIcon';
import './styles.css';
import { formatCurrency } from '../../utils/format';

function Home() {
  const products = useStore((state) => state.products);
  const fetchProducts = useStore((state) => state.fetchProducts);

  const addToCart = useCart((state) => state.addToCart);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="home-container">
      <h1>Mais Todos Challenge</h1>
      <h2>Product List</h2>
      <CartIcon />
      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <ul className="product-list">
          {products.map((product) => (
            <li className="product-item" key={product.id}>
              <h3>{product.title}</h3>
              <p>Price: {formatCurrency(product.price)}</p>
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
