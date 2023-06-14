import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import ProductForm from './pages/productForm';
import Cart from './pages/cart';

function App() {
  return (
    <Router>
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/products' element={<ProductForm />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;