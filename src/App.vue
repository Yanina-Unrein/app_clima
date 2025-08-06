<template>
  <Background :weather="weather">
    <div id="app">
      <div class="container">
        <SearchBar @search="searchWeather" />
        <Greeting :current-location="currentLocation" :weather="weather" />    
        <div class="main-content">
            <div class="left-column">
              <ZoneTime :weather="weather" />
              <WeatherMessage :weather="weather" />
              <SunInfo :weather="weather" />
            </div>
            
            <div class="right-column">
              <CompleteDayTime :forecast="forecast" />
            </div>
          </div>
        <WeeklyTemperature :forecast="forecast" />
        <div class="footer fade-in">
          Clima Dinámico &copy; {{ new Date().getFullYear() }}
        </div>
      </div>
    </div>
  </Background>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import Greeting from './components/Greeting.vue';
import SearchBar from './components/SearchBar.vue';
import ZoneTime from './components/ZoneTime.vue';
import WeatherMessage from './components/WeatherMessage.vue';
import CompleteDayTime from './components/CompleteDayTime.vue';
import WeeklyTemperature from './components/WeeklyTemperature.vue';
import Background from './components/Background.vue';
import SunInfo from './components/SunInfo.vue';

export default {
  components: {
    Greeting,
    ZoneTime,
    CompleteDayTime,
    WeeklyTemperature,
    WeatherMessage,
    SearchBar,
    Background,
    SunInfo
  },
  setup() {
    const weather = ref(null);
    const forecast = ref(null);
    const currentLocation = ref('Tu ubicación');

    const searchWeather = async (city) => {
      if (!city.trim()) return;

      try {
        const [weatherData, forecastData] = await Promise.all([
          fetchWeather(city),
          fetchForecast(city)
        ]);

        weather.value = weatherData;
        forecast.value = forecastData;
        currentLocation.value = weatherData.name;
      } catch (error) {
        alert('Ciudad no encontrada. Intenta con otra.');
        console.error(error);
      }
    };

    const fetchWeather = async (city) => {
      const apiKey = '1a4300326301823702a846b38e3b8312';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=es`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Ciudad no encontrada');
      return await response.json();
    };

    const fetchForecast = async (city) => {
      const apiKey = '1a4300326301823702a846b38e3b8312';
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=es`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error en el pronóstico');
      return await response.json();
    };

    onMounted(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
          try {
            const apiKey = '1a4300326301823702a846b38e3b8312';
            const [weatherData, forecastData] = await Promise.all([
              fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}&lang=es`),
              fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}&lang=es`)
            ]);

            if (!weatherData.ok || !forecastData.ok) throw new Error('Error en la respuesta');

            weather.value = await weatherData.json();
            forecast.value = await forecastData.json();
            currentLocation.value = weather.value.name;
          } catch (error) {
            console.error('Error al obtener el clima:', error);
            searchWeather('Buenos Aires');
          }
        }, () => {
          searchWeather('Buenos Aires');
        });
      } else {
        searchWeather('Buenos Aires');
      }
    });

    return {
      weather,
      forecast,
      currentLocation,
      searchWeather
    };
  }
}
</script>

<style>
.container {
  color: white;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
  position: relative;
  z-index: 2;
  padding: 20px 10px;
}

.main-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.left-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.right-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer {
  text-align: center;
  font-size: 0.9rem;
  opacity: 0.8;
  padding: 15px;
}

.fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (min-width: 1000px) {
  .main-content {
    flex-direction: row;
  }
  
  .left-column { 
    width: 100%;
    max-width: 50%;
    flex-shrink: 0;
  }
  
  .right-column {
    flex: 1;
    max-width: 50%; 
  }
}

</style>