# Flor de Papelera — guía de diseño y mantenimiento

## Lectura de diseño

> Catálogo mayorista para revendedoras, kiosqueras y organizadoras de fiestas de
> Argentina, que entran desde el celular y cierran el pedido por WhatsApp.
> Estilo: catálogo impreso de papelera.
> **Energía 2 / Ritmo 1 / Movimiento 1.**

La página tiene **un solo trabajo**: que la clienta encuentre el producto, elija
color y cantidad, y mande el pedido. Todo lo demás (animaciones, secciones de
relleno, testimonios) sobra y por eso no está.

## Decisiones, en una línea cada una

| Decisión | Por qué |
|---|---|
| Rojo señalético + negro tinta + papel crudo | Es la paleta de un catálogo mayorista impreso, no de una SaaS. |
| Esquinas vivas, sin radios | Papel cortado a guillotina: coherente con el rubro. |
| Barlow Condensed en títulos y precios | Condensada = etiqueta de precio; aguanta nombres largos sin romper la grilla. |
| Fondo de lunares | Son el papel de lunares que venden. Decoración con motivo, no ruido. |
| Foto sobre blanco, `object-fit: contain` | En mayorista se compra por la forma y el color exactos: el producto se ve entero. |
| Sin sombras salvo en capas | Las tarjetas se separan por borde, no por sombra. |

## Tokens (viven en `styles.css`, en `:root`)

- **Color:** `--red #C41010` (marca), `--red-on-dark #E8322A` (el mismo rojo aclarado
  para fondo negro), `--black`, `--bg #F0EAE0`, grises `--gray-mid` / `--gray-soft`,
  `--on-dark` / `--on-dark-dim` para texto sobre negro, `--on-red` para texto sobre rojo,
  `--wa` para WhatsApp. **Todos los pares texto/fondo cumplen WCAG AA** (4.5:1 texto
  normal, 3:1 texto grande y controles). Si cambiás un color, volvé a verificar.
- **Espaciado:** `--s1`…`--s8` (4, 8, 12, 16, 24, 32, 48, 64).
- **Movimiento:** `--t-micro` 130ms, `--t-ui` 200ms, `--t-panel` 300ms; `--ease-spring`
  para entradas, `--ease-smooth` para el resto. Nada se anima salvo para mostrar un
  cambio de estado.

## Pendiente antes de publicar

1. **Cargar el WhatsApp real** en `CONFIG` (arriba de `app.js`): poné el número en
   `whatsapp` (código de país + área, sin `+`, sin `0`, sin `15`, sin espacios, ej.
   `5491122334455`) y pasá `whatsappListo` a `true`.
   Mientras esté en `false`, el botón flotante y el botón "Enviar pedido" **no se
   muestran**: es preferible que no estén a que abran un chat con un número inventado.
   En el panel del pedido aparece un aviso recordándolo.
2. **Revisar precios y unidades** en `PRODUCTS` (`app.js`): hoy son los que estaban
   cargados; confirmá que estén actualizados antes de mostrarlos públicamente.
3. **Fotos**: las imágenes tienen fondos distintos (blanco, gris, rosa). Si alguna vez
   se refotografían, usar siempre fondo blanco: la grilla se ve mucho más prolija.

## Cómo actualizar el catálogo

Todo el contenido está en `app.js`, arriba de todo:

- `CATEGORIES`: las solapas, en orden.
- `PRODUCTS`: un objeto por producto.
  `colors` es texto separado por comas; cada color sólo muestra una muestra circular
  si existe en `COLOR_HEX` (si agregás un color nuevo, agregalo también ahí).
  `img` es la foto base; si existe `Images/<base>-<color>.png` se muestra esa foto al
  elegir ese color (ej. `bag-plain.png` + color "rojo" → `bag-plain-rojo.png`).
- Si falta una foto, se muestra un marcador "sin imagen" en vez de romper el layout.

## Estados cubiertos

- Carrito vacío → explica qué hacer y ofrece volver al catálogo.
- Búsqueda sin resultados → invita a consultar y ofrece "Ver todo el catálogo".
- Imagen faltante → marcador con el nombre del producto en el texto alternativo.
- WhatsApp sin configurar → aviso explícito en vez de un botón muerto.

## Accesibilidad (piso que hay que mantener)

- Todo se opera con teclado: el título de cada tarjeta es un botón real; `Escape`
  cierra el detalle y el panel del pedido; el foco entra a la capa y vuelve al
  disparador al cerrar; el panel cerrado sale del orden de tabulación.
- Foco visible siempre (`:focus-visible`, blanco sobre rojo, negro sobre claro).
- Objetivos táctiles de 44px en botones y enlaces; muestras de color de 28px.
- Encabezados en orden: `h1` (hero) → `h2` (sección / detalle / pedido) → `h3` (producto).
- Se respeta `prefers-reduced-motion`.

## Rendimiento (lo que falta)

El sitio compila JSX en el navegador con Babel standalone (~3 MB). Funciona sin build
y permite editar `app.js` a mano, pero es la mayor deuda de carga. Si el tráfico
crece, precompilar `app.js` y `tweaks-panel.jsx` con Babel CLI y servir el resultado
ya compilado (sin cargar `babel.min.js`) baja el LCP de forma notable. React ya se
sirve en versión de producción y con `integrity` (SRI).
