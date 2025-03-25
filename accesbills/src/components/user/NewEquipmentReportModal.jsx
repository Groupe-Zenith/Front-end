import { useState } from 'react';
import './NewEquipmentReportModal.scss';

const NewEquipmentReportModal = ({ isOpen, onClose, onSubmit }) => {
  const [newReport, setNewReport] = useState({
    equipment_id: '',
    issue_type: 'Panne',
    description: ''
  });

  const issueTypes = [
    'Panne',
    'Maintenance',
    'Dégradation',
    'Vol',
    'Autre'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...newReport,
      status: "En attente",
      created_at: new Date().toISOString().split('T')[0]
    });
    setNewReport({
      equipment_id: '',
      issue_type: 'Panne',
      description: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Nouveau signalement d'équipement</h3>
          <button onClick={onClose} className="close-button">
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="equipment_id">Identifiant de l'équipement</label>
            <input
              type="text"
              id="equipment_id"
              name="equipment_id"
              value={newReport.equipment_id}
              onChange={handleInputChange}
              required
              placeholder="Ex: EQ-1001, PC-2023..."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="issue_type">Type de problème</label>
            <select
              id="issue_type"
              name="issue_type"
              value={newReport.issue_type}
              onChange={handleInputChange}
              required
              className="select-input"
            >
              {issueTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description du problème</label>
            <textarea
              id="description"
              name="description"
              value={newReport.description}
              onChange={handleInputChange}
              required
              placeholder="Décrivez en détail le problème rencontré..."
              rows="4"
            />
          </div>
          
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Annuler
            </button>
            <button type="submit" className="submit-button">
              Envoyer le signalement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEquipmentReportModal;