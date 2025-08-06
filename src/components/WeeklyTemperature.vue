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
            <div class="day-info">
              <span class="day-name">{{ day.name }}</span>
              <span class="day-number">{{ day.dayNumber }}</span>
            </div>
            <span class="temperature">{{ day.tempMin }}° / {{ day.tempMax }}°C</span>
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
      default: () => ({})
    }
  },
  setup(props) {
    const dailyForecast = computed(() => {
      if (!props.forecast || !props.forecast.list || props.forecast.list.length === 0) return [];

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayKey = today.toISOString().split('T')[0];

      const grouped = {};

      props.forecast.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toISOString().split('T')[0];

        if (dateKey < todayKey) return;

        if (!grouped[dateKey]) {
          grouped[dateKey] = {
            temps: [],
            icons: [],
            date,
          };
        }

        grouped[dateKey].temps.push(item.main.temp);
        grouped[dateKey].icons.push(item.weather[0].icon);
      });

      const result = Object.entries(grouped).map(([dateKey, data]) => {
        const temps = data.temps;
        const min = Math.min(...temps);
        const max = Math.max(...temps);
        
        const dayName = data.date.toLocaleDateString('es-ES', { weekday: 'long' });
        const capitalizedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);
        
        return {
          date: dateKey,
          name: capitalizedDayName,
          dayNumber: data.date.getDate(),
          dateObj: data.date,
          tempMin: Math.round(min),
          tempMax: Math.round(max),
          icon: `https://openweathermap.org/img/wn/${data.icons[0]}@2x.png`,
        };
      });

      return result.sort((a, b) => a.dateObj - b.dateObj).slice(0, 7);
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
  justify-content: center;
  align-items: center;
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
</style>