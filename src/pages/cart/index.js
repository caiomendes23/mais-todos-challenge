import React, { useEffect } from 'react';
import useCart from '../../store/cart';
import { formatCurrency } from '../../utils/format';
import './styles.css'

function CartPage() {
  const cartItems = useCart((state) => state.cartItems);
  const totalPrice = useCart((state) => state.totalPrice);

  const handleQuantityChange = (itemId, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    useCart.setState((state) => {
      const updatedCartItems = state.cartItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      return { cartItems: updatedCartItems };
    });
  };

  const updateTotalPrice = () => {
    const newTotalPrice = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    useCart.setState({ totalPrice: newTotalPrice });
  };

  const handleRemoveItem = (itemId) => {
    useCart.setState((state) => {
      const updatedCartItems = state.cartItems.filter((item) => item.id !== itemId);
      return { cartItems: updatedCartItems };
    });
  };

  useEffect(() => {
    updateTotalPrice();
  }, [cartItems]);

  return (
    <div className="cart-page">
      <div className="cart-page-header">
        <h1 className="cart-page-title">Cart</h1>
      </div>

      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h3 className="cart-item-title">{item.title}</h3>
                <p className="cart-item-price">Price: {formatCurrency(item.price)}</p>
                <div className="cart-item-quantity">
                  <span className="cart-item-quantity-label">Quantity:</span>
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    value={item.quantity}
                    className="cart-item-quantity-input"
                    onChange={(event) => handleQuantityChange(item.id, event)}
                  />
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
                <p className="cart-item-subtotal">Subtotal: {formatCurrency(item.price * item.quantity)}</p>
              </div>
            </div>
          ))}

          <div className="cart-total">
            <span className="cart-total-label">Total:</span>
            <span className="cart-total-amount">{formatCurrency(totalPrice)}</span>
          </div>

          <div className="cart-actions">
            <button className="cart-action-button">Checkout</button>
          </div>
        </div>
      ) : (
        <p>No items in cart.</p>
      )}
    </div>
  );
}

export default CartPage;

