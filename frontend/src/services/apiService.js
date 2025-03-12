// frontend/src/services/apiService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchWalletBalances = async (address) => {
  try {
    const response = await axios.post(`${API_URL}/fetch-balances/`, { address });
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};