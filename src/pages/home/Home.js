import React, { useEffect } from 'react';
import useCart from '../../store/cart';
import useStore from '../../store/store';
import CartIcon from '../../components/cartIcon';
import './Home.css';

function Home() {
  const products = useStore((state) => state.products);
  const fetchProducts = useStore((state) => state.fetchProducts);

  const addToCart = useCart((state) => state.addToCart);
  const cartItems = useCart((state) => state.cartItems);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    console.log('Cart: ', cartItems);
  }, [cartItems]);

  return (
    <div className="home-container">
      <h1>Mais Todos Challenge</h1>
      <h2>Lista de Produtos</h2>
      <CartIcon />
      {products.length === 0 ? (
        <p>Carregando produtos...</p>
      ) : (
        <ul className="product-list">
          {products.map((product) => (
            <li className="product-item" key={product.id}>
              <h3>{product.title}</h3>
              <p>Preço: R${product.price.toFixed(2)}</p>
              <button onClick={() => handleAddToCart(product)}>Adicionar ao Carrinho</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
