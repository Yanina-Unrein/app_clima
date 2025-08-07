const backgroundMedia = {
  'lluvia ligera':     { type: 'video', src: '/backgroundZoneTime/rain.mp4' },
  'lluvia moderada':   { type: 'video', src: '/backgroundZoneTime/lluvia-moderada.mp4' },
  'lluvia':            { type: 'video', src: '/backgroundZoneTime/rain.mp4' },
  'cielo claro':       { type: 'video', src: '/backgroundZoneTime/clear.mp4' },
  'nubes dispersas':   { type: 'image', src: '/backgroundZoneTime/algo-de-nubes.webp' },
  'algo de nubes':     { type: 'video', src: '/backgroundZoneTime/algo-nubes.mp4' },
  'muy nuboso':        { type: 'image', src: '/backgroundZoneTime/clouds.webp' },
  'nubes':             { type: 'image', src: '/backgroundZoneTime/algo-de-nubes.webp' },
  'nieve':             { type: 'video', src: '/backgroundZoneTime/snow.mp4' },
  'tormenta':          { type: 'video', src: '/backgroundZoneTime/storm.mp4' }
};

export const getBackgroundForWeather = (weatherDescription) => {
  if (!weatherDescription) return null;
  
  const desc = weatherDescription.toLowerCase();
  return backgroundMedia[desc] || { 
    type: 'image', 
    src: '/backgroundZoneTime/default.jpg' 
  };
};