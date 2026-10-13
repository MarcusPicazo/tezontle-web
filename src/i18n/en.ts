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
  },
  progress: {
    label: 'Tour progress',
  },
  scenes: {
    piedra: {
      railLabel: 'Stone',
      heading: "Let buyers choose their home from their phone.",
      sub: '3D virtual showroom with live inventory for pre-sales.',
    },
    cimientos: {
      railLabel: 'Foundations',
      heading: "Pre-sales means selling something that doesn't exist yet.",
      points: ['Nothing to show', 'Inventory in spreadsheets', "Leads that don't say what they want"],
    },
    torre: {
      railLabel: 'The tower',
      heading: 'Your tower in 3D, with real availability for every unit.',
      tag: '3D model',
    },
    departamento: {
      railLabel: 'The unit',
      heading: 'The buyer chooses, and your agent gets the lead with the exact unit.',
      fichaLabels: ['Floor plan', 'Price', 'Payments'],
      whatsappMessage: "Hi, I'm interested in unit 804",
    },
    vendido: {
      railLabel: 'Sold',
      heading: 'Your team marks units reserved or sold, and every screen updates.',
      tag: 'Sales panel',
    },
    historia: {
      railLabel: 'The story',
      heading: "And a cinematic site that tells your project's story.",
      tag: 'Landing',
    },
    comoTrabajamos: {
      railLabel: 'How we work',
      heading: 'How we work',
      steps: ['Send us renders, plans and prices.', 'Ready in two weeks.', 'Published with your brand.'],
    },
    nombre: {
      railLabel: 'The name',
      heading:
        "Tezontle is the volcanic stone that built Mexico City. We lay the digital foundation to sell what's being built.",
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
    privacy: 'Privacy notice',
    rights: 'All rights reserved.',
    contactLabel: 'Email us',
  },
  privacyPage: {
    title: 'Privacy notice · Tezontle 3D',
    heading: 'Privacy notice',
    body: "We're preparing the full privacy notice. In the meantime, write to us with any question about how we handle your data.",
    back: 'Back to home',
  },
};
