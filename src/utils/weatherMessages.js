export const weatherMessages = {
  'lluvia ligera': {
    message: (isDaytime) => isDaytime 
      ? "¡No te olvides el paraguas! Hay llovizna suave." 
      : "Llovizna nocturna, ideal para dormir con el sonido de la lluvia.",
    icon: "fas fa-umbrella"
  },
  'lluvia': {
    message: (isDaytime) => "¡Lluvia intensa! Mejor quédate en casa con un buen libro.",
    icon: "fas fa-cloud-showers-heavy"
  },
  'tormenta': {
    message: (isDaytime) => "¡Cuidado con los rayos! Quizás no sea el mejor día para salir.",
    icon: "fas fa-bolt"
  },
  'nubes': {
    message: (isDaytime) => isDaytime 
      ? "Día nublado perfecto para un café caliente." 
      : "Noche nublada, ideal para descansar.",
    icon: "fas fa-cloud"
  },
  'cielo claro': {
    message: (isDaytime, temp) => {
      if (isDaytime) {
        return temp > 20 
          ? "¡Día perfecto para lavar la ropa y tender al sol!" 
          : "Día despejado pero fresco, lleva una chaqueta.";
      } else {
        return temp > 15 
          ? "Noche estrellada perfecta para una caminata." 
          : "Noche despejada pero fría, ideal para estar en casa con un chocolate caliente.";
      }
    },
    icon: (isDaytime) => isDaytime ? "fas fa-sun" : "fas fa-moon"
  },
  'sol': {
    message: (isDaytime) => isDaytime 
      ? "¡No olvides la crema solar! Hoy es día de playa." 
      : "Atardecer despejado, disfruta del cielo colorido.",
    icon: "fas fa-sun"
  },
  'nieve': {
    message: (isDaytime) => isDaytime 
      ? "¡Hora de hacer un muñeco de nieve! Abrígate bien." 
      : "Nieve nocturna, mantente caliente en casa.",
    icon: "fas fa-snowflake"
  },
  'niebla': {
    message: (isDaytime) => isDaytime 
      ? "Niebla matutina, conduce con precaución." 
      : "Niebla nocturna, ten cuidado al conducir.",
    icon: "fas fa-smog"
  },
  'viento': {
    message: (isDaytime) => "¡Cuidado con el peinado! Hoy sopla viento fuerte.",
    icon: "fas fa-wind"
  }
};

// Función para obtener el mensaje adecuado
export const getWeatherMessage = (weatherData) => {
  if (!weatherData || !weatherData.weather) return null;
  
  const description = weatherData.weather[0].description.toLowerCase();
  const temp = weatherData.main?.temp;
  
  const isDaytime = () => {
    // 1. Intentar usar datos de salida/puesta de sol si están disponibles
    if (weatherData.sys?.sunrise && weatherData.sys?.sunset) {
      const now = Date.now() / 1000; // Tiempo actual en segundos
      return now > weatherData.sys.sunrise && now < weatherData.sys.sunset;
    }
    
    // 2. Fallback a hora local si no hay datos de sol
    const hours = new Date().getHours();
    return hours >= 6 && hours < 20;
  };
  // --------------------------------------
  
  const dayTime = isDaytime(); // Ejecutamos la función para obtener el valor booleano

  // Buscar coincidencia exacta
  if (weatherMessages[description]) {
    const messageConfig = weatherMessages[description];
    
    return {
      message: typeof messageConfig.message === 'function' 
        ? messageConfig.message(dayTime, temp)
        : messageConfig.message,
      icon: typeof messageConfig.icon === 'function' 
        ? messageConfig.icon(dayTime)
        : messageConfig.icon
    };
  }
  
  // Mensajes basados en temperatura
  if (temp > 30) {
    return {
      message: "¡Ola de calor! Hidrátate frecuentemente.",
      icon: "fas fa-temperature-high"
    };
  }

  if (temp > 25) {
    return {
      message: "¡Hace calor! Perfecto para un helado.",
      icon: "fas fa-ice-cream"
    };
  }

  if (temp < 5) {
    return {
      message: "¡Hace mucho frío! Abrígate bien.",
      icon: "fas fa-temperature-low"
    };
  }

  if (temp < 10) {
    return {
      message: "¡Fresquito! Ideal para un chocolate caliente.",
      icon: "fas fa-mug-hot"
    };
  }
  
  // Retornar un mensaje por defecto
  return {
    message: "¡Disfruta del día, sea cual sea el clima!",
    icon: "fas fa-cloud-sun"
  };
};