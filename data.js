// =====================================================================
// DATOS DEL SITIO DE MELISA TAROT. Único archivo a editar para cambiar
// textos, precios y productos.
//
// Fuente: catálogo PDF "Melisa Tarot · Cristales, aromas y rituales"
// (TIENDA/ en la compu de Julieta, leído el 11/11/2026).
// - Se corrigieron erratas evidentes del PDF (ej. "elevae" → "eleva").
// - El texto repetido de cada línea (10 ml, aceites aptos para cosmética
//   natural, a base de alcohol) se muestra una sola vez en el encabezado
//   de la línea, no en cada producto.
// - Lo que está en null muestra un recuadro "A confirmar".
// =====================================================================

const SITIO = {
  marca: "Melisa Tarot",
  lema: "Cristales, aromas y rituales",
  bajada: "Cristales, aromas y rituales hechos a mano, con intención.",
  whatsapp: "5493704377078",        // +54 9 370 437-7078 (del PDF)
  telefonoVisible: "370 437-7078",
  instagram: "melisatarot.777",
  email: "melisatarot.fsa@gmail.com",
  ciudad: null,                     // el PDF no lo dice (¿Formosa?) — A CONFIRMAR
  mostrarPrecios: true,
  mostrarTiradas: false,            // el PDF no trae tiradas; activar cuando Melisa las mande
  aviso: "Los productos y los aromas pueden variar según la disponibilidad. Consultá antes de pedir.",
};

// fondo: color pastel de cada colección en el PDF
const CATEGORIAS = [
  { id: "roll-on", nombre: "Roll On", fondo: "#fff0b9" },
  { id: "spray", nombre: "Sprays", fondo: "#e6dbfa" },
  { id: "bruma", nombre: "Brumas", fondo: "#ffe2cf" },
  { id: "sales", nombre: "Sales de baño", fondo: "#d8e5fc" },
  { id: "aceite", nombre: "Aceites", fondo: "#fff0bf" },
  { id: "vela", nombre: "Velas", fondo: "#ffd6e0" },
  { id: "biosahumerio", nombre: "Biosahumerios", fondo: "#e0eec6" },
  { id: "combo", nombre: "Regalos y combos", fondo: "#fbd9ea" },
  // Faltan en el PDF (páginas 19 a 24): Difusores colgantes y esferas, Refills, Aromas — A CONFIRMAR
];

// Líneas: texto común que se muestra arriba de cada grupo de productos.
const LINEAS = {
  "crystal": { nombre: "Roll On Crystal", texto: "Protector áurico de 10 ml con cristales. Aceites aptos para cosmética natural, a base de alcohol." },
  "herba": { nombre: "Roll On Herba-Crystal", texto: "Cristales y flores o hierbas. Protector áurico de 10 ml, aceites aptos para cosmética natural, a base de alcohol." },
  "sinergia": { nombre: "Roll On Aceites Esenciales", texto: "Sinergias de aceites esenciales para tus rituales de todos los días." },
  "cristalino": { nombre: "Spray cristalino", texto: "Aromatizantes energéticos de 125 ml con glicerina vegetal y aceites de cosmética natural." },
  "aurico": { nombre: "Spray áurico · Body & Textil", texto: "125 ml. Apto cosmética natural: para usar sobre la piel, la ropa, sábanas o almohadones." },
  "bruma": { nombre: "Brumas florales y herbales", texto: "250 ml. Aptas cosmética natural: cuerpo, textiles y espacios. Cada una con sus ingredientes vibracionales." },
  "sales": { nombre: "Sales de baño rituales", texto: "Para soltar, relajar y renovar. 200 cc con aceites esenciales: sal gruesa, sal del Himalaya, bicarbonato y sal Epsom." },
};

// Mini guía del final del PDF: "¿Qué necesitás?"
const INTENCIONES = [
  { id: "calma", texto: "Necesito calma", cristal: "Amatista" },
  { id: "amor", texto: "Quiero quererme más", cristal: "Cuarzo Rosa" },
  { id: "proteccion", texto: "Quiero sentirme protegida", cristal: "Obsidiana" },
  { id: "energia", texto: "Quiero energía y abundancia", cristal: "Citrino" },
];

const F = (n) => `assets/fotos/productos/${n}.webp`;

const PRODUCTOS = [
  // ---------- ROLL ON CRYSTAL · $6.000 ----------
  { id: "roll-on-7-chakras", nombre: "Roll On 7 Chakras", categoria: "roll-on", linea: "crystal", precio: 6000, ml: "10 ml", aroma: "Sándalo Hindú", masVendido: true, foto: F("roll-on-7-chakras"),
    descripcion: "Roll-on con esencias para elevar tu campo energético y mantenerlo alineado.",
    ideal: "Para quien quiere sentirse en equilibrio de la cabeza a los pies." },
  { id: "roll-on-amatista", nombre: "Roll On Amatista", categoria: "roll-on", linea: "crystal", precio: 6000, ml: "10 ml", aroma: "Lavanda", masVendido: true, intencion: "calma", foto: F("roll-on-amatista"),
    descripcion: "Protector áurico. Roll-on con esencias para mantener tu aura fuerte y vibrando bien alto.",
    ideal: "Para los días de estrés: bajar un cambio y descansar la mente." },
  { id: "roll-on-citrino", nombre: "Roll On Citrino", categoria: "roll-on", linea: "crystal", precio: 6000, ml: "10 ml", aroma: "Caramelo", intencion: "energia", foto: F("roll-on-citrino"),
    descripcion: "Protector áurico. Roll-on que eleva la energía, el entusiasmo y atrae abundancia.",
    ideal: "Para arrancar el día con alegría y ganas de empezar algo nuevo." },
  { id: "roll-on-cuarzo-cristal", nombre: "Roll On Cuarzo Cristal", categoria: "roll-on", linea: "crystal", precio: 6000, ml: "10 ml", aroma: "7 Poderes", masVendido: true, foto: F("roll-on-cuarzo-cristal"),
    descripcion: "Protector áurico. Cristal de amplificación y claridad energética.",
    ideal: "Para quien busca claridad y enfoque para tomar decisiones." },
  { id: "roll-on-cuarzo-rosa", nombre: "Roll On Cuarzo Rosa", categoria: "roll-on", linea: "crystal", precio: 6000, ml: "10 ml", aroma: "Wanama", masVendido: true, intencion: "amor", foto: F("roll-on-cuarzo-rosa"),
    descripcion: "Protector áurico. Roll-on para armonizar tu campo con amor propio y suavidad. Trabaja el chakra corazón, sanando emociones y atrayendo relaciones sanas.",
    ideal: "Para quien quiere tratarse con más cariño, o regalar amor." },
  { id: "roll-on-cuarzo-verde", nombre: "Roll On Cuarzo Verde", categoria: "roll-on", linea: "crystal", precio: 6000, ml: "10 ml", aroma: "Tilo", foto: F("roll-on-cuarzo-verde"),
    descripcion: "Protector áurico. Roll-on con esencias para mantener tu aura fuerte y vibrando bien alto.",
    ideal: "Para una etapa de cambios, para acompañarla con calma y armonía." },
  { id: "roll-on-jaspe-rojo", nombre: "Roll On Jaspe Rojo", categoria: "roll-on", linea: "crystal", precio: 6000, ml: "10 ml", aroma: "Miel Ámbar", foto: F("roll-on-jaspe-rojo"),
    descripcion: "Protector áurico. Roll-on para enraizarte y aumentar tu vitalidad. Conectado al chakra raíz, te aporta seguridad, pasión y fuerza para avanzar.",
    ideal: "Para los días en que hace falta fuerza y ánimo para seguir." },
  { id: "roll-on-obsidiana", nombre: "Roll On Obsidiana", categoria: "roll-on", linea: "crystal", precio: 6000, ml: "10 ml", aroma: "Romero", masVendido: true, intencion: "proteccion", foto: F("roll-on-obsidiana"),
    descripcion: "Protector áurico. Roll-on energético para sostener tu campo y blindarlo frente a lo externo.",
    ideal: "Para después de un día pesado o de lugares con mucha gente." },
  { id: "roll-on-ojo-de-tigre", nombre: "Roll On Ojo de Tigre", categoria: "roll-on", linea: "crystal", precio: 6000, ml: "10 ml", aroma: "Almendras Dulces", foto: F("roll-on-ojo-de-tigre"),
    descripcion: "Protector áurico. Roll-on para fortalecer tu voluntad y protegerte en lo material. Conectado al plexo solar, brinda coraje y autoconfianza.",
    ideal: "Para ganar seguridad en una charla o antes de un examen." },

  // ---------- ROLL ON HERBA-CRYSTAL · $6.000 ----------
  { id: "roll-on-amatista-lavanda", nombre: "Roll On Amatista & Lavanda en flor", categoria: "roll-on", linea: "herba", precio: 6000, ml: "10 ml", aroma: "Lavanda", intencion: "calma", foto: F("roll-on-amatista-lavanda-en-flor"),
    descripcion: "Protector áurico. Roll-on con esencias para mantener tu aura fuerte y vibrando bien alto.",
    ideal: "Para una noche de descanso." },
  { id: "roll-on-citrino-jazmin", nombre: "Roll On Citrino & Jazmín", categoria: "roll-on", linea: "herba", precio: 6000, ml: "10 ml", aroma: "Caramelo", intencion: "energia", foto: F("roll-on-citrino-jazmin"),
    descripcion: "Protector áurico. Roll-on que eleva la energía, el entusiasmo y atrae abundancia.",
    ideal: "Para sentirse luminosa y llevar buen ánimo a lo cotidiano." },
  { id: "roll-on-cuarzo-cristal-rosa-mosqueta", nombre: "Roll On Cuarzo Cristal & Rosa Mosqueta", categoria: "roll-on", linea: "herba", precio: 6000, ml: "10 ml", aroma: "7 Poderes", foto: F("roll-on-cuarzo-cristal-rosa-mosqueta"),
    descripcion: "Protector áurico. El cuarzo cristal, maestro sanador que amplifica cualquier intención, se une a la rosa mosqueta, flor de regeneración y belleza regida por Venus: amor propio, ternura y renovación.",
    ideal: "Para renovarse: quien quiere cuidarse y empezar de nuevo." },
  { id: "roll-on-cuarzo-rosa-petalos", nombre: "Roll On Cuarzo Rosa & Pétalos de Rosas", categoria: "roll-on", linea: "herba", precio: 6000, ml: "10 ml", aroma: "Wanama", intencion: "amor", foto: F("roll-on-cuarzo-rosa-petalos-de-rosas"),
    descripcion: "Protector áurico. Roll-on para armonizar tu campo con amor propio y suavidad. Trabaja el chakra corazón, sanando emociones y atrayendo relaciones sanas.",
    ideal: "Para regalar amor propio a quien siempre da y se olvida de sí." },
  { id: "roll-on-cuarzo-verde-artemisa", nombre: "Roll On Cuarzo Verde & Artemisa", categoria: "roll-on", linea: "herba", precio: 6000, ml: "10 ml", aroma: "Tilo", foto: F("roll-on-cuarzo-verde-artemisa"),
    descripcion: "Protector áurico. Roll-on con esencias para mantener tu aura fuerte y vibrando bien alto.",
    ideal: "Para quien busca conectar con la naturaleza." },
  { id: "roll-on-jaspe-rojo-hibiscus", nombre: "Roll On Jaspe Rojo & Hibiscus", categoria: "roll-on", linea: "herba", precio: 6000, ml: "10 ml", aroma: "Miel Ámbar", foto: F("roll-on-jaspe-rojo-hibiscus"),
    descripcion: "Protector áurico. Roll-on para enraizarte y aumentar tu vitalidad. Conectado al chakra raíz, te aporta seguridad, pasión y fuerza para avanzar.",
    ideal: "Para darle un toque de pasión y energía a la rutina." },
  { id: "roll-on-obsidiana-clavo", nombre: "Roll On Obsidiana & Clavo de Olor", categoria: "roll-on", linea: "herba", precio: 6000, ml: "10 ml", aroma: "Romero", intencion: "proteccion", foto: F("roll-on-obsidiana-clavo-de-olor"),
    descripcion: "Protector áurico. Roll-on energético para sostener tu campo y blindarlo frente a lo externo.",
    ideal: "Para poner límites y sentirse protegida en un lugar con mucha gente." },
  { id: "roll-on-ojo-de-tigre-naranja", nombre: "Roll On Ojo de Tigre & Naranja", categoria: "roll-on", linea: "herba", precio: 6000, ml: "10 ml", aroma: "Almendras Dulces", foto: F("roll-on-ojo-de-tigre-naranja"),
    descripcion: "Protector áurico. Roll-on para fortalecer tu voluntad y protegerte en lo material. Conectado al plexo solar, brinda coraje y autoconfianza.",
    ideal: "Para quien necesita confianza y alegría para animarse más." },

  // ---------- ROLL ON ACEITES ESENCIALES · $10.000 ----------
  // Fotos del PDF no publicadas: parecen de banco de imágenes o IA. A CONFIRMAR origen y derechos.
  { id: "roll-on-aurora", nombre: "Roll On Aurora", categoria: "roll-on", linea: "sinergia", precio: 10000, ml: "10 ml", aroma: "Neroli · Naranja · Geranio", detalle: "Tapa rosa", foto: null,
    beneficios: ["Amor propio", "Alegría", "Apertura emocional"],
    descripcion: "Una caricia para el corazón. Aurora es una sinergia creada para elevar el ánimo, reconectar con la alegría y suavizar procesos emocionales.",
    ideal: "Para subir el ánimo y quererse un poco más." },
  { id: "roll-on-guardiana", nombre: "Roll On Guardiana", categoria: "roll-on", linea: "sinergia", precio: 10000, ml: "10 ml", aroma: "Tea Tree · Eucalipto · Limón", detalle: "Tapa azul", intencion: "proteccion", foto: null,
    beneficios: ["Protección energética", "Claridad mental", "Límites"],
    descripcion: "Un escudo sutil que te acompaña en el día a día. Guardiana es una sinergia pensada para limpiar tu campo energético, protegerte de cargas externas y devolverte al centro.",
    ideal: "Para limpiar energías después de un día intenso y poner límites." },
  { id: "roll-on-santuario", nombre: "Roll On Santuario", categoria: "roll-on", linea: "sinergia", precio: 10000, ml: "10 ml", aroma: "Lavanda Mont Blanc · Incienso de olíbano", detalle: "Tapa violeta", intencion: "calma", foto: null,
    beneficios: ["Descanso profundo", "Calma mental", "Conexión interior"],
    descripcion: "Un refugio en forma de aroma. Santuario es una sinergia diseñada para aquietar la mente, relajar el cuerpo y acompañarte hacia un descanso real y profundo.",
    ideal: "Para antes de dormir o cuando la mente no para." },

  // ---------- SPRAY CRISTALINO · $14.000 ----------
  { id: "spray-amatista", nombre: "Spray Cristalino Amatista", alias: "Calma", categoria: "spray", linea: "cristalino", precio: 14000, ml: "125 ml", aroma: "Lavanda", chakra: "Corona", intencion: "calma", foto: F("spray-cristalino-amatista"),
    beneficios: ["Conexión espiritual", "Calma y descanso", "Claridad mental"],
    descripcion: "La amatista es la piedra de la espiritualidad y la transformación interior. Facilita la meditación profunda, el descanso reparador y el equilibrio emocional. Aroma lavanda: relajante y herbal, ideal para momentos de calma." },
  { id: "spray-citrino", nombre: "Spray Cristalino Citrino", alias: "Energía", categoria: "spray", linea: "cristalino", precio: 14000, ml: "125 ml", aroma: "Caramelo", chakra: "Plexo solar", intencion: "energia", foto: F("spray-cristalino-citrino"),
    beneficios: ["Prosperidad", "Vitalidad", "Creatividad"],
    descripcion: "El citrino es la piedra de la abundancia y la manifestación, con una vibrante energía dorada que atrae prosperidad, vitalidad y éxito. Aroma a caramelo, dulce, acogedor y estimulante." },
  { id: "spray-7-chakras", nombre: "Spray Cristalino 7 Chakras", alias: "Alineación", categoria: "spray", linea: "cristalino", precio: 14000, ml: "125 ml", aroma: "Sándalo Hindú", chakra: "Los 7 chakras", foto: F("spray-cristalino-7-chakras"),
    beneficios: ["Equilibrio total", "Conexión integral", "Energía completa"],
    descripcion: "Combina 7 cristales naturales, uno por cada chakra principal, para un equilibrio completo de tu cuerpo energético. Aroma de sándalo hindú, profundo, cálido y sagrado, que facilita la meditación." },
  { id: "spray-obsidiana", nombre: "Spray Cristalino Obsidiana", alias: "Protección", categoria: "spray", linea: "cristalino", precio: 14000, ml: "125 ml", aroma: "Romero", chakra: "Raíz", masVendido: true, intencion: "proteccion", foto: F("spray-cristalino-obsidiana"),
    beneficios: ["Protección energética", "Claridad mental", "Conexión con la Tierra"],
    descripcion: "La obsidiana es la piedra de la protección y la purificación energética: un potente escudo contra las negatividades que fortalece tu conexión con la tierra. Aroma de romero, herbal e intenso, que aporta claridad mental." },
  { id: "spray-cuarzo-rosa", nombre: "Spray Cristalino Cuarzo Rosa", alias: "Amor", categoria: "spray", linea: "cristalino", precio: 14000, ml: "125 ml", aroma: "Sandía", chakra: "Corazón", intencion: "amor", foto: F("spray-cristalino-cuarzo-rosa"),
    beneficios: ["Relaciones armoniosas", "Autoaceptación profunda", "Calma emocional"],
    descripcion: "El cuarzo rosa es la piedra del amor incondicional y la sanación emocional. Promueve la paz interior, la autoaceptación y la armonía. Aroma fresco y jugoso de sandía, dulce y alegre." },

  // ---------- SPRAY ÁURICO · $14.000 ---------- (nombres exactos A CONFIRMAR: "Escudo" aparece en dos lugares)
  { id: "spray-azul-filo", nombre: "Spray Áurico Azul Filo", categoria: "spray", linea: "aurico", precio: 14000, ml: "125 ml", aroma: "Eucalipto & Romero", foto: F("spray-aurico-azul-filo"),
    descripcion: "Con eucalipto y romero, que abren la respiración y limpian la mente. Su vibra calma pensamientos, aporta presencia y claridad." },
  { id: "spray-rosa-dulce", nombre: "Spray Áurico Rosa Dulce", categoria: "spray", linea: "aurico", precio: 14000, ml: "125 ml", aroma: "Nardo y Flores", masVendido: true, foto: F("spray-aurico-rosa-dulce"),
    descripcion: "Con una combinación floral que envuelve tu campo con amor propio y protección sutil. Ideal para fortalecer el corazón en días sensibles o recargar el ánimo." },
  { id: "spray-verde-despertar", nombre: "Spray Áurico Verde Despertar", categoria: "spray", linea: "aurico", precio: 14000, ml: "125 ml", aroma: "Tilo & Lima", foto: F("spray-aurico-verde-despertar"),
    descripcion: "Con notas frescas de tilo y lima. Su vibra revitaliza tu campo energético, limpia lo denso y trae foco a tu día." },
  { id: "spray-violeta-llama", nombre: "Spray Áurico Violeta Llama", categoria: "spray", linea: "aurico", precio: 14000, ml: "125 ml", aroma: "Lavanda & Coco", masVendido: true, foto: F("spray-aurico-violeta-llama"),
    descripcion: "Con lavanda y coco, aromas que abrazan y elevan. Perfecto para transmutar energías densas, cerrar el día o abrir rituales espirituales." },

  // ---------- BRUMAS · $24.000 ----------
  { id: "bruma-pasion", nombre: "Bruma Floral Pasión", alias: "Rosas", categoria: "bruma", linea: "bruma", precio: 24000, ml: "250 ml", aroma: "Pitanga y Fresias", foto: F("bruma-floral-pasion"),
    descripcion: "Rosas: despierta la vibración del amor incondicional y la belleza interior. Hibiscus: enciende el deseo creativo, la vitalidad y la expresión sensual. Un perfume energético que reaviva la pasión por la vida y el amor." },
  { id: "bruma-azahar", nombre: "Bruma Azahar", alias: "Flor de naranjo", categoria: "bruma", linea: "bruma", precio: 24000, ml: "250 ml", aroma: "Azahar", foto: F("bruma-azahar"),
    descripcion: "Una bruma fresca, floral y luminosa inspirada en la delicada flor del naranjo. Su aroma aporta una agradable sensación de calma, bienestar y armonía, perfecta para perfumar tu cuerpo, sábanas, almohadas, cortinas, ropa y cualquier rincón de tu hogar." },
  { id: "bruma-abundancia", nombre: "Bruma Herbal Abundancia", alias: "Canela", categoria: "bruma", linea: "bruma", precio: 24000, ml: "250 ml", aroma: "Naranja", intencion: "energia", foto: F("bruma-herbal-abundancia"),
    descripcion: "Canela: magnetiza la riqueza y acelera los procesos de manifestación. Naranja: vibra en frecuencia de alegría, apertura y creatividad. Anís estrellado: limpia bloqueos energéticos y potencia la intuición económica." },
  { id: "bruma-lilas", nombre: "Bruma Lilas", alias: "Nostalgia dulce", categoria: "bruma", linea: "bruma", precio: 24000, ml: "250 ml", aroma: "Lilas", foto: F("bruma-lilas"),
    descripcion: "Una fragancia floral, suave y elegante que envuelve cada espacio con el delicado aroma de las lilas. Ideal para crear una atmósfera de tranquilidad, frescura y bienestar en tu día a día." },
  { id: "bruma-laurel", nombre: "Bruma Laurel Suerte", alias: "Laurel", categoria: "bruma", linea: "bruma", precio: 24000, ml: null /* el PDF dice 125 y 250 ml — A CONFIRMAR */, aroma: "Maderas Dulces", foto: F("bruma-laurel-suerte"),
    descripcion: "Bruma energética con laurel natural. Atraé buenas oportunidades, prosperidad y caminos abiertos." },

  // ---------- SALES · $10.000 ----------
  { id: "sales-descanso-real", nombre: "Sales Ritual Descanso Real", categoria: "sales", linea: "sales", precio: 10000, ml: "200 cc", aroma: "Lavanda Mont Blanc con pétalos de rosa", intencion: "calma", foto: F("sales-ritual-descanso-real"),
    descripcion: "Favorece la relajación muscular, ayuda a disminuir el estrés acumulado y promueve una sensación profunda de calma y equilibrio." },
  { id: "sales-energia-solar", nombre: "Sales Ritual Energía Solar", categoria: "sales", linea: "sales", precio: 10000, ml: "200 cc", aroma: "Naranja & Limón con cáscara de naranja", intencion: "energia", foto: F("sales-ritual-energia-solar"),
    descripcion: "Revitaliza el cuerpo, reduce la sensación de fatiga y aporta ligereza. Favorece el buen ánimo, eleva la vitalidad y acompaña procesos de renovación y movimiento." },
  { id: "sales-purga-total", nombre: "Sales Ritual Purga Total", categoria: "sales", linea: "sales", precio: 10000, ml: "200 cc", aroma: "Eucalipto y Romero con alcanfor", intencion: "proteccion", foto: F("sales-ritual-purga-total"),
    descripcion: "Aporta una sensación de frescura y claridad. Ayuda a renovar la energía, despejar la mente y recuperar vitalidad." },

  // ---------- ACEITES ----------
  { id: "aceite-jazmin", nombre: "Aceite Multipropósito Jazmín", categoria: "aceite", precio: 15000, ml: "30 ml", aroma: "Jazmín", foto: F("aceite-multiproposito-jazmin"),
    descripcion: "Un elixir alquímico hecho a mano con materias primas puras y aptas para cosmética natural, pensado para nutrir, proteger y elevar tu energía. Con aceite de almendras dulces, vitamina E al 1%, aceite de fragancia cosmética y pétalos de jazmín. Para consagrar velas o ungir velones rituales.",
    ideal: "Para rituales, ungir velas, cuidar cutículas y la piel seca." },

  // ---------- VELAS ----------
  { id: "velas-alquimicas", nombre: "3 Velas Alquímicas", categoria: "vela", precio: 20000, detalle: "3 unidades del mismo color", masVendido: true, foto: F("velas-alquimicas"),
    descripcion: "Ideales para limpiezas y ritualitos intencionados. Pueden contener resinas, aceites, yuyos, flores secas, semillas, cáscara de huevo molido, anís, clavo de olor, polvos de Sagrada Madre, entre otros.",
    ideal: "Para rituales de intención: elegí el color según lo que quieras trabajar.",
    opciones: { titulo: "Elegí tu color", valores: [
      { nombre: "Blanco", texto: "Purificación. Limpia energías negativas y eleva la conexión espiritual, trayendo paz y claridad." },
      { nombre: "Naranja", texto: "Creatividad. Activa la energía vital y la imaginación, favoreciendo el entusiasmo y el flujo de nuevas ideas." },
      { nombre: "Celeste", texto: "Serenidad. Promueve la calma mental, la comunicación pacífica y la claridad emocional." },
      { nombre: "Violeta", texto: "Transmutación. Transforma energías densas en vibraciones elevadas, ayudando a liberar bloqueos y elevar la conciencia." },
      { nombre: "Azul", texto: "Protección. Simboliza fuerza interior y calma, creando un escudo energético contra influencias negativas." },
      { nombre: "Amarillo", texto: "Confianza. Simboliza el poder personal y la seguridad, iluminando el camino hacia el éxito y la alegría." },
      { nombre: "Verde", texto: "Renovación. Simboliza el crecimiento, la armonía y la conexión con la naturaleza, promoviendo el equilibrio emocional." },
      { nombre: "Rosa coral", texto: "Amor. Representa el amor propio y la conexión emocional con los demás, promoviendo la compasión y la empatía." },
      { nombre: "Lila", texto: "Intuición. Fomenta la calma y la claridad espiritual. Conecta con planos superiores y amplifica la percepción." },
      { nombre: "Negro", texto: "Liberación. Absorbe y disuelve energías estancadas, ayudando a cerrar ciclos y liberar cargas emocionales." },
    ] } },

  // ---------- BIOSAHUMERIOS ----------
  { id: "biosahumerio-cono", nombre: "Biosahumerio en cono", categoria: "biosahumerio", precio: 2000, masVendido: true, foto: F("biosahumerio-cono"),
    beneficios: ["100% orgánico", "100% artesanal", "100% plantas"],
    descripcion: "Para una limpieza energética real. Libre de químicos y aditivos: sin aglutinante, esencia, colorante, nitrato, sulfito ni aceite mineral. Planta recolectada a mano, con amor y respeto, colgada y deshidratada a la sombra durante un tiempo prolongado.",
    ideal: "Para limpiar el ambiente y cerrar el día con calma.",
    opciones: { titulo: "Elegí el aroma", valores: ["Lavanda", "Ajo y Azúcar", "Ruda", "Eucalipto", "Palo Santo Aborigen Hembra", "Palo Santo Aborigen Hembra con Canela de Marruecos", "Palo Santo Peruano", "Romero", "Cedrón"].map((nombre) => ({ nombre })) } },

  // ---------- REGALOS Y COMBOS (sin precio en el PDF — A CONFIRMAR) ----------
  { id: "combo-calma", nombre: "Combo Calma total", categoria: "combo", precio: null, intencion: "calma", foto: F("spray-cristalino-amatista"),
    incluye: ["Roll On Amatista", "Spray Amatista", "Sales Descanso Real"], descripcion: "Para quien necesita bajar un cambio y descansar." },
  { id: "combo-amor", nombre: "Combo Amor propio", categoria: "combo", precio: null, intencion: "amor", foto: F("spray-cristalino-cuarzo-rosa"),
    incluye: ["Roll On Cuarzo Rosa", "Spray Cuarzo Rosa", "Bruma Pasión"], descripcion: "Para regalar a una amiga o a una misma." },
  { id: "combo-proteccion", nombre: "Combo Protección", categoria: "combo", precio: null, intencion: "proteccion", foto: F("spray-cristalino-obsidiana"),
    incluye: ["Roll On Obsidiana", "Spray Obsidiana", "Sales Purga Total"], descripcion: "Para cuidar la energía y sentirse en su centro." },
  { id: "combo-energia", nombre: "Combo Energía y abundancia", categoria: "combo", precio: null, intencion: "energia", foto: F("spray-cristalino-citrino"),
    incluye: ["Roll On Citrino", "Spray Citrino", "Bruma Abundancia"], descripcion: "Para arrancar los días con ganas y buen ánimo." },
  { id: "combo-limpieza", nombre: "Combo Ritual de limpieza", categoria: "combo", precio: null, foto: F("biosahumerio-cono"),
    incluye: ["Biosahumerio", "Spray Áurico Azul", "3 Velas alquímicas"], descripcion: "Para renovar la casa después de una semana pesada." },
  { id: "combo-regalo", nombre: "Combo Para regalar", categoria: "combo", precio: null, foto: F("bruma-lilas"),
    incluye: ["Difusor Esfera", "Bruma Lilas", "Difusor Colgante"], descripcion: "Un detalle lindo para una casa nueva o un cumpleaños." },
];

// Tiradas: el PDF no las trae. Se muestran solo si SITIO.mostrarTiradas = true.
const TIRADAS = [];

const PREGUNTAS = [
  { pregunta: "¿Cómo hago un pedido?", respuesta: "Elegí tu producto y tu aroma o color, sumalo al pedido y tocá «Enviar pedido por WhatsApp». Te confirmo la disponibilidad por ahí." },
  { pregunta: "¿Cómo pago?", respuesta: null },
  { pregunta: "¿Hacen envíos?", respuesta: null },
  { pregunta: "¿Puedo retirar en persona?", respuesta: null },
  { pregunta: "¿Siempre hay todos los aromas?", respuesta: "Los productos y los aromas pueden variar según la disponibilidad. Consultá antes de pedir." },
];
