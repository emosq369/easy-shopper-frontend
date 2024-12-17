import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Order() {
  const { orderId } = useParams();
  console.log("Order ID:", orderId);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/order/${orderId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOrder(data);
      })
      .catch((err) => console.error("Error fetching order details", err));
  }, [orderId]);

  return (
    <div>
      <nav>
        <a
          href="/orders"
          style={{ marginBottom: "20px", display: "inline-block" }}
        >
          ← Back to Orders
        </a>
      </nav>
      {order ? (
        <>
          <h1>Order #{order.order_number}</h1>
          <p>Status: {order.status}</p>
          <p>Total: {order.total_price}</p>
          <h2>Products</h2>
          <ul>
            {order.products.map((product) => (
              <li key={product.id}>
                <strong>{product.name}</strong>
                <p>Description: {product.description}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Total: {product.total}</p>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Loading Order details...</p>
      )}
    </div>
  );
}

export default Order;
