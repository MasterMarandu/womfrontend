import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form } from 'react-bootstrap';
import { fetchUsers } from '../features/users/userSlice'; 

const TareaModal = ({ show, handleClose, handleSave, tarea }) => {
    const dispatch = useDispatch();
    const usuarios = useSelector((state) => state.users.users); // Obtener la lista de usuarios del estado
    const loading = useSelector((state) => state.users.isLoading); // Estado de carga
    const error = useSelector((state) => state.users.error); // Estado de error

  const [formValues, setFormValues] = useState({
    title: '',
    descripcion: '',
    completed: ''
  });

 // Cargar los usuarios cuando se abra el modal
 useEffect(() => {
    if (show) {

      dispatch(fetchUsers()); // Llama a la función para obtener usuarios al abrir el modal
    }
  }, [show, dispatch]);


  // Rellenar el formulario si se está editando una tarea
  useEffect(() => {
    if (tarea) {
      setFormValues({
        title: tarea.title,
        descripcion: tarea.descripcion,
        completed: tarea.completed
      });
    } else {
      // Si no estamos editando, limpiamos el formulario
      setFormValues({
        title: '',
        descripcion: '',
        completed: ''
      });
    }
  }, [tarea]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    handleSave(formValues); // Guarda la tarea
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{tarea ? 'Editar Tarea' : 'Agregar Tarea'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              placeholder="Ingrese el titulo de la tarea"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="descripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={formValues.descripcion}
              onChange={handleChange}
              placeholder="Descripción de la tarea"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="completed">
            <Form.Label>Estado</Form.Label>
            <Form.Select name="completed" value={formValues.completed} onChange={handleChange}>
              <option value="">Seleccione el estado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En Progreso">En Progreso</option>
              <option value="Completado">Completado</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TareaModal;
