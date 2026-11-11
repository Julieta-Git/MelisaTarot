# Melisa Tarot · Web

Sitio estático (HTML, CSS y JS) para las tiradas de tarot y la tienda holística de Melisa. Los pedidos se cierran por WhatsApp.

**Estado:** prototipo con datos de ejemplo. Falta cargar los datos reales de la clienta.

## Cómo editar
Todo el contenido está en **`data.js`**: marca, WhatsApp, Instagram, tiradas, productos y preguntas frecuentes.
- Un campo en `null` se muestra como recuadro punteado "A confirmar".
- `visible: false` oculta un producto o tirada sin borrarlo.
- `destacado: true` lo muestra primero.
- Fotos de productos: van en `assets/fotos/` y se ponen en el campo `foto`.

## Probar
Abrir `index.html` en el navegador. No necesita instalar nada.

## Publicar
GitHub Pages desde la rama `main` (Settings → Pages → Deploy from a branch → main / root).

## Documentación
Requisitos, pendientes, criterios de aceptación y registro de decisiones en [`docs/proyecto.md`](docs/proyecto.md).
