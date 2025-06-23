import React from 'react';

const NoteCard = ({ note, onEdit, onDelete }) => {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const truncateContent = (content, maxLength = 150) => {
        if (!content) return '';
        if (content.length <= maxLength) return content;
        return content.substring(0, maxLength) + '...';
    };

    return (
        <div className="note-card">
            <div className="note-header">
                <h3 className="note-title">{note.title}</h3>
                <div className="note-actions">
                    <button
                        className="btn btn-sm btn-secondary"
                        onClick={() => onEdit(note)}
                        aria-label={`Edit ${note.title}`}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => onDelete(note.id)}
                        aria-label={`Delete ${note.title}`}
                    >
                        Delete
                    </button>
                </div>
            </div>

            <div className="note-content">
                <p>{truncateContent(note.content)}</p>
            </div>

            <div className="note-tags">
                {note.tags && note.tags.map(tag => (
                    <span key={tag.id} className="tag">
            #{tag.name}
          </span>
                ))}
            </div>

            <div className="note-meta">
                <small>
                    {note.updatedAt ? `Updated: ${formatDate(note.updatedAt)}` : 'No date'}
                </small>
            </div>
        </div>
    );
};

export default NoteCard;
