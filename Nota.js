
import React, { useState } from 'react';
import '../styles/Nota.css';
import BorrarBoton from './BorrarBoton'; 

const Nota = ({ nota, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onEdit(nota); 
  };

  return (
    <div 
      className="nota" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick} 
     >
      <h3>{nota.titulo}</h3>
      <p>{nota.contenido}</p>

      {isHovered && (
        <BorrarBoton onClick={(e) => { e.stopPropagation(); onDelete(nota.id); }} />
      )}
    </div>
  );
};

export default Nota;
