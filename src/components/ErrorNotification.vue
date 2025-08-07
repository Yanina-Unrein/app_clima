<template>
  <transition name="slide-fade">
    <div v-if="show" class="error-notification">
      <div class="error-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
        </svg>
      </div>
      <div class="error-content">
        <h3>Ubicación no encontrada</h3>
        <p>{{ message }}</p>
      </div>
      <button class="close-btn" @click="close">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>
      </button>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: Boolean,
    message: {
      type: String,
      default: 'La ubicación solicitada no fue encontrada. Por favor intenta con otro nombre.'
    }
  },
  methods: {
    close() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.error-notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background: rgba(255, 107, 107, 0.95);
  color: white;
  border-radius: 12px;
  padding: 15px 20px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  max-width: 90%;
  width: 450px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.error-icon {
  margin-right: 15px;
}

.error-icon svg {
  width: 28px;
  height: 28px;
  fill: white;
}

.error-content {
  flex: 1;
}

.error-content h3 {
  margin: 0 0 5px 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.error-content p {
  margin: 0;
  font-size: 0.95rem;
  opacity: 0.9;
}

.close-btn {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
  margin-left: 10px;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.close-btn:hover {
  opacity: 1;
}

.close-btn svg {
  width: 20px;
  height: 20px;
  fill: white;
}

/* Animaciones */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translate(-50%, -30px);
  opacity: 0;
}
</style>