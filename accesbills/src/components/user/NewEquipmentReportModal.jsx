import { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import './NewEquipmentReportModal.scss';

const NewEquipmentReportModal = ({ isOpen, onClose, onSubmit }) => {
  const [newReport, setNewReport] = useState({
    equipment_id: '',
    issue_type: 'Panne',
    description: '',
    image: null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewReport(prev => ({
        ...prev,
        image: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setNewReport(prev => ({
      ...prev,
      image: null
    }));
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('equipment_id', newReport.equipment_id);
    formData.append('issue_type', newReport.issue_type);
    formData.append('description', newReport.description);
    if (newReport.image) {
      formData.append('image', newReport.image);
    }

    onSubmit({
      ...newReport,
      status: "En attente",
      created_at: new Date().toISOString().split('T')[0]
    });

  
    setNewReport({
      equipment_id: '',
      issue_type: 'Panne',
      description: '',
      image: null
    });
    setPreviewImage(null);
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

          <div className="form-group">
            <label htmlFor="image">Justificatif (image optionnelle)</label>
            <div className="image-upload-container">
              <label htmlFor="image" className="upload-button">
                <Upload className="icon" size={16} />
                <span>{previewImage ? 'Changer l\'image' : 'Ajouter une image'}</span>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="hidden-input"
                />
              </label>
              
              {previewImage && (
                <div className="image-preview">
                  <img src={previewImage} alt="Preview" />
                  <button type="button" onClick={removeImage} className="remove-image-button">
                    <X className="icon" size={14} />
                  </button>
                </div>
              )}
            </div>
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