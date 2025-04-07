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
      Swal.fire('Error', `No se pudo cargar los tipos: ${error.response?.data?.error || error.message}`, 'error');
    }
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
      Swal.fire('Error', `No se pudo guardar el tipo: ${error.response?.data?.error || error.message}`, 'error');
    }
  };

  const handleEdit = (tipo) => {
    setFormData({ nombre: tipo.nombre, descripcion: tipo.descripcion });
    setEditing(true);
    setCurrentId(tipo._id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await deleteTipo(id);
        Swal.fire('Eliminado', 'El tipo ha sido eliminado', 'success');
        fetchTipos();
      } catch (error) {
        Swal.fire('Error', `No se pudo eliminar el tipo: ${error.response?.data?.error || error.message}`, 'error');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-light">Tipos</h2>

      {/* Formulario */}
      <div className="card shadow-sm mb-5">
        <div className="card-body">
          <h5 className="card-title">{editing ? 'Editar Tipo' : 'Crear Tipo'}</h5>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                value={formData.descripcion}
                onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editing ? 'Actualizar' : 'Crear'}
            </button>
            {editing && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => {
                  setFormData({ nombre: '', descripcion: '' });
                  setEditing(false);
                  setCurrentId(null);
                }}
              >
                Cancelar
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Tabla */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Lista de Tipos</h5>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="thead-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Estado</th>
                  <th>Fecha Creación</th>
                  <th>Fecha Actualización</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tipos.map((tipo) => (
                  <tr key={tipo._id}>
                    <td>{tipo.nombre}</td>
                    <td>{tipo.descripcion}</td>
                    <td>{tipo.estado}</td>
                    <td>{new Date(tipo.fechaCreacion).toLocaleDateString()}</td>
                    <td>{new Date(tipo.fechaActualizacion).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(tipo)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
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
        </div>
      </div>
    </div>
  );
};

export default TipoList;