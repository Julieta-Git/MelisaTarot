const PENDIENTE = (t = "A confirmar") => `<span class="pendiente">${t}</span>`;
const pesos = (n) => "$" + n.toLocaleString("es-AR");
const precioTexto = (p) => !SITIO.mostrarPrecios ? "Consultar" : p == null ? PENDIENTE("Precio a confirmar") : pesos(p);
const categoria = (id) => CATEGORIAS.find((c) => c.id === id);
const marcaTexto = SITIO.marca || "Nombre de la marca";

function linkWhatsApp(texto) {
  return SITIO.whatsapp ? `https://wa.me/${SITIO.whatsapp}?text=${encodeURIComponent(texto)}` : null;
}

function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("visible");
  clearTimeout(toast.id);
  toast.id = setTimeout(() => t.classList.remove("visible"), 2600);
}

// ---------- Marca y contacto ----------
document.querySelectorAll("[data-marca]").forEach((el) => {
  el.innerHTML = SITIO.marca ? SITIO.marca : PENDIENTE(marcaTexto);
});
document.getElementById("pie-contacto").innerHTML = [
  SITIO.instagram
    ? `<a href="https://instagram.com/${SITIO.instagram}" target="_blank" rel="noopener">@${SITIO.instagram}</a>`
    : PENDIENTE("Instagram a confirmar"),
  SITIO.ciudad || PENDIENTE("Ciudad a confirmar"),
].join(" · ");

// ---------- Tiradas ----------
document.getElementById("grilla-tiradas").innerHTML = TIRADAS.filter((t) => t.visible).map((t) => `
  <article class="tirada" id="tirada-${t.id}">
    ${t.ejemplo ? '<span class="chip-ejemplo">Ejemplo</span>' : ""}
    <div class="tirada-cartas" aria-hidden="true">${"<i></i>".repeat(Math.min(t.cartas, 5))}</div>
    <h3>${t.nombre}</h3>
    <p>${t.responde}</p>
    <dl>
      <div><dt>Cartas</dt><dd>${t.cartas}</dd></div>
      <div><dt>Modalidad</dt><dd>${t.modalidad}</dd></div>
      <div><dt>Entrega</dt><dd>${t.entrega}</dd></div>
    </dl>
    <p class="precio">${precioTexto(t.precio)}</p>
    <button class="btn btn-whatsapp" type="button" data-tirada="${t.id}">Reservar por WhatsApp</button>
  </article>`).join("");

// ---------- Productos ----------
const pedido = {};
let filtro = "todos";
const visibles = () => PRODUCTOS.filter((p) => p.visible);

function renderFiltros() {
  const usadas = CATEGORIAS.filter((c) => visibles().some((p) => p.categoria === c.id));
  document.getElementById("filtros").innerHTML = [{ id: "todos", nombre: "Todos" }, ...usadas]
    .map((c) => `<button type="button" data-filtro="${c.id}" aria-pressed="${c.id === filtro}">${c.nombre}</button>`)
    .join("");
}

function renderProductos() {
  const lista = visibles()
    .filter((p) => filtro === "todos" || p.categoria === filtro)
    .sort((a, b) => b.destacado - a.destacado);
  document.getElementById("grilla-productos").innerHTML = lista.map((p) => {
    const cat = categoria(p.categoria);
    return `
    <article class="producto" id="producto-${p.id}">
      <div class="producto-foto">
        ${p.foto ? `<img src="${p.foto}" alt="${p.nombre}" loading="lazy">` : `<span class="simbolo" aria-hidden="true">${cat.simbolo}</span><small>Foto a confirmar</small>`}
        ${p.ejemplo ? '<span class="chip-ejemplo">Ejemplo</span>' : ""}
      </div>
      <div class="producto-info">
        <p class="producto-cat">${cat.nombre}</p>
        <h3>${p.nombre}</h3>
        <p>${p.descripcion}</p>
        <p class="precio">${precioTexto(p.precio)}</p>
        <div class="contador" aria-label="Cantidad de ${p.nombre}">
          <button type="button" data-menos="${p.id}" aria-label="Quitar ${p.nombre}">−</button>
          <output data-cant="${p.id}">${pedido[p.id] || 0}</output>
          <button type="button" data-mas="${p.id}" aria-label="Agregar ${p.nombre}">+</button>
        </div>
      </div>
    </article>`;
  }).join("");
}

function lineasPedido() {
  return PRODUCTOS.filter((p) => pedido[p.id]).map((p) => ({ p, cant: pedido[p.id] }));
}

function renderPedido() {
  const lineas = lineasPedido();
  const conPrecio = lineas.every(({ p }) => p.precio != null) && SITIO.mostrarPrecios;
  const total = lineas.reduce((t, { p, cant }) => t + (p.precio || 0) * cant, 0);
  document.getElementById("pedido").classList.toggle("activo", lineas.length > 0);
  document.getElementById("pedido-lista").innerHTML = lineas.length
    ? lineas.map(({ p, cant }) => `<li>${cant} × ${p.nombre}</li>`).join("")
    : '<li class="vacio">Todavía no agregaste productos.</li>';
  document.getElementById("pedido-total").textContent = lineas.length && !conPrecio ? "a consultar" : pesos(total);
  document.querySelectorAll("[data-cant]").forEach((o) => (o.textContent = pedido[o.dataset.cant] || 0));
}

function enviarPedido() {
  const lineas = lineasPedido();
  if (!lineas.length) return toast("Agregá algún producto primero");
  const texto = `Hola! Quiero hacer este pedido de la tienda:\n` +
    lineas.map(({ p, cant }) => `• ${cant} × ${p.nombre}`).join("\n");
  abrirWhatsApp(texto);
}

function abrirWhatsApp(texto) {
  const url = linkWhatsApp(texto);
  if (!url) {
    console.info("Mensaje que se enviaría:\n" + texto);
    return toast("Falta cargar el número de WhatsApp (prototipo)");
  }
  window.open(url, "_blank", "noopener");
}

// ---------- Preguntas ----------
document.getElementById("lista-preguntas").innerHTML = PREGUNTAS.map((q) => `
  <details><summary>${q.pregunta}</summary><p>${q.respuesta || PENDIENTE()}</p></details>`).join("");

// ---------- Eventos ----------
document.addEventListener("click", (e) => {
  const b = e.target.closest("button, a");
  if (!b) return;
  if (b.dataset.filtro) { filtro = b.dataset.filtro; renderFiltros(); renderProductos(); }
  if (b.dataset.mas) { pedido[b.dataset.mas] = (pedido[b.dataset.mas] || 0) + 1; renderPedido(); }
  if (b.dataset.menos) { pedido[b.dataset.menos] = Math.max(0, (pedido[b.dataset.menos] || 0) - 1); renderPedido(); }
  if (b.dataset.tirada) {
    const t = TIRADAS.find((x) => x.id === b.dataset.tirada);
    abrirWhatsApp(`Hola! Quiero reservar la ${t.nombre} (${t.modalidad}).`);
  }
  if (b.id === "pedido-enviar") { e.preventDefault(); enviarPedido(); }
});

renderFiltros();
renderProductos();
renderPedido();
