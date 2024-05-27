import axios from './axiosConfig';

let currentController = null;
let BASE_URL = 'http://localhost:8080';

export default {
    
    getRestData() {
        console.log("doing a rest request");
        return axios.get(`${BASE_URL}/api/data`);
    },
    getStreamData(callback) {
        // Aborta a requisição anterior se ainda estiver em andamento
        if (currentController) {
            currentController.abort();
            console.log("Previous fetch aborted");
        }

        // Inicializa um novo controller para a nova requisição
        currentController = new AbortController();
        const signal = currentController.signal;
        const url = `${BASE_URL}/stream/data`;

        fetch(url, { signal })
            .then(response => {
                const reader = response.body.getReader();
                const decoder = new TextDecoder('utf-8');

                const processChunk = ({ done, value }) => {
                    if (done) {
                        console.log("Stream completed");
                        return;
                    }
                    // Decodifica e processa o chunk de dados
                    const text = decoder.decode(value, { stream: true });
                    callback(text);  // Executa o callback com o chunk de dados
                    return reader.read().then(processChunk); // Lê o próximo chunk
                };

                return reader.read().then(processChunk);
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('Fetch was aborted');
                } else {
                    console.error('Error fetching stream data:', err);
                }
            });
    }
};
