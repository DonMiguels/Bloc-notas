
import React from 'react';
import '../styles/BorrarBoton.css';
import Borrador from '../images/p1.svg'; 

const BorrarBoton = ({ onClick }) => {
  return (
    <button 
      className="borrar-boton" 
      onClick={onClick} 
    >
      <img src={Borrador} alt="Borrar" className="borrar-icono" />
    </button>
  );
};

export default BorrarBoton;
