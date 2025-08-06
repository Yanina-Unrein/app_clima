<template>
  <div class="image-time" v-if="imageToShow">
    <transition name="fade" mode="out-in">
      <img
        :src="imageToShow"
        :key="imageToShow"
        class="time-image"
        alt="Imagen según clima y hora"
      />
    </transition>
  </div>
</template>

<script>
import { computed } from 'vue';
import { imageSets } from '@/utils/imageSets.js'; 

export default {
  props: {
    weather: {
      type: Object,
      default: () => null
    }
  },
  setup(props) {
     console.log('weather recibido en ImageTime:', props.weather); 
    const imageToShow = computed(() => {
      const hour = new Date().getHours();
      const temp = props.weather?.main?.temp;
      const condition = props.weather?.weather?.[0]?.main?.toLowerCase();

      if (!condition) return null; 

      if (condition.includes('rain')) return randomFrom('lluvia');
      if (condition.includes('snow')) return randomFrom('nieve');

      if (temp == null) return null;

      const isDay = hour >= 6 && hour < 12;
      const isAfternoon = hour >= 12 && hour < 19;
      const isNight = hour >= 19 || hour < 6;

      if (temp >= 25) {
        if (isDay) return randomFrom('dia_calor');
        if (isAfternoon) return randomFrom('tarde_calor');
        if (isNight) return randomFrom('noche_calor');
      }

      if (temp <= 12) {
        if (isDay) return randomFrom('dia_frio');
        if (isAfternoon) return randomFrom('tarde_frio');
        if (isNight) return randomFrom('noche_frio');
      }

      if (temp > 12 && temp < 25) {
        if (isDay) return randomFrom('dia_templado');
        if (isAfternoon) return randomFrom('tarde_templado');
        if (isNight) return randomFrom('tardenoche_templado');
      }

      return null;
    });

    const randomFrom = (key) => {
      const set = imageSets?.[key];
      if (!Array.isArray(set) || set.length === 0) return null;
      const randomIndex = Math.floor(Math.random() * set.length);
      return set[randomIndex];
    };

    return {
      imageToShow
    };
  }
};
</script>

<style scoped>
.image-time {
  display: flex;
  justify-content: center;
}

.time-image {
  width: 150px;
  height: 150px;
  border-radius: 12px;
  transition: all 0.4s ease;
  object-fit: cover;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>