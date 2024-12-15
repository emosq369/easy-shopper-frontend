import React, { useState } from "react";

function Cart({ cart, setCart, user_id }) {
  const [message, setMessage] = useState("");

  const removeFromCart = (product_id) => {
    setCart(cart.filter((item) => item.product_id !== product_id));
  };

  const updateQuantity = (product_id, quantity) => {
    setCart(
      cart.map((item) =>
        item.product_id === product_id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.product_price * item.quantity, 0)
      .toFixed(2);
  };

  const submitOrder = async () => {
    if (cart.length === 0) {
      setMessage(
        "Error: Your cart is empty. Please add items before submitting."
      );
      return; // Exit early if the cart is empty
    }

    try {
      const response = await fetch("http://localhost:5001/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, cart }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setCart([]); // Clear cart after successful order
      } else {
        setMessage(data.error || "Error submitting order");
      }
    } catch (error) {
      setMessage("Server error: Unable to submit order");
    }
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {/* Navigation Link to Home */}
      <nav>
        <a
          href="/home"
          style={{ marginBottom: "20px", display: "inline-block" }}
        >
          ← Back to Home
        </a>
      </nav>
      {cart.map((item) => (
        <div key={item.product_id}>
          <h3>{item.product_name}</h3>
          <p>{item.description}</p>
          <p>Price: ${item.product_price}</p>
          <p>
            Quantity:
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.product_id, parseInt(e.target.value))
              }
            />
          </p>
          <button onClick={() => removeFromCart(item.product_id)}>
            Remove
          </button>
        </div>
      ))}
      <h2>Total: ${calculateTotal()}</h2>
      <button onClick={submitOrder} disabled={cart.length === 0}>
        Submit Order
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Cart;
