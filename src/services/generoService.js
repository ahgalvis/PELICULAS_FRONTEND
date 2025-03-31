import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/generos';

export const getGeneros = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createGenero = async (genero) => {
  const response = await axios.post(API_URL, genero);
  return response.data;
};

export const updateGenero = async (id, genero) => {
  const response = await axios.put(`${API_URL}/${id}`, genero);
  return response.data;
};

export const deleteGenero = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};