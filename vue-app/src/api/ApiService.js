let currentController = null;
let currentRestController = null;
let BASE_URL = 'http://localhost:8080';

export default {
     getRestData(callback) {

        // Aborta a requisição anterior se ainda estiver em andamento
        if(currentRestController){
            currentRestController.abort();
            console.log("Previous fetch aborted");
        }

        // Inicializa um novo controller para a nova requisição
        currentRestController = new AbortController();
        const signal = currentRestController.signal;

        // Faz a requisição GET para a URL /api/data
        fetch(`${BASE_URL}/api/data`, { signal })
        .then(async response => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const textResponse = await response.text();
            console.log('Response:', textResponse);
            callback(textResponse);
        })
        .catch(err => {
            if (err.name === 'AbortError') {
                console.log('Fetch was aborted');
            } else {
                console.error('Error fetching data:', err);
            }
            callback(null);
        });
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
