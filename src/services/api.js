import axios from 'axios';
import qs from 'qs';

const API_URL = 'https://wombackend-158550194403.us-east1.run.app';


export const authenticateUser = async (username, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      qs.stringify({ username, password }), // Codifica los datos en formato x-www-form-urlencoded
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Especifica el tipo de contenido
        },
      }
    );
    return response.data; // Retorna los datos de la respuesta
  } catch (error) {
    // Maneja errores basados en la respuesta del API
    if (error.response && error.response.data && error.response.data.detail) {
      throw new Error(error.response.data.detail); // Lanza el mensaje de error del API
    } else {
      throw new Error('An error occurred during login'); // Mensaje genérico si no hay detalles
    }
  }
};

export const fetchTareasApi = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/tasks/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred during the fetch');
  }
};

export const addTareaApi = async (tarea) => {
  try {
    const response = await axios.post(`${API_URL}/tasks/`, tarea, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error al agregar proyecto');
  }
};


export const updateTareaApi = async (tarea) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${tarea.id}`, tarea, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log('El error es ', error);
    throw new Error(error.response.data.message || 'Error al actualizar proyecto');
  }
};


export const deleteTareaApi = async (tarea) => {
  try {
    const response = await axios.delete(`${API_URL}/tasks/${tarea.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error al eliminar proyecto');
  }
};

export const fetchProyectoByIdApi = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${productId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error al obtener el proyecto');
  }
};

export const fetchUsuariosApi = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/role/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'Error al obtener el proyecto');
  }
};




