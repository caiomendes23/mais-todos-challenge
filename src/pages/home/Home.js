import React, { useEffect } from 'react';
import useStore from '../../store/store';
import './Home.css';

function Home() {
  const products = useStore((state) => state.products);
  const fetchProducts = useStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="home-container">
      <h1>Mais Todos Challenge</h1>
      <h2>Lista de Produtos</h2>
      {products.length === 0 ? (
        <p>Carregando produtos...</p>
      ) : (
        <ul className="product-list">
          {products.map((product) => (
            <li className="product-item" key={product.id}>
              <h3>{product.title}</h3>
              <p>Preço: R${product.price.toFixed(2)}</p>
              <button>Adicionar ao carrinho</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;
