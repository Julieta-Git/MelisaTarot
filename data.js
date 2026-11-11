// =====================================================================
// DATOS DEL SITIO. Este es el único archivo que hay que editar para
// cambiar textos, precios, tiradas y productos.
//
// ⚠ TODO lo que hay acá es DE EJEMPLO. Nada fue confirmado por la clienta.
//   Los campos con `null` muestran un recuadro "A confirmar" en la web.
// =====================================================================

const SITIO = {
  marca: null,            // ej: "Luna de Tarot" — A CONFIRMAR
  whatsapp: null,         // solo números con código de país, ej: "5493704123456" — A CONFIRMAR
  instagram: null,        // usuario sin @ — A CONFIRMAR
  ciudad: null,           // A CONFIRMAR
  mostrarPrecios: true,   // si es false, todo dice "Consultar"
};

// Categorías de la tienda (confirmadas: son los productos que vende).
const CATEGORIAS = [
  { id: "roll-on", nombre: "Roll-ons", simbolo: "◐" },
  { id: "spray", nombre: "Sprays áuricos", simbolo: "✧" },
  { id: "vela", nombre: "Velas de ritual", simbolo: "♁" },
  { id: "cuarzo", nombre: "Cuarzos y piedras", simbolo: "◇" },
];

// Tiradas. EJEMPLOS: nombres, textos, modalidades y precios inventados para el prototipo.
const TIRADAS = [
  {
    id: "pregunta",
    nombre: "Tirada de una pregunta",
    responde: "Una consulta puntual sobre una situación concreta.",
    cartas: 3,
    modalidad: "Audio por WhatsApp",
    entrega: "Hasta 48 h",
    precio: null,
    visible: true,
    ejemplo: true,
  },
  {
    id: "amor",
    nombre: "Tirada de amor y vínculos",
    responde: "Cómo está un vínculo, qué energía lo rodea y hacia dónde va.",
    cartas: 7,
    modalidad: "Audio o escrito",
    entrega: "Hasta 72 h",
    precio: null,
    visible: true,
    ejemplo: true,
  },
  {
    id: "anual",
    nombre: "Tirada anual",
    responde: "Un recorrido mes a mes por el año que empieza.",
    cartas: 13,
    modalidad: "Videollamada",
    entrega: "Con turno",
    precio: null,
    visible: true,
    ejemplo: true,
  },
];

// Productos. EJEMPLOS: uno por categoría para ver cómo queda. Sin precios reales.
// foto: ruta a assets/fotos/... (sin foto se muestra un recuadro con el símbolo de la categoría)
const PRODUCTOS = [
  { id: "rollon-proteccion", nombre: "Roll-on de ejemplo", categoria: "roll-on", descripcion: "Texto de ejemplo: aceite para acompañar una intención.", precio: null, foto: null, visible: true, destacado: true, ejemplo: true },
  { id: "spray-limpieza", nombre: "Spray áurico de ejemplo", categoria: "spray", descripcion: "Texto de ejemplo: para armonizar espacios.", precio: null, foto: null, visible: true, destacado: false, ejemplo: true },
  { id: "vela-ritual", nombre: "Vela de ritual de ejemplo", categoria: "vela", descripcion: "Texto de ejemplo: vela para un ritual en casa.", precio: null, foto: null, visible: true, destacado: true, ejemplo: true },
  { id: "cuarzo-amatista", nombre: "Amatista (ejemplo)", categoria: "cuarzo", descripcion: "Texto de ejemplo: el significado lo escribe o aprueba la clienta.", precio: null, foto: null, visible: true, destacado: false, ejemplo: true },
  { id: "cuarzo-oculto", nombre: "Producto oculto", categoria: "cuarzo", descripcion: "No se ve porque visible es false (prueba).", precio: null, foto: null, visible: false, destacado: false, ejemplo: true },
];

// Preguntas frecuentes. Las respuestas en null muestran "A confirmar".
const PREGUNTAS = [
  { pregunta: "¿Cómo pago?", respuesta: null },
  { pregunta: "¿Cómo recibo mi tirada?", respuesta: null },
  { pregunta: "¿Hacen envíos?", respuesta: null },
  { pregunta: "¿Puedo retirar en persona?", respuesta: null },
];
