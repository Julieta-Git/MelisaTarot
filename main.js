const PENDIENTE = (t = "A confirmar") => `<span class="pendiente">${t}</span>`;
const pesos = (n) => "$" + n.toLocaleString("es-AR");
const precioTexto = (p) => !SITIO.mostrarPrecios ? "Consultar" : p == null ? "Precio a consultar" : pesos(p);
const categoria = (id) => CATEGORIAS.find((c) => c.id === id);
const productosVisibles = PRODUCTOS.filter((p) => p.visible !== false);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("visible");
  clearTimeout(toast.id);
  toast.id = setTimeout(() => t.classList.remove("visible"), 2600);
}

function abrirWhatsApp(texto) {
  if (!SITIO.whatsapp) return toast("Falta cargar el número de WhatsApp");
  window.open(`https://wa.me/${SITIO.whatsapp}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
}

// ---------- Contacto y pie ----------
document.getElementById("pie-contacto").innerHTML = [
  `<a href="https://wa.me/${SITIO.whatsapp}" target="_blank" rel="noopener">WhatsApp ${SITIO.telefonoVisible}</a>`,
  `<a href="https://instagram.com/${SITIO.instagram}" target="_blank" rel="noopener">@${SITIO.instagram}</a>`,
  `<a href="mailto:${SITIO.email}">${SITIO.email}</a>`,
  SITIO.ciudad || PENDIENTE("Ciudad a confirmar"),
].map((x) => `<span>${x}</span>`).join("");
document.getElementById("aviso-stock").textContent = SITIO.aviso;
document.getElementById("anio").textContent = new Date().getFullYear();

// ---------- Tiradas ----------
let filtroTiradas = "todas";
// "1) texto 2) texto" -> intro + lista
function textoConLista(t) {
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
  document.getElementById("filtros-tiradas").innerHTML = [{ id: "todas", nombre: "Todas" }, ...cols]
    .map((c) => `<button type="button" data-filtro-tirada="${c.id}" aria-pressed="${filtroTiradas === c.id}">${c.nombre}</button>`).join("");
  const lista = TIRADAS.filter((t) => t.visible !== false && (filtroTiradas === "todas" || t.coleccion === filtroTiradas));
  const largas = lista.filter((t) => !t.corta);
  const cortas = lista.filter((t) => t.corta);
  document.getElementById("grilla-tiradas").innerHTML =
    largas.map((t) => `
      <article class="tirada${t.destacada ? " destacada" : ""}" id="tirada-${t.id}">
        <p class="tirada-col">${COLECCIONES_TIRADAS.find((c) => c.id === t.coleccion).nombre}</p>
        <h3>${esc(t.nombre)}</h3>
        ${t.detalle ? `<p class="tirada-detalle">${esc(t.detalle)}</p>` : ""}
        <div class="tirada-texto">${textoConLista(t.descripcion)}</div>
        <div class="tirada-pie">
          <p class="precio">${precioTexto(t.precio)}</p>
          <button type="button" class="btn btn-whatsapp" data-tirada="${t.id}">Reservar</button>
        </div>
      </article>`).join("") +
    (cortas.length ? `
      <article class="tirada tirada-tabla">
        <p class="tirada-col">Preguntas libres</p>
        <h3>Elegí cuántas preguntas</h3>
        <p class="tirada-texto">Preguntas libres, con respuestas detalladas, sobre cualquier tema que quieras explorar. Con 10 preguntas podés distribuirlas a lo largo del mes.</p>
        <ul class="tabla-preguntas">${cortas.map((t) => `
          <li><span>${esc(t.nombre)}</span><strong>${precioTexto(t.precio)}</strong>
          <button type="button" class="btn-mini" data-tirada="${t.id}" aria-label="Reservar ${esc(t.nombre)}">Reservar</button></li>`).join("")}
        </ul>
      </article>` : "");
}

function renderServicios() {
  document.getElementById("grilla-servicios").innerHTML = SERVICIOS.map((s) => `
    <article class="servicio" id="servicio-${s.id}">
      <p class="etiqueta">${esc(s.etiqueta)}</p>
      <h2>${esc(s.nombre)}</h2>
      <p class="tirada-detalle">${esc(s.detalle)}</p>
      <p>${esc(s.descripcion)}</p>
      <ul class="servicio-items">${s.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
      <div class="tirada-pie">
        <p class="precio">${s.precio == null ? "Consultá tu propuesta" : precioTexto(s.precio)}</p>
        <button type="button" class="btn" data-servicio="${s.id}">${s.precio == null ? "Consultar" : "Quiero anotarme"}</button>
      </div>
    </article>`).join("");
}

if (!SITIO.mostrarTiradas || !TIRADAS.length) {
  document.querySelectorAll("[data-tiradas]").forEach((el) => el.remove());
} else {
  renderTiradas();
  renderServicios();
}

// ---------- Intenciones ----------
document.getElementById("intenciones").innerHTML = INTENCIONES.map((i, n) => `
  <button type="button" class="intencion" data-intencion="${i.id}">
    <span class="intencion-num">${n + 1}</span>
    <span>${i.texto}</span>
    <strong>${i.cristal}</strong>
  </button>`).join("");

// ---------- Tienda ----------
const pedido = {}; // clave "id" o "id|opción" -> cantidad
let filtro = { tipo: "categoria", valor: "todos" };

function renderFiltros() {
  const usadas = CATEGORIAS.filter((c) => productosVisibles.some((p) => p.categoria === c.id));
  document.getElementById("filtros").innerHTML = [{ id: "todos", nombre: "Todo" }, ...usadas]
    .map((c) => `<button type="button" data-filtro="${c.id}" aria-pressed="${filtro.tipo === "categoria" && filtro.valor === c.id}">${c.nombre}</button>`)
    .join("");
}

function tarjeta(p) {
  const cat = categoria(p.categoria);
  const chips = [p.aroma && `Aroma ${p.aroma}`, p.ml, p.chakra && `Chakra ${p.chakra}`, p.detalle].filter(Boolean);
  return `
  <article class="producto" id="producto-${p.id}" style="--fondo:${cat.fondo}">
    <div class="producto-foto">
      ${p.foto
        ? `<img src="${p.foto}" alt="${esc(p.nombre)}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'sin-foto',textContent:'Foto próximamente'}))">`
        : `<span class="sin-foto">Foto próximamente</span>`}
      ${p.masVendido ? '<span class="badge">★ Más vendido</span>' : ""}
    </div>
    <div class="producto-info">
      <h3>${esc(p.nombre)}${p.alias ? ` <small>o ${esc(p.alias)}</small>` : ""}</h3>
      ${chips.length ? `<ul class="chips">${chips.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>` : ""}
      ${p.ml === null ? `<p>${PENDIENTE("Tamaño a confirmar")}</p>` : ""}
      ${p.incluye ? `<p class="incluye"><strong>Incluye:</strong> ${p.incluye.map(esc).join(" + ")}</p>` : ""}
      <p class="descripcion">${esc(p.descripcion)}</p>
      ${p.beneficios ? `<p class="beneficios">${p.beneficios.map(esc).join(" · ")}</p>` : ""}
      ${p.ideal ? `<p class="ideal">${esc(p.ideal)}</p>` : ""}
      ${p.opciones ? `
        <label class="opcion">${p.opciones.titulo}
          <select data-opcion="${p.id}">
            ${p.opciones.valores.map((v) => `<option value="${esc(v.nombre)}">${esc(v.nombre)}</option>`).join("")}
          </select>
        </label>
        ${p.opciones.valores[0].texto ? `<p class="opcion-texto" data-opcion-texto="${p.id}">${esc(p.opciones.valores[0].texto)}</p>` : ""}` : ""}
      <div class="producto-pie">
        <p class="precio">${precioTexto(p.precio)}</p>
        <button type="button" class="btn btn-agregar" data-agregar="${p.id}">Agregar</button>
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
    const clave = filtro.tipo === "intencion" ? "_" : (p.linea || p.categoria);
    let g = grupos.find((x) => x.clave === clave);
    if (!g) grupos.push((g = { clave, items: [] }));
    g.items.push(p);
  });
  grupos.forEach((g) => {
    const linea = LINEAS[g.clave];
    const cat = CATEGORIAS.find((c) => c.id === g.clave);
    const titulo = filtro.tipo === "intencion"
      ? INTENCIONES.find((i) => i.id === filtro.valor).texto
      : linea ? linea.nombre : cat ? cat.nombre : "";
    html += `<div class="grupo">
      <div class="grupo-encabezado"><h3>${titulo}</h3>${linea ? `<p>${linea.texto}</p>` : ""}</div>
      <div class="grilla-productos">${g.items.map(tarjeta).join("")}</div>
    </div>`;
  });
  document.getElementById("productos").innerHTML = html || '<p class="vacio">No hay productos en esta categoría.</p>';
  const quitar = document.getElementById("quitar-intencion");
  quitar.hidden = filtro.tipo !== "intencion";
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

function renderPedido() {
  const lineas = lineasPedido();
  const unidades = lineas.reduce((t, l) => t + l.cant, 0);
  const sinPrecio = lineas.some((l) => l.precio == null);
  const total = lineas.reduce((t, l) => t + (l.precio || 0) * l.cant, 0);
  document.getElementById("pedido-lista").innerHTML = lineas.length
    ? lineas.map((l) => `<li>
        <span>${esc(l.texto)}</span>
        <span class="contador">
          <button type="button" data-menos="${esc(l.clave)}" aria-label="Quitar uno de ${esc(l.texto)}">−</button>
          <output>${l.cant}</output>
          <button type="button" data-mas="${esc(l.clave)}" aria-label="Agregar uno de ${esc(l.texto)}">+</button>
        </span></li>`).join("")
    : '<li class="vacio">Todavía no agregaste productos.</li>';
  const totalTexto = sinPrecio ? `${pesos(total)} + a consultar` : pesos(total);
  document.getElementById("pedido-total").textContent = totalTexto;
  document.getElementById("barra-cant").textContent = unidades;
  document.getElementById("barra-total").textContent = totalTexto;
  document.getElementById("barra-pedido").hidden = unidades === 0;
}

function enviarPedido() {
  const lineas = lineasPedido();
  if (!lineas.length) return toast("Agregá algún producto primero");
  const sinPrecio = lineas.some((l) => l.precio == null);
  const total = lineas.reduce((t, l) => t + (l.precio || 0) * l.cant, 0);
  abrirWhatsApp(
    `¡Hola Melisa! Quiero hacer este pedido:\n` +
    lineas.map((l) => `• ${l.cant} × ${l.texto}`).join("\n") +
    `\nTotal estimado: ${pesos(total)}${sinPrecio ? " + productos a consultar" : ""}\n¿Me confirmás la disponibilidad?`
  );
}

function abrirPedido(abrir) {
  const panel = document.getElementById("pedido");
  panel.classList.toggle("abierto", abrir);
  panel.setAttribute("aria-hidden", String(!abrir));
  document.body.classList.toggle("sin-scroll", abrir);
  if (abrir) panel.querySelector("button").focus();
}

// ---------- Preguntas ----------
document.getElementById("lista-preguntas").innerHTML = PREGUNTAS.map((q) => `
  <details><summary>${q.pregunta}</summary><p>${q.respuesta || PENDIENTE()}</p></details>`).join("");

// ---------- Eventos ----------
document.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  const d = b.dataset;
  if (d.filtro) { filtro = { tipo: "categoria", valor: d.filtro }; renderFiltros(); renderProductos(); }
  if (d.intencion) {
    filtro = { tipo: "intencion", valor: d.intencion };
    renderFiltros(); renderProductos();
    document.getElementById("tienda").scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }
  if (b.id === "quitar-intencion") { filtro = { tipo: "categoria", valor: "todos" }; renderFiltros(); renderProductos(); }
  if (d.agregar) {
    const p = PRODUCTOS.find((x) => x.id === d.agregar);
    const sel = document.querySelector(`[data-opcion="${p.id}"]`);
    const clave = sel ? `${p.id}|${sel.value}` : p.id;
    pedido[clave] = (pedido[clave] || 0) + 1;
    renderPedido();
    toast(`Sumaste ${p.nombre}${sel ? ` (${sel.value})` : ""}`);
  }
  if (d.mas) { pedido[d.mas]++; renderPedido(); }
  if (d.menos) { pedido[d.menos] = Math.max(0, pedido[d.menos] - 1); renderPedido(); }
  if (d.filtroTirada) { filtroTiradas = d.filtroTirada; renderTiradas(); }
  if (d.tirada) {
    const t = TIRADAS.find((x) => x.id === d.tirada);
    abrirWhatsApp(`¡Hola Melisa! Quiero reservar la lectura «${t.nombre}» (${precioTexto(t.precio)}). ¿Qué días tenés disponibles?`);
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
});

document.addEventListener("change", (e) => {
  const sel = e.target.closest("[data-opcion]");
  if (!sel) return;
  const p = PRODUCTOS.find((x) => x.id === sel.dataset.opcion);
  const texto = document.querySelector(`[data-opcion-texto="${p.id}"]`);
  if (texto) texto.textContent = p.opciones.valores.find((v) => v.nombre === sel.value).texto;
});

document.addEventListener("keydown", (e) => { if (e.key === "Escape") abrirPedido(false); });
document.getElementById("pedido").addEventListener("click", (e) => { if (e.target.id === "pedido") abrirPedido(false); });

renderFiltros();
renderProductos();
renderPedido();
