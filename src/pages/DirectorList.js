import React, { useState, useEffect } from 'react';
import { getDirectores, createDirector, updateDirector, deleteDirector } from '../services/directorService';
import Swal from 'sweetalert2';

const DirectorList = () => {
  const [directores, setDirectores] = useState([]);
  const [formData, setFormData] = useState({ nombre: '' });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchDirectores();
  }, []);

  const fetchDirectores = async () => {
    try {
      const data = await getDirectores();
      setDirectores(data);
    } catch (error) {
      Swal.fire('Error', 'No se pudo cargar los directores', 'error');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateDirector(currentId, formData);
        Swal.fire('Éxito', 'Director actualizado correctamente', 'success');
      } else {
        await createDirector(formData);
        Swal.fire('Éxito', 'Director creado correctamente', 'success');
      }
      setFormData({ nombre: '' });
      setEditing(false);
      setCurrentId(null);
      fetchDirectores();
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar el director', 'error');
    }
  };

  const handleEdit = (director) => {
    setEditing(true);
    setCurrentId(director._id);
    setFormData({ nombre: director.nombre });
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
        await deleteDirector(id);
        Swal.fire('Eliminado', 'El director ha sido eliminado', 'success');
        fetchDirectores();
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar el director', 'error');
      }
    }
  };

  return (
    <div>
      <h2>Directores</h2>
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
        <button type="submit" className="btn btn-primary">
          {editing ? 'Actualizar' : 'Crear'}
        </button>
        {editing && (
          <button
            type="button"
            className="btn btn-secondary ml-2"
            onClick={() => {
              setEditing(false);
              setFormData({ nombre: '' });
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
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {directores.map((director) => (
            <tr key={director._id}>
              <td>{director.nombre}</td>
              <td>{director.estado}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => handleEdit(director)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(director._id)}
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

export default DirectorList;