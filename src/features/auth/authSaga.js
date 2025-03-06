import { call, put, takeLatest } from 'redux-saga/effects';
import { loginUser, loginUserSuccess, loginUserFailure } from './authSlice';
import { authenticateUser } from '../../services/api';

function* handleLogin(action) {
  try {
    const { username, password } = action.payload;
    const user = yield call(authenticateUser, username, password);
    localStorage.setItem('token', user.access_token);
    yield put(loginUserSuccess(user));
  } catch (error) {
    console.error('Login failed:', error.message); // Log the error for debugging
    yield put(loginUserFailure(error.message || 'Error during login'));
  }
}

function* authSaga() {
  // Listen for the loginUser action and call the handleLogin saga when dispatched
  yield takeLatest(loginUser.type, handleLogin);
}


export default authSaga;