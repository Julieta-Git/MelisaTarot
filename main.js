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

// ---------- Tiradas (ocultas hasta tener datos) ----------
if (!SITIO.mostrarTiradas || !TIRADAS.length) {
  document.querySelectorAll("[data-tiradas]").forEach((el) => el.remove());
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
    return { clave, p, opcion, cant, texto: p.nombre + (opcion ? ` (${opcion})` : "") };
  });
}

function renderPedido() {
  const lineas = lineasPedido();
  const unidades = lineas.reduce((t, l) => t + l.cant, 0);
  const sinPrecio = lineas.some((l) => l.p.precio == null);
  const total = lineas.reduce((t, l) => t + (l.p.precio || 0) * l.cant, 0);
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
  const sinPrecio = lineas.some((l) => l.p.precio == null);
  const total = lineas.reduce((t, l) => t + (l.p.precio || 0) * l.cant, 0);
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
