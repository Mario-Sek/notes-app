import React, { useState, useEffect } from 'react';
import Layout from './components/layout/Layout';
import NoteList from './components/notes/NoteList';
import NoteModal from './components/notes/NoteModal';
import SearchBar from './components/common/SearchBar';
import TagFilter from './components/common/TagFilter';
import { noteService } from './services/noteService';
import { tagService } from './services/tagService';
import './styles/App.css';
import './styles/components.css';

function App() {
    const [notes, setNotes] = useState([]);
    const [tags, setTags] = useState([]);
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadNotes();
        loadTags();
    }, []);

    useEffect(() => {
        filterNotes();
    }, [notes, searchTerm, selectedTag]);

    const loadNotes = async () => {
        try {
            setLoading(true);
            const data = await noteService.getAllNotes();
            setNotes(data);
            setError(null);
        } catch (error) {
            console.error('Error loading notes:', error);
            setError('Failed to load notes. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const loadTags = async () => {
        try {
            const data = await tagService.getAllTags();
            setTags(data);
        } catch (error) {
            console.error('Error loading tags:', error);
        }
    };

    const filterNotes = () => {
        let filtered = notes;

        if (searchTerm) {
            filtered = filtered.filter(note =>
                note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.content.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedTag) {
            filtered = filtered.filter(note =>
                note.tags && note.tags.some(tag => tag.name === selectedTag)
            );
        }

        setFilteredNotes(filtered);
    };

    const handleCreateNote = () => {
        setSelectedNote(null);
        setIsModalOpen(true);
    };

    const handleEditNote = (note) => {
        setSelectedNote(note);
        setIsModalOpen(true);
    };

    const handleDeleteNote = async (id) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            try {
                await noteService.deleteNote(id);
                await loadNotes();
            } catch (error) {
                console.error('Error deleting note:', error);
                setError('Failed to delete note. Please try again.');
            }
        }
    };

    const handleSaveNote = async (noteData) => {
        try {
            if (selectedNote) {
                await noteService.updateNote(selectedNote.id, noteData);
            } else {
                await noteService.createNote(noteData);
            }
            setIsModalOpen(false);
            await loadNotes();
            await loadTags();
            setError(null);
        } catch (error) {
            console.error('Error saving note:', error);
            setError('Failed to save note. Please try again.');
        }
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handleTagFilter = (tag) => {
        setSelectedTag(tag);
    };

    if (loading) {
        return (
            <Layout>
                <div className="loading">
                    <div className="loading-spinner"></div>
                    <p>Loading notes...</p>
                </div>
            </Layout>
        );
    }

    return (
        <div className="App">
            <Layout>
                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                        <button onClick={() => setError(null)}>×</button>
                    </div>
                )}

                <div className="app-header">
                    <h1>My Notes</h1>
                    <button className="btn btn-primary" onClick={handleCreateNote}>
                        + Create Note
                    </button>
                </div>

                <div className="filters">
                    <SearchBar onSearch={handleSearch} />
                    <TagFilter
                        tags={tags}
                        selectedTag={selectedTag}
                        onTagSelect={handleTagFilter}
                    />
                </div>

                <NoteList
                    notes={filteredNotes}
                    onEdit={handleEditNote}
                    onDelete={handleDeleteNote}
                />

                {isModalOpen && (
                    <NoteModal
                        note={selectedNote}
                        tags={tags}
                        onSave={handleSaveNote}
                        onClose={() => setIsModalOpen(false)}
                    />
                )}
            </Layout>
        </div>
    );
}

export default App;
