import React, { useState } from "react";

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");

  const addProduct = async (e) => {
    e.preventDefault();

    const product = { name, description, price, quantity, image_url: imageUrl };

    // Validation to ensure no fields are empty
    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !product.quantity ||
      !product.image_url
    ) {
      setMessage("All fields are required");
      return;
    }

    if (product.price < 0 || product.quantity < 0) {
      setMessage("Price/product must be valid");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/addproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setImageUrl("");
      } else {
        setMessage(data.message || "An error occurred");
      }
    } catch (error) {
      setMessage("Server error: " + error.message);
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      {/* Navigation Link to Home */}
      <nav>
        <a
          href="/home"
          style={{ marginBottom: "20px", display: "inline-block" }}
        >
          ← Back to Home
        </a>
      </nav>
      {message && <p style={{ color: "red" }}>{message}</p>}

      <form onSubmit={addProduct}>
        <div>
          <label htmlFor="name">Product Name: </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description: </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="price">Price: </label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="quantity">Quantity: </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="imageUrl">Image url: </label>
          <input
            id="imageUrl"
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
