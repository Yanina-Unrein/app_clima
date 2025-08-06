<template>
  <div class="search-box fade-in">
    <input 
      v-model="cityQuery" 
      placeholder="Buscar ciudad o país..." 
      @keyup.enter="search"
    >
    <button @click="search">
      <i class="fas fa-search"></i>
    </button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  emits: ['search'],
  setup(props, { emit }) {
    const cityQuery = ref('');
    
    const search = () => {
      if (cityQuery.value.trim()) {
        emit('search', cityQuery.value);
        cityQuery.value = '';
      }
    };
    
    return {
      cityQuery,
      search
    };
  }
}
</script>

<style scoped>
.search-box {
  display: flex;
  margin: 5px 0 15px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  overflow: hidden;
}

.search-box input {
  flex: 1;
  padding: 15px 20px;
  border: none;
  background: transparent;
  color: white;
  font-size: 1rem;
  outline: none;
}

.search-box input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.search-box button {
  padding: 0 25px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  cursor: pointer;
  transition: background 0.3s;
}

.search-box button:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>