import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductCatalog from './ProductCatalog';
import AddProduct from './AddProduct';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductCatalog />} />
        <Route path="/catalog" element={<ProductCatalog />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </Router>
  );
}

export default App;
