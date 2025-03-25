import { useState } from 'react';
import './NewPurchaseRequestModal.scss'

const NewPurchaseRequestModal = ({ isOpen, onClose, onSubmit }) => {
  const [newRequest, setNewRequest] = useState({
    item_name: '',
    quantity: 1,
    estimated_price: '',
    reason: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newRequest);
    // Reset form after submission
    setNewRequest({
      item_name: '',
      quantity: 1,
      estimated_price: '',
      reason: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Nouvelle demande d'achat</h3>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="item_name">Article demandé</label>
            <input
              type="text"
              id="item_name"
              name="item_name"
              value={newRequest.item_name}
              onChange={handleInputChange}
              required
              placeholder="Ex: Écran 24\"
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">Quantité</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={newRequest.quantity}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="estimated_price">Prix estimé (Ar)</label>
              <input
                type="number"
                id="estimated_price"
                name="estimated_price"
                min="0"
                value={newRequest.estimated_price}
                onChange={handleInputChange}
                required
                placeholder="0.00"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="reason">Motif de la demande</label>
            <textarea
              id="reason"
              name="reason"
              value={newRequest.reason}
              onChange={handleInputChange}
              required
              placeholder="Décrivez pourquoi vous avez besoin de cet article..."
              rows="4"
            />
          </div>
          
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Annuler
            </button>
            <button type="submit" className="submit-button">
              Soumettre la demande
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPurchaseRequestModal;