<template>
  <Background 
    :weather="weather" 
    :location="locationIdentifier"
    :class="{ 'snow-effect': isCold }"
  >
    <div id="app">
      <ErrorNotification 
        :show="showError" 
        :message="errorMessage"
        @close="showError = false"
      />

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
import ErrorNotification from './components/ErrorNotification.vue';

export default {
  components: {
    Greeting,
    ZoneTime,
    CompleteDayTime,
    WeeklyTemperature,
    WeatherMessage,
    SearchBar,
    Background,
    SunInfo,
    ErrorNotification
  },
  setup() {
    const weather = ref(null);
    const forecast = ref(null);
    const currentLocation = ref('Tu ubicación');
    const locationIdentifier = ref(Date.now().toString());
    
    // Agrega estas declaraciones faltantes
    const showError = ref(false);
    const errorMessage = ref('');

    const isCold = computed(() => {
      return weather.value?.main?.temp < 10;
    });

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
        locationIdentifier.value = `${city}-${Date.now()}`;
        showError.value = false; // Oculta errores previos
      } catch (error) {
        // Usa la notificación en lugar del alert
        errorMessage.value = 'Ciudad no encontrada. Intenta con otra.';
        showError.value = true;
        
        // Oculta automáticamente después de 5 segundos
        setTimeout(() => {
          showError.value = false;
        }, 5000);
      }
    };

    const fetchWeather = async (city) => {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=es`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Ciudad no encontrada');
      return await response.json();
    };

    const fetchForecast = async (city) => {
      const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}&lang=es`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error en el pronóstico');
      return await response.json();
    };

    onMounted(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
          try {
            const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
            const [weatherResponse, forecastResponse] = await Promise.all([
              fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}&lang=es`),
              fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}&lang=es`)
            ]);

            if (!weatherResponse.ok || !forecastResponse.ok) throw new Error('Error en la respuesta');

            weather.value = await weatherResponse.json();
            forecast.value = await forecastResponse.json();
            currentLocation.value = weather.value.name;
            locationIdentifier.value = `${position.coords.latitude.toFixed(2)}-${position.coords.longitude.toFixed(2)}`;
          } catch (error) {
            console.error('Error al obtener el clima:', error);
            errorMessage.value = 'Error al obtener tu ubicación. Mostrando clima de Buenos Aires.';
            showError.value = true;
            setTimeout(() => {
              showError.value = false;
            }, 5000);
            searchWeather('Buenos Aires');
          }
        }, (error) => {
          console.error('Error de geolocalización:', error);
          errorMessage.value = 'No pudimos obtener tu ubicación. Mostrando clima de Buenos Aires.';
          showError.value = true;
          setTimeout(() => {
            showError.value = false;
          }, 5000);
          searchWeather('Buenos Aires');
        });
      } else {
        errorMessage.value = 'Tu navegador no soporta geolocalización. Mostrando clima de Buenos Aires.';
        showError.value = true;
        setTimeout(() => {
          showError.value = false;
        }, 5000);
        searchWeather('Buenos Aires');
      }
    });

    return {
      weather,
      forecast,
      currentLocation,
      locationIdentifier,
      searchWeather,
      isCold,
      showError, 
      errorMessage 
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

.snow-effect::after {
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

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes iceSparkle {
  0% { background-position: 0 0, 30px 40px, 70px 20px; }
  100% { background-position: 100px 100px, 130px 140px, 170px 120px; }
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