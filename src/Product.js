import React from "react";
import "./product.css";

function Product({ product, children }) {
  return (
    <div className="product-card">
      <img src={product.image_url} alt={product.product_name} />
      <div className="product-card-content">
        <h2>{product.product_name}</h2>
        <p>{product.product_description}</p>
        <p>Price: ${product.product_price}</p>
        <p>Quantity: {product.product_quantity}</p>
        <span>{children}</span>
      </div>
    </div>
  );
}

export default Product;
