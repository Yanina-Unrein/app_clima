const backgroundMedia = {
  'lluvia ligera':     { type: 'video', src: '/background/rain.mp4' },
  'lluvia moderada':   { type: 'video', src: '/background/lluvia-moderada.mp4' },
  'lluvia':            { type: 'video', src: '/background/rain.mp4' },
  'cielo claro':       { type: 'video', src: '/background/clear.mp4' },
  'nubes dispersas':   { type: 'image', src: '/background/algo-de-nubes.webp' },
  'algo de nubes':     { type: 'video', src: '/background/algo-nubes.mp4' },
  'muy nuboso':        { type: 'image', src: '/background/clouds.webp' },
  'nubes':             { type: 'image', src: '/background/algo-de-nubes.webp' },
  'nieve':             { type: 'video', src: '/background/snow.mp4' },
  'tormenta':          { type: 'video', src: '/background/storm.mp4' }
};

export const getBackgroundForWeather = (weatherDescription) => {
  if (!weatherDescription) return null;
  
  const desc = weatherDescription.toLowerCase();
  return backgroundMedia[desc] || { 
    type: 'image', 
    src: '/background/default.jpg' 
  };
};