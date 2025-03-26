import { useState } from 'react';
import { User, Mail, Phone, Briefcase, Users } from 'lucide-react';
import UserNavbar from '../../navbar/UserNavbar';
import './ProfilePage.scss';

export default function ProfilePage() {
  const [userData, setUserData] = useState({
    firstName: 'Mumu',
    lastName: 'Muriella',
    email: 'muriella@example.com',
    phone: '+33 6 12 34 56 78',
    role: 'Utilisateur simple',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log('Données mises à jour:', userData);
  };

  return (
    <div className="profile-page">
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
            <div className="avatar">
              <User className="icon" size={48} />
            </div>
            {isEditing && (
              <button className="change-avatar">
                Changer la photo
              </button>
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