/** Uno de los 3 bloques de "El paquete" (maqueta, panel, landing). */
export interface PaqueteBlock {
  tag: string;
  title: string;
  body: string;
  bullets: [string, string, string];
  button: string;
}

// Forma compartida de los textos ES/EN. Todo el copy del sitio vive en es.ts y en.ts;
// nada de texto visible se escribe directo en los componentes .astro.
export interface Dictionary {
  lang: 'es' | 'en';
  htmlLang: string;
  meta: {
    title: string;
    description: string;
  };
  nav: {
    skipToContent: string;
    switchTo: string;
    switchToLabel: string;
    /** "Empiece a bajar" en la primera escena, "Siga bajando" en el resto — ver ScrollHint.astro. */
    scrollHint: {
      hero: string;
      rest: string;
    };
    sectionsLabel: string;
    /** Enlaces del header a secciones clave (SPEC: "necesita tener opciones", como el de Taylor). */
    links: {
      showroom: string;
      paquete: string;
      comoTrabajamos: string;
      contacto: string;
    };
  };
  progress: {
    label: string;
  };
  /** Nombres de los 5 grupos del raíl lateral, sincronizados con los enlaces del header
   * (src/data/scenes.ts: railGroups) — visibles como tooltip al pasar el cursor o enfocar. */
  rail: {
    inicio: string;
    showroom: string;
    paquete: string;
    proceso: string;
    contacto: string;
  };
  scenes: {
    piedra: {
      railLabel: string;
      heading: string;
      sub: string;
    };
    cimientos: {
      railLabel: string;
      heading: string;
      points: string[];
    };
    torre: {
      railLabel: string;
      heading: string;
      tag: string;
    };
    departamento: {
      railLabel: string;
      heading: string;
      /** Orden fijo: plano, precio, esquema de pagos — SPEC §3 escena 4. */
      fichaLabels: [string, string, string];
      whatsappMessage: string;
    };
    vendido: {
      railLabel: string;
      heading: string;
      tag: string;
    };
    /** "El paquete": 3 bloques (maqueta, panel, landing) + tabla Esencial/Completo. Orden
     * fijo, igual que fichaLabels en departamento. */
    paquete: {
      railLabel: string;
      heading: string;
      intro: string;
      blocks: [PaqueteBlock, PaqueteBlock, PaqueteBlock];
      table: {
        essentialLabel: string;
        completeLabel: string;
        rows: [string, string, string];
        /** Fila 3 (landing): "Adicional" en Esencial, incluido (✓) en Completo. */
        thirdRowEssential: string;
      };
      quoteNote: string;
      quoteButton: string;
      demoLink: string;
    };
    comoTrabajamos: {
      railLabel: string;
      heading: string;
      steps: string[];
    };
    /** Antes "El nombre" (solo la frase del tezontle); ahora también la sección de
     * contacto (SPEC: id="contacto"), con el formulario a la derecha de ese mismo texto. */
    contacto: {
      railLabel: string;
      heading: string;
      form: {
        title: string;
        name: string;
        company: string;
        city: string;
        unitsLabel: string;
        unitsOptions: [string, string, string];
        phone: string;
        message: string;
        messageOptional: string;
        submit: string;
        required: string;
        agendar: string;
        replyNote: string;
      };
    };
    cierre: {
      railLabel: string;
      heading: string;
      buttons: {
        demo: string;
        agendar: string;
        whatsapp: string;
      };
    };
  };
  footer: {
    privacy: string;
    rights: string;
    contactLabel: string;
  };
  privacyPage: {
    title: string;
    heading: string;
    updatedLabel: string;
    sections: { heading: string; body: string }[];
    back: string;
  };
}
