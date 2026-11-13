const PENDIENTE = (t = "A confirmar") => `<span class="pendiente">${t}</span>`;
const pesos = (n) => "$" + n.toLocaleString("es-AR");
const precioTexto = (p) => !SITIO.mostrarPrecios ? "Consultar" : p == null ? "Precio a consultar" : pesos(p);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const categoria = (id) => CATEGORIAS.find((c) => c.id === id) || { id, nombre: id };
const coleccion = (id) => COLECCIONES_TIRADAS.find((c) => c.id === id) || { id, nombre: "" };
const reducirMovimiento = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// Dibuja una sección sin que un error en data.js rompa las demás.
function seguro(nombre, fn) {
  try { fn(); } catch (err) { console.error(`[Melisa Tarot] No se pudo mostrar "${nombre}". Revisá data.js.`, err); }
}

// ---------- Revisión de data.js ----------
// Avisa en la consola qué dato está mal y corrige lo que se puede (sin cambiar el contenido).
function validarDatos() {
  const avisar = (msg) => console.warn(`[Melisa Tarot · data.js] ${msg}`);
  PRODUCTOS.forEach((p) => {
    if (!CATEGORIAS.some((c) => c.id === p.categoria)) avisar(`El producto "${p.id}" tiene categoria "${p.categoria}", que no existe en CATEGORIAS.`);
    if (p.opciones) {
      if (!Array.isArray(p.opciones.valores) || !p.opciones.valores.length) {
        avisar(`El producto "${p.id}" tiene opciones sin valores; se ignoran.`);
        delete p.opciones;
      } else {
        p.opciones.valores = p.opciones.valores.map((v) => (typeof v === "string" ? { nombre: v } : v));
        p.opciones.titulo = p.opciones.titulo || "Elegí una opción";
      }
    }
  });
  TIRADAS.forEach((t) => {
    if (!COLECCIONES_TIRADAS.some((c) => c.id === t.coleccion)) avisar(`La tirada "${t.id}" tiene coleccion "${t.coleccion}", que no existe en COLECCIONES_TIRADAS.`);
  });
  if (typeof SOBRE_MI !== "undefined" && SOBRE_MI.texto && !Array.isArray(SOBRE_MI.texto)) SOBRE_MI.texto = [String(SOBRE_MI.texto)];
}
seguro("revisión de datos", validarDatos);

const productosVisibles = PRODUCTOS.filter((p) => p.visible !== false);

function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("visible");
  clearTimeout(toast.id);
  toast.id = setTimeout(() => t.classList.remove("visible"), 2600);
}

const linkWhatsApp = (texto) => `https://wa.me/${SITIO.whatsapp}?text=${encodeURIComponent(texto)}`;
// En el navegador interno de Instagram/Facebook abrir otra pestaña falla seguido:
// ahí se navega en la misma pestaña (el pedido queda guardado para cuando vuelva).
const navegadorInterno = /Instagram|FBAN|FBAV|FB_IAB/i.test(navigator.userAgent);

function abrirWhatsApp(texto) {
  if (!SITIO.whatsapp) { toast("Falta cargar el número de WhatsApp"); return null; }
  const url = linkWhatsApp(texto);
  if (navegadorInterno) { location.href = url; return url; }
  window.open(url, "_blank", "noopener");
  return url;
}

// ---------- Pedido guardado en este navegador ----------
const CLAVE_PEDIDO = "melisa-tarot-pedido";
function guardarPedido() {
  try { localStorage.setItem(CLAVE_PEDIDO, JSON.stringify(pedido)); } catch (e) { /* sin almacenamiento: el pedido vive mientras la página esté abierta */ }
}
function recuperarPedido() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_PEDIDO) || "{}");
    Object.entries(guardado).forEach(([clave, cant]) => {
      const [id, opcion] = clave.split("|");
      const p = PRODUCTOS.find((x) => x.id === id && x.visible !== false);
      const opcionOk = !opcion || (p && p.opciones && p.opciones.valores.some((v) => v.nombre === opcion));
      if (p && opcionOk && Number.isInteger(cant) && cant > 0) pedido[clave] = cant;
    });
  } catch (e) { /* ignorar un pedido guardado que no se pueda leer */ }
}

// ---------- Contacto y pie ----------
seguro("pie", () => {
  document.getElementById("pie-contacto").innerHTML = [
    `<a href="https://wa.me/${esc(SITIO.whatsapp)}" target="_blank" rel="noopener">WhatsApp ${esc(SITIO.telefonoVisible)}</a>`,
    `<a href="https://instagram.com/${esc(SITIO.instagram)}" target="_blank" rel="noopener">@${esc(SITIO.instagram)}</a>`,
    `<a href="mailto:${esc(SITIO.email)}">${esc(SITIO.email)}</a>`,
    SITIO.ciudad ? esc(SITIO.ciudad) : PENDIENTE("Ciudad a confirmar"),
  ].map((x) => `<span>${x}</span>`).join("");
  document.getElementById("aviso-stock").textContent = SITIO.aviso || "";
  document.getElementById("anio").textContent = new Date().getFullYear();
});

// ---------- Tiradas ----------
let filtroTiradas = TIRADAS.some((t) => t.top) ? "top" : "todas";
// "1) texto 2) texto" -> intro + lista
function textoConLista(t) {
  t = String(t || "");
  const partes = t.split(/\s(?=\d{1,2}\)\s)/);
  if (partes.length < 3) return `<p>${esc(t)}</p>`;
  const [intro, ...items] = partes;
  const ultimo = items[items.length - 1];
  const m = ultimo.match(/^(.*?[.?])\s+([A-ZÁÉÍÓÚ¿].{20,})$/); // texto suelto después del último ítem
  if (m) items[items.length - 1] = m[1];
  return `<p>${esc(intro)}</p><details><summary>Ver qué incluye (${items.length})</summary><ol>${items.map((i) => `<li>${esc(i.replace(/^\d{1,2}\)\s/, ""))}</li>`).join("")}</ol></details>${m ? `<p>${esc(m[2])}</p>` : ""}`;
}

function renderTiradas() {
  const cols = COLECCIONES_TIRADAS.filter((c) => TIRADAS.some((t) => t.coleccion === c.id));
  const hayTop = TIRADAS.some((t) => t.top && t.visible !== false);
  document.getElementById("filtros-tiradas").innerHTML = [...(hayTop ? [{ id: "top", nombre: "★ Más pedidas" }] : []), { id: "todas", nombre: "Todas" }, ...cols]
    .map((c) => `<button type="button" data-filtro-tirada="${esc(c.id)}" aria-pressed="${filtroTiradas === c.id}">${esc(c.nombre)}</button>`).join("");
  const lista = TIRADAS.filter((t) => t.visible !== false && (filtroTiradas === "todas" || (filtroTiradas === "top" ? t.top : t.coleccion === filtroTiradas)));
  const largas = lista.filter((t) => !t.corta);
  const cortas = lista.filter((t) => t.corta);
  document.getElementById("grilla-tiradas").innerHTML =
    largas.map((t) => `
      <article class="tirada${t.destacada ? " destacada" : ""}" id="tirada-${esc(t.id)}">
        <p class="tirada-col">${esc(coleccion(t.coleccion).nombre)}${t.top ? ' <span class="tirada-top">★ Más pedida</span>' : ""}</p>
        <h3>${esc(t.nombre)}</h3>
        ${t.detalle ? `<p class="tirada-detalle">${esc(t.detalle)}</p>` : ""}
        <div class="tirada-texto recortado">${textoConLista(t.descripcion)}</div>
        <button type="button" class="leer-mas" data-leer-mas aria-expanded="false" hidden>Leer más</button>
        <div class="tirada-pie">
          <p class="precio">${precioTexto(t.precio)}</p>
          <button type="button" class="btn btn-reservar" data-tirada="${esc(t.id)}" aria-label="Reservar ${esc(t.nombre)} por WhatsApp">Reservar</button>
        </div>
      </article>`).join("") +
    (cortas.length ? `
      <article class="tirada tirada-tabla">
        <p class="tirada-col">Preguntas libres</p>
        <h3>Elegí cuántas preguntas</h3>
        <p class="tirada-texto">Preguntas libres, con respuestas detalladas, sobre cualquier tema que quieras explorar. Con 10 preguntas podés distribuirlas a lo largo del mes.</p>
        <ul class="tabla-preguntas">${cortas.map((t) => `
          <li><span>${esc(t.nombre)}</span><strong>${precioTexto(t.precio)}</strong>
          <button type="button" class="btn-mini" data-tirada="${esc(t.id)}" aria-label="Reservar ${esc(t.nombre)} por WhatsApp">Reservar</button></li>`).join("")}
        </ul>
      </article>` : "");
}

// Muestra "Leer más" solo en las tiradas cuyo texto quedó recortado
function marcarRecortes() {
  document.querySelectorAll("#grilla-tiradas .tirada-texto.recortado").forEach((el) => {
    const boton = el.nextElementSibling;
    const parrafo = el.querySelector("p");
    if (boton && parrafo && boton.matches("[data-leer-mas]")) boton.hidden = parrafo.scrollHeight <= parrafo.clientHeight + 4;
  });
}

function renderServicios() {
  document.getElementById("grilla-servicios").innerHTML = SERVICIOS.map((s) => `
    <article class="servicio" id="servicio-${esc(s.id)}">
      <p class="etiqueta">${esc(s.etiqueta)}</p>
      <h3>${esc(s.nombre)}</h3>
      <p class="tirada-detalle">${esc(s.detalle)}</p>
      <p>${esc(s.descripcion)}</p>
      <ul class="servicio-items">${(s.items || []).map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
      <div class="tirada-pie">
        <p class="precio">${s.precio == null ? "Consultá tu propuesta" : precioTexto(s.precio)}</p>
        <button type="button" class="btn" data-servicio="${esc(s.id)}">${s.precio == null ? "Consultar" : "Quiero anotarme"}</button>
      </div>
    </article>`).join("");
}

if (!SITIO.mostrarTiradas || !TIRADAS.length) {
  document.querySelectorAll("[data-tiradas]").forEach((el) => el.remove());
} else {
  seguro("tiradas", () => { renderTiradas(); requestAnimationFrame(marcarRecortes); });
  addEventListener("resize", () => { clearTimeout(marcarRecortes.t); marcarRecortes.t = setTimeout(marcarRecortes, 200); });
  seguro("curso y eventos", renderServicios);
}

// ---------- Intenciones ----------
seguro("mini guía", () => {
  document.getElementById("intenciones").innerHTML = INTENCIONES.map((i, n) => `
    <button type="button" class="intencion" data-intencion="${esc(i.id)}">
      <span class="intencion-num">${n + 1}</span>
      <span>${esc(i.texto)}</span>
      <strong>${esc(i.cristal)}</strong>
    </button>`).join("");
});

// ---------- Tienda ----------
const pedido = {};   // clave "id" o "id|opción" -> cantidad
const elegidas = {}; // id de producto -> opción elegida en su tarjeta
let filtro = { tipo: "categoria", valor: "todos" };

function renderFiltros() {
  const usadas = CATEGORIAS.filter((c) => productosVisibles.some((p) => p.categoria === c.id));
  document.getElementById("filtros").innerHTML = [{ id: "todos", nombre: "Todo" }, ...usadas]
    .map((c) => `<button type="button" data-filtro="${esc(c.id)}" aria-pressed="${filtro.tipo === "categoria" && filtro.valor === c.id}">${esc(c.nombre)}</button>`)
    .join("");
}

function opcionElegida(p) {
  if (!p.opciones) return null;
  return p.opciones.valores.find((v) => v.nombre === elegidas[p.id]) || p.opciones.valores[0];
}

// En pantallas anchas la descripción se ve abierta; en el celu queda en "Ver más".
const tarjetasAbiertas = () => matchMedia("(min-width: 700px)").matches;
const RITUALES = ["vela", "aceite", "biosahumerio"];

function tarjeta(p) {
  const chips = [p.aroma && `Aroma ${p.aroma}`, p.ml, p.chakra && `Chakra ${p.chakra}`, p.detalle].filter(Boolean);
  const op = opcionElegida(p);
  const foto = (op && op.foto) || p.foto;
  const precio = op && op.precio != null ? op.precio : p.precio;
  return `
  <article class="producto" id="producto-${esc(p.id)}">
    <div class="producto-foto">
      ${foto
        ? `<img src="${esc(foto)}" alt="${esc(p.nombre + (op && op.foto ? ` (${op.nombre})` : ""))}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'sin-foto',textContent:'Foto próximamente'}))">`
        : `<span class="sin-foto">Foto próximamente</span>`}
      ${p.masVendido ? '<span class="badge">★ Más vendido</span>' : ""}
    </div>
    <div class="producto-info">
      <h4>${esc(p.nombre)}${p.alias ? ` <small>o ${esc(p.alias)}</small>` : ""}</h4>
      ${chips.length ? `<ul class="chips">${chips.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>` : ""}
      ${p.ml === null ? `<p>${PENDIENTE("Tamaño a confirmar")}</p>` : ""}
      ${p.incluye ? `<p class="incluye"><strong>Incluye:</strong> ${p.incluye.map(esc).join(" + ")}</p>` : ""}
      <details class="producto-mas"${tarjetasAbiertas() ? " open" : ""}>
        <summary>Ver más</summary>
        <p class="descripcion">${esc(p.descripcion)}</p>
        ${p.beneficios ? `<p class="beneficios">${p.beneficios.map(esc).join(" · ")}</p>` : ""}
        ${p.ideal ? `<p class="ideal">${esc(p.ideal)}</p>` : ""}
      </details>
      ${p.opciones ? `
        <label class="opcion">${esc(p.opciones.titulo)}
          <select data-opcion="${esc(p.id)}">
            ${p.opciones.valores.map((v) => `<option value="${esc(v.nombre)}"${v === op ? " selected" : ""}>${esc(v.nombre)}</option>`).join("")}
          </select>
        </label>
        ${p.opciones.valores.some((v) => v.texto) ? `<p class="opcion-texto" data-opcion-texto="${esc(p.id)}">${esc(op.texto || "")}</p>` : ""}` : ""}
      <div class="producto-pie">
        <p class="precio">${precioTexto(precio)}</p>
        <button type="button" class="btn btn-agregar" data-agregar="${esc(p.id)}" aria-label="Sumar ${esc(p.nombre)} al pedido">Sumar al pedido</button>
      </div>
    </div>
  </article>`;
}

function renderProductos() {
  let lista = productosVisibles;
  if (filtro.tipo === "categoria" && filtro.valor !== "todos") lista = lista.filter((p) => p.categoria === filtro.valor);
  if (filtro.tipo === "intencion") lista = lista.filter((p) => p.intencion === filtro.valor);

  // Agrupar por línea para mostrar el texto común arriba de cada grupo
  let html = "";
  const grupos = [];
  lista.forEach((p) => {
    const todos = filtro.tipo === "categoria" && filtro.valor === "todos";
    const clave = filtro.tipo === "intencion" ? "_" : (p.linea || (todos && RITUALES.includes(p.categoria) ? "rituales" : p.categoria));
    let g = grupos.find((x) => x.clave === clave);
    if (!g) grupos.push((g = { clave, items: [] }));
    g.items.push(p);
  });
  grupos.forEach((g) => {
    const linea = LINEAS[g.clave];
    const cat = CATEGORIAS.find((c) => c.id === g.clave);
    const intencion = INTENCIONES.find((i) => i.id === filtro.valor);
    const titulo = filtro.tipo === "intencion"
      ? (intencion ? intencion.texto : "")
      : linea ? linea.nombre : g.clave === "rituales" ? "Rituales: velas, aceites y sahumos" : cat ? cat.nombre : "";
    let tarjetas = "";
    g.items.forEach((p) => {
      try { tarjetas += tarjeta(p); } catch (err) { console.error(`[Melisa Tarot] No se pudo mostrar el producto "${p.id}". Revisá data.js.`, err); }
    });
    html += `<div class="grupo">
      <div class="grupo-encabezado"><h3>${esc(titulo)}</h3>${linea && linea.texto ? `<p>${esc(linea.texto)}</p>` : ""}</div>
      <div class="grilla-productos">${tarjetas}</div>
    </div>`;
  });
  document.getElementById("productos").innerHTML = html || '<p class="vacio">No hay productos en esta categoría.</p>';
  document.getElementById("quitar-intencion").hidden = filtro.tipo !== "intencion";
}

function lineasPedido() {
  return Object.entries(pedido).filter(([, c]) => c > 0).map(([clave, cant]) => {
    const [id, opcion] = clave.split("|");
    const p = PRODUCTOS.find((x) => x.id === id);
    const op = opcion && p.opciones ? p.opciones.valores.find((v) => v.nombre === opcion) : null;
    const precio = op && op.precio != null ? op.precio : p.precio;
    return { clave, p, opcion, cant, precio, texto: p.nombre + (opcion ? ` (${opcion})` : "") };
  });
}

function totales(lineas) {
  return {
    unidades: lineas.reduce((t, l) => t + l.cant, 0),
    sinPrecio: lineas.some((l) => l.precio == null),
    total: lineas.reduce((t, l) => t + (l.precio || 0) * l.cant, 0),
  };
}

function renderPedido() {
  const lineas = lineasPedido();
  const { unidades, sinPrecio, total } = totales(lineas);
  document.getElementById("pedido-lista").innerHTML = lineas.length
    ? lineas.map((l) => `<li>
        <span>${esc(l.texto)}${SITIO.mostrarPrecios && l.precio != null ? `<small>${pesos(l.precio)} c/u</small>` : ""}</span>
        <span class="contador">
          <button type="button" data-menos="${esc(l.clave)}" aria-label="Quitar uno de ${esc(l.texto)}">−</button>
          <output>${l.cant}</output>
          <button type="button" data-mas="${esc(l.clave)}" aria-label="Sumar uno de ${esc(l.texto)}">+</button>
        </span></li>`).join("")
    : '<li class="vacio">Todavía no sumaste productos.</li>';
  const totalTexto = sinPrecio ? `${pesos(total)} + a consultar` : pesos(total);
  document.getElementById("pedido-total-linea").hidden = !SITIO.mostrarPrecios;
  document.getElementById("pedido-total").textContent = totalTexto;
  document.getElementById("barra-cant").textContent = `${unidades} ${unidades === 1 ? "producto" : "productos"}`;
  const barraTotal = document.getElementById("barra-total");
  barraTotal.hidden = !SITIO.mostrarPrecios;
  barraTotal.textContent = pesos(total);
  document.getElementById("barra-pedido").hidden = unidades === 0;
  guardarPedido();
}

function textoPedido() {
  const lineas = lineasPedido();
  const { sinPrecio, total } = totales(lineas);
  const conPrecio = (l) => SITIO.mostrarPrecios && l.precio != null ? ` (${pesos(l.precio)} c/u)` : "";
  return `¡Hola Melisa! Quiero hacer este pedido:\n` +
    lineas.map((l) => `• ${l.cant} × ${l.texto}${conPrecio(l)}`).join("\n") +
    (SITIO.mostrarPrecios ? `\nTotal estimado: ${pesos(total)}${sinPrecio ? " + productos a consultar" : ""}` : "") +
    `\n¿Me confirmás la disponibilidad?\n\nMi nombre: \nRetiro o envío: `;
}

function enviarPedido() {
  if (!lineasPedido().length) return toast("Sumá algún producto primero");
  const texto = textoPedido();
  const url = abrirWhatsApp(texto);
  if (!url) return;
  document.getElementById("pedido-link").href = url;
  document.getElementById("pedido-ayuda").hidden = false;
}

async function copiarPedido() {
  const texto = textoPedido();
  try {
    await navigator.clipboard.writeText(texto);
  } catch (e) {
    const area = Object.assign(document.createElement("textarea"), { value: texto });
    area.setAttribute("readonly", ""); area.style.position = "fixed"; area.style.opacity = "0";
    document.getElementById("pedido").appendChild(area); area.select();
    try { document.execCommand("copy"); } catch (e2) { /* nada más que hacer */ }
    area.remove();
  }
  toast("Pedido copiado ✓");
}

// ---------- Panel del pedido (diálogo) ----------
let focoAntes = null;
const fondoDialogo = () => document.querySelectorAll("body > header, body > main, body > footer, #barra-pedido");

function abrirPedido(abrir) {
  const panel = document.getElementById("pedido");
  if (abrir === panel.classList.contains("abierto")) return;
  panel.classList.toggle("abierto", abrir);
  panel.setAttribute("aria-hidden", String(!abrir));
  document.body.classList.toggle("sin-scroll", abrir);
  fondoDialogo().forEach((el) => { el.inert = abrir; });
  if (abrir) {
    document.getElementById("pedido-ayuda").hidden = true;
    focoAntes = document.activeElement;
    // Esperar a que el panel deje de estar oculto para poder darle el foco
    requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById("cerrar-pedido").focus()));
  } else if (focoAntes && document.contains(focoAntes)) {
    focoAntes.focus();
  }
}

function atraparFoco(e) {
  const panel = document.getElementById("pedido");
  if (e.key !== "Tab" || !panel.classList.contains("abierto")) return;
  const focos = [...panel.querySelectorAll("button:not([disabled]), a[href]")];
  if (!focos.length) return;
  const primero = focos[0], ultimo = focos[focos.length - 1];
  if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
  else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
}

// ---------- Preguntas ----------
seguro("preguntas frecuentes", () => {
  document.getElementById("lista-preguntas").innerHTML = PREGUNTAS.map((q) => `
    <details><summary>${esc(q.pregunta)}</summary><p>${q.respuesta ? esc(q.respuesta) : PENDIENTE()}</p></details>`).join("");
});

// ---------- Eventos ----------
function confirmarSumado(boton) {
  const original = "Sumar al pedido";
  boton.textContent = "✓ Sumado";
  boton.classList.add("sumado");
  clearTimeout(boton._t);
  boton._t = setTimeout(() => { boton.textContent = original; boton.classList.remove("sumado"); }, 1800);
  const barra = document.querySelector("#barra-pedido button");
  if (barra && !reducirMovimiento()) { barra.classList.remove("pulso"); void barra.offsetWidth; barra.classList.add("pulso"); }
}

document.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  const d = b.dataset;
  if (d.filtro) { filtro = { tipo: "categoria", valor: d.filtro }; renderFiltros(); renderProductos(); }
  if (d.intencion) {
    filtro = { tipo: "intencion", valor: d.intencion };
    renderFiltros(); renderProductos();
    document.getElementById("tienda").scrollIntoView({ behavior: reducirMovimiento() ? "auto" : "smooth" });
  }
  if (b.id === "quitar-intencion") { filtro = { tipo: "categoria", valor: "todos" }; renderFiltros(); renderProductos(); }
  if (d.agregar) {
    const p = PRODUCTOS.find((x) => x.id === d.agregar);
    const op = opcionElegida(p);
    const clave = op ? `${p.id}|${op.nombre}` : p.id;
    pedido[clave] = (pedido[clave] || 0) + 1;
    renderPedido();
    confirmarSumado(b);
    document.getElementById("anuncio").textContent = `Sumaste ${p.nombre}${op ? ` (${op.nombre})` : ""} al pedido`;
  }
  if (d.mas) { pedido[d.mas]++; renderPedido(); }
  if (d.menos) { pedido[d.menos] = Math.max(0, pedido[d.menos] - 1); renderPedido(); }
  if (d.filtroTirada) { filtroTiradas = d.filtroTirada; renderTiradas(); marcarRecortes(); }
  if ("leerMas" in d) {
    const texto = b.previousElementSibling;
    const abierto = texto.classList.toggle("recortado") === false;
    b.textContent = abierto ? "Leer menos" : "Leer más";
    b.setAttribute("aria-expanded", String(abierto));
  }
  if (d.tirada) {
    const t = TIRADAS.find((x) => x.id === d.tirada);
    abrirWhatsApp(`¡Hola Melisa! Quiero reservar la lectura «${t.nombre}» (${precioTexto(t.precio)}). ¿Qué días tenés disponibles?\n\nMi nombre: \nTema o pregunta: `);
  }
  if (d.servicio) {
    const sv = SERVICIOS.find((x) => x.id === d.servicio);
    abrirWhatsApp(sv.id === "eventos"
      ? "¡Hola Melisa! Quiero consultar por tarot para un evento. Te cuento: tipo de evento, fecha, lugar y cantidad de invitados aproximada."
      : `¡Hola Melisa! Quiero info para anotarme en «${sv.nombre}».`);
  }
  if (b.id === "ver-pedido") abrirPedido(true);
  if (b.id === "cerrar-pedido") abrirPedido(false);
  if (b.id === "pedido-enviar") enviarPedido();
  if (b.id === "pedido-copiar") copiarPedido();
});

document.addEventListener("change", (e) => {
  const sel = e.target.closest("[data-opcion]");
  if (!sel) return;
  const p = PRODUCTOS.find((x) => x.id === sel.dataset.opcion);
  elegidas[p.id] = sel.value;
  const op = opcionElegida(p);
  const card = document.getElementById(`producto-${p.id}`);
  const texto = card.querySelector("[data-opcion-texto]");
  if (texto) texto.textContent = op.texto || "";
  card.querySelector(".precio").textContent = precioTexto(op.precio != null ? op.precio : p.precio);
  // Si la opción elegida (por ejemplo un color de vela) tiene foto propia, se muestra;
  // si no, vuelve la foto general del producto.
  const img = card.querySelector(".producto-foto img");
  if (img && p.foto) {
    img.src = op.foto || p.foto;
    img.alt = op.foto ? `${p.nombre} (${op.nombre})` : p.nombre;
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") abrirPedido(false);
  atraparFoco(e);
});
document.getElementById("pedido").addEventListener("click", (e) => { if (e.target.id === "pedido") abrirPedido(false); });

function renderSobreMi() {
  if (typeof SOBRE_MI === "undefined") return document.getElementById("sobre-mi").remove();
  document.getElementById("sobre-mi-titulo").textContent = SOBRE_MI.titulo || "Sobre mí";
  document.getElementById("sobre-mi-foto").innerHTML = SOBRE_MI.foto
    ? `<img src="${esc(SOBRE_MI.foto)}" alt="${esc((SOBRE_MI.titulo || "").replace(/^Hola, soy /, ""))}" loading="lazy" width="420" height="525">`
    : PENDIENTE("Foto de Melisa: a confirmar");
  const cuerpo = SOBRE_MI.texto
    ? SOBRE_MI.texto.map((t) => `<p>${esc(t)}</p>`).join("")
    : `<p>${PENDIENTE("Descripción de Melisa: a confirmar")}</p>`;
  document.getElementById("sobre-mi-cuerpo").innerHTML = cuerpo +
    `<a class="btn" href="https://instagram.com/${esc(SITIO.instagram)}" target="_blank" rel="noopener">Seguime en Instagram</a>`;
}

seguro("sobre mí", renderSobreMi);
seguro("filtros de la tienda", renderFiltros);
seguro("tienda", renderProductos);
seguro("pedido", () => { recuperarPedido(); renderPedido(); });
