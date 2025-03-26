import axios from 'axios';

export const handlePostPurchase = async (data) => {
  try {
    const response = await axios.post('http://localhost:5000/purchase-requests', data);
    console.log('Achat créé avec succès:', response.data);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'achat:', error);
    throw error;
  }
};
