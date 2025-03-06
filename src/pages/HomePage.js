import React from 'react';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext'; 

const HomePage = () => {

 const { currentUser, logout } = useUserContext();
  const role = 'ROLE_ADMIN'; 

    return (
        <div className="container text-center my-5">
              {role === 'ROLE_ADMIN' && (
            <>
              <h1 className="mb-4">Bienvenido a la gestión de tareas</h1>
            <p className="lead">Desde aquí puedes gestionar tus tareas.</p>

            <div className="d-flex justify-content-center mt-4">
                <Link to="/tareas" className="me-3">
                    <button className="btn btn-primary">Ver tareas</button>
                </Link>
            </div>
            </>
          )}
            
        </div>
    );
};

export default HomePage;
