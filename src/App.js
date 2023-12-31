import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import Product from './pages/product';
import Cart from './pages/cart';
import PaymentPageWithStripe from './pages/payment';

function App() {
  return (
    <Router>
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/payment' element={<PaymentPageWithStripe />} />
      </Routes>
    </Router>
  );
}

export default App;