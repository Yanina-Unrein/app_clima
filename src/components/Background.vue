<template>
  <div :class="['background-wrapper', backgroundClass]">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Background',
  props: {
    weather: {
      type: Object,
      required: false
    }
  },
  computed: {
    backgroundClass() {
      if (!this.weather) return 'default-bg';

      const temp = this.weather.main.temp;
      const condition = this.weather.weather[0].main;

      if (condition === 'Thunderstorm') return 'storm-bg';
      if (condition === 'Rain') return 'rain-bg';
      if (temp < 10) return 'cold-bg';
      if (temp > 30) return 'hot-bg';
      if (temp > 20) return 'warm-bg';
      return 'mild-bg';
    }
  }
};
</script>

<style scoped>
.background-wrapper {
    width: 100%;
    min-height: 100vh;
    transition: background 0.5s ease;
    position: relative; 
    overflow: hidden; 
}

.default-bg { background: linear-gradient(135deg, #6dd5ed, #2193b0); }
.cold-bg { 
  background: linear-gradient(135deg, #00b4db, #0083b0);
  position: relative;
  overflow: hidden;
}
.mild-bg { background: linear-gradient(135deg, #a1c4fd, #c2e9fb); }
.warm-bg { background: linear-gradient(135deg, #ffecd2, #fcb69f); }
.hot-bg { background: linear-gradient(135deg, #ff9a9e, #fad0c4); }
.storm-bg { background: linear-gradient(135deg, #283E51, #0A2342); }
.rain-bg { background: linear-gradient(135deg, #3a7bd5, #00d2ff); }

/* Efecto glacial para frío */
.cold-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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

.cold-bg::after {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0) 40%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 60%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(30deg);
  animation: glacialLight 6s infinite linear;
}

@keyframes glacialLight {
  0% { transform: rotate(30deg) translateX(-100%); }
  100% { transform: rotate(30deg) translateX(100%); }
}
</style>