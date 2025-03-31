import React, { useState, useEffect } from 'react';
import { getProductoras, createProductora, updateProductora, deleteProductora } from '../services/productoraService';
import Swal from 'sweetalert2';

const ProductoraList = () => {
  const [productoras, setProductoras] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', slogan: '', descripcion: '' });
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    fetchProductoras();
  }, []);

  const fetchProductoras = async () => {
    try {
      const data = await getProductoras();
      setProductoras(data);
    } catch (error) {
      Swal.fire('Error', 'No se pudo cargar las productoras', 'error');
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateProductora(currentId, formData);
        Swal.fire('Éxito', 'Productora actualizada correctamente', 'success');
      } else {
        await createProductora(formData);
        Swal.fire('Éxito', 'Productora creada correctamente', 'success');
      }
      setFormData({ nombre: '', slogan: '', descripcion: '' });
      setEditing(false);
      setCurrentId(null);
      fetchProductoras();
    } catch (error) {
      Swal.fire('Error', 'No se pudo guardar la productora', 'error');
    }
  };

  const handleEdit = (productora) => {
    setEditing(true);
    setCurrentId(productora._id);
    setFormData({
      nombre: productora.nombre,
      slogan: productora.slogan,
      descripcion: productora.descripcion,
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
        await deleteProductora(id);
        Swal.fire('Eliminado', 'La productora ha sido eliminada', 'success');
        fetchProductoras();
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar la productora', 'error');
      }
    }
  };

  return (
    <div>
      <h2>Productoras</h2>
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
          <label>Slogan</label>
          <input
            type="text"
            className="form-control"
            name="slogan"
            value={formData.slogan}
            onChange={handleInputChange}
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
              setFormData({ nombre: '', slogan: '', descripcion: '' });
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
            <th>Slogan</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productoras.map((productora) => (
            <tr key={productora._id}>
              <td>{productora.nombre}</td>
              <td>{productora.slogan}</td>
              <td>{productora.descripcion}</td>
              <td>{productora.estado}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => handleEdit(productora)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(productora._id)}
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

export default ProductoraList;