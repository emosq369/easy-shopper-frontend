import React, { useState } from "react";
import Product from "./Product.js";

function Cart({ cart, setCart, user_id }) {
  const [message, setMessage] = useState("");

  const removeFromCart = (product_id) => {
    const updatedCart = cart.filter((item) => item.id !== product_id);
    setCart(updatedCart); //update status of the cart
    sessionStorage.setItem("cart", JSON.stringify(updatedCart)); // store updated cart
  };

  const updateQuantity = (product_id, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === product_id ? { ...item, quantity: quantity } : item
    );
    setCart(updatedCart); // update status of the cart
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const submitOrder = async () => {
    if (cart.length === 0) {
      setMessage(
        "Error: Your cart is empty. Please add items before submitting."
      );
      return; // Exit early if the cart is empty
    }

    const orderDate = new Date().toISOString();

    try {
      const response = await fetch("http://localhost:5001/neworder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, cart, order_date: orderDate }),
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
      {/* Show products on cart */}
      {cart.map((item) => (
        <div key={item.id}>
          <Product product={item}>
            {/* show quantity and allow change it */}
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={
                (e) => updateQuantity(item.id, parseInt(e.target.value)) // update quantity
              }
              style={{ width: "50px", marginRight: "10px" }}
            />
            {/* remove product from cart */}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </Product>
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
