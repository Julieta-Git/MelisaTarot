# Web de Melisa Tarot (tarot + tienda holística)

_Arranque del proyecto: 11/11/2026. La clienta aceptó la propuesta de la web. Propuesta original en propuesta-y-mensaje.md (carpeta del proyecto)._

**Estado (11/11/2026):** catálogo real cargado desde su PDF "Melisa Tarot · Cristales, aromas y rituales" (46 productos con precio, fotos y textos). Diseño adaptado al PDF: bordó #280100, dorado #dac473, Playfair Display + Inter, fondos pastel por colección. Faltan los datos de la sección 2.

## Datos confirmados por Melisa (11/11/2026, vía Julieta)
- Pago: transferencia al alias Melisatarot.mp (titular Ximena Melisa Perez) o Rapipago; mandar comprobante. (Julieta escribió "Rappi Pago": confirmar que es Rapipago.)
- Lecturas: por audio con fotos; entre 40 min y 1 h según la cantidad de preguntas.
- Videollamadas: se coordinan por WhatsApp.
- En su catálogo usa la pantera en distintos colores para agrupar tiradas. Probar ese sistema de colores en la web (falta que pase las imágenes o los colores).

## Catálogo de WhatsApp Business (11/11/2026)
Leído desde el WhatsApp Web de Julieta (solo lectura, sesión cerrada al terminar). Agregado a la web:
- **32 tiradas con precio** ($3.000 a $50.000) en 8 colecciones. "Lecturas rápidas" y "Preguntas libres" (2 a 10 preguntas) se agruparon por afinidad: en el catálogo esos ítems están solo en "Todos los artículos" — a confirmar.
- **Curso Aprender Tarot** $45.000 (3 meses, 12 clases, virtual + prácticas presenciales).
- **Tarot para eventos** (casamientos, cumpleaños, despedidas…), sin precio: "Consultar".
- **Mazos**: Rider-Waite $15.000; Sibilla Italiana $24.000 sin manual / $33.999 con manual personalizado (sin fotos ni descripción).
- Precios de la tienda holística coinciden con el PDF.
- Info importante del catálogo (alias y pagos, turnos, videollamadas) son imágenes: no se transcribieron. Pedir el texto a Melisa para las preguntas frecuentes.
- En el catálogo aparece otra versión del logo: pantera roja con "MELISA TAROT" sobre fondo negro. Preguntar cuál prefiere y pedir el archivo.

## Novedades del PDF (11/11/2026)
- Marca: **Melisa Tarot**, lema "Cristales, aromas y rituales". Logo: pantera en círculo naranja (solo bitmap 420 px).
- Contacto: WhatsApp +54 9 370 437-7078, Instagram @melisatarot.777, melisatarot.fsa@gmail.com.
- Colecciones cargadas: Roll On (Crystal y Herba-Crystal $6.000, Aceites Esenciales $10.000), Sprays $14.000, Brumas $24.000, Sales $10.000, Aceite Jazmín $15.000, 3 Velas Alquímicas $20.000 (color a elección), Biosahumerio $2.000 (aroma a elección), 6 combos sin precio.
- Mini guía "¿Qué necesitás?" (calma/amor/protección/energía) convertida en filtro.
- Se corrigieron erratas evidentes del PDF y el texto repetido de cada línea se muestra una vez arriba del grupo.
- El PDF **no trae tiradas**: la sección está oculta (`mostrarTiradas: false`).

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
**Del catálogo PDF (nuevo)**
- ⭐ Páginas que faltan en el PDF: Difusores colgantes y esferas, Refills, Aromas (productos y precios).
- ⭐ Precio de los 6 combos (en la web dicen "Precio a consultar").
- ⭐ Ciudad, envíos, retiro y medios de pago (el PDF no lo dice; código 370 sugiere Formosa).
- ✓ Tiradas: ya cargadas desde el catálogo de WhatsApp. Falta: cómo se entregan (audio, video, escrito), tiempos y si las colecciones armadas están bien.
- Fotos originales en alta (las del PDF tienen 300-500 px) y logo en alta o SVG.
- Origen y permiso de las fotos de Roll On Aurora, Guardiana y Santuario (parecen de banco o IA; no se publicaron).
- Nombre exacto de los sprays áuricos ("Escudo" aparece debajo de Rosa Dulce y en "Escudo Violeta Llama").
- Bruma Laurel: ¿125 o 250 ml?
- ¿Está bien que corrijamos las erratas del PDF?
- Revisar frases de salud en sales y roll-ons ("favorece la relajación muscular", "sanando emociones"): conviene suavizarlas.

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
| 11/11/2026 | Paleta provisoria violeta/crema/dorado | No tenemos su Instagram todavía | Reemplazada |
| 11/11/2026 | Diseño tomado del catálogo PDF (bordó, dorado, Playfair + Inter, pastel por colección) | Es la identidad que ella ya usa | Implementado |
| 11/11/2026 | Pedido con barra fija abajo + panel; velas y biosahumerios con selector de color/aroma | 46 productos: el pedido tiene que estar siempre a mano; el mensaje incluye la opción elegida | Implementado |
| 11/11/2026 | Tiradas ocultas | El PDF no las trae | Reemplazada |
| 11/11/2026 | Tiradas, curso y eventos desde el catálogo de WhatsApp; cada tirada con botón "Reservar" directo a WhatsApp, preguntas libres en una tabla | Una lectura se reserva de a una; 9 tarjetas iguales de preguntas ensuciaban la página | Implementado |
| 11/11/2026 | Preguntas de cada tirada plegadas en "Ver qué incluye" | 32 tiradas largas hacían la página eterna en el celular | Implementado |
| 11/11/2026 | No publicar fotos de Aurora/Guardiana/Santuario | Derechos dudosos | Hasta confirmar |
| 11/11/2026 | Material de la clienta (PDF, info/) fuera del repo con .gitignore | El PDF pesa 27 MB y es material interno | Implementado |
