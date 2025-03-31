import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/directores';

export const getDirectores = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createDirector = async (director) => {
  const response = await axios.post(API_URL, director);
  return response.data;
};

export const updateDirector = async (id, director) => {
  const response = await axios.put(`${API_URL}/${id}`, director);
  return response.data;
};

export const deleteDirector = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};