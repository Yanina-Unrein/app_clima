<template>
  <div class="weather-message fade-in tornasolado" v-if="messageData">
    <div class="message-content">
      <i :class="messageData.icon"></i>
      <p>{{ messageData.message }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { getWeatherMessage } from '@/utils/weatherMessages'; 

export default {
  props: {
    weather: {
      type: Object,
      default: null
    }
  },
  setup(props) {
    const messageData = computed(() => {
      if (!props.weather) return null;
      return getWeatherMessage(props.weather);
    });

    return {
      messageData
    };
  }
}
</script>

<style scoped>
.weather-message {
  width: 100%;  
  max-width: 600px;
  margin: 10px auto;
  padding: 20px;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.message-content {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  gap: 8px;
  width: 100%;
}

.message-content i {
  font-size: 2rem;
  color: #fff;
  flex-shrink: 0;
}

.message-content p {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
  color: white;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.fade-in {
  animation: fadeIn 1s ease-out;
}

.tornasolado {
  background: linear-gradient(45deg, #db9191c2, #80b880ad, #bebee496, #db9191c2); /* Gradiente con varios colores */
  background-size: 400% 400%; 
  animation: animacion-tornasolado 10s ease infinite; 
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes animacion-tornasolado {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

</style>