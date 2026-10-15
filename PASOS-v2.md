# Tezontle web · Pasos v2 (video IA en lugar de torre 3D)

Todo el material va en **E:\material tezontle web\** (créala). Nada en C:.

---

## ☐ Paso 1 · Colores y quitar la torre 3D (Claude Code, ya)
Abre Claude Code en E:\tezontle-web, escribe /clear y pega:

```
Actualicé SPEC.md y CLAUDE.md: léelos completos. Cambiamos de enfoque: la torre ya no es 3D, va a ser video (SPEC §4).
1. Quita la escena de React Three Fiber y desinstala three, @react-three/fiber, @react-three/drei y @astrojs/react si ya no se usan.
2. Corrige los colores de todo el sitio según la tabla de SPEC §2: el sitio es CLARO. Fondo arena, tarjetas cal, texto grafito, texto secundario #5A544C, botón principal latón con texto grafito, rojo solo en el logo y la marca activa del raíl, noche solo en la banda de la escena 6.
3. Header, raíl de progreso y selector ES/EN en versión clara.
4. Revisa que no quede ningún color suelto en los componentes: todo desde los tokens de src/styles/global.css.
Por ahora cada escena queda solo con su texto sobre arena. Dime qué cambiaste y cómo verlo.
```
Revisa en el navegador → pídele el commit.

---

## ☐ Paso 2 · Las 5 imágenes (Gemini o Flow)
**Orden importante:** primero la torre completa. Las demás se hacen EDITANDO esa misma imagen
(súbela y pide el cambio), para que la torre sea idéntica en todas.

**3-torre.jpg** (la principal, 16:9)
```
Architectural scale model of a slender modern 20-story residential tower, photographed in a minimal photo studio. Warm sand-colored seamless backdrop and floor (#F4EFE8). The tower has pale limestone concrete floor slabs, floor-to-ceiling glass with thin graphite mullions, small balconies, and a two-story base clad in rough red-brown volcanic tezontle stone. Soft natural daylight from the left, gentle soft shadow, clean, editorial, premium real-estate brand photography. Tower on the right third of the frame, empty sand space on the left. Three-quarter view, camera slightly low, 50mm lens. No people, no text, no logos, no other buildings. 16:9.
```

**2-cimientos.jpg** (sube 3-torre y pide)
```
Same image, same camera, same lighting, same backdrop. Show only the red tezontle stone base and the first three floors of the tower; everything above the third floor does not exist yet. Nothing else changes.
```

**1-piedra.jpg** (sube 3-torre y pide)
```
Same image, same camera, same lighting, same backdrop. The tower does not exist. In its exact place, eight rough red-brown tezontle volcanic stone blocks rest loosely on the sand floor, a few of them stacked, with visible porous texture. Nothing else changes.
```

**4-atardecer.jpg** (sube 3-torre y pide)
```
Same image, same tower, same camera, same backdrop. Change only the light: warm golden sunset light coming from the right, longer soft shadows, warm interior lights glowing in some windows. Nothing else changes.
```

**5-piedra-detalle.jpg** (nueva, 16:9)
```
Macro close-up of the porous surface of red-brown tezontle volcanic stone, soft natural daylight, shallow depth of field, warm sand tones, calm and premium, lots of even texture, no objects, no text. 16:9.
```

Guarda las 5 en E:\material tezontle web\ con esos nombres exactos. **Mándamelas antes de hacer los videos.**

---

## ☐ Paso 3 · Los 3 videos (Google Flow → Frames to Video)
Igual que con Aura: primer cuadro + último cuadro.

**clip-1.mp4** · primer cuadro 1-piedra · último cuadro 2-cimientos
```
Static camera. The loose tezontle stone blocks slide and settle into place, forming the stone base of the building; then the first three concrete floors rise from it, slab by slab, with the glass appearing. Smooth, precise, satisfying assembly, like a time-lapse of an architectural scale model. No camera cuts, no dissolves, no people.
```

**clip-2.mp4** · primer cuadro 2-cimientos · último cuadro 3-torre
```
Static camera. The tower grows upward floor by floor: each concrete slab appears and settles, followed by its glass and graphite mullions, at a steady rhythm, until the tower is complete. No camera cuts, no dissolves, no people.
```

**clip-3.mp4** · primer cuadro 3-torre · último cuadro 4-atardecer
```
Static camera with a very slow push-in. The daylight gradually turns into warm golden sunset light, the shadows lengthen, and warm interior lights turn on in some windows. No camera cuts, no dissolves, no people.
```

Si un video sale con disolvencia (se ve "fantasma" a la mitad): regenera subiendo solo el primer cuadro.
Guárdalos en E:\material tezontle web\ y **mándamelos para revisar**.

---

## ☐ Paso 4 · Grabar el producto real (10 minutos)
Crea E:\material tezontle web\grabaciones\

1. Abre una terminal en E:\aura-demo → `pnpm dev` → abre http://localhost:5173/aura en Chrome.
2. Para verlo como celular: F12 → Ctrl+Shift+M → elige iPhone 14.
3. Graba con **Win + Alt + R** (vuelve a presionar para parar):
   - **grab-selector.mp4** (10 s): la torre gira, tocas el 804, se abre la ficha, botón de WhatsApp.
   - **grab-panel.mp4** (10 s): en escritorio, /admin a la izquierda y el selector a la derecha; marcas el 804 como vendido y se ve cambiar.
   - **aura-recorrido.mp4** (15 s): scroll lento por la landing de Aura.
4. Windows las guarda en C:\Users\marcu\Videos\Captures. Avísame y yo las paso a E:.

---

## ☐ Paso 5 · Video con el scroll (Claude Code, cuando tengas los 3 clips)
```
Lee SPEC.md §3 y §4. Las imágenes y los clips están en E:\material tezontle web\. Cópialos a public/ con los mismos nombres y recodifica los clips con ffmpeg como dice §4 (versión 1920 y 960). Lee como referencia world.ts en E:\arko-landing\src y copia la técnica: escena 1 imagen 1-piedra, escena 2 clip-1, escena 3 clip-2, escena 8 la imagen 5-piedra-detalle, escena 9 clip-3. Todo avanza y retrocede con el scroll. Agrega el fallback de imágenes fijas. Dime cómo verificarlo.
```
Graba un video haciendo scroll de arriba abajo y de regreso → mándamelo.

---

## ☐ Paso 6 · Mockups con las grabaciones (Claude Code)
```
Lee SPEC.md §3 escenas 3 a 6 y §4. Las grabaciones están en E:\material tezontle web\grabaciones\. Recórtalas y comprímelas como dice §4 (con póster). Escenas 3 y 4: mockup de celular en HTML/CSS con grab-selector.mp4 dentro de la pantalla y, en la escena 4, un globo de WhatsApp "Hola, me interesa el 804" que entra con el scroll. Escena 5: mockup de laptop con grab-panel.mp4. Escena 6: aura-recorrido.mp4 en la banda noche. Los videos solo se cargan cerca de la pantalla y se pausan fuera. Dime cómo verificarlo.
```

---

## ☐ Paso 7 · SEO, privacidad y medición (igual que antes)
```
Lee SPEC.md §7. Agrega título, descripción, Open Graph con imagen 1200×630 hecha con 3-torre.jpg y el logo, hreflang, sitemap, robots, datos estructurados Organization, favicon, página de aviso de privacidad base para México (con los datos como variables en site.ts) y analítica con los eventos de la SPEC.
```

## ☐ Paso 8 · Rendimiento y publicación
```
Audita contra SPEC.md §8: carga en 4G, fluidez en móvil, peso de videos e imágenes, contraste, Safari. Corrige lo necesario y dame cifras antes y después.
```
