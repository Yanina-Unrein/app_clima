<template>
  <div class="background-wrapper" :style="backgroundStyle">
    <slot />
  </div>
</template>

<script>
import { getImageKey, getRandomImage } from '@/utils/backgroundImages';

export default {
  name: 'Background',
  props: {
    weather: {
      type: Object,
      required: false,
      default: null
    },
    location: {
      type: String,
      default: 'default'
    }
  },
  computed: {
    backgroundStyle() {
      if (!this.weather) {
        return {
          backgroundImage: `url(/backgroundImage/default-day.webp)`,
          transition: 'background-image 1.5s ease-in-out'
        };
      }
      
      try {
        const imageKey = getImageKey(this.weather);
        const imagePath = getRandomImage(imageKey, this.location);
        
        return {
          backgroundImage: `url(${imagePath})`,
          transition: 'background-image 1.5s ease-in-out'
        };
      } catch (error) {
        console.error('Error loading background image:', error);
        return {
          backgroundImage: `url(/backgroundImage/default-day.webp)`,
          transition: 'background-image 1.5s ease-in-out'
        };
      }
    }
  }
};
</script>

<style scoped>
.background-wrapper {
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 1.5s ease-in-out;
  background-color: #a1c4fd; /* Color de respaldo */
}

/* Efecto de superposición para mejorar la legibilidad */
.background-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

/* Para asegurar que el contenido esté por encima de la superposición */
.background-wrapper > * {
  position: relative;
  z-index: 2;
}

/* Animación para cambios de fondo */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.background-wrapper {
  animation: fadeIn 1.5s ease-out;
}

/* Efecto de nieve para temperaturas frías */
.background-wrapper.snow-effect::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: 
    radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 1px, transparent 2px),
    radial-gradient(circle at 70% 50%, rgba(255,255,255,0.3) 1px, transparent 3px),
    radial-gradient(circle at 40% 80%, rgba(255,255,255,0.5) 1px, transparent 1px);
  background-size: 100px 100px;
  pointer-events: none;
  animation: iceSparkle 8s infinite linear;
}

@keyframes iceSparkle {
  0% { background-position: 0 0, 30px 40px, 70px 20px; }
  100% { background-position: 100px 100px, 130px 140px, 170px 120px; }
}
</style>