import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

export const tagService = {
    getAllTags: async () => {
        const response = await api.get('/tags');
        return response.data;
    },

    createTag: async (tag) => {
        const response = await api.post('/tags', tag);
        return response.data;
    },

    deleteTag: async (id) => {
        await api.delete(`/tags/${id}`);
    },
};
