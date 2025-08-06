<template>
  <div class="weather-section">
    <div class="weather-card fade-in" v-if="weather">
      <!-- FONDO dentro de la card -->
      <div class="background-wrapper" v-if="background">
        <transition name="fade" mode="out-in">
          <div :key="background.src" class="background-media">
            <video
              v-if="background.type === 'video'"
              :src="background.src"
              autoplay
              muted
              loop
              class="background-video"
            ></video>

            <img
              v-else
              :src="background.src"
              alt="Weather background"
              class="background-image"
            />
          </div>
        </transition>
        <div class="overlay"></div>
      </div>

      <h3 class="weather-description">{{ weather.weather[0].description }}</h3>
      <span class="temperature">{{ Math.round(weather.main.temp) }}</span>

      <div class="weather-details">
        <div class="detail">
          <i class="fas fa-wind"></i>
          <span>{{ weather.wind.speed }} km/h</span>
        </div>
        <div class="detail">
          <i class="fas fa-tint"></i>
          <span>{{ weather.main.humidity }}%</span>
        </div>
        <div class="detail">
          <i class="fas fa-compress-alt"></i>
          <span>{{ weather.main.pressure }} hPa</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { getBackgroundForWeather } from '@/utils/backgroundUtils'; 

export default {
  props: {
    weather: {
      type: Object,
      default: null,
      required: true
    }
  },
  setup(props) {
    const background = computed(() => {
      if (!props.weather || !props.weather.weather) return null;
      return getBackgroundForWeather(props.weather.weather[0].description);
    });

    return {
      background
    };
  }
};
</script>

<style scoped>
.weather-section {
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  margin: 10px auto;
}

.weather-card {
  position: relative;
  z-index: 0; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 25px;
  width: 100%;
  max-width: 600px;
  height: 400px;
  overflow: hidden;
}

.background-wrapper {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.background-media,
.background-video,
.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  inset: 0;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.weather-description,
.temperature,
.weather-details {
  position: relative;
  z-index: 2;
}

.temperature {
  font-size: 4.5rem;
  font-weight: 700;
  margin: 10px 0;
  position: relative;
}

.temperature::after {
  content: "°C";
  position: absolute;
  top: 0;
  right: -30px;
  font-size: 2rem;
}

.weather-description {
  font-size: 1.8rem;
  text-transform: capitalize;
  margin-bottom: 20px;
}

.weather-details {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 20px;
}

.detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 0.99rem;
}

.detail i {
  font-size: 1.8rem;
  margin-bottom: 8px;
}
</style>


