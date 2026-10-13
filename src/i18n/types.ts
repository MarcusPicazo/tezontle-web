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
  };
  progress: {
    label: string;
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
    historia: {
      railLabel: string;
      heading: string;
      tag: string;
    };
    comoTrabajamos: {
      railLabel: string;
      heading: string;
      steps: string[];
    };
    nombre: {
      railLabel: string;
      heading: string;
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
    body: string;
    back: string;
  };
}
