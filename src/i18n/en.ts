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
    scrollHint: 'Keep scrolling',
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
