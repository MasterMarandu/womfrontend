import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Table } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { fetchTareas, updateTarea, addTarea, deleteTarea } from '../features/tareas/tareaSlice';
import { useUserContext } from '../context/UserContext';
import Swal from 'sweetalert2';
import TareaEditModal from './TareaEditModal';
import 'react-toastify/dist/ReactToastify.css';

const TareasList = () => {
  const { currentUser } = useUserContext();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Para saber si estamos editando una tarea existente
  const [currentTarea, setCurrentTarea] = useState(null); // Tarea actual para editar o agregar
  const tareas = useSelector((state) => state.tareas.tareas);
  const { successMessage, error, selectedProyecto } = useSelector((state) => state.tareas);

  useEffect(() => {
    dispatch(fetchTareas());
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      Swal.fire({
        title: 'Éxito',
        text: successMessage,
        icon: 'success',
      }).then(() => {
        toast('Se ha actualizado el estado de la tarea');
        dispatch(fetchTareas());
      });
    }

    if (error) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al crear el proyecto',
        icon: 'error',
      });
    }
  }, [successMessage, error]);

  // Función para guardar la tarea ingresada en el modal
  const handleSaveTarea = (newTarea) => {
    if (editIndex !== null) {
      // Modo edición: actualizar tarea existente
      const tarea = tareas[editIndex]; // Obtiene la tarea a editar
      const updatedTarea = { ...tarea, title: newTarea.title, description: newTarea.description, completed: false };
      dispatch(updateTarea(updatedTarea)); // Envía la tarea actualizada al dispatcher
    } else {
      // Modo creación: agregar nueva tarea
      dispatch(addTarea(newTarea));
    }
    handleCloseModal();
  };

    // Función para abrir el modal en modo creación
    const handleCreateTarea = () => {
      setEditIndex(null); // Indica que no estamos editando ninguna tarea existente
      setCurrentTarea(null); // Limpia la tarea actual
      setShowModal(true); // Abre el modal
    };

  // Función para editar una tarea
  const handleEditTarea = (index) => {
    setEditIndex(index);
    setCurrentTarea(tareas[index]);
    setShowModal(true);
  };

  const handleDeleteTarea = (tarea) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => { // <-- Usa async aquí
      if (result.isConfirmed) {
        try {
          await dispatch(deleteTarea(tarea)); // <-- Usa await
          Swal.fire('Eliminado', 'La tarea ha sido eliminada', 'success');
        } catch (error) {
          Swal.fire('Error', 'Hubo un error al eliminar', 'error');
        }
      }
    });
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Lista de tareas</h2>

      {/* Botón para crear una nueva tarea */}
      <Button variant="primary" className="mb-3" onClick={handleCreateTarea}>
        Crear Nueva Tarea
      </Button>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Title</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.length === 0 ? (
            <tr>
              <td colSpan="5">No hay tareas.</td>
            </tr>
          ) : (
            tareas.map((tarea, index) => {
              if (!tarea) return null; // ← Salta elementos inválidos
              return (
                <tr key={index}>
                  <td>{tarea?.title || 'Sin título'}</td>
                  <td>{tarea?.description || 'Sin descripción'}</td>
                  <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEditTarea(index)}
                  >
                    Editar
                  </Button>

                  <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteTarea(tarea)} // <-- Nuevo handler
                    >
                      Eliminar
                    </Button>
                </td>
                </tr>
              );
            })
          )}
        </tbody>
      </Table>

      {/* Modal para editar o crear una tarea */}
      <TareaEditModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveTarea}
        tarea={currentTarea}
      />

      <ToastContainer />
    </div>
  );
};

export default TareasList;