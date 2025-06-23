import React from 'react';
import NoteCard from './NoteCard';

const NoteList = ({ notes, onEdit, onDelete }) => {
    if (notes.length === 0) {
        return (
            <div className="empty-state">
                <h3>No notes found</h3>
                <p>Create your first note to get started!</p>
            </div>
        );
    }

    return (
        <div className="note-list">
            {notes.map(note => (
                <NoteCard
                    key={note.id}
                    note={note}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default NoteList;
