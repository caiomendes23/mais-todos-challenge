import React from 'react';
import { render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../store/cart';
import Cart from './index';

jest.mock('zustand');

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../../store/cart', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Cart', () => {
  beforeEach(() => {
    useNavigate.mockClear();
    useCart.mockClear();
  });

  it('renders cart items', () => {
    useCart.mockReturnValueOnce({
      cartItems: [
        {
          id: 1,
          title: 'Item 1',
          price: 10.99,
          quantity: 2,
          image: 'item1.jpg',
        },
        {
          id: 2,
          title: 'Item 2',
          price: 5.99,
          quantity: 1,
          image: 'item2.jpg',
        },
      ],
      totalPrice: 27.97,
    });

    render(<Cart />);

    const cartTitleElement = screen.getByText('Cart');

    expect(cartTitleElement).toBeInTheDocument();
  });
});
