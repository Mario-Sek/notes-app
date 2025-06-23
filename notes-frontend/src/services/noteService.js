import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        console.log('Making request to:', config.url);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const noteService = {
    getAllNotes: async () => {
        const response = await api.get('/notes');
        return response.data;
    },

    getNoteById: async (id) => {
        const response = await api.get(`/notes/${id}`);
        return response.data;
    },

    createNote: async (note) => {
        const response = await api.post('/notes', note);
        return response.data;
    },

    updateNote: async (id, note) => {
        const response = await api.put(`/notes/${id}`, note);
        return response.data;
    },

    deleteNote: async (id) => {
        await api.delete(`/notes/${id}`);
    },

    searchNotes: async (keyword) => {
        const response = await api.get(`/notes/search?keyword=${encodeURIComponent(keyword)}`);
        return response.data;
    },

    getNotesByTag: async (tagName) => {
        const response = await api.get(`/notes/tag/${encodeURIComponent(tagName)}`);
        return response.data;
    },
};
