import React, { useState, useEffect } from 'react';
import { getGeneros, createGenero, updateGenero, deleteGenero } from '../services/generoService';
import Swal from 'sweetalert2';

const GeneroList = () => {
  const [generos, setGeneros] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchGeneros();
  }, []);

  const fetchGeneros = async () => {
    try {
      const data = await getGeneros();
      setGeneros(data);
    } catch (error) {
      Swal.fire('Error', 'No se pudo cargar los géneros', 'error');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateGenero(currentId, formData);
        Swal.fire('Éxito', 'Género actualizado correctamente', 'success');
      } else {
        await createGenero(formData);
        Swal.fire('Éxito', 'Género creado correctamente', 'success');
      }
      setFormData({ nombre: '', descripcion: '' });
      setEditing(false);
      setCurrentId(null);
      fetchGeneros();
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar el género', 'error');
    }
  };

  const handleEdit = (genero) => {
    setEditing(true);
    setCurrentId(genero._id);
    setFormData({ nombre: genero.nombre, descripcion: genero.descripcion });
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
        await deleteGenero(id);
        Swal.fire('Eliminado', 'El género ha sido eliminado', 'success');
        fetchGeneros();
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar el género', 'error');
      }
    }
  };

  return (
    <div>
      <h2>Géneros</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            className="form-control"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            className="form-control"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
          />
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
              setFormData({ nombre: '', descripcion: '' });
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
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {generos.map((genero) => (
            <tr key={genero._id}>
              <td>{genero.nombre}</td>
              <td>{genero.descripcion}</td>
              <td>{genero.estado}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => handleEdit(genero)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(genero._id)}
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

export default GeneroList;