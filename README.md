# Melisa Tarot · Web

Sitio estático (HTML, CSS y JS) para las tiradas de tarot y la tienda holística de Melisa. Los pedidos se cierran por WhatsApp.

**Estado:** en desarrollo, con los datos reales del catálogo PDF y del catálogo de WhatsApp de Melisa. Lo pendiente está en `docs/proyecto.md`. Publicado en https://melisatarot.vercel.app.

## Cómo editar
Todo el contenido está en **`data.js`**: marca, WhatsApp, Instagram, tiradas, productos y preguntas frecuentes.
- Un campo en `null` se muestra como recuadro punteado "A confirmar".
- `visible: false` oculta un producto o tirada sin borrarlo.
- `masVendido: true` muestra la etiqueta "Más vendido" en un producto; `destacada: true` resalta una tirada.
- Fotos de productos: van en `assets/fotos/productos/` (formato .webp) y se ponen en el campo `foto` con `F("nombre-del-archivo")`.
- Una opción (color, aroma) puede tener su propio `precio` y su propia `foto`; la tarjeta los cambia al elegirla.
- Si algo está mal escrito en `data.js` (una categoría que no existe, por ejemplo), la consola del navegador avisa qué producto revisar y el resto del sitio sigue funcionando.

## Probar
Abrir `index.html` en el navegador. No necesita instalar nada.

## Publicar
Publicado en Vercel (conectado a este repo): https://melisatarot.vercel.app. Cada push a `main` se publica solo.

Si cambia el dominio, actualizar en `index.html` el canonical, `og:url`, `og:image` y el JSON-LD.

## Documentación
Requisitos, pendientes, criterios de aceptación y registro de decisiones en [`docs/proyecto.md`](docs/proyecto.md).
