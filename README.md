# Hype – Sitio Web Oficial de la Agencia de Marketing Digital

Este repositorio contiene el desarrollo del sitio web oficial de **Hype**, una agencia de marketing digital enfocada en el crecimiento empresarial, la estrategia y la captación de clientes.  
El proyecto está construido con tecnologías modernas que garantizan velocidad, escalabilidad, calidad visual y una experiencia de usuario fluida.

El objetivo principal es proporcionar una plataforma digital que represente fielmente la identidad de la marca, posicione sus servicios y facilite la conversión de visitantes en clientes mediante formularios, CRM y analítica avanzada.

---

## 1. Tecnologías Implementadas

- **Astro**: Framework de alto rendimiento basado en una arquitectura MPA optimizada.
- **TailwindCSS**: Framework CSS orientado a utilidades para un diseño escalable y consistente.
- **@fontsource**: Implementación de tipografías locales optimizadas (Montserrat y MuseoModerno).
- **Astro View Transitions**: Sistema de transiciones fluidas entre páginas para una experiencia tipo SPA.
- **Google Analytics 4**: Métricas y análisis del comportamiento del usuario.
- **Google Search Console**: Indexación, posicionamiento orgánico y SEO técnico.
- **HubSpot CRM**: Captación y administración de leads, con formularios conectados.
- **WhatsApp CTA / Chatbot**: Herramientas para conversión directa y comunicación rápida.
- **Vite**: Empaquetador utilizado por Astro para desarrollo y optimización.

---

## 2. Estilos y Tipografías

Toda la configuración de diseño se encuentra en `src/styles/global.css`, donde se incluyen:

- Variables globales (`:root`) para la paleta corporativa.
- Configuración de las fuentes Montserrat (principal) y MuseoModerno (secundaria).
- Estilos base del documento.
- Integración de TailwindCSS.

Esto garantiza consistencia visual en todo el sitio y facilita la escalabilidad del diseño.

---

## 3. Navegación y Transiciones

El sitio utiliza **Astro View Transitions** para mejorar la experiencia en el cambio de páginas.

Beneficios principales:

- Transiciones fluidas sin recarga completa del navegador.
- Comportamiento similar a una SPA pero manteniendo las ventajas SEO de un MPA.
- Animaciones limpias entre vistas.
- Mejor percepción de rendimiento y profesionalismo.

---

## 4. Páginas Incluidas

### Inicio (`/`)
Diseño inicial orientado a conversión. Contendrá:

- Hero con identidad visual.
- Carrusel de marcas o clientes destacados.
- Servicios principales.
- Propuesta de valor.
- Videos o casos de éxito.
- Preguntas frecuentes.
- Formulario de captación (integrado con HubSpot).

### Servicios (`/services`)
Sección dedicada a presentar claramente los servicios que ofrece la agencia, con beneficios, propuestas y llamados a la acción estratégicos.

### Nosotros (`/about`)
Página enfocada en la identidad corporativa, incluyendo:

- Historia y contexto.
- Misión y visión.
- Valores institucionales.
- Equipo de trabajo con identidad visual basada en la temática del tiburón.
- Cultura y metodología de trabajo.
- Sección de talento y reclutamiento.

---

## 5. Scripts del Proyecto

```bash
# Instalar dependencias
npm install

# Correr el servidor en modo desarrollo
npm run dev

# Generar build de producción
npm run build

# Previsualizar el build
npm run preview
````

--- 

## 6. Integraciones del Proyecto

El sitio está preparado para integrar:

  - Google Analytics 4 (GA4)
  - Google Search Console
  - HubSpot CRM y formularios
  - Meta Pixel (opcional)
  - Chatbots o widgets de WhatsApp
  - Etiquetas SEO (metadatos, OpenGraph)
  - Archivo sitemap.xml (en etapa posterior)
  - Marcado estructurado (Schema.org)

Estas herramientas permitirán un seguimiento completo del rendimiento del sitio, el comportamiento del usuario y la conversión.

## 7. Estado Actual del Proyecto

Configuración base completada.

  - TailwindCSS funcionando correctamente.
  - Tipografías integradas localmente.
  - Layout principal implementado.
  - Header y Footer creados.
  - Rutas principales activas.
  - Transiciones entre vistas configuradas.

Próximas fases: diseño avanzado, animaciones, CRM, SEO técnico.

## 8. Objetivo del Proyecto

El propósito del sitio web es fortalecer la presencia digital de Hype, mejorar su percepción profesional y aumentar la captación de leads mediante un recorrido de usuario claro, elementos visuales sólidos y herramientas de automatización.

El sitio servirá como:

  - Tarjeta de presentación corporativa.
  - Canal de adquisición de clientes.
  - Plataforma de comunicación comercial.
  - Punto de referencia para servicios ofrecidos.
  - Soporte para campañas de marketing digital.

## 9. Autor

Jerónimo Rodríguez Sepúlveda - Desarrollador de Software

Correo: jeronimoroseag@gmail.com 

LinkedIn: https://www.linkedin.com/in/jerorodriguez/
