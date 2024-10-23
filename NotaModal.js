import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../styles/NotaModal.css';

Modal.setAppElement('#root');

const NotaModal = ({ isOpen, onRequestClose, onSave, nota }) => {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');

    
    useEffect(() => {
        if (nota) {
            setTitulo(nota.titulo);
            setContenido(nota.contenido);
        } else {
            setTitulo(''); 
            setContenido(''); 
        }
    }, [nota, isOpen]);

    const handleSave = () => {
        if (titulo && contenido) {
            onSave({ titulo, contenido });
            onRequestClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Crear Nota">
            <h2>{nota ? 'Editar Nota' : 'Crear Nueva Nota'}</h2>
            <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
            />
            <textarea
                placeholder="Contenido de la nota..."
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
            />
            <div className="button-container">
                <button onClick={handleSave}>Guardar Nota</button>
                <button onClick={onRequestClose}>Cancelar</button>
            </div>
        </Modal>
    );
};

export default NotaModal;
