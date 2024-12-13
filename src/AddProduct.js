import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const addProduct = async (e) => {
    e.preventDefault();

    const productData = {
      product_name: productName,
      description: description,
      price: parseFloat(price),
      quantity: parseInt(quantity)
    };

    // Validation to ensure no fields are empty
    if (!productData.product_name || !productData.description || !productData.price || !productData.quantity) {
      setErrorMessage('All fields are required');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Product added successfully:', result);
        navigate('/');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'An error occurred');
      }
    } catch (error) {
      setErrorMessage('Server error: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Add Product</h1>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form onSubmit={addProduct}>
        <div>
          <label>Product Name</label>
          <input 
            type="text" 
            value={productName} 
            onChange={(e) => setProductName(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label>Description</label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label>Price</label>
          <input 
            type="number" 
            step="0.01" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </div>

        <div>
          <label>Quantity</label>
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            required 
          />
        </div>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
