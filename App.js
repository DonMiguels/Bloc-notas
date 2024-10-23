import React, { useState } from 'react';
import Toggle from './components/Toggle'; 
import Nota from './components/Nota';
import NotaModal from './components/NotaModal';
import LoginModal from './components/LoginModal'; 
import CrearNotaButton from './components/CrearNotaButton'; 
import Search from './components/Search'; 
import LogoutButton from './components/LogoutButton'; 
import './styles/App.css';
import './styles/Fondo.css'; 
import logo from './images/Logo-del-Bloc.svg'; 

function App() {
  const [notas, setNotas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notaActual, setNotaActual] = useState(null);
  const [isGalleryView, setIsGalleryView] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);

  const obtenerNotas = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/notas/${userId || 1}`);
      if (response.ok) {
        const data = await response.json();
        setNotas(data);
      } else {
        console.error('Error al obtener las notas:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la petición de obtener notas:', error);
    }
  };

  const manejarBusqueda = (event) => {
    setBusqueda(event.target.value);
  };

  const manejarEdicionNota = (nota) => {
    setNotaActual(nota);
    setIsModalOpen(true);
  };

  const guardarNota = async (nota) => {
    try {
      const response = await fetch('http://localhost:5000/api/notas', {
        method: nota.id ? 'PUT' : 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId || 1, ...nota }),
      });

      if (response.ok) {
        await obtenerNotas(); 
        setIsModalOpen(false);
        setNotaActual(null);
      } else {
        const errorData = await response.json();
        console.error('Error al guardar la nota:', errorData);
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  const eliminarNota = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/notas/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await obtenerNotas(); 
      } else {
        const errorData = await response.json();
        console.error('Error al eliminar la nota:', errorData);
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  };

  const notasFiltradas = notas.filter(nota =>
    nota.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const manejarToggle = (isGallery) => {
    setIsGalleryView(isGallery);
  };

  const handleLogin = (userId) => {
    setIsLoggedIn(true);
    setUserId(userId);
    setIsLoginModalOpen(false);
    obtenerNotas(); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setNotas([]); 
    setIsLoginModalOpen(true); 
  };

  return (
    <div className="App">
      <div className="fondo"> 
        <div className="container">
          <img src={logo} alt="Logo del Bloc" className="logo" />

          <LoginModal 
            isOpen={isLoginModalOpen} 
            onRequestClose={() => setIsLoginModalOpen(false)} 
            onLogin={handleLogin} 
          />

          {isLoggedIn && (
            <>
              <Search searchQuery={busqueda} handleSearch={manejarBusqueda} />

              {/* Aquí está el separador */}
              <div className="separator" />

              <Toggle onToggle={manejarToggle} />

              <NotaModal 
                isOpen={isModalOpen} 
                onRequestClose={() => {
                  setIsModalOpen(false);
                  setNotaActual(null);
                }} 
                onSave={guardarNota} 
                nota={notaActual} 
              />

              <div className={isGalleryView ? "galeria" : "lista"}>
                {notasFiltradas.map((nota) => (
                  <Nota 
                    key={nota.id} 
                    nota={nota} 
                    onEdit={() => manejarEdicionNota(nota)} 
                    onDelete={() => eliminarNota(nota.id)} 
                  />
                ))}
              </div>

              <CrearNotaButton onClick={() => {
                setNotaActual(null);
                setIsModalOpen(true);
              }} />

              <LogoutButton onLogout={handleLogout} /> {}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
