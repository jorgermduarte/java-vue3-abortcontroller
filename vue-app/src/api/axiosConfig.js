import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080', // URL do seu servidor Spring Boot
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Outros cabeçalhos podem ser adicionados aqui se necessário
    }
});

export default axiosInstance;