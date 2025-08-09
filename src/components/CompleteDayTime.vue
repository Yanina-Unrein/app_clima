<template>
    <div class="weather-card fade-in" v-if="forecast">
      <h3>Pronóstico por horas</h3>
      <div class="forecast-container">
        <div
          class="forecast-item"
          :class="{ 'current-hour': hour.isCurrent }"
          v-for="(hour, index) in hourlyForecast"
          :key="index"
        >
          <span class="forecast-time">{{ hour.time }}</span>
          <img :src="hour.icon" alt="Weather icon" width="40" height="40" />

          <div class="forecast-info">
            <span class="temp">{{ hour.temp }}°C</span>
            <span class="feels">Sensación: {{ hour.feels_like }}°C</span>
            <span class="description">{{ hour.description }}</span>
          </div>

          <div class="forecast-extra">
            <span class="wind">💨 {{ hour.wind_speed }} km/h</span>
            <div class="rain">
              🌧️ {{ hour.pop > 0 ? `${Math.round(hour.pop * 100)}%` : '0%' }}
              <span v-if="hour.rain"> - {{ hour.rain }} mm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { computed } from 'vue';

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
    const hourlyForecast = computed(() => {
      if (!props.forecast) return [];

      const now = new Date();
      const currentHour = now.getHours();

      // Buscar el índice en forecast.list del primer ítem con la hora actual o posterior
      const startIndex = props.forecast.list.findIndex(item => {
        const itemHour = new Date(item.dt * 1000).getHours();
        return itemHour >= currentHour - 1; 
      });

      // Si no encuentra una coincidencia, comenzar desde 0
      const adjustedIndex = startIndex >= 0 ? startIndex : 0;

      // Obtener las próximas 12 horas desde esa posición
      return props.forecast.list.slice(adjustedIndex, adjustedIndex + 12).map(item => {
        const hour = new Date(item.dt * 1000).getHours();

        return {
          time: `${hour.toString().padStart(2, '0')}:00`,
          temp: Math.round(item.main.temp),
          feels_like: Math.round(item.main.feels_like),
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
          description: item.weather[0].description,
          wind_speed: Math.round(item.wind.speed * 3.6), // m/s to km/h
          pop: item.pop ?? 0,
          rain: item.rain?.['1h'] ?? null,
          isCurrent: hour === currentHour
        };
        });
      });

      return {
        hourlyForecast
      };
  }
}
</script>

<style scoped>
  .weather-card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
    max-width: 900px;
    /* background: linear-gradient(130.58deg, rgba(0, 0, 0, 0.26) 3.99%, rgba(0, 0, 0, 0.26) 100%);
    backdrop-filter: blur(10px);*/
    border-radius: 10px; 
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.144);
    backdrop-filter: blur(10px);
  }

  .weather-card h3{
    font-size: 1.8rem;
  }

  .forecast-container {
    display: flex;
    overflow-x: auto;
    gap: 10px;
    scroll-snap-type: x mandatory;
    padding-bottom: 10px;
  }

  .forecast-item {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-sizing: border-box;
    gap: 10px;
    padding: 10px;
    width: 100px;
    height: 300px;
    background: rgba(190, 190, 192, 0.2);
    box-shadow: 5px 4px 10px rgba(0, 0, 0, 0.25), inset 1px 1px 0px rgba(255, 255, 255, 0.25);
    border-radius: 30px;
    scroll-snap-align: start;
    margin-bottom: 8px;
  }

  .forecast-info{
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: #ffffff;
  }

  .temp{
    font-size: 1.2rem;
    font-weight: 600;
  }

  .current-hour {
    background: #a8a3a38e;
  }

 @media (min-width: 1000px) {
  .forecast-container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 700px;
    overflow-y: auto;
    padding: 0 10px;
  }

  .forecast-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 12px 16px;
    color: #ffffff;
    box-shadow: 0 0 6px rgba(0,0,0,0.1);
    height: auto;
    width: 100%;
  }

  .forecast-time {
    width: 60px;
    font-weight: bold;
  }

  .forecast-info {
    flex: 1;
    padding-left: 12px;
    gap: 5px;
  }

  .temp {
    font-size: 1.3rem;
    font-weight: 600;
  }

  .feels,
  .description,
  .wind,
  .rain {
    font-size: 0.9rem;
    color: #ffffff;
  }

  .forecast-extra {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    min-width: 100px;
  }
}
</style>
