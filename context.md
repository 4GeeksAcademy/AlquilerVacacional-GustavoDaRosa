### 1. Página de Inicio (`/`)
* **Propósito:** Descubrimiento, filtrado y exploración inicial de alojamientos disponibles en Montevideo.
* **Componentes Principales (Basados en Airbnb Real & Brief):**
  * `Navbar`: Barra superior con logo, campo de búsqueda de texto e iconos de menú. Almacena el texto de búsqueda en un estado local.
  * `CategoryFilters`: Fila horizontal de iconos (Cocina, Piscina, Wifi, etc.). Permite conmutar la categoría activa y resaltar visualmente cuál está seleccionada.
  * `PropertyGrid`: Cuadrícula responsiva (1 columna en móvil, 4 en escritorio). Maneja un efecto de carga simulado (1 segundo de retraso con un spinner).
  * `PropertyCard`: Tarjeta individual clickeable que muestra: placeholder de foto, título, precio por noche y valoración con estrellas. Al hacer clic, navega a la vista de detalle.
  * `Footer`: Pie de página simplificado con créditos de derechos de autor (© 2026 Airbnb, Inc.) y enlaces de términos/privacidad.

  ### 2. Página de Catálogo (`/catalog`)
* **Propósito:** Mostrar los resultados de búsqueda en Montevideo con herramientas de ordenación por precio y referencia geoespacial.
* **Componentes Principales (Basados en Airbnb Real & Brief):**
  * `Navbar`: Versión estática superior que mantiene la estética de la barra de búsqueda de Airbnb (Ubicación, Fechas, Viajeros) pero simplificada funcionalmente.
  * `CatalogHeader`: Contiene el contador de alojamientos encontrados y un selector interactivo (`<select>`) para ordenar los resultados por precio (Ascendente / Descendente) gestionado con `useState`.
  * `CatalogGrid`: Contenedor a la izquierda que reutiliza el componente `PropertyCard`. En escritorio se muestra en 2 columnas para dar espacio al mapa.
  * `MapSection`: Contenedor a la derecha en escritorio (y arriba en móvil). Inicialmente será un placeholder estilizado con Tailwind (un contenedor gris con texto "Mapa"). *Opcional: Integración de mapa interactivo con pines.*

  ### 3. Página de Detalle de Habitación (`/rooms/[id]`)
* **Propósito:** Mostrar la información exhaustiva de un alojamiento específico para incentivar y procesar la reserva del usuario.
* **Componentes Principales (Basados en Airbnb Real & Brief):**
  * `ImageGallery`: Carrusel de fotos interactivo en la parte superior. Controla el índice de la imagen activa mediante un estado local `useState` con controles de navegación (Anterior/Siguiente).
  * `RoomHeader`: Título del alojamiento, puntuación media por estrellas, número de reseñas y ubicación general.
  * `HostCard`: Bloque con el avatar del anfitrión, nombre, años de experiencia y etiqueta de Superanfitrión si aplica.
  * `AmenitiesList`: Cuadrícula responsiva que organiza los servicios disponibles (Wifi, Cocina, Piscina, etc.) utilizando iconos descriptivos y etiquetas.
  * `BookingCard`: Contenedor lateral fijo (*sticky* en escritorio) que muestra el precio por noche, un selector de huéspedes funcional (con `useState` para controlar máximos y mínimos) y el botón principal de llamada a la acción (CTA).