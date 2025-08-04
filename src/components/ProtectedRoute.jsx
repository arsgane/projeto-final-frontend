// src/components/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const [autorizado, setAutorizado] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const tipoUsuario = localStorage.getItem('tipoUsuario');

    if (!token || tipoUsuario !== role) {
      setAutorizado(false);
    } else {
      setAutorizado(true);
    }
  }, [role]);

  if (autorizado === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg animate-pulse">Verificando permissão de acesso...</p>
      </div>
    );
  }

  if (!autorizado) {
    return <Navigate to="/login-cliente" replace />;
  }

  return children;
};

export default ProtectedRoute;
