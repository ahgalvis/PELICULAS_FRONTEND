import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/tipos';

export const getTipos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTipo = async (tipo) => {
  const response = await axios.post(API_URL, tipo);
  return response.data;
};

export const updateTipo = async (id, tipo) => {
  const response = await axios.put(`${API_URL}/${id}`, tipo);
  return response.data;
};

export const deleteTipo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};