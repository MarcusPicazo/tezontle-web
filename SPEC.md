# SPEC — Sitio web de Tezontle 3D

## 1. Objetivo
Sitio de una sola página de **Tezontle 3D**, proptech mexicana que hace showrooms virtuales 3D
con inventario en vivo para preventas inmobiliarias.
El sitio ES la demostración: mientras el visitante hace scroll, una torre se levanta nivel por
nivel desde bloques de piedra y cada nivel cuenta una parte del producto.

Visitante: director comercial o de marketing de una desarrolladora (CDMX, Tulum, Qro, MTY, GDL),
o un asesor inmobiliario. Acción principal: **Ver la demo**. Secundaria: **Agendar llamada**.
Sin precios en el sitio.

## 2. Marca
- Nombre en el logo: "tezontle". En títulos, SEO y redes: "Tezontle 3D".
- Colores: grafito #2B2B2B (texto), arena #F4EFE8 (fondo), cal #FBF9F5 (superficies),
  latón #C8A27A (acento y botones; nunca como texto), piedra #8C857B (detalles),
  noche #15171C (escenas oscuras), rojo tezontle #9A4535 (solo símbolo y detalles mínimos).
- Tipografía: Fraunces (títulos) + Manrope (texto e interfaz), servidas en local.
- Símbolo: tres bloques horizontales apilados; el de en medio en rojo tezontle y desplazado
  (archivo public/logo.svg y public/favicon.svg).
- Tono: de "usted", concreto, beneficios antes que tecnología. Decimos plataforma, licencia,
  mensualidad. Nunca "agencia" ni "página web".

## 3. Recorrido (escenas del scroll) — textos en español / inglés
Una escena 3D fija de fondo (canvas) controlada por el scroll; el texto de cada escena entra
y sale encima. Raíl de progreso lateral en escritorio.

1. **Piedra** — bloques de tezontle sueltos sobre fondo noche.
   ES: "Sus compradores eligen su departamento desde el celular."
   Sub: "Showroom virtual 3D con inventario en vivo para preventas."
   EN: "Let buyers choose their home from their phone." / "3D virtual showroom with live inventory for pre-sales."
2. **Cimientos** — los primeros 3 niveles se apilan.
   ES: "Vender en preventa es vender algo que todavía no existe." + 3 puntos:
   "Sin nada que mostrar" · "Inventario en Excel" · "Leads que no dicen qué quieren".
   EN: "Pre-sales means selling something that doesn't exist yet." · "Nothing to show" ·
   "Inventory in spreadsheets" · "Leads that don't say what they want".
3. **La torre** — la torre completa gira; las unidades se pintan verde/ámbar/gris.
   ES: "Su torre en 3D, con la disponibilidad real de cada departamento." Etiqueta: "Maqueta 3D".
   EN: "Your tower in 3D, with real availability for every unit." Tag: "3D model".
4. **El departamento** — la cámara se acerca a una unidad; aparece un celular con la ficha
   (plano, precio, pagos) y un mensaje de WhatsApp: "Hola, me interesa el 804".
   ES: "El comprador elige, y a su asesor le llega el lead con la unidad exacta."
   EN: "The buyer chooses, and your agent gets the lead with the exact unit."
5. **Vendido** — una unidad cambia sola de verde a gris; aparece un panel de laptop.
   ES: "Su equipo marca apartado o vendido, y se actualiza en todas las pantallas." Etiqueta: "Panel de ventas".
   EN: "Your team marks units reserved or sold, and every screen updates." Tag: "Sales panel".
6. **La historia** — fragmento en video del recorrido de la landing de Aura
   (public/video/aura-recorrido.mp4, se agrega después).
   ES: "Y un sitio cinematográfico que cuenta su proyecto." Etiqueta: "Landing".
   EN: "And a cinematic site that tells your project's story."
7. **Cómo trabajamos** — tres bloques sobre la base del edificio.
   ES: "1. Nos envía renders, planos y precios. 2. En dos semanas está listo. 3. Lo publicamos con su marca."
   EN: "1. Send us renders, plans and prices. 2. Ready in two weeks. 3. Published with your brand."
8. **El nombre** — textura de piedra en primer plano.
   ES: "El tezontle es la piedra volcánica con la que se levantó la Ciudad de México. Nosotros
   ponemos la base digital para vender lo que se construye."
   EN: "Tezontle is the volcanic stone that built Mexico City. We lay the digital foundation to sell what's being built."
9. **Cierre** — la torre terminada al atardecer.
   ES: "Véala funcionando." Botones: "Ver la demo" · "Agendar llamada" · WhatsApp.
   EN: "See it live." Buttons: "See the demo" · "Book a call" · WhatsApp.
Pie: aviso de privacidad, © Tezontle 3D, selector ES/EN, correo.

## 4. La escena 3D
- Torre procedural simplificada (no modelos 3D): losas, vidrio y canceles, con la estética de la
  maqueta de Aura. Referencia de geometría: E:\aura-demo\src\engine y src\lib\geometry.ts
  (copiar y simplificar; NO importar del otro proyecto).
- Escena 1: bloques sueltos. Escena 2: los niveles se apilan uno por uno según el scroll.
  Escena 3: torre completa con órbita lenta y colores de estado. Escena 4: cámara hacia una
  unidad. Escena 5: esa unidad cambia a vendida. Escena 9: luz de atardecer.
- Todo el movimiento depende del scroll (hacia atrás también), sin autoplay.
- Rendimiento: frameloop="demand", geometría instanciada, DPR adaptativo.
- Fallback: en móvil de gama baja, prefers-reduced-motion o ahorro de datos, imágenes fijas
  por escena (capturas de la propia escena en public/stills/).

## 5. Configuración (src/data/site.ts)
- demoUrl: URL de la demo de Aura (placeholder "#").
- whatsapp: número y mensaje ("Hola, quiero ver una demo de Tezontle 3D."), placeholder.
- calendarUrl: enlace de Cal.com o Calendly, placeholder.
- email: hola@tezontle3d.com (placeholder).
- Todos los textos ES/EN en src/i18n/es.ts y en.ts.

## 6. Stack
Astro + Tailwind 4 + GSAP ScrollTrigger + Lenis (como E:\arko-landing) + una isla de
React Three Fiber (@astrojs/react, three, @react-three/fiber, @react-three/drei).
Despliegue en Vercel.

## 7. SEO y medición
- Título: "Tezontle 3D · Showroom virtual para preventas inmobiliarias".
- Descripción, Open Graph e imagen para compartir (1200×630) con la torre.
- hreflang es/en, sitemap, robots, datos estructurados Organization.
- Analítica ligera (Plausible o PostHog) con eventos: clic en Ver la demo, Agendar, WhatsApp.

## 8. Criterios de terminado
- Carga inicial < 3 s en 4G; ≥ 50 fps en Android medio; funciona en Safari de iPhone.
- El recorrido funciona hacia adelante y hacia atrás sin saltos.
- Ningún botón muerto. Texto legible sobre la escena (contraste AA).
- ES/EN completos. Sin pantallas en blanco.
