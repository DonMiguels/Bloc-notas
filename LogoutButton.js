import React from 'react';
import '../styles/LogoutButton.css'

const LogoutButton = ({ onLogout }) => {
  return (
    <button className="logout-button" onClick={onLogout}>
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
