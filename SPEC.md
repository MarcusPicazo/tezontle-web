# SPEC — Sitio web de Tezontle 3D (v2: video en lugar de torre 3D)

## 1. Objetivo
Sitio de una sola página de **Tezontle 3D**, proptech mexicana que hace showrooms virtuales 3D
con inventario en vivo para preventas inmobiliarias.
El sitio ES la demostración: mientras el visitante hace scroll, unos bloques de tezontle se
convierten en una torre que se levanta piso por piso (video generado con IA que avanza y
retrocede con el scroll), y después se ve el producto real funcionando (grabaciones de pantalla).

Visitante: director comercial o de marketing de una desarrolladora (CDMX, Tulum, Qro, MTY, GDL),
o un asesor inmobiliario. Acción principal: **Ver la demo**. Secundaria: **Agendar llamada**.
Sin precios en el sitio.

## 2. Marca
- Nombre en el logo: "tezontle". En títulos, SEO y redes: "Tezontle 3D".
- Tipografía: Fraunces (títulos) + Manrope (texto e interfaz), servidas en local.
- Símbolo: tres bloques horizontales apilados; el de en medio en rojo tezontle y desplazado
  (public/logo.svg y public/favicon.svg).
- Tono: de "usted", concreto, beneficios antes que tecnología. Decimos plataforma, licencia,
  mensualidad. Nunca "agencia" ni "página web".

### Colores y cómo se usan (el sitio es CLARO)
| Token | Hex | Uso |
|---|---|---|
| arena | #F4EFE8 | Fondo de toda la página |
| cal | #FBF9F5 | Tarjetas, header, superficies |
| grafito | #2B2B2B | Títulos y texto principal; borde de botones secundarios |
| tinta-suave | #5A544C | Texto secundario (contraste AA sobre arena) |
| piedra | #8C857B | Líneas, divisores, iconos. Nunca texto pequeño |
| latón | #C8A27A | Fondo del botón principal (texto grafito encima). Nunca como color de texto |
| rojo tezontle | #9A4535 | Solo el símbolo del logo y detalles mínimos (marca activa del raíl) |
| noche | #15171C | Solo la banda del video de la escena 6 y las pantallas de los mockups |

Nada de fondos oscuros fuera de lo que dice la tabla.

## 3. Recorrido (escenas del scroll) — textos en español / inglés
Texto a la izquierda, imagen/video ocupando la pantalla detrás (los encuadres dejan espacio
vacío a la izquierda para el texto). Raíl de progreso lateral en escritorio: 5 puntos
agrupados (no uno por escena), sincronizados con los enlaces del header — ver más abajo.

1. **A · Presentación** (`presentacion`) — imagen `1-piedra`, luego `clip-1` con el scroll
   (piedras → base). Título, subtítulo, línea pequeña y los 2 botones visibles desde el
   primer momento ("Ver la demo" latón → `demoUrl`; "El paquete" secundario → `#paquete`).
   Una sola pantalla, sin fijar.
   ES: "Sus compradores eligen su departamento desde el celular." · "Showroom virtual 3D con
   inventario en vivo para preventas." · "Para desarrolladoras que venden algo que todavía
   no existe."
   EN: "Let buyers choose their home from their phone." · "3D virtual showroom with live
   inventory for pre-sales." · "For developers selling what doesn't exist yet."
2. **B · Experiencia del comprador** (`experiencia`) — `clip-2` con el scroll, la torre sube
   piso por piso. A diferencia de A y C, esta escena SÍ se fija (`pin`, 150dvh): durante el
   fijado la torre termina de subir y, ya avanzada esa misma pantalla, entran en secuencia
   el mockup del celular con la ficha y luego el globo de WhatsApp "Hola, me interesa el
   804" — nunca dos escenas, una sola con una secuencia (`src/scripts/experienciaPin.ts`).
   ES: Etiqueta "Maqueta 3D". "Su comprador explora la torre, ve qué está disponible y le
   escribe por el departamento exacto."
   EN: Tag "3D model". "Buyers explore the tower, see what's available and message you
   about the exact unit."
3. **C · Control del equipo comercial** (`control`) — mismo fondo que B (último cuadro de
   `clip-2`, la torre completa, un poco atenuado), sin fijar. Mockup de laptop con el panel
   de ventas; la unidad 804 cambia de disponible a vendida con el scroll de la escena.
   ES: Etiqueta "Panel de ventas". "Su equipo actualiza precios, apartados y vendidos, y
   todo se refleja al instante." · "Sin Excel ni mensajes de '¿sigue disponible?'."
   EN: Tag "Sales panel". "Your team updates prices, reservations and sales, reflected
   instantly everywhere." · "No spreadsheets, no 'is it still available?' messages."
4. **El paquete** (`#paquete`) — fondo arena. Título "El paquete completo" / "The complete
   package" + entrada ("Tres piezas que trabajan juntas…" / "Three pieces that work
   together…"). Tres bloques alternados (video 16:10 a un lado, texto al otro; en móvil
   video arriba y texto abajo), cada uno con etiqueta, título, 1–2 frases, 3 viñetas y un
   botón:
   - **01 Maqueta 3D** — "Su torre en 3D, interactiva…" · botón "Visitar demo" → `demoMaquetaUrl`.
   - **02 Panel de ventas** — "Donde su equipo controla el inventario…" · botón "Solicitar
     demo del panel" → WhatsApp con mensaje propio.
   - **03 Landing cinematográfica** — "El sitio de su desarrollo…" (aquí vive ahora el video
     `aura-recorrido`, antes escena "La historia") · botón "Visitar demo" → `demoLandingUrl`.
   Videos en `public/video/paquete-{maqueta,panel,landing}.mp4` + pósteres en
   `public/paquete/{maqueta,panel,landing}.jpg` (no existen todavía — sin video cae al
   póster, sin póster a un marco piedra con el nombre del servicio). Debajo, tabla
   Esencial/Completo sin precios (maqueta+WhatsApp y panel en ambas columnas; landing
   "Adicional" en Esencial, incluida en Completo) + nota de cotización en 24h, botón
   "Pedir cotización" (→ `#contacto`) y link "Ver la demo". Nunca la palabra "CRM".
5. **Cómo trabajamos** — tres tarjetas cal sobre arena.
   ES: "1. Nos envía renders, planos y precios. 2. En dos semanas está listo. 3. Lo publicamos con su marca."
   EN: "1. Send us renders, plans and prices. 2. Ready in two weeks. 3. Published with your brand."
6. **Contacto** (`#contacto`, antes "El nombre") — imagen `5-piedra-detalle` a pantalla
   completa con degradado oscuro. Texto de la piedra a la izquierda (se conserva):
   ES: "El tezontle es la piedra volcánica con la que se levantó la Ciudad de México.
   Nosotros ponemos la base digital para vender lo que se construye."
   EN: "Tezontle is the volcanic stone that built Mexico City. We lay the digital
   foundation to sell what's being built."
   A la derecha (abajo en móvil), tarjeta de vidrio oscuro "Hablemos de su proyecto" con
   formulario (Nombre, Desarrolladora, Ciudad del proyecto, Número de departamentos,
   WhatsApp o teléfono, Mensaje opcional) — botón "Enviar por WhatsApp" arma el mensaje con
   los datos y abre `wa.me`, sin backend ni datos guardados en ningún servidor. Debajo:
   "Agendar llamada", correo, aviso de respuesta en 24 horas.
7. **Cierre** — `clip-3` con el scroll: la luz pasa de día a atardecer sobre la torre.
   ES: "Véala funcionando." Botones: "Ver la demo" · "Agendar llamada" · WhatsApp.
   EN: "See it live." Buttons: "See the demo" · "Book a call" · WhatsApp.
Pie: aviso de privacidad, © Tezontle 3D, selector ES/EN, correo.

### Header y raíl
Header: El showroom 3D (`#experiencia`) · El paquete (`#paquete`) · Cómo trabajamos
(`#comoTrabajamos`) · Contacto (`#contacto`) + botón "Ver la demo". El raíl lateral agrupa
las 7 escenas en 5 puntos sincronizados con el header (mismo observer): Inicio (escena A,
= logo) · Showroom (B y C) · Paquete · Proceso (Cómo trabajamos) · Contacto (Contacto +
Cierre + pie). Al entrar una escena en el centro de la pantalla se marcan a la vez el punto
del raíl y el enlace del header de su grupo (texto al 100% + línea latón fija debajo);
nombre del grupo visible al pasar el cursor o enfocar el punto. Clic en cualquiera de los
dos usa scroll suave con aceleración/desaceleración (Lenis). Se oculta en móvil.

## 4. Imágenes y videos
### Archivos (el material original vive en E:\tezontle-material\01-sitio-web\: imágenes en `imagenes\`, clips en `videos\`, grabaciones en `grabaciones\`)
- Imágenes: `1-piedra.jpg`, `2-cimientos.jpg`, `3-torre.jpg`, `4-atardecer.jpg`, `5-piedra-detalle.jpg`.
- Videos IA (Google Flow, primer y último cuadro encadenados): `clip-1.mp4` (1→2),
  `clip-2.mp4` (2→3), `clip-3.mp4` (3→4).
- Grabaciones de pantalla (en `grabaciones\`): `grab-selector.mp4`, `grab-panel.mp4`, `aura-recorrido.mp4`.

### Video que avanza con el scroll (clips 1, 2 y 3)
- Misma técnica que E:\arko-landing (leer `world.ts` y copiar; no importar).
- Recodificar con ffmpeg: H.264, `-g 6`, BT.709, sin audio (`-an`), 1920 px de ancho para
  escritorio y 960 px para celular; `+faststart`. Póster = primer cuadro.
- Avanza y retrocede con el scroll, sin autoplay. Precargar solo el clip actual y el siguiente.

### Grabaciones (selector, panel, Aura)
- Recortadas a lo esencial (8–15 s), sin audio, máx. ~2 MB cada una, con póster.
- Se reproducen en loop, silenciadas, solo cuando están en pantalla; se pausan fuera.

### Fallback
- prefers-reduced-motion, ahorro de datos o conexión lenta: imágenes fijas por escena
  (las 5 imágenes + pósteres), sin video.

## 5. Configuración (src/data/site.ts)
- demoUrl: URL de la demo de Aura (placeholder "#").
- demoMaquetaUrl / demoLandingUrl: demos de la maqueta 3D y la landing (sección "El
  paquete"), placeholder "#".
- whatsapp: número y mensaje ("Hola, quiero ver una demo de Tezontle 3D."), placeholder.
  buildWhatsappHref(mensaje) arma enlaces de wa.me con mensajes a la medida (demo del panel
  en "El paquete", formulario de #contacto).
- calendarUrl: enlace de Cal.com o Calendly, placeholder.
- email: hola@tezontle3d.com (placeholder).
- Todos los textos ES/EN en src/i18n/es.ts y en.ts.

## 6. Stack
Astro + Tailwind 4 + GSAP ScrollTrigger + Lenis (como E:\arko-landing). Sin Three.js ni React
Three Fiber. Mockups de celular y laptop en HTML/CSS. Despliegue en Vercel o Netlify.

## 7. SEO y medición
- Título: "Tezontle 3D · Showroom virtual para preventas inmobiliarias".
- Descripción, Open Graph e imagen para compartir (1200×630) hecha con `3-torre.jpg` y el logo.
- hreflang es/en, sitemap, robots, datos estructurados Organization.
- Analítica ligera (Plausible o PostHog) con eventos: clic en Ver la demo, Agendar, WhatsApp.

## 8. Criterios de terminado
- Carga inicial < 3 s en 4G; scroll fluido en Android medio; funciona en Safari de iPhone.
- El recorrido funciona hacia adelante y hacia atrás sin saltos.
- Ningún botón muerto. Contraste AA en todo el texto.
- ES/EN completos. Sin pantallas en blanco. Colores solo según la tabla de §2.
