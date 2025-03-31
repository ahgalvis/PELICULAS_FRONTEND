import React, { useState, useEffect } from 'react';
import { getTipos, createTipo, updateTipo, deleteTipo } from '../services/tipoService';
import Swal from 'sweetalert2';

const TipoList = () => {
  const [tipos, setTipos] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchTipos();
  }, []);

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
        await updateTipo(currentId, formData);
        Swal.fire('Éxito', 'Tipo actualizado correctamente', 'success');
      } else {
        await createTipo(formData);
        Swal.fire('Éxito', 'Tipo creado correctamente', 'success');
      }
      setFormData({ nombre: '', descripcion: '' });
      setEditing(false);
      setCurrentId(null);
      fetchTipos();
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar el tipo', 'error');
    }
  };

  const handleEdit = (tipo) => {
    setEditing(true);
    setCurrentId(tipo._id);
    setFormData({ nombre: tipo.nombre, descripcion: tipo.descripcion });
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
        await deleteTipo(id);
        Swal.fire('Eliminado', 'El tipo ha sido eliminado', 'success');
        fetchTipos();
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar el tipo', 'error');
      }
    }
  };

  return (
    <div>
      <h2>Tipos</h2>
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tipos.map((tipo) => (
            <tr key={tipo._id}>
              <td>{tipo.nombre}</td>
              <td>{tipo.descripcion}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => handleEdit(tipo)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(tipo._id)}
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

export default TipoList;