# CLAUDE.md — Reglas del proyecto tezontle-web

Lee SPEC.md antes de cualquier tarea: es la fuente de verdad.

- Stack fijo: Astro, Tailwind 4, GSAP ScrollTrigger, Lenis, React Three Fiber como isla. No
  instales otras librerías sin explicarme para qué y pedir confirmación.
- Una tarea a la vez. Antes de tareas grandes, dame un plan corto. Al terminar, dime cómo verificarlo.
- Si algo de la SPEC es ambiguo, pregunta en vez de inventar. No inventes cifras, clientes,
  testimonios ni logos de terceros.
- Colores y tipografías solo los de la SPEC, definidos como tokens en src/styles/global.css.
- Textos solo desde src/i18n (es y en). Configuración solo desde src/data/site.ts.
- Rendimiento es parte del producto: piensa primero en celular.
- No importes código de E:\aura-demo ni de E:\arko-landing: puedes LEERLOS como referencia y copiar lo necesario.
- Todo el proyecto vive en E:\tezontle-web. Nada en el disco C:.
- Al terminar cada tarea que funcione, propón un mensaje de commit corto en español.
