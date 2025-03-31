import React, { useState, useEffect } from 'react';
import { getMedias, createMedia, updateMedia, deleteMedia } from '../services/mediaService';
import { getGeneros } from '../services/generoService';
import { getDirectores } from '../services/directorService';
import { getProductoras } from '../services/productoraService';
import { getTipos } from '../services/tipoService';
import Swal from 'sweetalert2';

const MediaList = () => {
  const [medias, setMedias] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [formData, setFormData] = useState({
    serial: '',
    titulo: '',
    sinopsis: '',
    url: '',
    imagenPortada: '',
    anioEstreno: '',
    genero: '',
    director: '',
    productora: '',
    tipo: '',
  });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  // Cargar datos iniciales (medias, géneros, directores, productoras, tipos)
  useEffect(() => {
    fetchMedias();
    fetchGeneros();
    fetchDirectores();
    fetchProductoras();
    fetchTipos();
  }, []);

  const fetchMedias = async () => {
    try {
      const data = await getMedias();
      setMedias(data);
    } catch (error) {
      Swal.fire('Error', 'No se pudo cargar las medias', 'error');
    }
  };

  const fetchGeneros = async () => {
    try {
      const data = await getGeneros();
      setGeneros(data);
    } catch (error) {
      Swal.fire('Error', 'No se pudo cargar los géneros', 'error');
    }
  };

  const fetchDirectores = async () => {
    try {
      const data = await getDirectores();
      setDirectores(data);
    } catch (error) {
      Swal.fire('Error', 'No se pudo cargar los directores', 'error');
    }
  };

  const fetchProductoras = async () => {
    try {
      const data = await getProductoras();
      setProductoras(data);
    } catch (error) {
      Swal.fire('Error', 'No se pudo cargar las productoras', 'error');
    }
  };

  const fetchTipos = async () => {
    try {
      const data = await getTipos();
      setTipos(data);
    } catch (error) {
      Swal.fire('Error', 'No se pudo cargar los tipos', 'error');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateMedia(currentId, formData);
        Swal.fire('Éxito', 'Media actualizada correctamente', 'success');
      } else {
        await createMedia(formData);
        Swal.fire('Éxito', 'Media creada correctamente', 'success');
      }
      setFormData({
        serial: '',
        titulo: '',
        sinopsis: '',
        url: '',
        imagenPortada: '',
        anioEstreno: '',
        genero: '',
        director: '',
        productora: '',
        tipo: '',
      });
      setEditing(false);
      setCurrentId(null);
      fetchMedias();
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar la media', 'error');
    }
  };

  const handleEdit = (media) => {
    setEditing(true);
    setCurrentId(media._id);
    setFormData({
      serial: media.serial,
      titulo: media.titulo,
      sinopsis: media.sinopsis,
      url: media.url,
      imagenPortada: media.imagenPortada,
      anioEstreno: media.anioEstreno,
      genero: media.genero._id || media.genero, // Puede ser un objeto o un ID
      director: media.director._id || media.director,
      productora: media.productora._id || media.productora,
      tipo: media.tipo._id || media.tipo,
    });
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await deleteMedia(id);
        Swal.fire('Eliminado', 'La media ha sido eliminada', 'success');
        fetchMedias();
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar la media', 'error');
      }
    }
  };

  return (
    <div>
      <h2>Medias (Películas y Series)</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label>Serial</label>
          <input
            type="text"
            className="form-control"
            name="serial"
            value={formData.serial}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Título</label>
          <input
            type="text"
            className="form-control"
            name="titulo"
            value={formData.titulo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Sinopsis</label>
          <textarea
            className="form-control"
            name="sinopsis"
            value={formData.sinopsis}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>URL</label>
          <input
            type="url"
            className="form-control"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Imagen de Portada (URL)</label>
          <input
            type="url"
            className="form-control"
            name="imagenPortada"
            value={formData.imagenPortada}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Año de Estreno</label>
          <input
            type="number"
            className="form-control"
            name="anioEstreno"
            value={formData.anioEstreno}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Género</label>
          <select
            className="form-control"
            name="genero"
            value={formData.genero}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecciona un género</option>
            {generos.map((genero) => (
              <option key={genero._id} value={genero._id}>
                {genero.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Director</label>
          <select
            className="form-control"
            name="director"
            value={formData.director}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecciona un director</option>
            {directores.map((director) => (
              <option key={director._id} value={director._id}>
                {director.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Productora</label>
          <select
            className="form-control"
            name="productora"
            value={formData.productora}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecciona una productora</option>
            {productoras.map((productora) => (
              <option key={productora._id} value={productora._id}>
                {productora.nombre}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Tipo</label>
          <select
            className="form-control"
            name="tipo"
            value={formData.tipo}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecciona un tipo</option>
            {tipos.map((tipo) => (
              <option key={tipo._id} value={tipo._id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {editing ? 'Actualizar' : 'Crear'}
        </button>
        {editing && (
          <button
            type="button"
            className="btn btn-secondary ml-2"
            onClick={() => {
              setEditing(false);
              setFormData({
                serial: '',
                titulo: '',
                sinopsis: '',
                url: '',
                imagenPortada: '',
                anioEstreno: '',
                genero: '',
                director: '',
                productora: '',
                tipo: '',
              });
              setCurrentId(null);
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Serial</th>
            <th>Título</th>
            <th>Sinopsis</th>
            <th>URL</th>
            <th>Imagen</th>
            <th>Año</th>
            <th>Género</th>
            <th>Director</th>
            <th>Productora</th>
            <th>Tipo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medias.map((media) => (
            <tr key={media._id}>
              <td>{media.serial}</td>
              <td>{media.titulo}</td>
              <td>{media.sinopsis}</td>
              <td>
                <a href={media.url} target="_blank" rel="noopener noreferrer">
                  Ver
                </a>
              </td>
              <td>
                <img src={media.imagenPortada} alt={media.titulo} width="50" />
              </td>
              <td>{media.anioEstreno}</td>
              <td>{media.genero?.nombre || 'N/A'}</td>
              <td>{media.director?.nombre || 'N/A'}</td>
              <td>{media.productora?.nombre || 'N/A'}</td>
              <td>{media.tipo?.nombre || 'N/A'}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => handleEdit(media)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(media._id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MediaList;