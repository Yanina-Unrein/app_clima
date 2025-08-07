const usedImages = new Map();

const weatherImages = {
  'clear-day': [
    '/backgroundImage/clear-day.webp',
    '/backgroundImage/clear-day-2.webp',
  ],
  'clear-night': [
    '/backgroundImage/clear-night.webp',
    '/backgroundImage/clear-night-2.webp',
  ],
  'rain-day': [
    '/backgroundImage/rain-day.webp',
    '/backgroundImage/rain-day-2.webp',
  ],
  'rain-night': [
    '/backgroundImage/rain-night.webp',
    '/backgroundImage/rain-night-2.webp',
  ],
  'storm-day': [
    '/backgroundImage/storm-day.png',
    '/backgroundImage/storm-day-2.webp'
  ],
  'storm-night': [
    '/backgroundImage/storm-night.png',
    '/backgroundImage/storm-night-2.webp'
  ],
  'clouds-day': [
    '/backgroundImage/cloud-day.webp',
    '/backgroundImage/cloud-day-2.webp'
  ],
  'clouds-night': [
    '/backgroundImage/cloud-night.webp',
    '/backgroundImage/cloud-night-2.webp'
  ],
  'snow-day': [
    '/backgroundImage/snow-day.webp',
    '/backgroundImage/snow-day-2.webp'   
  ],
  'snow-night': [
    '/backgroundImage/snow-night.webp',
    '/backgroundImage/snow-night-2.webp'
  ],
  'fog-day': ['/backgroundImage/fog-day.webp'],
  'fog-night': ['/backgroundImage/fog-night.webp'],
  'default-day': [
    '/backgroundImage/default-day.webp'
  ],
  'default-night': [
    '/backgroundImage/default-night.webp'
  ]
};

// Función para determinar si es de día
export const isDaytime = (weatherData) => {
  if (!weatherData || !weatherData.sys) {
    const hours = new Date().getHours();
    return hours > 6 && hours < 20;
  }
  
  const now = Math.floor(Date.now() / 1000);
  const { sunrise, sunset } = weatherData.sys;
  
  return now > sunrise && now < sunset;
};

// Función para obtener la clave de imagen según las condiciones
export const getImageKey = (weather) => {
  const timeOfDay = isDaytime(weather) ? 'day' : 'night';
  
  if (!weather || !weather.weather || !weather.weather[0]) {
    return `default-${timeOfDay}`;
  }
  
  const condition = weather.weather[0].main.toLowerCase();
  const temp = weather.main?.temp || 0;
  
  // Mapeo mejorado de condiciones
  const conditionMap = {
    'thunderstorm': `storm-${timeOfDay}`,
    'rain': `rain-${timeOfDay}`,
    'drizzle': `rain-${timeOfDay}`,
    'clouds': `clouds-${timeOfDay}`,
    'clear': `clear-${timeOfDay}`,
    'snow': temp < 0 ? `snow-${timeOfDay}` : `default-${timeOfDay}`,
    'mist': `fog-${timeOfDay}`,  
    'smoke': `fog-${timeOfDay}`, 
    'haze': `fog-${timeOfDay}`,  
    'dust': `fog-${timeOfDay}`,  
    'fog': `fog-${timeOfDay}`,
    'sand': `fog-${timeOfDay}`,  
    'ash': `clouds-${timeOfDay}`, 
    'squall': `rain-${timeOfDay}`,
    'tornado': `storm-${timeOfDay}`
  };
  
  return conditionMap[condition] || `default-${timeOfDay}`;
};

// Función para obtener una imagen aleatoria evitando repeticiones inmediatas
export const getRandomImage = (imageKey, locationId = 'default') => {
  const now = new Date();
  const hours = now.getHours();
  const defaultKey = (hours > 6 && hours < 20) ? 'default-day' : 'default-night';
  
  const images = weatherImages[imageKey] || weatherImages[defaultKey];
  
  if (!images || images.length === 0) {
    return weatherImages[defaultKey][0];
  }
  
  // Obtener imágenes usadas recientemente para esta ubicación
  const locationUsed = usedImages.get(locationId) || new Set();
  
  // Filtrar imágenes no usadas
  const availableImages = images.filter(img => !locationUsed.has(img));
  
  // Si no hay disponibles, resetear para esta ubicación
  if (availableImages.length === 0) {
    locationUsed.clear();
    return getRandomImage(imageKey, locationId); // Intentar nuevamente
  }
  
  // Seleccionar imagen aleatoria
  const randomIndex = Math.floor(Math.random() * availableImages.length);
  const selectedImage = availableImages[randomIndex];
  
  // Registrar como usada
  locationUsed.add(selectedImage);
  usedImages.set(locationId, locationUsed);
  
  return selectedImage;
};