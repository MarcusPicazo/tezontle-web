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
vacío a la izquierda para el texto). Raíl de progreso lateral en escritorio.

1. **Piedra** — imagen `1-piedra`: bloques de tezontle sueltos sobre fondo arena.
   ES: "Sus compradores eligen su departamento desde el celular."
   Sub: "Showroom virtual 3D con inventario en vivo para preventas."
   EN: "Let buyers choose their home from their phone." / "3D virtual showroom with live inventory for pre-sales."
2. **Cimientos** — `clip-1` con el scroll: las piedras forman la base y suben los primeros 3 pisos.
   ES: "Vender en preventa es vender algo que todavía no existe." + 3 puntos:
   "Sin nada que mostrar" · "Inventario en Excel" · "Leads que no dicen qué quieren".
   EN: "Pre-sales means selling something that doesn't exist yet." · "Nothing to show" ·
   "Inventory in spreadsheets" · "Leads that don't say what they want".
3. **La torre** — `clip-2` con el scroll: la torre sube piso por piso hasta completarse. Al final
   entra un mockup de celular (HTML/CSS) con la grabación real del selector (`grab-selector`).
   ES: "Su torre en 3D, con la disponibilidad real de cada departamento." Etiqueta: "Maqueta 3D".
   EN: "Your tower in 3D, with real availability for every unit." Tag: "3D model".
4. **El departamento** — el mismo celular; aparece un globo de WhatsApp (HTML):
   "Hola, me interesa el 804".
   ES: "El comprador elige, y a su asesor le llega el lead con la unidad exacta."
   EN: "The buyer chooses, and your agent gets the lead with the exact unit."
5. **Vendido** — mockup de laptop (HTML/CSS) con la grabación real del panel (`grab-panel`).
   ES: "Su equipo marca apartado o vendido, y se actualiza en todas las pantallas." Etiqueta: "Panel de ventas".
   EN: "Your team marks units reserved or sold, and every screen updates." Tag: "Sales panel".
   Durante 3–5 el fondo es el último cuadro de `clip-2` (la torre completa), un poco atenuado.
6. **La historia** — banda noche con el video `aura-recorrido` de la landing de Aura.
   ES: "Y un sitio cinematográfico que cuenta su proyecto." Etiqueta: "Landing".
   EN: "And a cinematic site that tells your project's story."
7. **Cómo trabajamos** — tres tarjetas cal sobre arena.
   ES: "1. Nos envía renders, planos y precios. 2. En dos semanas está listo. 3. Lo publicamos con su marca."
   EN: "1. Send us renders, plans and prices. 2. Ready in two weeks. 3. Published with your brand."
8. **El nombre** — imagen `5-piedra-detalle` (textura de tezontle) a pantalla completa, con un
   velo claro para que el texto grafito se lea.
   ES: "El tezontle es la piedra volcánica con la que se levantó la Ciudad de México. Nosotros
   ponemos la base digital para vender lo que se construye."
   EN: "Tezontle is the volcanic stone that built Mexico City. We lay the digital foundation to sell what's being built."
9. **Cierre** — `clip-3` con el scroll: la luz pasa de día a atardecer sobre la torre.
   ES: "Véala funcionando." Botones: "Ver la demo" · "Agendar llamada" · WhatsApp.
   EN: "See it live." Buttons: "See the demo" · "Book a call" · WhatsApp.
Pie: aviso de privacidad, © Tezontle 3D, selector ES/EN, correo.

## 4. Imágenes y videos
### Archivos (el material original vive en E:\material tezontle web\)
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
- whatsapp: número y mensaje ("Hola, quiero ver una demo de Tezontle 3D."), placeholder.
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
