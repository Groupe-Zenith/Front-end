import React, { useState, useEffect } from "react";
import './OrderForm.scss';

const OrderForm = ({ isOpen, onClose, onSubmit }) => {
  const [orderData, setOrderData] = useState({
    orderId: "",
    requester: "",
    quantity: "",
    price: "",
    supplier: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (orderData.image) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(orderData.image);
    } else {
      setPreview(null);
    }
  }, [orderData.image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setOrderData({ ...orderData, image: file });
    }
  };

  const handleRemoveImage = () => {
    setOrderData({ ...orderData, image: null });
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(orderData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className={`modal-container ${preview ? 'with-preview' : ''}`}>
        <div className="modal-header">
          <h3>New Order</h3>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="form-preview-container">
          <form className="modal-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="orderId">Order ID</label>
                <input
                  id="orderId"
                  type="text"
                  value={orderData.orderId}
                  onChange={(e) => setOrderData({ ...orderData, orderId: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="requester">Requester</label>
                <input
                  id="requester"
                  type="text"
                  value={orderData.requester}
                  onChange={(e) => setOrderData({ ...orderData, requester: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="quantity">Quantity</label>
                <input
                  id="quantity"
                  type="number"
                  value={orderData.quantity}
                  onChange={(e) => setOrderData({ ...orderData, quantity: e.target.value })}
                  min="1"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  type="text"
                  value={orderData.price}
                  onChange={(e) => setOrderData({ ...orderData, price: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="supplier">Supplier</label>
                <input
                  id="supplier"
                  type="text"
                  value={orderData.supplier}
                  onChange={(e) => setOrderData({ ...orderData, supplier: e.target.value })}
                  required
                />
              </div>
              <div className="image-upload-container">
                <label htmlFor="image-upload">Upload Photo</label>
                <input
                  id="image-upload"
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden-input"
                />
                <label htmlFor="image-upload" className="upload-button">
                  <span className="icon">📷</span> Choose Image
                </label>
              </div>
            </div>

            <div className="modal-actions">
              <button type="button" className="cancel-button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </form>

          {preview && (
            <div className="image-preview-sidebar">
              <div className="preview-header">
                <h4>Image Preview</h4>
                <button className="remove-image-button" onClick={handleRemoveImage}>
                  ×
                </button>
              </div>
              <img src={preview} alt="Preview" className="preview-image" />
              <p className="file-name">{orderData.image.name}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderForm;