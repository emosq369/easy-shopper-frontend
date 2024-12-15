import React, { useState, useEffect } from "react";
import Product from "./Product.js";
import { Link } from "react-router-dom";

function AdminHome({ onLogout }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    fetch("http://localhost:5001/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  };

  const deleteProduct = (productId) => {
    fetch(`http://localhost:5001/products/${productId}`, {
      method: "DELETE",
    }).then(() =>
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.product_id !== productId)
      )
    );
  };

  //   const editProduct = (productId) => {
  //     console.log(`Edit product ${productId}`);
  //     // Here, navigate to the edit form or open a modal to edit the product
  //   };

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
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
      {/* Product List */}
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <Product key={product.product_id} product={product}>
            <button>Delete</button>
          </Product>
        ))}
      </div>
    </div>
  );
}

export default AdminHome;
