import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const userRole = localStorage.getItem('userRole'); // 'customer' or 'owner'

  // Fetch products from the backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch('http://localhost:5001/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  };

  const addToCart = (productId) => {
    console.log(`Add product ${productId} to cart`);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(productId);
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const deleteProduct = (productId) => {
    fetch(`http://localhost:5001/products/${productId}`, { method: 'DELETE' })
      .then(() => setProducts(prevProducts => prevProducts.filter(product => product.product_id !== productId)));
  };

  const editProduct = (productId) => {
    console.log(`Edit product ${productId}`);
    // Here, you could navigate to an edit form page or open a modal to edit the product
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Product Catalog</h1>

      {/* Navigation Links */}
      <div className="navigation-links">
        {userRole === 'customer' ? (
          <>
            <Link to="/cart">Cart</Link> | 
            <Link to="/orders">Orders</Link>
          </>
        ) : (
          <>
            <Link to="/add-product">Add Product</Link> 
          </>
        )}
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
          <div key={product.product_id} className="product-card">
            <h2>{product.product_name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>

            {userRole === 'customer' ? (
              <button onClick={() => addToCart(product.product_id)}>Add to Cart</button>
            ) : (
              <>
                <button onClick={() => editProduct(product.product_id)}>Edit</button>
                <button onClick={() => deleteProduct(product.product_id)}>Delete</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductCatalog;
