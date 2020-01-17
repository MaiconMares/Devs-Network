import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3333',
    //URL da api com a qual você quer se comunicar
});

export default api;