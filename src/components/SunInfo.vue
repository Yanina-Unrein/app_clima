<template>
  <div v-if="sunData" class="sun-info fade-in">
    <h3>Salida y Puesta del sol</h3>
    <p><img class="icon-sun" src="/weather-icons/sun.svg" alt="icono de sol"> Sale el sol a las <strong>{{ formatTime(sunData.sunrise) }}</strong></p>
    <p><img class="icon-sun" src="/weather-icons/tarde.svg" alt="icono de sol y nube"> Se pone el sol a las <strong>{{ formatTime(sunData.sunset) }}</strong></p>
    <p><img class="icon-sun" src="/weather-icons/primeros.svg" alt="icono de sol y nube"> Primera luz a las <strong>{{ formatTime(firstLight) }}</strong></p>
    <p><img class="icon-sun" src="/weather-icons/noche.svg" alt="icono de sol y nube"> Última luz a las <strong>{{ formatTime(lastLight) }}</strong></p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { toDisplayString } from '@vue/shared';

const props = defineProps({
  weather: {
    type: Object,
      default: () => ({
        sys: {
          sunrise: 0,
          sunset: 0
        }
      })
  }
});

const sunData = computed(() => props.weather?.sys || null);
const timezoneOffset = computed(() => props.weather?.timezone || 0);

// first/last light aproximadas: 30 minutos antes/después
const firstLight = computed(() =>
  sunData.value?.sunrise ? sunData.value.sunrise - 1800 : null
);
const lastLight = computed(() =>
  sunData.value?.sunset ? sunData.value.sunset + 1800 : null
);

const formatTime = (unix) => {
  if (!unix) return '--:--';
  const date = new Date((unix + timezoneOffset.value) * 1000);
  return date.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};
</script>

<style scoped>
.sun-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    max-width: 800px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.15);
    margin: 0 auto;
}


.sun-info p .icon-sun {
    width: 40px;
    height: 40px;
    vertical-align: middle;
    margin: 0;
}
</style>