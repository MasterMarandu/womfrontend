import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import rootSaga from '../sagas';
import authReducer from '../features/auth/authSlice';
import tareaReducer from '../features/tareas/tareaSlice';
import userReducer from '../features/users/userSlice';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    tareas: tareaReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export default store;