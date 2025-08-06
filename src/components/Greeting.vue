<template>
  <div class="saludo">
    <div class="location">
      <img src="/icons/location.svg" class="icon" alt="Location icon">
      <span>{{ currentLocation }}</span>
    </div>
    <div class="greeting">
      <h1 class="title">
        {{ greeting }}
      </h1>
<!--       <transition name="fade">
        <ImageTime :weather="weather" />
      </transition> -->
    </div>
  </div>
  
</template>

<script>
import { computed } from 'vue';
//import ImageTime from './ImageTime.vue'

export default {
  props: {
    currentLocation: {
      type: String,
      default: 'Tu ubicación'
    },
    weather: {
      type: Object,
      default: () => null
    }
  },
  /* components: {
    ImageTime 
  }, */
  setup(props) {
    const greeting = computed(() => {
      const hour = new Date().getHours();
      if (hour >= 6 && hour < 12) return 'Buenos días';
      if (hour >= 12 && hour < 19) return 'Buenas tardes';
      return 'Buenas noches';
    });
    
    return {
      greeting
    };
  }
}
</script>

<style scoped>
.saludo{
  max-width: 600px;
}

.greeting {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 5px 0;
}

.title {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
}

.location {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: clamp(1rem, 0.7143rem + 1.4286vw, 1.3rem);
  color: #424242;
}

.icon{
  width: 20px;
  height: 20px;
  padding: 0;
  margin: 0;
}

@media(width >= 400px){
  .greeting{
    flex-direction: row;
    align-items: center;
  }

  .title{
    text-align: center;
    font-size: clamp(2.5rem, 2.3846rem + 0.4615vw, 2.2rem);
  }
}
</style>