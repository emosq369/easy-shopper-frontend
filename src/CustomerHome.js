import React, { useState, useEffect } from "react";
import Product from "./Product.js";
import { Link } from "react-router-dom";

function CustomerHome({ onLogout, cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [quantities, setQuantities] = useState({}); // Store quantity for each product separately

  useEffect(() => {
    fetch("http://localhost:5001/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products", err));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle quantity change for each product
  const handleQuantityChange = (product_id, quantity) => {
    if (quantity > 0) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [product_id]: quantity,
      }));
    }
  };

  // Add product to cart using selected quantity
  const addToCart = (product) => {
    const quantityToAdd = quantities[product.product_id] || 1; // Default to 1 if no quantity is set
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.product_id === product.product_id
      );
      if (existingProduct) {
        return prevCart.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: quantityToAdd }];
      }
    });

    // Reset the quantity input back to 1 after adding to cart
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [product.product_id]: 1,
    }));
  };

  return (
    <div>
      <h1>Product Catalog</h1>

      {/* Navigation Links */}
      <div className="navigation-links">
        <Link to="/cart">Cart ({cart.length})</Link>
        <Link to="/orders">Orders</Link>
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
        {filteredProducts.map((product) => (
          <div key={product.product_id} className="product-card">
            <img src={product.image_url} alt={product.product_name} />
            <div className="product-card-content">
              <h2>{product.product_name}</h2>
              <p>{product.product_description}</p>
              <p>Price: ${product.product_price}</p>
              <p>Quantity Available: {product.product_quantity}</p>

              {/* Quantity Input */}
              <input
                type="number"
                min="1"
                value={quantities[product.product_id] || 1} // Default quantity is 1
                onChange={(e) =>
                  handleQuantityChange(
                    product.product_id,
                    parseInt(e.target.value)
                  )
                }
                style={{ width: "50px", marginRight: "10px" }}
              />

              <button
                disabled={product.product_quantity === 0}
                onClick={() => addToCart(product)}
              >
                {product.product_quantity === 0
                  ? "Out of Stock"
                  : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomerHome;
