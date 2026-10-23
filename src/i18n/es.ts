import type { Dictionary } from './types';

export const es: Dictionary = {
  lang: 'es',
  htmlLang: 'es-MX',
  meta: {
    title: 'Tezontle 3D · Showroom virtual para preventas inmobiliarias',
    description:
      'Showroom virtual 3D con inventario en vivo para preventas inmobiliarias. Sus compradores eligen su departamento desde el celular.',
  },
  nav: {
    skipToContent: 'Saltar al contenido',
    switchTo: 'EN',
    switchToLabel: 'Ver en inglés',
    scrollHint: {
      hero: 'Empiece a bajar',
      rest: 'Siga bajando',
    },
    sectionsLabel: 'Secciones',
    links: {
      showroom: 'El showroom 3D',
      paquete: 'El paquete',
      caracteristicas: 'Funciones',
      proceso: 'Proceso',
      contacto: 'Contacto',
    },
  },
  progress: {
    label: 'Progreso del recorrido',
  },
  rail: {
    inicio: 'Inicio',
    showroom: 'Showroom',
    paquete: 'Paquete',
    proceso: 'Proceso',
    contacto: 'Contacto',
  },
  scenes: {
    presentacion: {
      railLabel: 'Presentación',
      heading: 'Sus compradores eligen su departamento desde el celular.',
      sub: 'Showroom virtual 3D con inventario en vivo para preventas.',
      small: 'Para desarrolladoras que venden algo que todavía no existe.',
    },
    experiencia: {
      railLabel: 'Experiencia',
      tag: 'Maqueta 3D',
      heading: 'Su comprador explora la torre, ve qué está disponible y le escribe por el departamento exacto.',
      fichaLabels: ['Plano', 'Precio', 'Pagos'],
      whatsappMessage: 'Hola, me interesa el 804',
    },
    control: {
      railLabel: 'Control',
      tag: 'Panel de ventas',
      heading: 'Su equipo actualiza precios, apartados y vendidos, y todo se refleja al instante.',
      small: 'Sin Excel ni mensajes de "¿sigue disponible?".',
    },
    paquete: {
      railLabel: 'El paquete',
      heading: 'El paquete completo',
      intro: 'Tres piezas que trabajan juntas, armadas con su proyecto: sus renders, planos, precios y marca.',
      blocks: [
        {
          tag: '01',
          title: 'Maqueta 3D',
          body: 'Su torre en 3D, interactiva. Sus compradores la exploran piso por piso, ven planos, precios y disponibilidad real, y le escriben por WhatsApp con el departamento exacto.',
          bullets: ['Funciona en celular y computadora', 'Disponibilidad en vivo por colores', 'Contacto por departamento a WhatsApp'],
          button: 'Visitar demo',
        },
        {
          tag: '02',
          title: 'Panel de ventas',
          body: 'Donde su equipo controla el inventario: cambia precios y marca apartado o vendido, y la maqueta se actualiza al instante.',
          bullets: ['Acceso con usuario para su equipo', 'Cambios en tiempo real', 'Adiós al Excel de disponibilidad'],
          button: 'Solicitar demo del panel',
        },
        {
          tag: '03',
          title: 'Landing cinematográfica',
          body: 'El sitio de su desarrollo: un recorrido en video que avanza con el scroll, con sus renders, amenidades y ubicación, y que lleva directo a la maqueta.',
          bullets: ['Video que avanza con el scroll', 'Vistas con sus renders', 'Botón directo a la maqueta y a WhatsApp'],
          button: 'Visitar demo',
        },
      ],
      table: {
        essentialLabel: 'Esencial',
        completeLabel: 'Completo',
        rows: ['Maqueta 3D con contacto por WhatsApp', 'Panel de ventas', 'Landing cinematográfica y vistas con renders'],
        thirdRowEssential: 'Adicional',
      },
      quoteNote: 'Cotización en 24 horas según su proyecto.',
      quoteButton: 'Pedir cotización',
      demoLink: 'Ver la demo',
    },
    caracteristicas: {
      railLabel: 'Funciones',
      heading: 'Qué hace la maqueta',
      cards: [
        { key: 'disponibilidad', title: 'Disponibilidad en vivo', body: 'Disponible, apartado o vendido en cada departamento.' },
        { key: 'sol', title: 'Sol por fecha y hora', body: 'Qué departamentos tienen sol de tarde, cualquier día del año.' },
        { key: 'pagos', title: 'Esquema de pagos', body: 'Enganche, mensualidades y entrega, calculados en la ficha.' },
        { key: 'plantas', title: 'Plantas por nivel', body: 'Cada piso con sus departamentos y su estado.' },
        { key: 'vistas', title: 'Vistas sobre sus renders', body: 'La aérea y las fachadas con los pisos marcados.' },
        { key: 'contacto', title: 'Contacto con el departamento exacto', body: 'WhatsApp o formulario con la unidad elegida.' },
      ],
    },
    dondeEncaja: {
      railLabel: 'Recorrido',
      heading: 'Dónde encaja en su venta',
      steps: [
        'Sus anuncios llevan a la landing del proyecto.',
        'El comprador recorre la maqueta 3D.',
        'Elige departamento y ve su esquema de pagos.',
        'Le escribe a su asesor con la unidad exacta.',
        'Su equipo aparta y vende desde el panel, y se actualiza en todas las pantallas.',
      ],
    },
    intercambio: {
      railLabel: 'Proceso',
      heading: 'Lo que nos envía, lo que recibe',
      sendLabel: 'Nos envía',
      sendBody: 'Renders, planos en PDF y lista de precios. Sin CAD, sin Revit, sin modelos 3D.',
      receiveLabel: 'Recibe',
      receiveBody: 'Maqueta 3D, panel de ventas y landing, listos desde dos semanas con su marca.',
    },
    faq: {
      railLabel: 'Preguntas',
      heading: 'Preguntas frecuentes',
      items: [
        { question: '¿Necesito modelos 3D o archivos de Revit?', answer: 'No. Trabajamos con sus renders, planos en PDF y lista de precios.' },
        { question: '¿Cuánto tarda?', answer: 'Hasta 60 departamentos, dos semanas; proyectos más grandes o con varias torres, tres semanas. Contamos desde que recibimos todo su material.' },
        { question: '¿Funciona en celular?', answer: 'Sí, en celular, tableta y computadora, sin descargar nada.' },
        { question: '¿Quién actualiza precios y disponibilidad?', answer: 'Su equipo, desde el panel de ventas, y se ve al instante.' },
        { question: '¿Se puede usar en la sala de ventas?', answer: 'Sí, en pantalla o tableta con el modo presentación.' },
        { question: '¿Cuánto cuesta?', answer: 'Depende del número de unidades y del paquete. Le enviamos cotización en 24 horas.' },
      ],
    },
    contacto: {
      railLabel: 'Contacto',
      heading:
        'El tezontle es la piedra volcánica con la que se levantó la Ciudad de México. Nosotros ponemos la base digital para vender lo que se construye.',
      form: {
        title: 'Hablemos de su proyecto',
        name: 'Nombre',
        company: 'Desarrolladora',
        city: 'Ciudad del proyecto',
        unitsLabel: 'Número de departamentos',
        unitsOptions: ['Menos de 50', '50 a 150', 'Más de 150'],
        phone: 'WhatsApp o teléfono',
        message: 'Mensaje',
        messageOptional: 'Mensaje (opcional)',
        submit: 'Enviar por WhatsApp',
        required: 'Campo obligatorio',
        agendar: 'Agendar llamada',
        replyNote: 'Respondemos en menos de 24 horas.',
      },
    },
    cierre: {
      railLabel: 'Cierre',
      heading: 'Véala funcionando.',
      buttons: {
        demo: 'Ver la demo',
        agendar: 'Agendar llamada',
        whatsapp: 'WhatsApp',
      },
    },
  },
  footer: {
    tagline: 'Showroom virtual 3D con inventario en vivo para preventas.',
    privacy: 'Aviso de privacidad',
    rights: 'Todos los derechos reservados.',
    contactLabel: 'Escríbenos',
    whatsappLabel: 'Escríbenos por WhatsApp',
    linkedinLabel: 'Tezontle 3D en LinkedIn',
  },
  privacyPage: {
    title: 'Aviso de privacidad · Tezontle 3D',
    heading: 'Aviso de privacidad',
    updatedLabel: 'Última actualización',
    sections: [
      {
        heading: 'Responsable del tratamiento',
        body: 'Tezontle 3D, con domicilio en Ciudad de México, México, es responsable del tratamiento de sus datos personales conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
      },
      {
        heading: 'Datos que recabamos',
        body: 'Cuando agenda una llamada, solicita ver la demo o nos escribe por WhatsApp o correo, podemos recabar su nombre, correo electrónico, teléfono y el nombre de su desarrollo o empresa.',
      },
      {
        heading: 'Finalidades',
        body: 'Usamos sus datos para responder su solicitud de demo, agendar y dar seguimiento a llamadas, y darle soporte como cliente de la plataforma. No usamos sus datos para fines distintos sin su consentimiento.',
      },
      {
        heading: 'Transferencias',
        body: 'No transferimos sus datos personales a terceros, salvo que la ley lo requiera o usted nos dé su consentimiento expreso para un caso particular.',
      },
      {
        heading: 'Derechos ARCO',
        body: 'Usted puede acceder, rectificar o cancelar sus datos personales, así como oponerse a su tratamiento, escribiendo al correo de contacto. Atenderemos su solicitud en los plazos que marca la ley.',
      },
      {
        heading: 'Analítica y cookies',
        body: 'Este sitio usa analítica ligera y sin cookies de rastreo (Plausible) para entender qué tan útil es el sitio, sin identificarlo a usted ni seguirlo en otros sitios.',
      },
      {
        heading: 'Cambios a este aviso',
        body: 'Podemos actualizar este aviso de privacidad; la fecha de la versión vigente aparece al inicio de esta página.',
      },
    ],
    back: 'Volver al inicio',
  },
};
