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



## Especificación Técnica de Página de Inicio

Especificación Técnica Home (/)
1. Alcance
Esta especificación cubre únicamente la Página de Inicio (/), tomando como referencia la captura móvil Seccion1.png y el documento de contexto actual.

Reglas base:

Arquitectura mobile-first real con viewport objetivo 375px.
Adaptación a escritorio solo desde md: (768px).
Solo HTML nativo + React/Next + Tailwind CSS.
Prohibido usar librerías de UI externas.
Componentes atómicos con máximo 80 líneas por archivo.
Navegación interna de tarjetas con Link de Next.js (sin recarga).

2. Layout Mobile-First (375px)
Contenedor principal:

Ancho máximo móvil: 375px.
Centrado horizontal.
Padding horizontal: 16px.
Espaciado vertical entre bloques: 24px.
Fondo general gris claro tipo Airbnb.
Orden visual:

Navbar
Hero promocional (bloque visual + copy principal)
SearchForm
Título de sección: Alojamientos mejor valorados
CategoryFilters (scroll horizontal)
PropertyGrid (listado de tarjetas)
Footer
Adaptación md: (>=768px):

Se amplía ancho útil del contenedor.
SearchForm cambia de columna a fila.
PropertyGrid pasa de 1 columna a 2-4 columnas según ancho disponible.
CategoryFilters mantiene scroll horizontal si no entra completo.

3. Árbol de Componentes
HomePage

Navbar
HeroSection (puede vivir dentro de HomePage sin extraer si no supera complejidad)
SearchForm
CategoryFilters
PropertyGrid
Footer
PropertyGrid

PropertyCard (reutilizable)

4. Contratos TypeScript (tipos y props)
Tipos de dominio:
type SearchFormValues = {
location: string;
checkIn?: string;
checkOut?: string;
};

type CategoryItem = {
id: string;
label: string;
icon: React.ReactNode;
};

type Property = {
id: string;
slug: string;
title: string;
location: string;
pricePerNight: number;
rating: number;
reviewCount: number;
imageUrl: string;
categoryId: string;
isGuestFavorite?: boolean;
};

type FooterLink = {
label: string;
href: string;
};

Props por componente:
type NavbarProps = {
hostCtaLabel: string;
onHostCtaClick?: () => void;
};

type SearchFormProps = {
initialValues?: SearchFormValues;
onSubmit: (values: SearchFormValues) => void;
isLoading?: boolean;
};

type CategoryFiltersProps = {
categories: CategoryItem[];
activeCategoryId?: string;
onChange: (categoryId: string) => void;
};

type PropertyGridProps = {
properties: Property[];
isLoading?: boolean;
emptyMessage?: string;
};

type PropertyCardProps = {
property: Property;
};

type FooterProps = {
year: number;
companyName: string;
links: FooterLink[];
};

5. Especificación por Componente
Navbar
Responsabilidad:

Cabecera compacta de navegación inicial.
Logo/enlace al inicio y CTA de anfitrión.
Estructura HTML:

header
nav
a para logo
button para CTA
Comportamiento:

Sin lógica compleja de negocio.
onHostCtaClick opcional.
Accesibilidad:

Logo con texto legible o aria-label.
Botón con aria-label descriptivo.
Mobile:

Alto compacto.
Distribución horizontal.
Tipografía semibold.
md:

Mayor separación horizontal.
Escalado leve de tipografía.
SearchForm
Responsabilidad:

Capturar ubicación y fechas.
Disparar búsqueda con submit.
Estructura HTML:

form
fieldset/label/input para location
fieldset/label/input para checkIn
fieldset/label/input para checkOut
button submit principal (estilo CTA destacado)
Comportamiento:

Controlado por estado (en HomePage o interno, no ambos).
onSubmit tipado.
Botón deshabilitable con isLoading.
Accesibilidad:

Labels visibles.
Inputs con name/id correctos.
Estados disabled y focus visibles.
Mobile:

Campos apilados.
Bordes redondeados.
Botón ancho completo al final.
md:

Distribución en fila.
Botón alineado a la derecha.
CategoryFilters
Responsabilidad:

Filtrar propiedades por categoría activa.
Estructura HTML:

section
ul horizontal
li con button por categoría
Comportamiento:

Componente controlado por props.
Emite onChange con categoryId.
Accesibilidad:

Botones con aria-pressed.
Navegable por teclado.
Mobile:

overflow-x-auto obligatorio.
Chips/botones compactos con estado activo claro.
md:

Mayor separación horizontal.
Mantener scroll como fallback.
PropertyGrid
Responsabilidad:

Renderizar estados de carga, vacío y data.
Delegar representación de ítem en PropertyCard.
Estructura HTML:

section
loading: skeletons simples
empty: mensaje configurable
data: ul grid + PropertyCard
Comportamiento:

Solo presentación, sin fetch interno.
Recibe lista ya filtrada.
Mobile:

1 columna.
md:

2 columnas mínimo.
Escala a 3-4 según ancho.
PropertyCard
Responsabilidad:

Mostrar resumen del alojamiento.
Navegar al detalle sin recargar.
Estructura HTML:

li
Link de Next.js envolviendo toda la tarjeta
Imagen principal
Título y ubicación
Precio por noche y rating/reseñas
Navegación obligatoria:

href a /rooms/[slug] o /rooms/[id] con Link.
Prohibido window.location para navegación principal.
Accesibilidad:

Alt descriptivo en imagen.
Estado de foco visible en tarjeta.
Área clickeable completa.
Mobile:

Tarjeta vertical.
Imagen relación 16:9.
Jerarquía tipográfica compacta.
md:

Hover sutil.
Mejor densidad visual.
Footer
Responsabilidad:

Información legal y enlaces secundarios.
Estructura HTML:

footer
small con copyright
nav con enlaces
Comportamiento:

Links configurables por props.
Accesibilidad:

Enlaces con texto claro.
Contraste suficiente.
Mobile:

Contenido apilado.
Alineación consistente con el layout.
md:

Distribución horizontal.

6. Estado y Flujo de Datos en HomePage
Estado mínimo recomendado:

searchValues: SearchFormValues
activeCategoryId: string
visibleProperties: Property[] derivado de filtros y búsqueda
Flujo:

SearchForm onSubmit actualiza criterios de búsqueda.
CategoryFilters onChange actualiza activeCategoryId.
HomePage deriva visibleProperties.
PropertyGrid renderiza visibleProperties.
PropertyCard navega a detalle con Link.

7. Reglas de Implementación Estrictas
Mobile-first real para 375px.
Breakpoints permitidos: base y md en adelante.
Sin librerías externas de componentes UI.
Solo Tailwind utilities + HTML nativo.
Cada componente atómico por debajo de 80 líneas.
Navegación de PropertyCard exclusivamente con Link de Next.js.

8. Criterios de Aceptación
La Home funciona y mantiene jerarquía visual en 375px.
Desde md, el layout escala sin romper estructura.
Existen Navbar, SearchForm, CategoryFilters, PropertyGrid, PropertyCard y Footer con props tipadas.
PropertyCard navega sin recarga usando Link.
No se usa ninguna librería externa de UI.


## Especificación Técnica - Catálogo

Especificación Técnica Catálogo (ruta /catalog) - Mobile First

1. Alcance
Esta especificación cubre únicamente la Página de Catálogo/Resultados.

Stack permitido:

React + Next.js + HTML nativo + Tailwind CSS
Prohibido:

Librerías de componentes externas (shadcn, MUI o similares)
Objetivo visual y funcional:

En móvil, mapa dominante y listado como panel inferior apilado
Desde md (768px), layout en dos columnas con lista a la izquierda y mapa fijo a la derecha
Ordenamiento funcional por precio (ascendente y descendente)

2. Layout Mobile-First (viewport base 375px)
Contenedor raíz:

Alto mínimo de pantalla completa
Composición vertical apilada
Fondo neutro claro
Composición móvil (375px):

Navbar de catálogo fija arriba
MapSection ocupa la mayor parte del viewport
Panel inferior de resultados con esquinas superiores redondeadas
Dentro del panel: CatalogHeader + CatalogGrid
El panel de resultados puede scrollear internamente para mantener el mapa visible
Composición desde md (768px):

Layout en dos columnas
Izquierda: CatalogHeader + CatalogGrid
Derecha: MapSection fija (sticky dentro de su columna)
El mapa permanece visible mientras la lista hace scroll
Breakpoints permitidos en esta fase:

Base móvil
md en adelante

3. Árbol de Componentes
CatalogPage

Navbar (versión catálogo)
CatalogHeader
CatalogGrid
MapSection
CatalogGrid

PropertyCard (reutilizado)

4. Contratos TypeScript (props y tipos de estado)

import { ReactNode } from "react";

export type SortOrder = "price-asc" | "price-desc";

export type Property = {
  id: string;
  slug?: string;
  title: string;
  location: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  isGuestFavorite?: boolean;
};

export type NavbarCatalogProps = {
  searchLabel: string;
  dateRangeLabel: string;
  guestsLabel: string;
  onBack?: () => void;
  onFiltersClick?: () => void;
};

export type CatalogHeaderProps = {
  totalResults: number;
  sortOrder: SortOrder;
  onSortChange: (value: SortOrder) => void;
};

export type CatalogGridProps = {
  properties: Property[];
  isLoading?: boolean;
  emptyMessage?: string;
};

export type MapSectionProps = {
  markers: Array<{ id: string; lat: number; lng: number; pricePerNight: number }>;
  activePropertyId?: string;
  onMarkerClick?: (propertyId: string) => void;
};

export type PropertyCardProps = {
  property: Property;
};

5. Estado y lógica en CatalogPage
Estado mínimo con useState:

sortOrder: SortOrder
activePropertyId opcional (sincronización lista/mapa)
filtersOpen opcional (acción de filtros en Navbar)
Derivación de datos:

sortedProperties se calcula a partir de properties + sortOrder
No mutar el arreglo original; clonar antes de ordenar
Reglas de ordenamiento:

price-asc: menor a mayor
price-desc: mayor a menor
Flujo:

CatalogHeader emite onSortChange
CatalogPage actualiza sortOrder
CatalogGrid recibe sortedProperties
PropertyCard mantiene navegación a detalle con Link

6. Especificación por Componente
Navbar (catálogo)
Responsabilidad:

Navegación contextual y controles rápidos de resultados
Estructura HTML:

header
button de regreso
botón/resumen central (búsqueda actual)
button de filtros
Comportamiento:

Barra fija en móvil
Acciones mediante callbacks opcionales
Accesibilidad:

Botones con aria-label descriptivo
Límite:

Menos de 80 líneas
CatalogHeader
Responsabilidad:

Mostrar contador de resultados y selector funcional de ordenamiento
Estructura HTML:

section
p para total de resultados
label + select para orden
Opciones de select:

price-asc: Precio: menor a mayor
price-desc: Precio: mayor a menor
Comportamiento:

Componente controlado por props
onSortChange actualiza estado en CatalogPage
Accesibilidad:

label visible asociada al select
Límite:

Menos de 80 líneas
CatalogGrid
Responsabilidad:

Renderizar lista de resultados reutilizando PropertyCard
Gestionar estados de carga y vacío
Estructura HTML:

section
ul
PropertyCard por cada property
Estados:

loading: skeletons simples con div
empty: mensaje configurable
data: listado normal
Mobile:

1 columna dentro del panel inferior
md:

2 columnas recomendadas para equilibrio lista/mapa
Límite:

Menos de 80 líneas
PropertyCard (reutilizado)
Responsabilidad:

Resumen del alojamiento y navegación interna al detalle
Estructura HTML:

li
Link envolviendo toda la tarjeta
imagen, título, ubicación, precio/noche, rating
Navegación obligatoria:

Usar Link de Next.js hacia /rooms/[id] (o /rooms/[slug] si existe)
No usar navegación imperativa para la acción principal
Accesibilidad:

Alt descriptivo de imagen
foco visible en tarjeta
Límite:

Menos de 80 líneas
MapSection
Responsabilidad:

Simular mapa con placeholder visual y marcadores de precio
Estructura HTML:

section con fondo gris/textura sutil
badges o chips de precio posicionados como pines simulados
Mobile:

Bloque dominante del viewport con panel de lista superpuesto abajo
md:

Columna derecha fija y persistente
Accesibilidad:

aria-label descriptivo del mapa
Límite:

Menos de 80 líneas

7. Reglas de Implementación Estrictas
Arquitectura mobile-first real en 375px
Solo breakpoints desde md en adelante
Solo HTML nativo + Tailwind utilities
Sin librerías de UI externas
Componentes enfocados y menores a 80 líneas
CatalogHeader con select funcional controlado por estado tipado
PropertyCard con navegación interna usando Link de Next.js

8. Criterios de Aceptación
En 375px, el mapa domina visualmente y el listado se presenta como panel inferior apilado
Desde md, layout en dos columnas con lista izquierda y mapa fijo a la derecha
CatalogHeader muestra contador y select operativo para precio ascendente/descendente
CatalogGrid reutiliza PropertyCard sin romper tipado
Cada tarjeta navega sin recarga completa usando Link
No se utiliza ninguna librería externa de componentes UI


## Especificación Técnica - Página de Detalle de Habitación

Especificación Técnica Detalle (ruta /rooms/[id]) - Mobile First

1. Alcance
Esta especificación cubre únicamente la Vista de Detalle de Habitación.
Stack permitido: React + Next.js + HTML nativo + Tailwind CSS.
Prohibido: librerías externas de UI, carrusel o utilidades de componentes.
Objetivo: reproducir flujo móvil real con galería superior y barra de reserva fija inferior; escalar a escritorio desde md (768px).

2. Layout Mobile-First (viewport base 375px)
Contenedor raíz:

Alto mínimo de pantalla completa.
Flujo vertical completo.
Fondo neutro claro.
Composición móvil (375px):

ImageGallery al inicio, ancho completo (100%).
BackNavigation superpuesto en la galería (posición absoluta).
Bloque de contenido debajo: RoomHeader, HostCard y AmenitiesList.
BookingCard fija en la parte inferior (bottom-0), flotando sobre el scroll.
El contenido principal debe reservar espacio inferior para evitar solapamiento con la barra fija de reserva.
Composición desde md (768px):

Galería superior tipo grilla grande.
Debajo, estructura de escritorio en dos columnas:
Izquierda: contenido (RoomHeader, HostCard, AmenitiesList y secciones informativas).
Derecha: BookingCard como panel sticky.
BookingCard permanece visible durante el scroll de contenido.
3. Árbol de Componentes
RoomDetailPage
ImageGallery
RoomHeader
HostCard
AmenitiesList
BookingCard
BackNavigation

4. Contratos TypeScript (props y tipos de estado)

import { ReactNode } from "react";

export type RoomImage = {
  id: string;
  url: string;
  alt: string;
};

export type Host = {
  name: string;
  avatarUrl: string;
  yearsHosting: number;
  isSuperhost?: boolean;
};

export type Amenity = {
  id: string;
  label: string;
  icon: ReactNode;
};

export type Room = {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  rating: number;
  reviewCount: number;
  guests: number;
  beds: number;
  baths: number;
  pricePerNight: number;
  cleaningFee?: number;
  serviceFee?: number;
  images: RoomImage[];
  host: Host;
  amenities: Amenity[];
};

export type ImageGalleryProps = {
  images: RoomImage[];
  initialIndex?: number;
};

export type RoomHeaderProps = {
  title: string;
  subtitle: string;
  location: string;
  rating: number;
  reviewCount: number;
  guests: number;
  beds: number;
  baths: number;
};

export type HostCardProps = {
  host: Host;
};

export type AmenitiesListProps = {
  amenities: Amenity[];
};

export type BookingCardProps = {
  pricePerNight: number;
  minGuests: number;
  maxGuests: number;
  initialGuests?: number;
  nights: number;
  checkInLabel: string;
  checkOutLabel: string;
  onReserve: (guests: number) => void;
  isLoading?: boolean;
};

export type BackNavigationProps = {
  href: "/catalog";
  label?: string;
};

5. Estado y lógica de página (RoomDetailPage)
Estado mínimo recomendado con useState:

isLoading: boolean
room: Room | null
currentRoomId: string
error: string | null
Simulación de carga con useEffect:

Escuchar el id dinámico de la URL.
Al cambiar el id:
setIsLoading(true)
setRoom(null)
setError(null)
Ejecutar setTimeout para simular fetch.
Buscar y cargar la habitación por id:
Si existe: setRoom(data), setIsLoading(false)
Si no existe: setError(mensaje), setIsLoading(false)
Limpiar el timeout en el return del useEffect para evitar fugas y actualizaciones sobre componente desmontado.
Reglas:

El render depende del id actual.
Mientras isLoading sea true, mostrar skeletons/placeholders.
Si no existe la habitación, mostrar estado vacío/error controlado.
Estado local por componente:

ImageGallery: currentIndex con useState.
BookingCard: guests con useState, acotado por minGuests y maxGuests.

6. Especificación por Componente (responsabilidad + estructura + comportamiento)
ImageGallery
Responsabilidad:

Mostrar imágenes y navegación manual.
Estructura HTML:

section con imagen principal
botones Anterior y Siguiente
indicador de índice actual (ejemplo: 1/7)
Comportamiento:

currentIndex con useState
navegación circular (anterior/siguiente)
sin librerías de carrusel
Mobile:

imagen full width
controles superpuestos
md:

grilla visual superior (imagen principal + miniaturas opcionales)
Límite:

Menos de 80 líneas.
RoomHeader
Responsabilidad:

Mostrar resumen principal del alojamiento.
Estructura HTML:

título, subtítulo
ubicación
rating y cantidad de reseñas
metadatos (huéspedes, camas, baños)
Mobile:

jerarquía tipográfica compacta
md:

mayor separación y respiración visual
Límite:

Menos de 80 líneas.
HostCard
Responsabilidad:

Presentar anfitrión y señales de confianza.
Estructura HTML:

tarjeta con avatar
nombre
años hospedando
badge de superhost opcional
Mobile:

bloque compacto
md:

padding y separación mayores
Límite:

Menos de 80 líneas.
AmenitiesList
Responsabilidad:

Listar servicios en formato visual.
Estructura HTML:

section
grid de items
cada item: icono + etiqueta
Mobile:

grid de 2 columnas
md:

3 o más columnas según ancho
Accesibilidad:

iconos decorativos con aria-hidden cuando aplique
Límite:

Menos de 80 líneas.
BookingCard
Responsabilidad:

Mostrar precio, selector de huéspedes y CTA de reserva.
Estructura HTML:

precio por noche
fechas (check-in/check-out)
control de huéspedes con botones menos/más
texto de política breve
botón CTA Reservar
Comportamiento:

guests con useState
clamp entre minGuests y maxGuests
deshabilitar botones al llegar a límites
emitir onReserve(guests)
Mobile:

barra fija inferior, ancho completo, fondo sólido y sombra
md:

panel sticky en columna derecha
Límite:

Menos de 80 líneas.
BackNavigation
Responsabilidad:

Retorno al catálogo sin recarga.
Estructura HTML:

Link de Next.js hacia /catalog
Ubicación:

superpuesto sobre la galería en móvil
visible en cabecera de detalle en md
Límite:

Menos de 80 líneas.

7. Reglas de implementación estrictas
Arquitectura mobile-first real en 375px.
Solo breakpoints desde md en adelante.
Solo HTML nativo + clases utilitarias Tailwind.
Todos los componentes enfocados y menores a 80 líneas.
Carrusel manual con useState, sin librerías externas.
Simulación de carga con useEffect + setTimeout basada en el id de la URL y limpieza obligatoria.
Navegación de retorno con Link hacia /catalog.
Sin dependencias externas de componentes.

8. Criterios de aceptación
En 375px, la composición es vertical y la ImageGallery abre la pantalla a ancho completo.
BookingCard permanece fija en la parte inferior en móvil sin tapar contenido gracias al espacio reservado.
Desde md, existe estructura de escritorio con contenido a la izquierda y BookingCard sticky a la derecha.
ImageGallery permite Ant/Sig e índice de foto funcional con useState.
BookingCard aplica selector de huéspedes funcional con mínimo y máximo.
La página simula carga por id mediante useEffect y setTimeout con cleanup correcto.
Existe navegación de retorno al catálogo usando Link sin recarga completa.