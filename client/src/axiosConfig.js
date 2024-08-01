import axios from 'axios';

const backendInstance = axios.create({
    baseURL: 'http://localhost:8000/api'
});

const frontendInstance = axios.create({
    baseURL: 'http://localhost:3000/api'
});

const instances = { backendInstance, frontendInstance };

export default instances;
