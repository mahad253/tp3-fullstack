import axios from 'axios';
import type { AxiosError, AxiosResponse } from 'axios';

// URL de l’API : variable d’environnement si présente, sinon valeur par défaut
const API_URL = process.env.REACT_APP_API || 'http://localhost:8080';

const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 8000,
});

// Mapping centralisé des erreurs Axios
function mapAxiosError(error: AxiosError) {
    // Timeout
    if (error.code === 'ECONNABORTED') {
        return {
            status: 408,
            message: 'Le serveur met trop de temps à répondre',
        };
    }

    // Problème réseau / API inaccessible
    if (!error.response) {
        return {
            status: 0,
            message: 'Impossible de joindre l’API',
        };
    }

    // Erreurs HTTP
    switch (error.response.status) {
        case 400:
            return { status: 400, message: 'Requête invalide' };
        case 401:
            return { status: 401, message: 'Accès non autorisé' };
        case 403:
            return { status: 403, message: 'Accès interdit' };
        case 404:
            return { status: 404, message: 'Ressource introuvable' };
        case 500:
            return { status: 500, message: 'Erreur interne du serveur' };
        default:
            return {
                status: error.response.status,
                message: 'Erreur inattendue',
            };
    }
}

// Intercepteur global de réponses
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => Promise.reject(mapAxiosError(error)),
);

export default apiClient;
