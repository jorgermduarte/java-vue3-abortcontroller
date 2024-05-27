<template>
    <div>
      <button @click="fetchRestData">Fetch REST Data</button>
      <button @click="fetchStreamData">Fetch Stream Data</button>
      <p>Rest Data: {{ restData }}</p>
      <p>Stream Data: {{ streamData }}</p>
    </div>
</template>

<script>
  import ApiService from '../api/ApiService';

  export default {
    data() {
      return {
        restData: '',
        streamData: ''
      };
    },
    methods: {
      async fetchRestData() {
        try {
          const response = await ApiService.getRestData();
          this.restData = response.data;
        } catch (error) {
          console.error('Failed to fetch REST data:', error);
        }
      },
      async fetchStreamData() {
        this.streamData = ''; // Limpa o estado local
        try {
            ApiService.getStreamData(data => {
                this.streamData += data; // Atualiza o estado local a cada chunk recebido
            });
        } catch (error) {
          console.error('Failed to fetch stream data:', error);
        }
      }
    },
    beforeUnmount() {
    }
  };
</script>