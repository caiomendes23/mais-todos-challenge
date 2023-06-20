/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
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
    if (!products.length) fetchProducts();
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
              <Link to={`/product/${product.id}`}>
                <h3>{product.title}</h3>
              </Link>
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
