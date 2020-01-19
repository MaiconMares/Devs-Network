import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.15.8:4200',
});

export default api;