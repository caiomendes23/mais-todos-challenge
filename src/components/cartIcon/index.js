import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../../store/cart';
import './styles.css'

function CartIcon() {
  const cartItems = useCart((state) => state.cartItems);

  return (
    <Link to="/cart" className="cart-icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M20 15H4l-1-9h18M18 6H6l-2-4h16v13" />
      </svg>
      {cartItems.length > 0 && (
        <span className="cart-icon-count">
          <span className="bullet">{cartItems.length}</span>
        </span>
      )}
    </Link>
  );
}

export default CartIcon;