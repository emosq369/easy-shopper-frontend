import React, { useState, useEffect } from 'react';
import Product from './Product.js';
import { Link } from 'react-router-dom';

function AdminHome({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('http://localhost:5001/products')
      .then(response => response.json())
      .then(data => {setProducts(data)});
  };

  const deleteProduct = (productId) => {
    fetch(`http://localhost:5001/deleteproduct/${productId}`, { method: 'DELETE' })
      .then(() => {
        setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
        setMessage("Product deleted succesfully!");
      })
      .catch(error => setMessage('Error deleting product: ' + error.message));
  };

  
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Product Catalog (Admin)</h1>

      {/* Navigation Links */}
      <div className="navigation-links">
        <Link to="/add-product">Add Product</Link>
        <button onClick={onLogout}>Logout</button>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
     {/* Product List */}
      <div className="product-grid">
        {filteredProducts.map(product => (
            <Product key={product.id} product={product}>
                <button onClick={() => deleteProduct(product.id)}>
                    Delete
                </button>
            </Product>
        ))}
      </div>
    </div>
  );
}

export default AdminHome;
