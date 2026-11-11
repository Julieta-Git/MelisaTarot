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
  ciudad: "Formosa Capital",        // confirmado por Julieta 11/11/2026
  mostrarPrecios: true,
  mostrarTiradas: true,             // tiradas tomadas de su catálogo de WhatsApp Business (11/11/2026)
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
  { id: "mazo", nombre: "Mazos de tarot", fondo: "#e8dccb" },
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

  // ---------- MAZOS DE TAROT (del catálogo de WhatsApp; sin foto todavía) ----------
  { id: "mazo-rider-waite", nombre: "Mazo Rider-Waite", categoria: "mazo", precio: 15000, foto: null,
    descripcion: "Mazo de tarot Rider-Waite." /* el catálogo no trae descripción — A CONFIRMAR */ },
  { id: "mazo-sibilla", nombre: "Sibilla Italiana", categoria: "mazo", precio: 24000, foto: null,
    descripcion: "Mazo de cartas Sibilla Italiana.",
    opciones: { titulo: "Presentación", valores: [
      { nombre: "Sin manual personalizado", texto: "$24.000" },
      { nombre: "Con manual personalizado", texto: "$33.999", precio: 33999 },
    ] } },

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

// =====================================================================
// TIRADAS Y SERVICIOS — del catálogo de WhatsApp Business de Melisa
// (leído el 11/11/2026). Textos y precios tal cual el catálogo.
// Las colecciones marcadas (*) se armaron por afinidad: en el catálogo
// esos ítems figuran solo en "Todos los artículos" — A CONFIRMAR.
// Si la descripción tiene "1) ... 2) ..." se muestra como lista.
// =====================================================================
const COLECCIONES_TIRADAS = [
  { id: "nuevas", nombre: "¡Nuevas!" },
  { id: "romanticas", nombre: "Lecturas románticas" },
  { id: "karmicas", nombre: "Lecturas kármicas" },
  { id: "personales", nombre: "Lecturas personales" },
  { id: "generales", nombre: "Lecturas generales" },
  { id: "resolutivo", nombre: "Tarot resolutivo" },
  { id: "rapidas", nombre: "Lecturas rápidas" },          // (*)
  { id: "preguntas", nombre: "Preguntas libres" },         // (*)
];

const TIRADAS = [
  // ¡Nuevas!
  { id: "cruz-celta", coleccion: "nuevas", nombre: "Cruz Celta", precio: 20000,
    descripcion: "Lectura clásica del Tarot por excelencia. A través de 10 cartas, analizamos la situación que estás viviendo, siguiendo la estructura celta. La lectura más completa para analizar un tema a profundidad." },
  { id: "detector-de-mentiras", coleccion: "nuevas", nombre: "Detector de mentiras", precio: 20000,
    descripcion: "Una lectura diseñada para revelar las historias que te contás a vos mismo: autoengaños, bloqueos mentales ocultos y verdades que estás necesitando escuchar. Se basa en 5 pilares clave: 1) La fantasía. 2) La realidad. 3) El bloqueo oculto. 4) La verdad incómoda. 5) La medicina / solución. Apta para cualquier tema o situación donde necesites cuestionar tus creencias y tu narrativa actual, accediendo a una visión clara y honesta." },
  { id: "sesion-personalizada", coleccion: "nuevas", nombre: "Sesión Personalizada", precio: 50000, detalle: "Videoconsulta · hasta 80 minutos (+extras)", destacada: true,
    descripcion: "Una experiencia individual y exclusiva, diseñada para quienes buscan un encuentro más profundo. A través de la conversación y el tarot, exploraremos tu situación con calma, claridad y el tiempo necesario para responder cada una de tus dudas." },

  // Románticas
  { id: "casi-algo", coleccion: "romanticas", nombre: "Lectura del Casi Algo", precio: 15000,
    descripcion: "A partir de 5 preguntas clave, profundizamos en lo que está sucediendo entre vos y tu “casi algo”: 1) ¿Cuáles son sus verdaderas intenciones conmigo? 2) ¿Qué siente y cómo me ve en realidad? 3) ¿Qué lo/la frena a formalizar conmigo? 4) Pregunta libre. 5) Consejo del tarot." },
  { id: "parejas", coleccion: "romanticas", nombre: "Lectura para parejas", precio: 15000,
    descripcion: "A través de 5 preguntas clave, profundizamos en lo que está sucediendo en tu relación y en la dinámica entre ambos: 1) ¿Qué siente por mí realmente en este momento? 2) ¿Qué piensa de nosotros? 3) ¿Qué intenciones tiene a largo plazo? 4) Pregunta libre. 5) Consejo del tarot para fortalecer el vínculo." },
  { id: "ex-parejas", coleccion: "romanticas", nombre: "Lectura para ex parejas", precio: 15000,
    descripcion: "A través de 5 preguntas clave, exploramos en profundidad el vínculo con tu ex pareja para comprender qué pasó, qué quedó pendiente y qué lugar ocupa hoy: 1) ¿Qué quedó pendiente entre ambos? 2) ¿Es un cierre definitivo o habrá reconciliación? 3) ¿Qué piensa y siente de nosotros actualmente? 4) Pregunta libre. 5) Consejo del Tarot." },
  { id: "pretendiente", coleccion: "romanticas", nombre: "Lectura del Pretendiente", precio: 15000,
    descripcion: "Ideal para explorar la conexión con una persona que te interesa y recién estás conociendo: 1) ¿Qué energía hay entre ustedes? 2) ¿Cómo te percibe esta persona? 3) ¿Cuáles son sus intenciones reales hacia vos? 4) ¿Qué potencial tiene este vínculo? 5) Consejo del Tarot." },
  { id: "solteros", coleccion: "romanticas", nombre: "Lectura para solteros", precio: 15000,
    descripcion: "A través de 5 preguntas clave, exploramos tu presente en el amor: tu energía actual, bloqueos o patrones que pueden estar influyendo, y las oportunidades que se abren para vos en este momento: 1) ¿Cómo me encuentro hoy en el amor? 2) ¿Qué tipo de vínculo estoy atrayendo actualmente? 3) ¿Qué bloqueos o patrones estoy repitiendo? 4) Energía e intenciones de mis pretendientes actuales. 5) Consejo del Tarot." },

  // Kármicas
  { id: "karma-de-pareja", coleccion: "karmicas", nombre: "¿Cuál es mi karma de pareja?", precio: 35000,
    descripcion: "A través de 7 preguntas clave comprenderemos cuál es el karma vincular que venís cargando, por qué y cómo salir de ese ciclo: 1) ¿Qué patrón kármico se repite en mis relaciones? 2) ¿Qué heridas del pasado siguen influyendo en mi vida amorosa? 3) ¿Qué tipo de pareja suelo atraer y por qué? 4) ¿Qué necesito aprender en el amor? 5) ¿Qué debo soltar para romper este ciclo? 6) ¿Qué nueva forma de relacionarme está disponible para mí? 7) Consejo: ¿cómo puedo evolucionar y construir vínculos más sanos?" },
  { id: "karma-personal", coleccion: "karmicas", nombre: "Mi Karma Personal", precio: 25000,
    descripcion: "Una lectura enfocada en 6 preguntas clave, para saber en qué momento kármico estás en tu vida y qué viene a enseñarte: 1) ¿Qué lección kármica estoy transitando actualmente? 2) ¿Qué actitud o patrón necesito transformar? 3) ¿Qué me está enseñando esta experiencia en mi vida? 4) ¿Qué herida del pasado sigo repitiendo? 5) ¿Cómo puedo cerrar este ciclo de manera consciente? 6) Consejo final." },
  { id: "karma-entre-nosotros", coleccion: "karmicas", nombre: "¿Hay un karma entre nosotros?", precio: 15000,
    descripcion: "Lectura para reconocer si un vínculo es kármico: 1) ¿De qué vida o experiencia podría venir esto? 2) ¿Hacia dónde nos llevará este karma? 3) ¿Qué aprendizaje trae esta relación a mi vida? 4) Consejo: ¿cómo sanar o equilibrar este vínculo?" },

  // Personales
  { id: "arbol-familiar", coleccion: "personales", nombre: "Árbol Familiar y Sanación de Linaje", precio: 30000, detalle: "Sesión premium en 3 etapas",
    descripcion: "Las cartas te orientan a comprender tu lugar en la familia, a reconocer qué cargas no te corresponden y liberarte de ellas, abriendo nuevos caminos que conecten con vos." },
  { id: "tarot-evolutivo", coleccion: "personales", nombre: "Tarot Evolutivo", precio: 25000,
    descripcion: "Sesión de autoconocimiento diseñada para ayudarte a tomar decisiones alineadas con tu alma y tus deseos. ¿Qué descubriremos? 1) Tu Umbral: la energía raíz de tu pasado y tu presente. 2) El Desafío: el punto ciego o autosabotaje que te mantiene estancado. 3) La Metamorfosis: una desconexión de expectativas ajenas y propias, para alinearte con tus verdaderos deseos y tu “Yo Futuro”. 4) El Impulso: los primeros pasos para acercarme a quién soy." },
  { id: "reflejo-interior", coleccion: "personales", nombre: "Reflejo interior", precio: 25000,
    descripcion: "Una lectura de autoconocimiento para verte con mayor claridad, distinguiendo entre cómo te percibís, cómo te proyectás y qué partes de vos están siendo malinterpretadas o no valoradas: 1) ¿Cómo me veo a mí misma/o hoy? 2) ¿Cómo creo que me perciben los demás? 3) ¿Qué prejuicio o idea sobre mí estoy sosteniendo y no es real? 4) ¿Qué virtudes no estoy viendo en mí? 5) ¿Qué valor o potencial propio estoy subestimando? 6) ¿Cómo empezar a alinearme conmigo y fortalecer mi identidad?" },

  // Generales
  { id: "general-mensual", coleccion: "generales", nombre: "Lectura general / mensual", precio: 20000,
    descripcion: "Exploración profunda de los distintos ámbitos de tu vida: tu situación actual, tus vínculos (familia, amistades y pareja), los desafíos que estás atravesando y lo que depara el trabajo y las finanzas. Incluye consejo final guía. El objetivo es ayudarte a comprender dónde estás hoy, qué energías te rodean en el mes y cómo transitarlo con mayor claridad y dirección." },
  { id: "energia-actual", coleccion: "generales", nombre: "Lectura de energía actual", precio: 15000,
    descripcion: "Analizamos tu energía y las energías que te rodean en los distintos ámbitos de tu vida: vínculos (familia, amistades y pareja), trabajo, finanzas, desarrollo personal y emocional." },
  { id: "mensaje-canalizado", coleccion: "generales", nombre: "Mensaje canalizado", precio: 10000,
    descripcion: "Canalizamos a través del mazo un mensaje especialmente para vos: lo que el Tarot quiera comunicarte en este momento, con total libertad." },

  // Resolutivo
  { id: "espejo-compatibilidad", coleccion: "resolutivo", nombre: "Espejo de compatibilidad", precio: 15000,
    descripcion: "Lectura en espejo que revela lo que cada persona siente, piensa y vive dentro del vínculo, incluso lo que no se dice. A través de dos filas (una por cada uno), se comparan las energías sobre los mismos ejes para ver si están en la misma sintonía: sentimientos, lealtad, compromiso, compañerismo, percepción del vínculo y posibles verdades ocultas. Aplicable a vínculos amorosos, amistades, compañeros o relaciones cercanas." },
  { id: "consejo-especifico", coleccion: "resolutivo", nombre: "Consejo específico", precio: 8000,
    descripcion: "Una lectura enfocada en un tema puntual que necesites resolver. El Tarot analiza la situación y te orienta sobre cómo abordarla: qué hacer, qué evitar y desde qué lugar actuar. Cierra con un consejo integrador que te guía en tu próximo paso." },
  { id: "que-camino-elegir", coleccion: "resolutivo", nombre: "¿Qué camino elegir?", precio: 15000,
    descripcion: "Una lectura enfocada en ayudarte a decidir entre dos opciones. Analizamos la energía de cada camino, qué podés esperar de cada uno y hacia dónde te conduce, para ver con claridad cuál está más alineada con vos en este momento." },
  { id: "resolucion-problemas", coleccion: "resolutivo", nombre: "Resolución de Problemas", precio: 8000,
    descripcion: "Perfecta para cuando algo no fluye y querés entender el origen, el aprendizaje y cómo resolverlo: 1) La raíz del problema actual. 2) Cómo debés abordarlo. 3) La solución." },

  // Rápidas (*)
  { id: "si-no", coleccion: "rapidas", nombre: "Lectura Sí / No", precio: 3000,
    descripcion: "Lectura extensa que responde a una pregunta puntual con un “sí” o un “no”, acompañado de una explicación y desarrollo." },
  { id: "tarot-flash", coleccion: "rapidas", nombre: "Tarot Flash", precio: 5000,
    descripcion: "Lectura extensa respondiendo una sola pregunta, más un consejo." },

  // Preguntas libres (*)
  ...[[2, 9000], [3, 14000], [4, 18000], [5, 23000], [6, 27000], [7, 32000], [8, 36000], [9, 41000], [10, 45000]].map(([n, precio]) => ({
    id: `preguntas-${n}`, coleccion: "preguntas", nombre: `${n} preguntas`, precio, corta: true,
    descripcion: `Incluye ${n} preguntas libres, con respuestas detalladas, sobre cualquier tema que quieras explorar.` +
      (n === 10 ? " Te permite distribuir y canjear las preguntas a lo largo del mes." : ""),
  })),
];

// Otros servicios del catálogo de WhatsApp
const SERVICIOS = [
  { id: "aprender-tarot", nombre: "Aprender Tarot", precio: 45000, etiqueta: "Curso",
    detalle: "3 meses · 12 clases · Virtual + prácticas presenciales",
    descripcion: "Una formación para aprender a interpretar el Tarot desde cero, combinando teoría y práctica.",
    items: ["1 clase virtual por semana", "Día y horario a elección", "Material y tareas semana a semana", "Clases grabadas para volver a verlas", "Arcanos Mayores y Menores", "Prácticas de lectura", "Encuentros presenciales de práctica"] },
  { id: "eventos", nombre: "Tarot para eventos", precio: null, etiqueta: "Eventos y fiestas",
    detalle: "Agenda abierta todos los meses",
    descripcion: "Sumale una experiencia diferente a tu celebración: ¡tarot para tus invitados! Una propuesta original, divertida y llena de misterio que se adapta a todo tipo de eventos.",
    items: ["Casamientos", "Fiestas privadas", "Despedidas de soltera", "Cumpleaños", "Eventos y celebraciones en general"] },
];

const PREGUNTAS = [
  { pregunta: "¿Cómo hago un pedido?", respuesta: "Elegí tu producto y tu aroma o color, sumalo al pedido y tocá «Enviar pedido por WhatsApp». Te confirmo la disponibilidad por ahí." },
  { pregunta: "¿Cómo reservo una lectura?", respuesta: "Tocá «Reservar» en la lectura que quieras y se abre WhatsApp con el pedido escrito. Ahí coordinamos día y horario." },
  { pregunta: "¿Cómo recibo mi lectura?", respuesta: "Las lecturas se hacen por audio, con fotos de las cartas. La extensión depende de cada lectura y de cuántas preguntas tenga: suele llevar entre 40 minutos y una hora." },
  { pregunta: "¿Cómo son las videollamadas?", respuesta: "Las videollamadas (como la Sesión Personalizada) se coordinan por WhatsApp." },
  { pregunta: "¿Cómo pago?", respuesta: "Por transferencia al alias Melisatarot.mp, a nombre de Ximena Melisa Perez, o por Rapipago. Por favor, recordá mandar tu comprobante. 🤍" },
  { pregunta: "¿Hacen envíos?", respuesta: null },
  { pregunta: "¿Puedo retirar en persona?", respuesta: null },
  { pregunta: "¿Siempre hay todos los aromas?", respuesta: "Los productos y los aromas pueden variar según la disponibilidad. Consultá antes de pedir." },
];
