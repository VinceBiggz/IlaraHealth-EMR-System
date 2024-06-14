// frontend/src/api.ts

import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'; 

const api = axios.create({
    baseURL: 'http://localhost:3100/api',
});

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => { // Use InternalAxiosRequestConfig
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
