import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TareasList from './components/TareasList';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import { useUserContext } from './context/UserContext';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { currentUser } = useUserContext();
  const location = useLocation();
  
  const isLoginPage = location.pathname === '/login';

  return (
    <div className={`app-container ${isLoginPage ? 'login-page' : ''}`}>
      {!isLoginPage && currentUser && <Sidebar />}
      <div className="content">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route path="/tareas" element={<ProtectedRoute><TareasList /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
