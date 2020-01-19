import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4200',
    //URL da api com a qual você quer se comunicar
});

export default api;