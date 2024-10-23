
import React from 'react';
import '../styles/Buscador.css';

const Buscador = ({ busqueda, manejarBusqueda }) => {
  return (
    <div className="buscador-container">
      <input
        type="text"
        placeholder="Buscar notas por título"
        value={busqueda}
        onChange={manejarBusqueda}
        className="buscador"
      />
    </div>
  );
};

export default Buscador;
