import type { Dictionary } from './types';

export const en: Dictionary = {
  lang: 'en',
  htmlLang: 'en',
  meta: {
    title: 'Tezontle 3D · Virtual showroom for real estate pre-sales',
    description:
      '3D virtual showroom with live inventory for real estate pre-sales. Let buyers choose their home from their phone.',
  },
  nav: {
    skipToContent: 'Skip to content',
    switchTo: 'ES',
    switchToLabel: 'View in Spanish',
    scrollHint: {
      hero: 'Start scrolling',
      rest: 'Keep scrolling',
    },
    sectionsLabel: 'Sections',
    links: {
      showroom: '3D showroom',
      paquete: 'The package',
      caracteristicas: 'Features',
      proceso: 'Process',
      contacto: 'Contact',
    },
  },
  progress: {
    label: 'Tour progress',
  },
  rail: {
    inicio: 'Home',
    showroom: 'Showroom',
    paquete: 'Package',
    proceso: 'Process',
    contacto: 'Contact',
  },
  scenes: {
    presentacion: {
      railLabel: 'Overview',
      heading: "Let buyers choose their home from their phone.",
      sub: '3D virtual showroom with live inventory for pre-sales.',
      small: "For developers selling what doesn't exist yet.",
    },
    experiencia: {
      railLabel: 'Experience',
      tag: '3D model',
      heading: 'Buyers explore the tower, see what\'s available and message you about the exact unit.',
      fichaLabels: ['Floor plan', 'Price', 'Payments'],
      whatsappMessage: "Hi, I'm interested in unit 804",
    },
    control: {
      railLabel: 'Control',
      tag: 'Sales panel',
      heading: 'Your team updates prices, reservations and sales, reflected instantly everywhere.',
      small: 'No spreadsheets, no "is it still available?" messages.',
    },
    paquete: {
      railLabel: 'The package',
      heading: 'The complete package',
      intro: "Three pieces that work together, built with your project: your renders, floor plans, prices and brand.",
      blocks: [
        {
          tag: '01',
          title: '3D model',
          body: 'Your tower in interactive 3D. Buyers explore it floor by floor, see plans, prices and real availability, and message you on WhatsApp with the exact unit.',
          bullets: ['Works on phone and desktop', 'Live availability by color', 'Per-unit WhatsApp contact'],
          button: 'Visit demo',
        },
        {
          tag: '02',
          title: 'Sales panel',
          body: 'Where your team controls inventory: update prices, mark units reserved or sold, and the 3D model updates instantly.',
          bullets: ['User access for your team', 'Real-time changes', 'No more availability spreadsheets'],
          button: 'Request a panel demo',
        },
        {
          tag: '03',
          title: 'Cinematic landing',
          body: "Your development's site: a video tour that moves with the scroll, with your renders, amenities and location, leading straight to the 3D model.",
          bullets: ['Scroll-driven video', 'Views with your renders', 'Direct link to the 3D model and WhatsApp'],
          button: 'Visit demo',
        },
      ],
      table: {
        essentialLabel: 'Essential',
        completeLabel: 'Complete',
        rows: ['3D model with WhatsApp contact', 'Sales panel', 'Cinematic landing and render views'],
        thirdRowEssential: 'Add-on',
      },
      quoteNote: 'Quote within 24 hours based on your project.',
      quoteButton: 'Request a quote',
      demoLink: 'See the demo',
    },
    caracteristicas: {
      railLabel: 'Features',
      heading: 'What the 3D model does',
      cards: [
        { key: 'disponibilidad', title: 'Live availability', body: 'Available, reserved or sold for every unit.' },
        { key: 'sol', title: 'Sunlight by date and time', body: 'Which units get afternoon sun, any day of the year.' },
        { key: 'pagos', title: 'Payment plan', body: 'Down payment, installments and delivery, calculated in the unit sheet.' },
        { key: 'plantas', title: 'Floor plans by level', body: 'Every floor with its units and their status.' },
        { key: 'vistas', title: 'Views over your renders', body: 'The aerial shot and façades with floors marked.' },
        { key: 'contacto', title: 'Contact with the exact unit', body: 'WhatsApp or form with the chosen unit.' },
      ],
    },
    dondeEncaja: {
      railLabel: 'Journey',
      heading: 'Where it fits in your sales process',
      steps: [
        "Your ads lead to the project's landing page.",
        'The buyer explores the 3D model.',
        'They choose a unit and see its payment plan.',
        'They message your advisor with the exact unit.',
        'Your team reserves and sells from the panel, updated on every screen instantly.',
      ],
    },
    intercambio: {
      railLabel: 'Process',
      heading: 'What you send us, what you get',
      sendLabel: 'You send us',
      sendBody: 'Renders, PDF floor plans and a price list. No CAD, no Revit, no 3D models.',
      receiveLabel: 'You get',
      receiveBody: 'A 3D model, sales panel and landing page, ready in two weeks with your brand.',
    },
    faq: {
      railLabel: 'FAQ',
      heading: 'Frequently asked questions',
      items: [
        { question: 'Do I need 3D models or Revit files?', answer: 'No. We work with your renders, PDF floor plans and price list.' },
        { question: 'How long does it take?', answer: 'Two weeks from when we receive your material.' },
        { question: 'Does it work on mobile?', answer: 'Yes, on phone, tablet and computer, nothing to download.' },
        { question: 'Who updates prices and availability?', answer: 'Your team, from the sales panel, reflected instantly.' },
        { question: 'Can it be used in the sales room?', answer: 'Yes, on a screen or tablet with presentation mode.' },
        { question: 'How much does it cost?', answer: "It depends on the number of units and the package. We'll send a quote within 24 hours." },
      ],
    },
    contacto: {
      railLabel: 'Contact',
      heading:
        "Tezontle is the volcanic stone that built Mexico City. We lay the digital foundation to sell what's being built.",
      form: {
        title: "Let's talk about your project",
        name: 'Name',
        company: 'Developer',
        city: 'Project city',
        unitsLabel: 'Number of units',
        unitsOptions: ['Fewer than 50', '50 to 150', 'More than 150'],
        phone: 'WhatsApp or phone',
        message: 'Message',
        messageOptional: 'Message (optional)',
        submit: 'Send via WhatsApp',
        required: 'Required field',
        agendar: 'Book a call',
        replyNote: 'We reply within 24 hours.',
      },
    },
    cierre: {
      railLabel: 'Closing',
      heading: 'See it live.',
      buttons: {
        demo: 'See the demo',
        agendar: 'Book a call',
        whatsapp: 'WhatsApp',
      },
    },
  },
  footer: {
    tagline: '3D virtual showroom with live inventory for pre-sales.',
    privacy: 'Privacy notice',
    rights: 'All rights reserved.',
    contactLabel: 'Email us',
    whatsappLabel: 'Message us on WhatsApp',
    linkedinLabel: 'Tezontle 3D on LinkedIn',
  },
  privacyPage: {
    title: 'Privacy notice · Tezontle 3D',
    heading: 'Privacy notice',
    updatedLabel: 'Last updated',
    sections: [
      {
        heading: 'Data controller',
        body: 'Tezontle 3D, based in Mexico City, Mexico, is the controller responsible for your personal data under Mexico’s Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP).',
      },
      {
        heading: 'Data we collect',
        body: 'When you book a call, ask to see the demo, or write to us on WhatsApp or email, we may collect your name, email address, phone number, and the name of your development or company.',
      },
      {
        heading: 'Purposes',
        body: 'We use your data to respond to your demo request, schedule and follow up on calls, and support you as a platform customer. We do not use your data for other purposes without your consent.',
      },
      {
        heading: 'Transfers',
        body: 'We do not transfer your personal data to third parties, except where required by law or where you have given your express consent for a specific case.',
      },
      {
        heading: 'Your rights',
        body: 'Under Mexican law you can access, rectify, or delete your personal data, and object to its use, by writing to our contact email. We will respond within the legal time frame.',
      },
      {
        heading: 'Analytics and cookies',
        body: 'This site uses lightweight, cookie-free analytics (Plausible) to understand how useful the site is, without identifying you or tracking you across other sites.',
      },
      {
        heading: 'Changes to this notice',
        body: 'We may update this privacy notice; the date of the current version appears at the top of this page.',
      },
    ],
    back: 'Back to home',
  },
};
