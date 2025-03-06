import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tareas: [],
  id:null,
  error: null,
  isLoading: false,
  selectedTarea: null,
  successMessage: null,
};

const tareasSlice = createSlice({
  name: 'tareas',
  initialState,
  reducers: {

    fetchTareas(state) {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
    fetchTareasSuccess(state, action) {
      state.tareas = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchTareasFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    addTarea(state) {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
    addTareaSuccess(state, action) {
      state.tareas.push(action.payload);
      state.isLoading = false;
      state.error = null;
      state.successMessage = 'Tarea agregado exitosamente';
    },
    addTareaFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    updateTarea(state) {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
    updateTareaSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.successMessage = 'Tarea actualizado exitosamente';
    },
    updateTareaFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },

    deleteTarea(state) {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    },
  
    deleteTareaSuccess(state, action) {
      state.tareas = state.tareas.filter(item => item.id !== action.payload);
      state.isLoading = false;
      state.error = null;
      state.successMessage = 'Tarea eliminado exitosamente';
    },
    deleteTareaFailure(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  fetchTareas,
  fetchTareasSuccess,
  fetchTareasFailure,
  addTarea,
  addTareaSuccess,
  addTareaFailure,
  updateTarea,
  updateTareaSuccess,
  updateTareaFailure,
  deleteTarea,
  deleteTareaSuccess,
  deleteTareaFailure

} = tareasSlice.actions;

export default tareasSlice.reducer;