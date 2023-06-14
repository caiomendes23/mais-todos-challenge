import React from 'react';
import useCart from '../../store/cart';

function Cart() {
  const cartItems = useCart((state) => state.cartItems);

  return (
    <div>
      <h1>Carrinho de Compras</h1>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <span>R${item.price.toFixed(2)}</span>
              <button>Remover</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
