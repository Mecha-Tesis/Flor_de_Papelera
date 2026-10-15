const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showBanner": true,
  "gridCols": "4",
  "showMinOrder": true,
  "currency": "ARS"
}/*EDITMODE-END*/;

// ─── CONFIGURACIÓN DEL NEGOCIO ────────────────────────────────────────────────
// ⚠️ PENDIENTE: cargá el WhatsApp real del negocio en `whatsapp` (código de país +
//    área, sin +, sin 0, sin 15 y sin espacios) y pasá `whatsappListo` a true.
//    Mientras esté en false, los botones de WhatsApp NO se muestran: es preferible
//    que no estén a que abran un chat con un número inventado.

const CONFIG = {
  whatsapp: "1137939540",            // ej: "5491122334455"
  whatsappListo: true,
  instagram: "https://www.instagram.com/flordepapelera/",
  facebook: "https://www.facebook.com/flordepapelera/",
};

const WA_ACTIVO = CONFIG.whatsappListo && /^\d{8,15}$/.test(CONFIG.whatsapp);

function linkWhatsApp(texto) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(texto)}`;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const CATEGORIES = ["Todo", "Bolsas de papel", "Cajas", "Vasos descartables", "Cubiertos", "Papeles cupcake", "Platos descartables"];

const PRODUCTS = [
  { id: 1, name: "Bolsa de papel lisa", category: "Bolsas de papel", price: 1800, unit: "x 12 u.", colors: "Rojo, azul, verde, rosa, naranja, violeta, natural", img: "Images/bag-plain.png" },
  {
    id: 2, name: "Bolsa de papel decorada lunares", category: "Bolsas de papel", price: 2200, unit: "x 12 u.", colors: "Blanco/rojo, blanco/negro, rosa/blanco", img: "Images/bag-dots.png"
  },
  { id: 3, name: "Bolsa de papel decorada impresa", category: "Bolsas de papel", price: 2600, unit: "x 12 u.", colors: "Varios diseños", img: "Images/bag-print.png" },
  { id: 5, name: "Caja decorada lisa", category: "Cajas", price: 3500, unit: "x 6 u.", colors: "Rojo, blanco, negro, azul, rosa, verde", img: "Images/box-plain.png" },
  { id: 6, name: "Caja decorada - I Love Mama", category: "Cajas", price: 4200, unit: "x 6 u.", colors: "Blanco, rosa, celeste", img: "Images/caja-ILMama.png" },
  { id: 7, name: "Caja cupcake x 6", category: "Cajas", price: 4800, unit: "x 6 u.", colors: "Blanco, kraft", img: "Images/box-cupcake.png" },
  { id: 8, name: "Vaso plástico liso 250cc", category: "Vasos descartables", price: 2800, unit: "x 25 u.", colors: "Rojo, azul, verde, rosa, transparente, negro", img: "Images/cup-plain.png" },
  { id: 9, name: "Vaso plástico decorado", category: "Vasos descartables", price: 3200, unit: "x 25 u.", colors: "Lunares, rayas, flores", img: "Images/cup-deco.png" },
  { id: 10, name: "Vaso para postres", category: "Vasos descartables", price: 4500, unit: "x 20 u.", colors: "Transparente", img: "Images/cup-dessert.png" },
  { id: 11, name: "Cubiertos plástico x set", category: "Cubiertos", price: 3900, unit: "x 25 sets", colors: "Blanco, negro, rojo, azul", img: "Images/cutlery.png" },
  { id: 12, name: "Tenedor plástico", category: "Cubiertos", price: 1600, unit: "x 50 u.", colors: "Blanco, negro", img: "Images/fork.png" },
  { id: 13, name: "Cuchara plástica", category: "Cubiertos", price: 1600, unit: "x 50 u.", colors: "Blanco, negro", img: "Images/spoon.png" },
  { id: 14, name: "Papel cupcake liso", category: "Papeles cupcake", price: 1200, unit: "x 100 u.", colors: "Blanco, surtidos, kraft", img: "Images/cupcake-plain.png" },
  { id: 15, name: "Papel cupcake decorado", category: "Papeles cupcake", price: 1500, unit: "x 100 u.", colors: "Lunares, surtidos", img: "Images/cupcake-deco.png" },
  { id: 16, name: "Plato descartable 23cm", category: "Platos descartables", price: 2600, unit: "x 25 u.", colors: "Blanco, negro", img: "Images/plate.png" },
];

// ─── COLOR UTILITIES ──────────────────────────────────────────────────────────

const COLOR_HEX = {
  "rojo": "#C62828",
  "blanco": "#F5F5F5",
  "negro": "#1A1A1A",
  "azul": "#1565C0",
  "verde": "#2E7D32",
  "rosa": "#E91E8C",
  "naranja": "#E65100",
  "violeta": "#6A1B9A",
  "marron": "#8e835dff",
  "natural": "#C8A96E",
  "transparente": null,
  "celeste": "#29B6F6",
  "kraft": "#B5854A",
  "lunares": "#E0C9A6",
  "rayas": "#A6BCE0",
  "flores": "#E0A6C0",
  "surtidos": "#FFB347",
};

function normalizeColor(raw) {
  return raw.trim().toLowerCase()
    .replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i")
    .replace(/ó/g, "o").replace(/ú/g, "u").replace(/ü/g, "u").replace(/ñ/g, "n");
}

function colorStyle(colorName) {
  const parts = colorName.split("/").map(s => s.trim());
  if (parts.length === 2) {
    const a = COLOR_HEX[normalizeColor(parts[0])] || "#CCC";
    const b = COLOR_HEX[normalizeColor(parts[1])] || "#CCC";
    return { background: `linear-gradient(135deg, ${a} 50%, ${b} 50%)`, border: "1.5px solid rgba(0,0,0,0.18)" };
  }
  const hex = COLOR_HEX[normalizeColor(parts[0])];
  if (hex === null) {
    return { background: "linear-gradient(135deg, #DDD 50%, #FFF 50%)", border: "1.5px solid rgba(0,0,0,0.18)" };
  }
  return { background: hex || "#DDD", border: "1.5px solid rgba(0,0,0,0.18)" };
}

function colorSlug(colorName) {
  return normalizeColor(colorName).replace(/\//g, "-").replace(/\s+/g, "-");
}

function getColorImageSrc(baseImg, colorName) {
  if (!baseImg || !colorName) return null;
  const dot = baseImg.lastIndexOf(".");
  if (dot === -1) return null;
  return baseImg.slice(0, dot) + "-" + colorSlug(colorName) + baseImg.slice(dot);
}

function parseColorList(colorsStr) {
  if (!colorsStr) return [];
  return colorsStr.split(",").map(s => s.trim()).filter(s => {
    const parts = s.split("/").map(p => normalizeColor(p.trim()));
    return parts.every(p => p in COLOR_HEX);
  });
}

function ColorSwatch({ name, selected, onSelect }) {
  return (
    <button
      type="button"
      className="swatch"
      title={name}
      aria-pressed={selected}
      aria-label={`Color ${name}${selected ? " (elegido)" : ""}`}
      onClick={e => { e.stopPropagation(); onSelect(name); }}
    >
      <i style={colorStyle(name)} />
    </button>
  );
}

// ─── PLACEHOLDER IMG ──────────────────────────────────────────────────────────

function ProductImg({ type, colorSrc, size = 120, fill = false, alt = "", priority = false }) {
  const [stage, setStage] = React.useState(0);

  React.useEffect(() => { setStage(0); }, [colorSrc, type]);

  const w = fill ? "100%" : size;
  const h = fill ? "100%" : size;

  const srcs = [];
  if (colorSrc) srcs.push(colorSrc);
  if (type) srcs.push(type);
  const src = stage < srcs.length ? srcs[stage] : null;

  if (src) {
    return (
      <img
        key={src}
        src={src}
        alt={alt}
        width={600}
        height={600}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchpriority={priority ? "high" : "auto"}
        onError={() => setStage(s => s + 1)}
        style={{ width: w, height: h, objectFit: "contain", display: "block" }}
      />
    );
  }

  return (
    <svg width={w} height={h} viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label={alt ? `${alt} (sin foto disponible)` : "Sin foto disponible"}
      preserveAspectRatio="xMidYMid meet">
      <rect width="120" height="120" fill="#EDE8E0" />
      <line x1="0" y1="0" x2="120" y2="120" stroke="#D0C8BC" strokeWidth="0.8" />
      <line x1="120" y1="0" x2="0" y2="120" stroke="#D0C8BC" strokeWidth="0.8" />
      <text x="60" y="65" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#8A8278">sin imagen</text>
    </svg>
  );
}

// ─── ICONS ───────────────────────────────────────────────────────────────────

const IconCart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);
const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconMinus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconWA = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);
const IconIG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const IconFB = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// ─── RESPONSIVE HOOK ──────────────────────────────────────────────────────────

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < breakpoint);
  React.useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, [breakpoint]);
  return isMobile;
}

// ─── HOOKS DE CAPA (modal / panel) ───────────────────────────────────────────

// Bloquea el scroll del fondo mientras hay una capa abierta.
function useBodyLock(active) {
  React.useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [active]);
}

// Escape cierra; el foco entra a la capa y vuelve a donde estaba al cerrar.
function useLayer(active, onClose, ref) {
  const cerrar = React.useRef(onClose);
  cerrar.current = onClose;
  React.useEffect(() => {
    if (!active) return;
    const previo = document.activeElement;
    const onKey = (e) => {
      if (e.key === "Escape") { e.stopPropagation(); cerrar.current(); return; }
      if (e.key !== "Tab" || !ref.current) return;
      const f = ref.current.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!f.length) return;
      const primero = f[0], ultimo = f[f.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    };
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => {
      const f = ref.current && ref.current.querySelector(
        'button:not([disabled]), a[href], input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (f) f.focus();
    }, 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(t);
      if (previo && previo.focus) previo.focus();
    };
  }, [active, ref]);
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────

function ProductCard({ product, onOpen, onAdd, onQty, cart, priority = false }) {
  const [selectedColor, setSelectedColor] = React.useState(null);

  const colorList = React.useMemo(() => parseColorList(product.colors), [product.colors]);
  const colorSrc = selectedColor ? getColorImageSrc(product.img, selectedColor) : null;
  const cartKey = selectedColor ? `${product.id}_${colorSlug(selectedColor)}` : `${product.id}`;
  const cartItem = cart.find(i => (i.cartKey || String(i.id)) === cartKey);
  const qty = cartItem ? cartItem.qty : 0;

  const handleAdd = () => onAdd(selectedColor ? { ...product, selectedColor } : product);

  // los controles van por encima del área clicable del título
  const sobreOverlay = { position: "relative", zIndex: 1 };

  return (
    <article className="card" style={{ position: "relative" }}>
      <div className="card-media">
        <ProductImg type={product.img} colorSrc={colorSrc} fill priority={priority}
          alt={`${product.name}${selectedColor ? ` en ${selectedColor}` : ""}`} />
      </div>
      <div style={{ padding: "12px 14px 14px", display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
        <p style={{ fontSize: 11, fontWeight: 600, color: "var(--red)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {product.category}
        </p>
        <h3 className="card-title">
          <button type="button" onClick={() => onOpen(product)}>
            {product.name}
            <span className="sr-only"> — ver detalle</span>
          </button>
        </h3>

        {colorList.length > 0 && (
          <div style={{ ...sobreOverlay, display: "flex", flexWrap: "wrap", gap: 2, marginTop: 2 }}>
            {colorList.slice(0, 8).map(c => (
              <ColorSwatch
                key={c}
                name={c}
                selected={selectedColor === c}
                onSelect={name => setSelectedColor(prev => prev === name ? null : name)}
              />
            ))}
            {colorList.length > 8 && (
              <span style={{ fontSize: 11, color: "var(--gray-soft)", alignSelf: "center" }}>+{colorList.length - 8}</span>
            )}
          </div>
        )}

        <p style={{ fontFamily: "Barlow Condensed", fontSize: 23, fontWeight: 700, color: "var(--black)", marginTop: "auto" }}>
          ${product.price.toLocaleString("es-AR")}
          <span style={{ fontSize: 14, fontWeight: 400, color: "var(--gray-soft)", marginLeft: 5 }}>{product.unit}</span>
        </p>

        {qty > 0 ? (
          <div className="stepper" style={{ ...sobreOverlay, marginTop: 8 }}>
            <button type="button" onClick={() => onQty(cartKey, -1)}
              aria-label={qty === 1 ? `Quitar ${product.name} del pedido` : `Restar una unidad de ${product.name}`}>
              <IconMinus />
            </button>
            <span className="qty" aria-live="polite">
              {qty}<span className="sr-only"> en el pedido</span>
            </span>
            <button type="button" onClick={() => onQty(cartKey, 1)}
              aria-label={`Sumar una unidad de ${product.name}`}>
              <IconPlus />
            </button>
          </div>
        ) : (
          <button type="button" className="btn btn-add" onClick={handleAdd}
            style={{ ...sobreOverlay, marginTop: 8 }}>
            Agregar al pedido
            <span className="sr-only">: {product.name}</span>
          </button>
        )}
      </div>
    </article>
  );
}

// ─── PRODUCT MODAL ────────────────────────────────────────────────────────────

function ProductModal({ product, onClose, onAdd }) {
  const [qty, setQty] = React.useState(1);
  const [added, setAdded] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(null);
  const isMobile = useIsMobile();
  const panel = React.useRef(null);
  useBodyLock(true);
  useLayer(true, onClose, panel);

  if (!product) return null;

  const colorList = parseColorList(product.colors);
  const colorSrc = selectedColor ? getColorImageSrc(product.img, selectedColor) : null;

  const handleAdd = () => {
    const p = selectedColor ? { ...product, selectedColor } : product;
    for (let i = 0; i < qty; i++) onAdd(p);
    setAdded(true);
    setTimeout(() => { setAdded(false); onClose(); }, 900);
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 800,
      background: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: isMobile ? "flex-end" : "center",
      justifyContent: "center",
      padding: isMobile ? 0 : 20,
    }}>
      <div
        ref={panel}
        className="modal on-red"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-titulo"
        onClick={e => e.stopPropagation()}
        style={{
          background: "white",
          maxWidth: isMobile ? "100%" : 480,
          width: "100%",
          maxHeight: isMobile ? "90dvh" : "calc(100dvh - 40px)",
          overflowY: "auto",
          boxShadow: "0 -4px 40px rgba(0,0,0,0.25)",
        }}>
        <div style={{ background: "var(--red)", padding: "12px 14px 12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 2 }}>
          <span style={{ fontFamily: "Barlow Condensed", fontSize: 13, fontWeight: 700, color: "white", letterSpacing: "0.1em", textTransform: "uppercase" }}>{product.category}</span>
          <button type="button" onClick={onClose} aria-label="Cerrar detalle del producto"
            style={{ background: "none", border: "none", cursor: "pointer", color: "white", display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, flexShrink: 0 }}>
            <IconClose />
          </button>
        </div>
        {/* Vertical: franja roja → foto grande → datos. El producto es lo que se mira. */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div className="modal-media" style={{
            width: "100%",
            height: isMobile ? "min(34vh, 280px)" : "min(34vh, 320px)",
            flexShrink: 0,
            overflow: "hidden",
            background: "#fff",
            borderBottom: "1px solid var(--border)",
            padding: 12,
          }}>
            <ProductImg type={product.img} colorSrc={colorSrc} fill priority
              alt={`${product.name}${selectedColor ? ` en ${selectedColor}` : ""}`} />
          </div>
          <div style={{ padding: isMobile ? "20px 20px 4px" : "22px 26px 6px", flex: 1 }}>
            <h2 id="modal-titulo" style={{ fontFamily: "Barlow Condensed", fontSize: isMobile ? 24 : 28, fontWeight: 800, lineHeight: 1.1, marginBottom: 6 }}>{product.name}</h2>
            <p style={{ fontSize: 14, color: "var(--gray-mid)", marginBottom: 12 }}>Unidad de venta: <strong>{product.unit}</strong></p>

            <div style={{ background: "#F7F5F2", border: "1px solid var(--border)", padding: "10px 14px", marginBottom: 10 }}>
              <div style={{ fontSize: 11, color: "var(--gray-soft)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
                Colores disponibles
              </div>
              {colorList.length > 0 ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {colorList.map(c => (
                    <div key={c} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <ColorSwatch
                        name={c}
                        selected={selectedColor === c}
                        onSelect={name => setSelectedColor(prev => prev === name ? null : name)}
                      />
                      <span aria-hidden="true" style={{ fontSize: 10, color: "var(--gray-mid)", textTransform: "capitalize", textAlign: "center", maxWidth: 48, lineHeight: 1.2 }}>{c}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: 13, color: "var(--gray-dark)" }}>{product.colors}</div>
              )}
            </div>

          </div>

          {/* Precio y acción anclados abajo: el pedido se cierra sin scrollear */}
          <div style={{
            position: "sticky", bottom: 0, zIndex: 2,
            background: "white", borderTop: "1px solid var(--border)",
            padding: isMobile ? "14px 20px 20px" : "14px 26px 20px",
          }}>
            <div style={{ fontFamily: "Barlow Condensed", fontSize: isMobile ? 28 : 32, fontWeight: 800, color: "var(--red)", marginBottom: 12 }}>
              ${product.price.toLocaleString("es-AR")} <span style={{ fontSize: 15, fontWeight: 400, color: "var(--gray-mid)" }}>{product.unit}</span>
            </div>

            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", border: "2px solid var(--border-mid)" }}>
                <button type="button" aria-label="Restar una unidad" onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 44, height: 44, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><IconMinus /></button>
                <span aria-live="polite" style={{ width: 32, textAlign: "center", fontWeight: 700 }}>
                  {qty}<span className="sr-only"> unidades a agregar</span>
                </span>
                <button type="button" aria-label="Sumar una unidad" onClick={() => setQty(q => q + 1)} style={{ width: 44, height: 44, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><IconPlus /></button>
              </div>
              <button type="button" className="btn" onClick={handleAdd} style={{
                flex: 1, minHeight: 44,
                background: added ? "var(--ok)" : "var(--red)",
                color: "white", fontWeight: 700, fontSize: 15,
                transition: "background-color var(--t-ui) var(--ease-smooth)",
              }}>
                {added ? "✓ Agregado al pedido" : "Agregar al pedido"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CART DRAWER ─────────────────────────────────────────────────────────────

function CartDrawer({ cart, open, onClose, onRemove, onQty, currency }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const panel = React.useRef(null);
  useBodyLock(open);
  useLayer(open, onClose, panel);

  const mensajePedido = () => {
    const lines = cart.map(i => {
      const colorNote = i.selectedColor ? ` (${i.selectedColor})` : "";
      return `• ${i.name}${colorNote} x${i.qty} (${i.unit}) — $${(i.price * i.qty).toLocaleString("es-AR")}`;
    }).join("\n");
    return `Hola, quiero hacer el siguiente pedido mayorista:\n\n${lines}\n\nTotal: $${total.toLocaleString("es-AR")} ${currency}`;
  };

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} aria-hidden="true" style={{
        position: "fixed", inset: 0, background: "rgba(12,12,12,0.6)",
        zIndex: 900, opacity: open ? 1 : 0, pointerEvents: open ? "all" : "none",
        transition: "opacity var(--t-panel) var(--ease-smooth)",
        backdropFilter: "blur(3px)",
        WebkitBackdropFilter: "blur(3px)",
      }} />

      {/* Drawer */}
      <div
        ref={panel}
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mi pedido"
        aria-hidden={!open}
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0, width: 400, maxWidth: "95vw",
          background: "#FAFAF8", zIndex: 901,
          display: "flex", flexDirection: "column",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform var(--t-panel) var(--ease-spring), visibility var(--t-panel)",
          boxShadow: "var(--sh-over)",
        }}>

        {/* Header */}
        <div style={{
          padding: "18px 20px 16px",
          background: "white",
          borderBottom: "1.5px solid #EAE4DA",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <h2 style={{ fontFamily: "Barlow Condensed", fontSize: 24, fontWeight: 800, letterSpacing: "0.02em", color: "var(--black)" }}>
              MI PEDIDO
            </h2>
            {count > 0 && (
              <span style={{
                background: "var(--red)", color: "white",
                fontFamily: "Barlow", fontWeight: 700, fontSize: 11,
                padding: "2px 9px", borderRadius: 99,
                letterSpacing: "0.03em",
              }}>
                {count} {count === 1 ? "ítem" : "ítems"}
              </span>
            )}
          </div>
          <button type="button" onClick={onClose} aria-label="Cerrar el pedido" style={{
            background: "#EEE8E0", border: "none", cursor: "pointer",
            width: 44, height: 44, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "var(--gray-mid)", flexShrink: 0,
          }}>
            <IconClose />
          </button>
        </div>

        {/* Items list */}
        <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
          {cart.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", paddingBottom: 80, gap: 0 }}>
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" style={{ opacity: 0.18, marginBottom: 18 }}>
                <circle cx="32" cy="32" r="31" stroke="#0C0C0C" strokeWidth="1.5" />
                <path d="M19 24h26l-3 15H22L19 24z" stroke="#0C0C0C" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M25 24l2-8h10l2 8" stroke="#0C0C0C" strokeWidth="1.5" strokeLinejoin="round" />
                <circle cx="27" cy="43" r="1.5" fill="#0C0C0C" />
                <circle cx="37" cy="43" r="1.5" fill="#0C0C0C" />
              </svg>
              <div style={{ fontFamily: "Barlow Condensed", fontSize: 20, fontWeight: 800, color: "var(--black)", marginBottom: 6, letterSpacing: "0.01em" }}>
                Tu pedido está vacío
              </div>
              <div style={{ fontSize: 14, color: "var(--gray-soft)", textAlign: "center", lineHeight: 1.6, maxWidth: 220, marginBottom: 18 }}>
                Elegí productos del catálogo, ajustá las cantidades y envianos el detalle por WhatsApp.
              </div>
              <button type="button" className="btn btn-add" onClick={onClose} style={{ width: "auto", padding: "11px 22px" }}>
                Ver el catálogo
              </button>
            </div>
          ) : cart.map((item, i) => {
            const key = item.cartKey || String(item.id);
            const subtotal = item.price * item.qty;
            return (
              <div key={key} className="cart-item" style={{
                background: "white",
                border: "1.5px solid #E8E2D8",
                padding: "12px 12px 12px 12px",
                display: "flex", gap: 11, alignItems: "flex-start",
                position: "relative",
                animationDelay: `${i * 0.035}s`,
              }}>
                {/* Thumbnail */}
                <div style={{ width: 58, height: 58, background: "#fff", border: "1px solid var(--border)", flexShrink: 0, overflow: "hidden" }}>
                  <ProductImg type={item.img} colorSrc={item.selectedColor ? getColorImageSrc(item.img, item.selectedColor) : null} size={58} alt="" />
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0, paddingRight: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, lineHeight: 1.3, color: "var(--black)", marginBottom: 3 }}>
                    {item.name}
                  </div>
                  {item.selectedColor && (
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 3 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, ...colorStyle(item.selectedColor) }} />
                      <span style={{ fontSize: 11, color: "var(--gray-mid)", textTransform: "capitalize" }}>{item.selectedColor}</span>
                    </div>
                  )}
                  <div style={{ fontSize: 12, color: "var(--gray-soft)", marginBottom: 10 }}>{item.unit}</div>

                  {/* Stepper + subtotal */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", border: "1.5px solid var(--border-mid)", overflow: "hidden", height: 34 }}>
                      <button type="button" aria-label={`Restar una unidad de ${item.name}`} onClick={() => onQty(key, -1)} style={{
                        width: 34, height: "100%", background: "none", border: "none",
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                        color: "var(--gray-mid)",
                      }}>
                        <IconMinus />
                      </button>
                      <span style={{
                        width: 34, textAlign: "center",
                        fontFamily: "Barlow Condensed", fontWeight: 800, fontSize: 17,
                        color: "var(--black)",
                        borderLeft: "1.5px solid var(--border-mid)", borderRight: "1.5px solid var(--border-mid)",
                        lineHeight: "32px",
                      }}>
                        {item.qty}
                      </span>
                      <button type="button" aria-label={`Sumar una unidad de ${item.name}`} onClick={() => onQty(key, 1)} style={{
                        width: 34, height: "100%", background: "var(--red)", border: "none",
                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                        color: "white",
                      }}>
                        <IconPlus />
                      </button>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "Barlow Condensed", fontSize: 19, fontWeight: 800, color: "var(--black)", lineHeight: 1 }}>
                        ${subtotal.toLocaleString("es-AR")}
                      </div>
                      {item.qty > 1 && (
                        <div style={{ fontSize: 11, color: "var(--gray-soft)", marginTop: 2 }}>
                          ${item.price.toLocaleString("es-AR")} c/u
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Remove */}
                <button type="button" className="cart-remove" onClick={() => onRemove(key)}
                  aria-label={`Quitar ${item.name} del pedido`}>
                  <IconClose />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{
            background: "white",
            borderTop: "1.5px solid #EAE4DA",
            padding: "18px 20px 24px",
            flexShrink: 0,
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--gray-soft)", marginBottom: 12 }}>
              <span>{cart.length} {cart.length === 1 ? "producto distinto" : "productos distintos"}</span>
              <span>{count} unidades en total</span>
            </div>

            <div style={{ borderTop: "1px dashed #DDD7CE", marginBottom: 14 }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 18 }}>
              <span style={{ fontFamily: "Barlow Condensed", fontSize: 14, fontWeight: 700, letterSpacing: "0.08em", color: "var(--gray-mid)", textTransform: "uppercase" }}>
                Total
              </span>
              <div>
                <span style={{ fontFamily: "Barlow Condensed", fontSize: 36, fontWeight: 800, color: "var(--black)", lineHeight: 1 }}>
                  ${total.toLocaleString("es-AR")}
                </span>
                <span style={{ fontSize: 13, color: "var(--gray-soft)", marginLeft: 5 }}>{currency}</span>
              </div>
            </div>

            {WA_ACTIVO ? (
              <>
                <a className="btn btn-wa" href={linkWhatsApp(mensajePedido())} target="_blank" rel="noopener" style={{
                  width: "100%", padding: "15px", minHeight: 52,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                  textDecoration: "none",
                }}>
                  <IconWA /> ENVIAR PEDIDO POR WHATSAPP
                </a>
                <p style={{ fontSize: 12, color: "var(--gray-soft)", textAlign: "center", marginTop: 8, lineHeight: 1.5 }}>
                  Se abre WhatsApp con el detalle completo. Te confirmamos stock y envío por ese chat.
                </p>
              </>
            ) : (
              <p style={{
                fontSize: 13, color: "var(--gray-mid)", lineHeight: 1.5,
                background: "var(--red-light)", border: "1px solid var(--border)", padding: "12px 14px",
              }}>
                <strong>Falta configurar el WhatsApp.</strong> Cargá el número en <code>CONFIG.whatsapp</code> (app.js)
                para habilitar el envío del pedido.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [cart, setCart] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem("fdp2_cart") || "[]"); } catch { return []; }
  });
  const [cartOpen, setCartOpen] = React.useState(false);
  const [category, setCategory] = React.useState("Todo");
  const [search, setSearch] = React.useState("");
  const [modal, setModal] = React.useState(null);
  const [scrolled, setScrolled] = React.useState(false);
  const isMobile = useIsMobile();

  React.useEffect(() => {
    localStorage.setItem("fdp2_cart", JSON.stringify(cart));
  }, [cart]);

  React.useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (product) => {
    const cartKey = product.selectedColor
      ? `${product.id}_${colorSlug(product.selectedColor)}`
      : `${product.id}`;
    setCart(prev => {
      const ex = prev.find(i => (i.cartKey || String(i.id)) === cartKey);
      if (ex) return prev.map(i => (i.cartKey || String(i.id)) === cartKey ? { ...i, cartKey, qty: i.qty + 1 } : i);
      return [...prev, { ...product, cartKey, qty: 1 }];
    });
  };

  const handleQty = (cartKey, d) => {
    setCart(prev => {
      const item = prev.find(i => (i.cartKey || String(i.id)) === cartKey);
      if (!item) return prev;
      if (item.qty + d <= 0) return prev.filter(i => (i.cartKey || String(i.id)) !== cartKey);
      return prev.map(i => (i.cartKey || String(i.id)) === cartKey ? { ...i, qty: item.qty + d } : i);
    });
  };

  const handleRemove = (cartKey) => {
    setCart(prev => prev.filter(i => (i.cartKey || String(i.id)) !== cartKey));
  };

  const cols = isMobile ? 2 : (parseInt(tweaks.gridCols) || 4);

  const filtered = PRODUCTS.filter(p => {
    const matchCat = category === "Todo" || p.category === category;
    const matchS = p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchS;
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>

      {tweaks.showBanner && (
        <p style={{ background: "var(--black)", color: "#fff", textAlign: "center", padding: "9px 20px", fontSize: 12.5, fontWeight: 500, letterSpacing: "0.05em" }}>
          VENTA MAYORISTA · PEDIDO MÍNIMO CONSULTABLE · ENVÍOS A TODO EL PAÍS
        </p>
      )}

      <header className="on-red" style={{
        background: "var(--red)",
        position: "sticky", top: 0, zIndex: 700,
        boxShadow: scrolled ? "0 2px 12px rgba(0,0,0,0.25)" : "none",
        transition: "box-shadow var(--t-ui) var(--ease-smooth)",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "0 16px" : "0 32px", minHeight: isMobile ? 56 : 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <p style={{ fontFamily: "Barlow Condensed", fontSize: isMobile ? 20 : 26, fontWeight: 800, color: "white", letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
            FLOR DE PAPELERA
          </p>

          {!isMobile && (
            <search style={{ flex: 1, maxWidth: 480, position: "relative", display: "block" }}>
              <label className="sr-only" htmlFor="buscar">Buscar productos del catálogo</label>
              <input
                id="buscar"
                type="search"
                className="field"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar productos..."
                style={{ paddingRight: 44 }}
              />
              {search && (
                <button type="button" onClick={() => setSearch("")} aria-label="Borrar la búsqueda"
                  style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44 }}><IconClose /></button>
              )}
            </search>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 4 : 8 }}>
            {!isMobile && (
              <a href={CONFIG.instagram} target="_blank" rel="noopener" aria-label="Flor de Papelera en Instagram"
                style={{ color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44 }}><IconIG /></a>
            )}
            {!isMobile && (
              <a href={CONFIG.facebook} target="_blank" rel="noopener" aria-label="Flor de Papelera en Facebook"
                style={{ color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44 }}><IconFB /></a>
            )}
            <button type="button" onClick={() => setCartOpen(true)}
              aria-label={cartCount > 0 ? `Ver mi pedido: ${cartCount} ${cartCount === 1 ? "unidad" : "unidades"}` : "Ver mi pedido (vacío)"}
              style={{
                background: "white", color: "var(--red)", border: "none",
                padding: isMobile ? "8px 12px" : "9px 18px", minHeight: 40, cursor: "pointer",
                fontFamily: "Barlow", fontWeight: 700, fontSize: 14,
                display: "flex", alignItems: "center", gap: 6, marginLeft: 4,
              }}>
              <IconCart />
              <span aria-hidden="true">
                {isMobile
                  ? (cartCount > 0 ? cartCount : null)
                  : (cartCount > 0 ? `Pedido (${cartCount})` : "Pedido")
                }
              </span>
            </button>
          </div>
        </div>

        {isMobile && (
          <search style={{ display: "block", padding: "0 16px 10px", background: "var(--red)", position: "relative" }}>
            <label className="sr-only" htmlFor="buscar-mobile">Buscar productos del catálogo</label>
            <input
              id="buscar-mobile"
              type="search"
              className="field"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar productos..."
              style={{ paddingRight: 48 }}
            />
            {search && (
              <button type="button" onClick={() => setSearch("")} aria-label="Borrar la búsqueda"
                style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44 }}><IconClose /></button>
            )}
          </search>
        )}

        <nav aria-label="Categorías del catálogo" style={{ background: "var(--red-dark)", borderTop: "1px solid rgba(255,255,255,0.15)" }}>
          {isMobile ? (
            <div style={{ padding: "8px 16px" }}>
              <label className="sr-only" htmlFor="categoria">Filtrar por categoría</label>
              <select
                id="categoria"
                value={category}
                onChange={e => setCategory(e.target.value)}
                style={{
                  width: "100%", padding: "11px 12px", minHeight: 44,
                  background: "rgba(0,0,0,0.3)", color: "white",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontFamily: "Barlow", fontWeight: 600, fontSize: 13,
                  outline: "none", cursor: "pointer",
                  appearance: "none",
                  backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path fill='white' d='M0 0l6 8 6-8z'/></svg>")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                  paddingRight: 36,
                }}>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat} style={{ background: "var(--red-dark)", color: "white" }}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", display: "flex", gap: 0, overflowX: "auto" }}>
              {CATEGORIES.map(cat => (
                <button key={cat} type="button" className="cat-tab"
                  aria-pressed={category === cat}
                  onClick={() => setCategory(cat)}>{cat}</button>
              ))}
            </div>
          )}
        </nav>
      </header>

      <div style={{
        background: "var(--black)",
        padding: isMobile ? "24px 16px" : "36px 32px",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        justifyContent: "space-between",
        gap: isMobile ? 20 : 32,
      }}>
        <div style={{ maxWidth: 720 }}>
          <h1 style={{ fontFamily: "Barlow Condensed", fontSize: isMobile ? 34 : "clamp(32px,5vw,56px)", fontWeight: 800, color: "white", lineHeight: 1, letterSpacing: "0.01em" }}>
            VENTA MAYORISTA<br /><span style={{ color: "var(--red-on-dark)" }}>DESCARTABLES Y BOLSAS</span>
          </h1>
          <p style={{ color: "var(--on-dark)", fontSize: isMobile ? 15 : 16, marginTop: 14, lineHeight: 1.6 }}>
            Bolsas de papel, cajas decoradas, vasos y cubiertos descartables, papeles cupcake y más. Consultá precios por mayor.
          </p>
        </div>
        {tweaks.showMinOrder && (
          <div className="on-red" style={{ background: "var(--red)", padding: "16px 24px", width: isMobile ? "100%" : "auto", minWidth: isMobile ? 0 : 200 }}>
            <p style={{ fontFamily: "Barlow Condensed", fontSize: 13, fontWeight: 700, color: "var(--on-red)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Pedido mínimo</p>
            <p style={{ fontFamily: "Barlow Condensed", fontSize: isMobile ? 28 : 36, fontWeight: 800, color: "white", lineHeight: 1 }}>Consultable</p>
            <p style={{ fontSize: 12.5, color: "var(--on-red)", marginTop: 6 }}>Escribinos y te pasamos las condiciones</p>
          </div>
        )}
      </div>

      <main id="catalogo" style={{ maxWidth: 1280, margin: "0 auto", padding: isMobile ? "16px 12px 48px" : "28px 32px 60px" }}>
        <div className="catalog-rule" style={{ marginBottom: 20 }}>
          <h2 style={{ fontFamily: "Barlow Condensed", fontSize: 22, fontWeight: 700, letterSpacing: "0.02em" }}>
            {category === "Todo" ? "TODOS LOS PRODUCTOS" : category.toUpperCase()}
            <span style={{ fontSize: 14, fontWeight: 400, color: "var(--gray-soft)", marginLeft: 10 }}>
              ({filtered.length} {filtered.length === 1 ? "artículo" : "artículos"})
            </span>
          </h2>
        </div>

        <div className="catalog-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {filtered.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              cart={cart}
              priority={i < cols}
              onOpen={setModal}
              onAdd={addToCart}
              onQty={handleQty}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "72px 0", color: "var(--gray-mid)" }}>
            <p style={{ fontFamily: "Barlow Condensed", fontSize: 24, fontWeight: 700, color: "var(--black)" }}>
              No encontramos nada con esa búsqueda
            </p>
            <p style={{ fontSize: 15, marginTop: 8, marginBottom: 20 }}>
              Probá con otra palabra{category !== "Todo" ? ` o mirá todas las categorías` : ""}. Si el producto que buscás no está en el catálogo, consultanos: trabajamos a pedido.
            </p>
            <button type="button" className="btn btn-add" style={{ width: "auto", padding: "11px 22px" }}
              onClick={() => { setSearch(""); setCategory("Todo"); }}>
              Ver todo el catálogo
            </button>
          </div>
        )}
      </main>

      <div className="on-red" style={{ background: "var(--red)", padding: isMobile ? "24px 16px" : "32px", display: isMobile ? "grid" : "flex", gridTemplateColumns: isMobile ? "1fr 1fr" : undefined, justifyContent: "center", gap: isMobile ? 20 : 60, flexWrap: "wrap" }}>
        {[
          { label: "Envíos", val: "Todo el país" },
          { label: "Pago", val: "Efectivo / Transferencia" },
          { label: "Atención", val: "Lun–Sáb 9–18hs" },
          { label: "Contacto", val: "WhatsApp / RRSS" },
        ].map(item => (
          <div key={item.label} style={{ textAlign: "center" }}>
            <p style={{ fontSize: 11.5, fontWeight: 600, color: "var(--on-red)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{item.label}</p>
            <p style={{ fontFamily: "Barlow Condensed", fontSize: 20, fontWeight: 700, color: "white", marginTop: 2 }}>{item.val}</p>
          </div>
        ))}
      </div>

      <footer className="site-footer" style={{ background: "var(--black)", padding: isMobile ? "24px 16px" : "28px 32px", display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: 16 }}>
        <div>
          <p style={{ fontFamily: "Barlow Condensed", fontSize: 20, fontWeight: 800, color: "white" }}>FLOR DE PAPELERA</p>
          <p style={{ fontSize: 13, color: "var(--on-dark)", marginTop: 2 }}>Venta mayorista de descartables y bolsas</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <a href={CONFIG.instagram} target="_blank" rel="noopener" style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 14, minHeight: 44, padding: "0 4px" }}><IconIG /> @flordepapelera</a>
          <a href={CONFIG.facebook} target="_blank" rel="noopener" style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 14, minHeight: 44, padding: "0 4px" }}><IconFB /> Facebook</a>
        </div>
        <p style={{ fontSize: 12.5, color: "var(--on-dark-dim)" }}>© {new Date().getFullYear()} Flor de Papelera</p>
      </footer>

      {WA_ACTIVO && (
        <a className="wa-fab" href={linkWhatsApp("Hola, quisiera consultar precios por mayor.")}
          target="_blank" rel="noopener" aria-label="Consultar precios por WhatsApp">
          <IconWA />
        </a>
      )}

      <CartDrawer
        cart={cart}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onRemove={handleRemove}
        onQty={handleQty}
        currency={tweaks.currency}
      />

      {modal && <ProductModal product={modal} onClose={() => setModal(null)} onAdd={addToCart} />}

      <TweaksPanel>
        <TweakSection title="Catálogo">
          <TweakRadio id="gridCols" label="Columnas" value={tweaks.gridCols}
            options={[{ value: "3", label: "3" }, { value: "4", label: "4" }, { value: "5", label: "5" }]}
            onChange={v => setTweak("gridCols", v)} />
        </TweakSection>
        <TweakSection title="Secciones">
          <TweakToggle id="showBanner" label="Banner superior" value={tweaks.showBanner} onChange={v => setTweak("showBanner", v)} />
          <TweakToggle id="showMinOrder" label="Caja pedido mínimo" value={tweaks.showMinOrder} onChange={v => setTweak("showMinOrder", v)} />
        </TweakSection>
        <TweakSection title="Pedidos">
          <TweakSelect id="currency" label="Moneda" value={tweaks.currency}
            options={[{ value: "ARS", label: "ARS" }, { value: "USD", label: "USD" }]}
            onChange={v => setTweak("currency", v)} />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
