# Web de la tarotista con tienda holística

_Arranque del proyecto: 11/11/2026. La clienta aceptó la propuesta de la web. Propuesta original en propuesta-y-mensaje.md (carpeta del proyecto)._

**Estado:** prototipo con datos de ejemplo en la raíz del repo. Nada de la clienta está cargado todavía porque no tenemos sus datos.

---

## 1. Objetivo, público y requisitos

**Objetivo comercial:** que quien la descubre en Instagram vea en un solo lugar sus tiradas y sus productos, y le escriba por WhatsApp con el pedido ya armado.

**Público probable:** seguidoras de su Instagram, desde el celular (a confirmar).

### Requisitos funcionales
| # | Requisito | Estado |
|---|---|---|
| F1 | Catálogo de tiradas con ficha (qué responde, modalidad, entrega, precio) y botón "Reservar por WhatsApp" con mensaje armado | Prototipo hecho, datos de ejemplo |
| F2 | Catálogo de productos con filtro por categoría (roll-ons, sprays áuricos, velas, cuarzos) y botón "Pedir por WhatsApp" | Prototipo hecho, datos de ejemplo |
| F3 | Elegir varios productos y mandar un solo pedido por WhatsApp | Prototipo hecho |
| F4 | Sección sobre ella | Estructura hecha, falta texto y foto |
| F5 | Cómo comprar + preguntas frecuentes (pago, entrega, envíos) | Estructura hecha, faltan respuestas |
| F6 | Link a Instagram y contacto | Falta usuario y número |
| F7 | Ocultar productos sin borrarlos (campo `visible`) | Hecho |
| F8 | Opción B: cargar productos desde Google Sheets | No empezado; depende de qué opción elija |

### Requisitos visuales
- Estética basada en su Instagram (pendiente: no lo vimos todavía).
- Prototipo con una paleta provisoria (violeta oscuro, crema y dorado) pensada para tarot. Se cambia cuando veamos su marca.
- Fotos reales de sus productos (pendiente).

### Requisitos técnicos
- Sitio estático HTML/CSS/JS, igual que Essenza y Dulce Marga. Sin base de datos ni pagos online.
- Todos los datos editables en un solo archivo: `data.js` (marca, WhatsApp, tiradas, productos, preguntas frecuentes).
- Hosting: GitHub Pages (permite uso comercial; Vercel Hobby no).
- Primero celular, accesible (contraste, botones grandes, respeta "menos movimiento").

---

## 2. Confirmado vs. a consultar

### Confirmado
- Es tarotista, tiene Instagram de tarot y ofrece distintos tipos de tiradas.
- Tienda holística: roll-ons, spray áurico, velas para rituales en casa, cuarzos y piedras.
- Los pedidos se cierran por WhatsApp.
- Aceptó la propuesta de la web (11/11/2026).

### A consultar (prioridad ⭐ = sin esto no se puede publicar)
**Decisión principal**
- ⭐ ¿Opción A (vos actualizás) u opción B (ella carga desde una planilla)? ¿Qué precio quedó?

**Marca**
- ⭐ Nombre de la marca. ¿Tarot y tienda van con el mismo nombre?
- ⭐ Usuario de Instagram (para tomar la estética).
- Logo y colores, si tiene.

**Tiradas**
- ⭐ Lista de tiradas: nombre, qué incluye, precio.
- ⭐ Modalidad (presencial, videollamada, audio, escrito) y tiempo de entrega.
- Cómo cobra (transferencia, Mercado Pago, efectivo) y si pide pago antes.
- ¿Coordina horario por WhatsApp o quiere que elijan día y hora?

**Tienda**
- ⭐ Lista de productos con precio, y fotos (¿las saca ella?).
- ¿Mostrar precios en la web? (el prototipo los muestra; si no, dice "Consultar")
- ⭐ Envíos: ¿a dónde? ¿retiro? ¿en qué ciudad está?
- ¿Arma kits o combos?
- Intenciones para filtrar (protección, amor, abundancia...), si las quiere.

**Contacto y confianza**
- ⭐ Número de WhatsApp para pedidos.
- Texto y foto para "Sobre mí".
- Testimonios reales con permiso.
- ¿Quiere un aviso del tipo "las tiradas son orientativas"?

---

## 3. Criterios de aceptación (para dar la web por terminada)
- [ ] Todas las tiradas y productos que mandó la clienta aparecen con nombre, descripción, precio (o "Consultar") y foto.
- [ ] Cada botón de WhatsApp abre su número con el mensaje correcto (probado en Android y iPhone si se puede).
- [ ] El pedido de varios productos arma bien la lista y el total.
- [ ] El filtro de categorías muestra solo esa categoría y "Todos" vuelve a mostrar todo.
- [ ] Un producto con `visible: false` no se ve.
- [ ] Ningún texto dice que un producto cura o trata algo.
- [ ] Se ve bien a 360 px de ancho, sin scroll horizontal.
- [ ] No quedan textos de ejemplo ni recuadros "a confirmar".
- [ ] La clienta revisó y aprobó textos y precios.
- [ ] Publicada en GitHub Pages y el link probado desde el celular.
- (Solo opción B) [ ] Ella cargó, editó y ocultó un producto desde su celular y se vio en la web.

---

## 4. Tareas
**Implementado**
- [x] Estructura del sitio y diseño provisorio .
- [x] Catálogo de tiradas y de productos leído desde `data.js`.
- [x] Filtro por categoría, pedido múltiple por WhatsApp, botón por tirada.
- [x] Recuadros punteados para marcar lo que falta confirmar.

**Pendiente (Julieta / clienta)**
- [ ] Mandarle las preguntas de la sección 2 y conseguir los datos ⭐.
- [ ] Ver su Instagram y pasarme el usuario o capturas.
- [ ] Fotos de productos.

**Pendiente (cuando lleguen los datos)**
- [ ] Cargar datos reales en `data.js` y adaptar colores y tipografía a su marca.
- [ ] Crear repo en GitHub (lo crea Julieta vacío, Claude sube el código) y publicar en GitHub Pages.
- [ ] Si elige B: armar la planilla, conectarla y probar fotos desde Drive.

---

## 5. Registro de decisiones
| Fecha | Decisión | Por qué | Estado |
|---|---|---|---|
| 9/11/2026 | Sitio estático como Essenza, pedidos por WhatsApp | Lo más simple que cumple; mismo stack que el resto de sus clientes | Confirmado (aceptó la web) |
| 9/11/2026 | Hosting GitHub Pages | Gratis y permite uso comercial | Propuesto |
| 9/11/2026 | Panel para opción B: Google Sheets publicado como CSV (alternativa Pages CMS) | Ella ya sabe usar planillas, no requiere cuentas raras | Propuesto, falta saber si elige B |
| 11/11/2026 | Todos los datos en un único `data.js`, separados del código | Si elige A, Julieta edita un solo archivo; si elige B, solo se reemplaza de dónde vienen los datos, el resto queda igual | Implementado |
| 11/11/2026 | Pedido de productos con varios ítems (como Dulce Marga); tiradas con botón directo | En la tienda se suelen comprar varias cosas; una tirada se reserva de a una | Implementado, a validar con ella |
| 11/11/2026 | Paleta provisoria violeta/crema/dorado | No tenemos su Instagram todavía | Provisorio |
