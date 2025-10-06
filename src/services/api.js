import axios from 'axios';

const API_URL = 'https://peliculas-backend-414s.onrender.com/api/v1';

export const getGeneros = () => axios.get(`${API_URL}/generos`);
export const createGenero = (genero) => axios.post(`${API_URL}/generos`, genero);
export const updateGenero = (id, genero) => axios.put(`${API_URL}/generos/${id}`, genero);
export const deleteGenero = (id) => axios.delete(`${API_URL}/generos/${id}`);

export const getDirectores = () => axios.get(`${API_URL}/directores`);
export const createDirector = (director) => axios.post(`${API_URL}/directores`, director);
export const updateDirector = (id, director) => axios.put(`${API_URL}/directores/${id}`, director);
export const deleteDirector = (id) => axios.delete(`${API_URL}/directores/${id}`);

export const getProductoras = () => axios.get(`${API_URL}/productoras`);
export const createProductora = (productora) => axios.post(`${API_URL}/productoras`, productora);
export const updateProductora = (id, productora) => axios.put(`${API_URL}/productoras/${id}`, productora);
export const deleteProductora = (id) => axios.delete(`${API_URL}/productoras/${id}`);

export const getTipos = () => axios.get(`${API_URL}/tipos`);
export const createTipo = (tipo) => axios.post(`${API_URL}/tipos`, tipo);
export const updateTipo = (id, tipo) => axios.put(`${API_URL}/tipos/${id}`, tipo);
export const deleteTipo = (id) => axios.delete(`${API_URL}/tipos/${id}`);

export const getMedias = () => axios.get(`${API_URL}/medias`);
export const createMedia = (media) => axios.post(`${API_URL}/medias`, media);
export const updateMedia = (id, media) => axios.put(`${API_URL}/medias/${id}`, media);
export const deleteMedia = (id) => axios.delete(`${API_URL}/medias/${id}`);
