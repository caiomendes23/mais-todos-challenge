import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home';
import ProductForm from './components/ProductForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path='/products' element={<ProductForm />} />
      </Routes>
    </Router>
  );
}

export default App;