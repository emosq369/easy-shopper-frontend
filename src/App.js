import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductCatalog from './ProductCatalog';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductCatalog />} />
        
        <Route path="/catalog" element={<ProductCatalog />} />
      </Routes>
    </Router>
  );
}

export default App;
