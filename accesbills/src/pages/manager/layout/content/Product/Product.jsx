import React, { useState, useEffect } from "react";
import "./Product.scss";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    photo: null,
    price: "",
    supplier: "",
    requestDate: "",
    receptionDate: ""
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (formData.photo) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(formData.photo);
    } else {
      setPreview(null);
    }
  }, [formData.photo]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, photo: null });
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setData([...data, formData]);
    setFormData({
      productName: "",
      photo: null,
      price: "",
      supplier: "",
      requestDate: "",
      receptionDate: ""
    });
    setShowForm(false);
  };

  return (
    <div className="ProductList">
      <div className="header">
        <h1>Gestion d'Inventaire</h1>
        <button onClick={() => setShowForm(true)}>Ajouter un produit</button>
      </div>

      <div className="cards-container">
        {data.map((item, index) => (
          <div className="product-card" key={index}>
            <div className="card-image">
              {item.photo ? (
                <img src={URL.createObjectURL(item.photo)} alt={item.productName} />
              ) : (
                <div className="placeholder">Pas de photo</div>
              )}
            </div>
            <div className="card-details">
              <h3>{item.productName}</h3>
              <p><strong>Prix : </strong>{item.price} €</p>
              <p><strong>Fournisseur : </strong>{item.supplier}</p>
              <p><strong>Date de demande : </strong>{item.requestDate}</p>
              <p><strong>Date de réception : </strong>{item.receptionDate}</p>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className={`modal-container ${preview ? 'with-preview' : ''}`}>
            <div className="modal-header">
              <h3>Ajouter un Produit</h3>
              <button className="close-button" onClick={() => setShowForm(false)}>×</button>
            </div>

            <div className="form-preview-container">
              <form className="modal-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="productName">Produit</label>
                    <input
                      id="productName"
                      type="text"
                      name="productName"
                      value={formData.productName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="price">Prix</label>
                    <input
                      id="price"
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="supplier">Fournisseur</label>
                    <input
                      id="supplier"
                      type="text"
                      name="supplier"
                      value={formData.supplier}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="requestDate">Date de demande</label>
                    <input
                      id="requestDate"
                      type="date"
                      name="requestDate"
                      value={formData.requestDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="receptionDate">Date de réception</label>
                    <input
                      id="receptionDate"
                      type="date"
                      name="receptionDate"
                      value={formData.receptionDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="image-upload-container">
                    <label htmlFor="photo">Photo</label>
                    <input
                      id="photo"
                      type="file"
                      name="photo"
                      onChange={handleInputChange}
                      accept="image/*"
                      className="hidden-input"
                    />
                    <label htmlFor="photo" className="upload-button">
                      <span className="icon">📷</span> Choisir une image
                    </label>
                  </div>
                </div>

                <div className="modal-actions">
                  <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>
                    Annuler
                  </button>
                  <button type="submit" className="submit-button">
                    Ajouter
                  </button>
                </div>
              </form>

              {preview && (
                <div className="image-preview-sidebar">
                  <div className="preview-header">
                    <h4>Aperçu de l'image</h4>
                    <button className="remove-image-button" onClick={handleRemoveImage}>
                      ×
                    </button>
                  </div>
                  <img src={preview} alt="Preview" className="preview-image" />
                  <p className="file-name">{formData.photo?.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;