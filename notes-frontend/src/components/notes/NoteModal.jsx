import React, { useState, useEffect } from 'react';
import NoteForm from './NoteForm';

const NoteModal = ({ note, tags, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tags: []
    });

    useEffect(() => {
        if (note) {
            setFormData({
                title: note.title || '',
                content: note.content || '',
                tags: note.tags || []
            });
        } else {
            setFormData({
                title: '',
                content: '',
                tags: []
            });
        }
    }, [note]);

    const handleSave = (data) => {
        onSave(data);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleEscapeKey = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{note ? 'Edit Note' : 'Create Note'}</h2>
                    <button
                        className="close-btn"
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        ×
                    </button>
                </div>
                <div className="modal-body">
                    <NoteForm
                        initialData={formData}
                        availableTags={tags}
                        onSave={handleSave}
                        onCancel={onClose}
                    />
                </div>
            </div>
        </div>
    );
};

export default NoteModal;
