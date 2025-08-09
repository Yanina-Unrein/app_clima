# Clima Dinámico

Clima Dinámico es una aplicación meteorológica moderna que combina información precisa con una experiencia visual impresionante. Con fondos dinámicos que cambian según las condiciones climáticas y la hora del día, mensajes personalizados adaptados a tu horario y clima, y una presentación detallada de datos meteorológicos, esta aplicación transforma la forma en que interactúas con la información del tiempo.

## Características Destacadas
### 🌅 Fondos Dinámicos Inteligentes
- Adaptación horaria: Fondos diferentes para día y noche

- Respuesta climática: Imágenes específicas para cada condición climática
- Variedad visual: Múltiples imágenes para cada tipo de clima
- Transiciones suaves: Cambios elegantes entre fondos

### 💬 Mensajes Personalizados
- Saludos contextuales: Mensajes que cambian según la hora del día (buenos días, buenas tardes, buenas noches)
- Descripciones climáticas: Mensajes específicos para cada tipo de clima
- Consejos útiles: Recomendaciones basadas en las condiciones actuales

### 🌡️ Tarjeta de Temperatura con Fondo Dinámico
- Fondo temático: Cambia según las condiciones climáticas actuales
- Efectos especiales: Animaciones de nieve para temperaturas bajas
- Diseño inmersivo: La tarjeta se integra perfectamente con el fondo principal

### 📊 Información Meteorológica Detallada
- Visión por horas: Pronóstico detallado para las próximas 24 horas
- Perspectiva semanal: Vista de 7 días con temperaturas mínimas y máximas
- Datos esenciales: Humedad, presión atmosférica, velocidad del viento
- Información solar: Horarios de salida y puesta del sol

### 🔍 Buscador Inteligente
- Búsqueda global: Encuentra cualquier ciudad del mundo
- Geolocalización: Detección automática de tu ubicación
- Manejo de errores: Notificaciones elegantes para ubicaciones no encontradas

## Tecnologías Utilizadas
- Vue 3 (Composition API)
- CSS3 (Flexbox, Grid, Animaciones avanzadas)
- OpenWeatherMap API
- Geolocalización del navegador
- Iconos de Font Awesome
- Diseño responsive (mobile-first)

## 🔧 Instalación

1. Clona el repositorio:   
```
git clone https://github.com/tu-usuario/clima-dinamico.git   

```
2. Instala dependecncias   
```   
npm install   
``` 
3. Crea un archivo .env en la raíz del proyecto con tu clave de la API:   

OPENWEATHER_API_KEY=tu_api_key_aqui

4. Ejecuta el servidor de desarrollo:   
``` 
npm run dev
``` 

🗂️ Estructura del proyecto    
├── public/   
│   └── assets/              # Imágenes de fondo por clima   
├── src/   
│   ├── components/         # Componentes como WeatherCard.vue, Background.vue, etc.   
│   ├── App.vue             # Componente raíz   
│   └── main.js             # Punto de entrada   
├── .env                    # API Key   
├── README.md   


