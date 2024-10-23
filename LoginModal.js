import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/LoginModal.css'; 

Modal.setAppElement('#root');

const LoginModal = ({ isOpen, onRequestClose, onLogin }) => {
    const [nombre_usuario, setNombreUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre_usuario, contrasena }),
            });

            const data = await response.json();
            if (response.ok) {
                onLogin(data.user_id); 
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Error al iniciar sesión.'); 
            console.error('Error en la solicitud de inicio de sesión:', err);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Iniciar Sesión">
            <h2>Iniciar Sesión</h2>
            {error && <p className="error-message">{error}</p>}
            <input
                type="text"
                placeholder="Nombre de usuario"
                value={nombre_usuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
            />
            <div className="button-container">
                <button onClick={handleLogin}>Iniciar Sesión</button>
                <button onClick={onRequestClose}>Cancelar</button>
            </div>
        </Modal>
    );
};

export default LoginModal;
