import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const userId = sessionStorage.getItem("userId");
  const userRole = sessionStorage.getItem("role");

  useEffect(() => {
    if (!userId || userRole !== "customer") {
      setIsAuthenticated(false);
    } else {
      fetch(`http://localhost:5001/orders/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch orders");
          }
          return response.json();
        })
        .then((data) => {
          setOrders(data);
        })
        .catch((err) => console.error("Error fetching orders", err));
    }
  }, [userId, userRole]);

  return (
    <div>
      <h1>My Orders</h1>
      {/* Navigation Link to Home */}
      <nav>
        <a
          href="/home"
          style={{ marginBottom: "20px", display: "inline-block" }}
        >
          ← Back to Home
        </a>
      </nav>
      <div>
        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order) => (
            <div key={order.id}>
              <Link to={`/order/${order.id}`}>
                <h3>Order #{order.order_number}</h3>
              </Link>
              <p>Status: {order.status}</p>
              <p>Total: ${order.total_price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;
