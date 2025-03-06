import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchTareasSuccess, fetchTareasFailure, addTareaSuccess, addTareaFailure, updateTareaFailure,deleteTareaFailure, updateTareaSuccess, deleteTareaSuccess } from './tareaSlice';
import { fetchTareasApi, addTareaApi, updateTareaApi, deleteTareaApi } from '../../services/api';


function* fetchTareaSaga() {
  try {
    const response = yield call(fetchTareasApi);
    yield put(fetchTareasSuccess(response));
  } catch (error) {
    yield put(fetchTareasFailure(error.message));
  }
}

function* addTareaSaga(action) {
  try {
    const response = yield call(addTareaApi, action.payload);
    yield put(addTareaSuccess(response.data));
  } catch (error) {
    yield put(addTareaFailure(error.message));  // Maneja errores
  }
}

function* updateTareaSaga(action) {
  try {
    const response = yield call(updateTareaApi, action.payload);
    yield put(updateTareaSuccess(response.data));
  } catch (error) {
    yield put(updateTareaFailure(error.message));
  }
}

function* deleteTareaSaga(action) {
  try {
    const response = yield call(deleteTareaApi, action.payload);
    yield put(deleteTareaSuccess(response));
  } catch (error) {
    yield put(deleteTareaFailure(error.message));  // Maneja errores
  }
}


export default function* tareaSaga() {
  yield takeLatest('tareas/fetchTareas', fetchTareaSaga);
  yield takeLatest('tareas/addTarea', addTareaSaga);
  yield takeLatest('tareas/updateTarea', updateTareaSaga);
  yield takeLatest('tareas/deleteTarea', deleteTareaSaga);

}