import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/medias';

export const getMedias = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createMedia = async (media) => {
  const response = await axios.post(API_URL, media);
  return response.data;
};

export const updateMedia = async (id, media) => {
  const response = await axios.put(`${API_URL}/${id}`, media);
  return response.data;
};

export const deleteMedia = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};