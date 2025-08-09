<template>
  <div class="weather-container fade-in" v-if="dailyForecast && dailyForecast.length">
    <h3>Pronóstico semanal</h3>
    <div class="swiper">
      <div class="swiper-wrapper">
        <div 
          class="swiper-slide" 
          v-for="(day, index) in dailyForecast" 
          :key="index"
          :class="`weather-card-${index % 5}`"
        >
          <div class="slide-content">
            <img :src="day.icon" alt="Weather icon" width="60" height="60">
            <span class="description">{{ day.description }}</span>
            <div class="day-info">
              <span class="day-name">{{ day.name }}</span>
              <span class="day-number">{{ day.dayNumber }}</span>
            </div>
            <span class="temperature">{{ day.tempMin }}° / {{ day.tempMax }}°C</span>
            <span class="wind">💨 {{ day.wind_speed }} km/h</span>
            <div class="rain">
              🌧️ {{ day.pop > 0 ? `${Math.round(day.pop * 100)}%` : '0%' }}
              <span v-if="day.rain"> - {{ day.rain }} mm</span>
            </div>
          </div>
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, ref, watch, nextTick } from 'vue';

export default {
  props: {
    forecast: {
      type: Object,
      default: () => ({
        list: []
      })
    }
  },
  setup(props) {
  const dailyForecast = computed(() => {
  if (!props.forecast || !props.forecast.list || props.forecast.list.length === 0) return [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const grouped = {};
  const uniqueDays = new Set();

  props.forecast.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toLocaleDateString('es-ES');
    
    // Solo procesar días actuales/futuros
    if (date < today) return;
    
    if (!grouped[dateKey]) {
      grouped[dateKey] = {
        temps: [],
        items: [],
        date
      };
      uniqueDays.add(dateKey);
    }
    
    grouped[dateKey].temps.push(item.main.temp);
    grouped[dateKey].items.push(item);
  });

  return Array.from(uniqueDays).slice(0, 7).map(dateKey => {
    const group = grouped[dateKey];
    const minTemp = Math.round(Math.min(...group.temps));
    const maxTemp = Math.round(Math.max(...group.temps));
    
    // Encontrar el item más cercano al mediodía
    const representativeItem = group.items.reduce((closest, item) => {
      const itemHour = new Date(item.dt * 1000).getHours();
      const currentDiff = Math.abs(12 - itemHour);
      const closestDiff = Math.abs(12 - new Date(closest.dt * 1000).getHours());
      return currentDiff < closestDiff ? item : closest;
    }, group.items[0]);

    const dayName = group.date.toLocaleDateString('es-ES', { weekday: 'long' });
    const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);

    return {
      date: dateKey,
      name: capitalizedDayName,
      dayNumber: `${group.date.getDate()} de ${group.date.toLocaleDateString('es-ES', { month: 'long' })}`,
      dateObj: group.date,
      tempMin: minTemp,
      tempMax: maxTemp,
      icon: `https://openweathermap.org/img/wn/${representativeItem.weather[0].icon}@2x.png`,
      description: representativeItem.weather[0].description,
      wind_speed: Math.round(representativeItem.wind.speed * 3.6),
      pop: representativeItem.pop ?? 0,
      rain: representativeItem.rain?.['3h'] ?? null
    };
  });

    });

    const swiperInstance = ref(null);
    const swiperInitialized = ref(false);
    
    const initSwiper = () => {
      // Destruir instancia anterior si existe
      if (swiperInstance.value) {
        swiperInstance.value.destroy();
        swiperInstance.value = null;
        swiperInitialized.value = false;
      }

      if (typeof Swiper !== 'undefined' && dailyForecast.value.length > 0) {
        nextTick(() => {
          swiperInstance.value = new Swiper('.swiper', {
            effect: "coverflow",
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: "auto",
            speed: 600,
            coverflowEffect: {
              rotate: 10,
              stretch: 0,
              depth: 100,
              modifier: 3,
              slideShadows: false,
            },
            loop: false,
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },
          });
          swiperInitialized.value = true;
        });
      }
    };

    watch(dailyForecast, () => {
      initSwiper();
    }, { deep: true });

    onMounted(() => {
      initSwiper();
    });

    return {
      dailyForecast
    };
  }
}
</script>

<style scoped>
.weather-container {
  margin-top: 20px;
  padding: 20px 10px;
  max-width: 900px;
}

h3 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.8rem;
}

.swiper {
  width: 90%;
  height: 370px;
  margin: 0 auto;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  height: 320px;
  width: 240px;
  border-radius: 20px;
  padding: 30px 20px;
  box-sizing: border-box;
  background: rgba(76, 107, 100, 0.281);
  border-radius: 16px;
  backdrop-filter: blur(9.8px);
  -webkit-backdrop-filter: blur(9.8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s ease;
}

.swiper-slide-active {
  filter: grayscale(0);
  transform: scale(1.05);
}

.slide-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  height: 100%;
  opacity: 1; 
  transform: none; 
}

.day-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 0;
}

.day-name {
  font-size: 1.6rem;
  font-weight: bold;
}

.day-number {
  font-size: 1.2rem;
  opacity: 0.8;
}

.temperature {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 5px;
}

.swiper-pagination-bullet-active {
  background: #ffffff !important;
}

.swiper-pagination {
  bottom: 20px !important;
  transform: scale(1.3);
}

@media(width >= 1000px){
  .weather-container{
    max-width: 100%;
    margin-top: 50px;
  }
}
</style>