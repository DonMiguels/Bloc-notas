
import React from 'react';
import '../styles/CrearNotaButton.css'; 

const CrearNotaButton = ({ onClick }) => {
    return (
        <button className="crear-nota-button" onClick={onClick}>
            +
        </button>
    );
};

export default CrearNotaButton;
