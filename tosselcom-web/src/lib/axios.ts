import axios from 'axios';

// On force l'usage de l'IP directe
const API_URL = 'http://127.0.0.1:3000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true // Important pour les sessions Better Auth
});

export default api;
