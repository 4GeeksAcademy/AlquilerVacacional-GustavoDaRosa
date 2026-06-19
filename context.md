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

Especificación Técnica Home (ruta /) - Mobile First

1. Alcance

Esta especificación cubre únicamente la Página de Inicio.
Stack de UI permitido: HTML nativo + Tailwind CSS + componentes React/Next.
Prohibido: librerías de componentes externas (shadcn, MUI, etc.).
Objetivo visual: replicar la jerarquía de la captura móvil y preparar adaptación a escritorio desde md (768px).

2. Layout Mobile-First (viewport base 375px)

Contenedor raíz:
max-width: 375px en móvil centrado.
padding horizontal: 16px.
spacing vertical entre bloques: 24px.
fondo gris claro similar a Airbnb.
Orden visual en móvil:
Navbar
Hero promocional (imagen + título + subtítulo)
SearchForm
Sección “Alojamientos mejor valorados”
CategoryFilters (scroll horizontal)
PropertyGrid
Footer
Adaptación desde md (768px en adelante):
Se incrementa max-width del contenido y padding.
SearchForm pasa de columna a fila.
PropertyGrid pasa de 1 columna a 2-4 columnas según ancho disponible.
CategoryFilters mantiene scroll si no entra completo.

3. Árbol de Componentes

HomePage
Navbar
SearchForm
CategoryFilters
PropertyGrid
PropertyCard
Footer

4. Contratos TypeScript (props)
Interfaces recomendadas:

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
links: { label: string; href: string }[];
};

5. Especificación por Componente (responsabilidad + estructura + comportamiento)

Navbar
Responsabilidad: cabecera simple con logo y CTA “Pon tu casa en Airbnb”.
Estructura HTML: header > nav > a/logo + button.
Mobile 375:
altura compacta, alineación horizontal, tipografía semibold.
md:
mayor separación horizontal y tamaño de fuente.
Accesibilidad:
botón con aria-label descriptivo.
logo como enlace al inicio.
Límite de tamaño:
máximo 80 líneas; sin lógica de negocio compleja.
SearchForm
Responsabilidad: capturar ubicación y fechas; disparar búsqueda.
Estructura HTML:
form
fieldset/label/input para ubicación
fieldset/label/input para fechas (check-in/check-out o campo único)
botón submit principal.
Mobile 375:
campos apilados en columna con bordes redondeados.
botón ancho completo al final.
md:
distribución en fila; botón alineado a la derecha.
Estado:
controlado por estado local en HomePage o interno (según preferencia, no ambos).
eventos onChange y onSubmit tipados.
Accesibilidad:
labels visibles.
botón deshabilitable con isLoading.
Límite:
máximo 80 líneas; extraer subcampo si supera el límite.
CategoryFilters
Responsabilidad: filtrar por categoría seleccionada.
Estructura HTML:
section + ul horizontal + botones por categoría.
Mobile 375:
scroll horizontal con overflow-x-auto.
indicador visual claro para categoría activa.
md:
mayor separación; opcional centrado.
Estado:
control de selección vía props (componente controlado).
Accesibilidad:
usar aria-pressed en botones activos.
Límite:
máximo 80 líneas.
PropertyGrid
Responsabilidad: renderizar estados de carga, vacío y lista de propiedades.
Estructura HTML:
section
loading: skeletons simples con divs
empty: mensaje vacío
data: ul grid + PropertyCard.
Mobile 375:
1 columna.
md:
mínimo 2 columnas; objetivo 3-4 según ancho.
Estado:
solo presentación; sin fetch interno.
Límite:
máximo 80 líneas; mover EmptyState y LoadingState a componentes internos si crece.
PropertyCard
Responsabilidad: mostrar resumen del alojamiento y permitir navegación a detalle.
Estructura HTML:
li > <Link> de Next.js envolviendo tarjeta completa.
imagen (img), título, ubicación, precio, rating.
Mobile 375:
tarjeta vertical, imagen 16:9, tipografía legible.
md:
ajustes de densidad visual y hover sutil.
Navegación obligatoria:
usar <Link href=/rooms/[slug o id]> para evitar recarga completa.
nunca usar window.location ni etiquetas a para navegación interna principal.
Accesibilidad:
texto alternativo de imagen.
foco visible en tarjeta.
Límite:
máximo 80 líneas.
Footer
Responsabilidad: información legal y enlaces secundarios.
Estructura HTML:
footer + small + nav de enlaces.
Mobile 375:
contenido apilado, centrado o inicio consistente con diseño.
md:
distribución horizontal.
Accesibilidad:
enlaces con texto claro.
Límite:
máximo 80 líneas.

6. Estado y Flujo de Datos en Home

Estado mínimo recomendado en HomePage:
searchValues: SearchFormValues
activeCategoryId: string
visibleProperties: Property[] derivado por filtros
Flujo:
SearchForm onSubmit actualiza criterios de búsqueda.
CategoryFilters onChange actualiza categoría.
PropertyGrid recibe lista ya filtrada.
PropertyCard navega por Link a detalle.

7. Reglas de Implementación Estrictas

Todos los componentes atómicos deben mantenerse por debajo de 80 líneas.
Solo clases utilitarias Tailwind y elementos HTML nativos.
Breakpoints permitidos en esta fase: base móvil y md en adelante.
Navegación de tarjetas exclusivamente con <Link> de Next.js.
Sin dependencias de UI externas.

8. Criterios de Aceptación para iniciar desarrollo

La Home se ve correcta y usable en 375px sin ajustes de escritorio.
Desde md, layout se adapta sin romper jerarquía visual.
Cada componente solicitado existe y tiene props tipadas.
PropertyCard navega sin recarga completa usando Link.
No se usa ninguna librería de componentes externa.


## Especificación Técnica - Catálogo

1. Alcance

Esta especificación cubre únicamente la Página de Catálogo/Resultados.
Stack permitido: React + Next.js + HTML nativo + Tailwind CSS.
Prohibido: librerías de componentes externas (shadcn, MUI, etc.).
Objetivo: experiencia móvil tipo mapa/listado y adaptación a escritorio en dos columnas desde md (768px).

2. Layout Mobile-First (viewport base 375px)

Contenedor raíz:
Alto mínimo de pantalla completa.
En móvil, composición vertical apilada.
Composición móvil (375px):
Navbar de catálogo fija arriba.
MapSection ocupa la mayor parte del viewport.
Panel inferior (listado) con esquinas superiores redondeadas.
Dentro del panel: CatalogHeader + CatalogGrid.
El panel puede ser scrollable internamente para no desplazar el mapa principal.
Composición desde md (768px):
Layout en dos columnas.
Izquierda: lista/tarjetas (CatalogHeader + CatalogGrid).
Derecha: MapSection fijo (sticky o fixed dentro de su columna).
El mapa permanece visible mientras la lista hace scroll.

3. Árbol de Componentes

CatalogPage
Navbar (versión catálogo)
CatalogHeader
CatalogGrid
PropertyCard (reutilizado)
MapSection

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
  searchLabel: string; // Ej: "Alojamientos en Montevideo"
  dateRangeLabel: string; // Ej: "19-20 de jun"
  guestsLabel: string; // Ej: "1 huésped"
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

5. Estado y lógica en CatalogPage

Estado mínimo con useState:
sortOrder: SortOrder (inicial recomendado: price-asc o price-desc según UX).
activePropertyId opcional para sincronizar hover/click entre lista y mapa.
filtersOpen opcional para acciones de Navbar.
Derivación de datos:
sortedProperties se calcula a partir de properties + sortOrder.
Regla de ordenamiento:
price-asc: menor a mayor.
price-desc: mayor a menor.
No mutar el arreglo original; clonar antes de ordenar.
Flujo:
CatalogHeader emite onSortChange.
CatalogPage actualiza sortOrder.
CatalogGrid recibe sortedProperties.
PropertyCard navega al detalle con Link.

6. Especificación por Componente (responsabilidad + estructura + comportamiento)

Navbar (catálogo)
Responsabilidad: navegación contextual de resultados.
Estructura HTML:
header > button (back) + button/summary central + button (filtros).
Móvil:
barra superior compacta y fija.
Desktop:
mantiene estructura, con más ancho y separación.
Accesibilidad:
botones con aria-label.
Límite: menos de 80 líneas.
CatalogHeader
Responsabilidad: mostrar contador de resultados y select funcional de ordenamiento.
Estructura HTML:
section + p (contador) + label + select.
Opciones de select:
price-asc: Precio: menor a mayor.
price-desc: Precio: mayor a menor.
Comportamiento:
componente controlado por props (sortOrder y onSortChange).
Límite: menos de 80 líneas.
CatalogGrid
Responsabilidad: renderizar lista de resultados reutilizando PropertyCard.
Estructura HTML:
section > ul > PropertyCard por item.
Estados:
loading: skeletons simples.
empty: mensaje vacío.
Móvil:
1 columna dentro del panel inferior.
Desktop:
2 columnas recomendadas para mantener legibilidad.
Límite: menos de 80 líneas.
PropertyCard (reutilizado)
Responsabilidad: resumen del alojamiento con navegación interna.
Estructura HTML:
li > Link envolviendo toda la tarjeta.
Contenido:
imagen, título, ubicación, precio/noche, rating.
Navegación obligatoria:
usar Link de Next.js a /rooms/[id] (o /rooms/[slug] si se define slug).
no usar navegación imperativa para la acción principal.
Límite: menos de 80 líneas.
MapSection
Responsabilidad: representar área de mapa como placeholder visual.
Estructura HTML:
section con fondo gris, grilla o textura leve, badges de precio simulados.
Móvil:
ocupa la mayor parte de la pantalla detrás/encima del panel de lista.
Desktop:
columna derecha fija y persistente.
Accesibilidad:
aria-label descriptivo del mapa.
Límite: menos de 80 líneas.

7. Reglas de implementación estrictas

Arquitectura mobile-first real en 375px.
Solo breakpoints desde md en adelante.
Solo HTML nativo + Tailwind utilities.
Todos los componentes enfocados y menores a 80 líneas.
PropertyCard debe mantener navegación con Link hacia /rooms/[id].
Selector select de CatalogHeader debe ser funcional con estado tipado.

8. Criterios de aceptación

En 375px, el mapa domina visualmente y el listado se presenta como panel inferior apilado.
Desde md, layout en dos columnas con lista izquierda y mapa fijo a la derecha.
CatalogHeader muestra contador y select operativo para precio asc/desc.
CatalogGrid reutiliza PropertyCard sin romper tipado.
Cada tarjeta navega sin recarga completa usando Link.
Sin uso de librerías de UI externas.


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
Composición móvil (375px):
ImageGallery al inicio, ancho completo.
Botón volver y acciones superpuestas sobre la imagen.
Bloque de contenido debajo: RoomHeader, HostCard, AmenitiesList.
BookingCard fija en la parte inferior, flotando sobre el scroll.
Se debe reservar espacio inferior en el contenido para evitar solapamiento con la barra fija.
Composición desde md (768px):
Galería superior tipo grilla grande.
Debajo, estructura de dos columnas:
izquierda: contenido (RoomHeader, HostCard, AmenitiesList y secciones adicionales).
derecha: BookingCard como panel sticky.
BookingCard permanece visible al hacer scroll de contenido.

3. Árbol de Componentes

RoomDetailPage
ImageGallery
RoomHeader
HostCard
AmenitiesList
BookingCard
BackNavigation (botón/enlace de retorno con Link)

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

5. Estado y lógica de página

Estado mínimo recomendado en RoomDetailPage:
isLoading: boolean
room: Room | null
currentRoomId: string
error: string | null
Simulación de carga con useEffect:
Escuchar el id dinámico de la URL.
Al cambiar id:
activar isLoading en true.
limpiar room/error.
ejecutar setTimeout para simular fetch.
cargar datos de la habitación asociada al id.
finalizar con isLoading false.
incluir limpieza del timeout en el return del useEffect para evitar fugas.
Reglas de datos:
El render principal depende de id actual.
Si id no existe en dataset, mostrar estado vacío/error controlado.
No bloquear la UI: mostrar skeletons o placeholder mientras isLoading true.
Estado local por componente:
ImageGallery: currentIndex con useState.
BookingCard: guests con useState, respetando min/max.

6. Especificación por Componente (responsabilidad + estructura + comportamiento)

ImageGallery
Responsabilidad: mostrar imágenes y navegación manual.
Estructura HTML:
section con imagen principal.
botones Anterior y Siguiente.
indicador de índice actual (ejemplo 1/7).
Comportamiento:
useState para currentIndex.
Anterior/Siguiente con navegación circular.
Móvil:
imagen full width con controles superpuestos.
Desktop:
puede mostrar mini grilla o miniaturas bajo la imagen principal.
Límite: menos de 80 líneas.
RoomHeader
Responsabilidad: resumen principal del alojamiento.
Estructura HTML:
título, subtítulo, metadatos (huéspedes, camas, baños), rating y reseñas.
Móvil:
tipografía jerárquica y centrada/izquierda según diseño final.
Desktop:
mayor anchura y separación vertical.
Límite: menos de 80 líneas.
HostCard
Responsabilidad: presentar anfitrión y confianza.
Estructura HTML:
tarjeta con avatar, nombre, años de experiencia, badge superhost opcional.
Móvil:
bloque compacto.
Desktop:
padding y respiración mayores.
Límite: menos de 80 líneas.
AmenitiesList
Responsabilidad: listar servicios en formato visual.
Estructura HTML:
section + grid de ítems, cada ítem con icono + etiqueta.
Móvil:
2 columnas recomendadas.
Desktop:
3 o más columnas según ancho.
Accesibilidad:
iconos decorativos con aria-hidden cuando aplique.
Límite: menos de 80 líneas.
BookingCard
Responsabilidad: precio, rango de huéspedes y CTA de reserva.
Estructura HTML:
precio total/por noche.
selector de huéspedes con botones menos/mas.
texto de política (ejemplo cancelación).
botón CTA Reserva.
Comportamiento:
useState guests.
clamp entre minGuests y maxGuests.
deshabilitar controles cuando llega a límites.
Móvil:
barra fija inferior, ancho completo con fondo y sombra.
Desktop:
panel sticky lateral derecho.
Límite: menos de 80 líneas.
BackNavigation
Responsabilidad: retorno a catálogo sin recarga.
Estructura HTML:
Link de Next.js hacia /catalog con estilo de botón circular o texto.
Ubicación:
superpuesto en la galería en móvil.
integrado en cabecera en escritorio.
Límite: menos de 80 líneas.

7. Reglas de implementación estrictas

Arquitectura mobile-first real en 375px.
Solo breakpoints desde md en adelante.
Solo HTML nativo + clases utilitarias Tailwind.
Todos los componentes enfocados y menores a 80 líneas.
Carrusel manual con useState; sin librerías de slider.
Simulación de carga con useEffect + setTimeout usando el id de la URL.
Navegación de retorno con Link hacia /catalog.
Sin dependencias externas de componentes.

8. Criterios de aceptación

En 375px, ImageGallery ocupa el inicio full width y la composición es vertical.
BookingCard permanece fija en la parte inferior en móvil sin romper legibilidad del contenido.
Desde md, existe estructura de escritorio con contenido a la izquierda y BookingCard sticky a la derecha.
ImageGallery permite Ant/Sig e índice de foto funcional con useState.
BookingCard aplica selector de huéspedes funcional con mínimo y máximo.
La página simula carga por id mediante useEffect y setTimeout con limpieza correcta.
Existe navegación de retorno al catálogo usando Link sin recarga completa.