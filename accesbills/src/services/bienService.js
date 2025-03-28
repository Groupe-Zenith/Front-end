import axios from 'axios';
import { useState,useEffect } from 'react';
const bienService = ()=>{
    const [inventoryData, setInventoryData] = useState([]);
    useEffect(() => {
        getAllBiens();
    })
    const API_URL = 'http://localhost:5000/bien/';

    // Créer un bien
    const createBien = async (bienData) => {
    try {
        const response = await axios.post(API_URL, bienData);
        return response.data;
        // return response.data;
    } catch (error) {
        console.error('Error creating bien:', error);
        throw error;
    }
    };

    // Obtenir tous les biens
    const getAllBiens = async () => {
    try {
        const response = await axios.get('http://localhost:5000/bien/');
        setInventoryData(response.data);
    } catch (error) {
        console.error('Error fetching all biens:', error);
        throw error;
    }
    };

    // Obtenir un bien par ID
    const getBienById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching bien with id ${id}:`, error);
        throw error;
    }
    };

    // Enregistrer plusieurs biens
    const registerMultipleBiens = async (biensData) => {
    try {
        const response = await axios.post(`${API_URL}/all`, biensData);
        return response.data;
    } catch (error) {
        console.error('Error registering multiple biens:', error);
        throw error;
    }
    };

return {
  createBien,
  getAllBiens,
  getBienById,
  registerMultipleBiens,
  inventoryData
}};
export default bienService;