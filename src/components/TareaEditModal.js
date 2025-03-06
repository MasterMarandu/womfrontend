import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TareaEditModal = ({ show, handleClose, handleSave, tarea }) => {

  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    completed: false
  });
  useEffect(() => {
    if (tarea) {
      setFormValues({
        title: tarea.title,
        description: tarea.description,
        completed: tarea.completed
      });
    } else {
      // Si no estamos editando, limpiamos el formulario
      setFormValues({
        title: '',
        description: '',
        completed: false
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
            <Form.Label>Titulo</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formValues.title}
              onChange={handleChange}
              placeholder="Ingrese el titulo de la tarea"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formValues.description}
              onChange={handleChange}
              placeholder="Descripción de la tarea"
            />
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

export default TareaEditModal;
