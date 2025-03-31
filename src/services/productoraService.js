import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/productoras';

export const getProductoras = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createProductora = async (productora) => {
  const response = await axios.post(API_URL, productora);
  return response.data;
};

export const updateProductora = async (id, productora) => {
  const response = await axios.put(`${API_URL}/${id}`, productora);
  return response.data;
};

export const deleteProductora = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};