import { useState } from 'react';
import { User, Mail, Phone, Briefcase, Users } from 'lucide-react';
import UserNavbar from '../../navbar/UserNavbar';
import './ProfilePage.scss';
import { handleUpdateUser } from '../../../../../services/ApiUser';
import {toast , Toaster} from "sonner"

export default function ProfilePage() {
  const [image, setImage] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Convertir en URL pour prévisualisation
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0]; // Récupérer le fichier
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  const userRole = JSON.parse(localStorage.getItem("user")) || {};
  const [userData, setUserData] = useState({
    firstName: userRole.first_name || '',
    lastName: userRole.last_name || '',
    email: userRole.email || '',
    phone: userRole.tel || '',
    role: userRole.role || '',
    profil: userRole.photo || ''
  });


  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await handleUpdateUser({
        userId: userRole.id, // Assure-toi que `userRole.id` est bien défini
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName,
        role: userData.role,
        tel: userData.phone,
        photo: userData.profil
      });
  
      if (updatedUser && updatedUser.status === "success") { // Vérifier le statut
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsEditing(false);
        toast.success("Mise à jour réussie !");
      } else {
        console.log("Réponse de l'API:", updatedUser); // Afficher la réponse pour débogage
        toast.error("Erreur lors de la mise à jour : " + (updatedUser?.message || "Inconnu"));
      }
    } catch (error) {
      console.error("Erreur :", error);
      toast.error("Erreur lors de la mise à jour de l'utilisateur.");
    }
  };
  
  
  

  return (
    <div className="profile-page">
      <Toaster/>
      <UserNavbar />
      <main className="profile-container">
        <div className="profile-header">
          <h1>Mon Profil</h1>
          {!isEditing ? (
            <button 
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
              Modifier le profil
            </button>
          ) : (
            <div className="edit-actions">
              <button 
                className="cancel-button"
                onClick={() => setIsEditing(false)}
              >
                Annuler
              </button>
              <button 
                className="save-button"
                onClick={handleSubmit}
              >
                Enregistrer
              </button>
            </div>
          )}
        </div>

        <div className="profile-content">
        <div className="avatar-section">
      <div
        className="avatar"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          border: "2px dashed #ccc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          overflow: "hidden",
          background : 'none'
        }}
      >
        {image ? (
          <img src={image} alt="Profil" className="profile-image" style={{ width: "80%", height: "80%", objectFit: "cover" }}/>
        ) : (
          <User className="icon" size={48} />
        )}
      </div>

      {isEditing && (
        <>
          <button
            className="change-avatar"
            onClick={() => document.getElementById("fileInput").click()}
          >
            Changer la photo
          </button>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </>
      )}
    </div>

          <form className="profile-form">
            <div className="form-row">
              <div className="form-group">
                <label>Prénom</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="profile-info">
                    <User className="icon" size={16} />
                    {userData.firstName}
                  </p>
                )}
              </div>
              
              <div className="form-group">
                <label>Nom</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="profile-info">{userData.lastName}</p>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="profile-info">
                  <Mail className="icon" size={16} />
                  {userData.email}
                </p>
              )}
            </div>

            <div className="form-group">
              <label>Téléphone</label>
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="profile-info">
                  <Phone className="icon" size={16} />
                  {userData.phone}
                </p>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Département</label>
                {isEditing ? (
                  <select
                    name="department"
                    value={userData.department}
                    onChange={handleInputChange}
                  >
                    <option value="IT">IT</option>
                    <option value="RH">RH</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                ) : (
                  <p className="profile-info">
                    <Users className="icon" size={16} />
                    {userData.department}
                  </p>
                )}
              </div>
              
              <div className="form-group">
                <label>Poste</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="position"
                    value={userData.position}
                    onChange={handleInputChange}
                  />
                ) : (
                  <p className="profile-info">
                    <Briefcase className="icon" size={16} />
                    {userData.position}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}