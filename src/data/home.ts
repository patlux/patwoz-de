import type { Language, Localized } from './i18n'
import { withLocale } from './i18n'

export type Skill = { label: string; path: string }

export const skills: Skill[] = [
  { label: 'TypeScript', path: '/skills/typescript' },
  { label: 'React', path: '/skills/react' },
  { label: 'React Native', path: '/skills/react-native' },
  { label: 'Expo', path: '/skills/expo' },
  { label: 'Node.js', path: '/skills/nodejs' },
  { label: 'Rust / Go', path: '/skills/rust-go' },
  { label: 'AWS', path: '/skills/aws' },
  { label: 'DevOps', path: '/skills/devops' },
  { label: 'Docker', path: '/skills/docker' },
  { label: 'Kubernetes', path: '/skills/kubernetes' },
  { label: 'CI/CD', path: '/skills/ci-cd' },
  { label: 'Playwright', path: '/skills/e2e-testing' },
]

export type ClientLogo = {
  src: string
  alt: string
  width: number
  height: number
}

export type Client = {
  name: string
  industry: Localized
  note: Localized
  /** Internal path (localized) or external URL. */
  href: string
  external?: boolean
  logo: ClientLogo
}

export function clients(lang: Language): Client[] {
  return [
    {
      name: 'SAP / KulturPass',
      industry: { en: 'Enterprise software', de: 'Enterprise Software' },
      note: {
        en: 'KulturPass app — React Native, Redux, form validation',
        de: 'KulturPass-App — React Native, Redux, Formularvalidierung',
      },
      href: withLocale(lang, '/work/kulturpass'),
      logo: { src: '/company/sap.svg', alt: 'SAP', width: 26, height: 14 },
    },
    {
      name: 'Porsche Digital',
      industry: { en: 'Automotive', de: 'Automotive' },
      note: {
        en: 'Yuu Yoga — paywall, onboarding, admin backend',
        de: 'Yuu Yoga — Paywall, Onboarding, Admin-Backend',
      },
      href: withLocale(lang, '/work/porsche'),
      logo: {
        src: '/company/Porsche-Logo.webp',
        alt: 'Porsche',
        width: 26,
        height: 20,
      },
    },
    {
      name: 'IBM iX',
      industry: { en: 'Technology', de: 'Technologie' },
      note: {
        en: 'Meine BARMER — design system and bonus module',
        de: 'Meine BARMER — Design System und Bonus-Modul',
      },
      href: withLocale(lang, '/work/ibm'),
      logo: { src: '/company/IBM_logo.svg', alt: 'IBM', width: 26, height: 11 },
    },
    {
      name: 'Ströer / t-online',
      industry: { en: 'Media & publishing', de: 'Medien & Publishing' },
      note: {
        en: 't-online news app — navigation, tab bar, advertising',
        de: 't-online Nachrichten-App — Navigation, Tab-Bar, Werbung',
      },
      href: withLocale(lang, '/work/stroeer'),
      logo: {
        src: '/company/t-online-desktop.327ab976.svg',
        alt: 't-online',
        width: 28,
        height: 12,
      },
    },
    {
      name: 'Olympia Verlag (Kicker)',
      industry: { en: 'Sports media', de: 'Sportmedien' },
      note: {
        en: 'Football was my first love — football audio app',
        de: 'Football was my first love — Fußball-Audio-App',
      },
      href: withLocale(lang, '/work/kicker'),
      logo: {
        src: '/company/kicker.svg',
        alt: 'Kicker',
        width: 26,
        height: 12,
      },
    },
    {
      name: 'ABL',
      industry: { en: 'E-mobility', de: 'E-Mobility' },
      note: {
        en: 'ABL Configuration — wallbox setup via app',
        de: 'ABL Configuration — Wallbox-Einrichtung per App',
      },
      href: withLocale(lang, '/work/abl'),
      logo: { src: '/company/abl.svg', alt: 'ABL', width: 26, height: 12 },
    },
    {
      name: 'Barmer',
      industry: { en: 'Health insurance', de: 'Krankenversicherung' },
      note: {
        en: 'Meine BARMER — healthcare app, via IBM iX',
        de: 'Meine BARMER — Gesundheits-App, über IBM iX',
      },
      href: withLocale(lang, '/work/ibm'),
      logo: {
        src: '/company/barmer.svg',
        alt: 'Barmer',
        width: 28,
        height: 12,
      },
    },
    {
      name: 'Enerparc',
      industry: { en: 'Renewable energy', de: 'Erneuerbare Energien' },
      note: {
        en: 'Enerparc ESS — energy service app',
        de: 'Enerparc ESS — Energy-Service-App',
      },
      href: 'https://www.enerparc.de',
      external: true,
      logo: {
        src: '/company/enerparc.svg',
        alt: 'Enerparc',
        width: 28,
        height: 12,
      },
    },
    {
      name: 'MHP',
      industry: { en: 'IT consulting', de: 'IT-Beratung' },
      note: {
        en: 'Product development in a consulting setting',
        de: 'Produktentwicklung im Consulting-Umfeld',
      },
      href: 'https://www.mhp.com',
      external: true,
      logo: { src: '/company/mhp.svg', alt: 'MHP', width: 26, height: 12 },
    },
    {
      name: 'Finanzguru',
      industry: { en: 'FinTech', de: 'FinTech' },
      note: {
        en: 'Finanzguru — finance app',
        de: 'Finanzguru — Finanz-App',
      },
      href: 'https://finanzguru.de',
      external: true,
      logo: {
        src: '/company/finanzguru.svg',
        alt: 'Finanzguru',
        width: 22,
        height: 22,
      },
    },
  ]
}

export type App = {
  name: string
  href: string
  icon: string
  description: Localized
  external?: boolean
}

export function apps(lang: Language): App[] {
  const l = (path: string) => withLocale(lang, path)
  return [
    {
      name: 'piparo.party',
      href: l('/work/piparo-party'),
      icon: '/company/piparo-party.webp',
      description: { en: '25 party games', de: '25 Partyspiele' },
    },
    {
      name: 'KulturPass DE',
      href: l('/work/kulturpass'),
      icon: '/apps/kulturpass.png',
      description: { en: 'Culture marketplace', de: 'Kulturmarktplatz' },
    },
    {
      name: 't-online',
      href: l('/work/stroeer'),
      icon: '/apps/t-online.jpg',
      description: { en: 'News app', de: 'Nachrichten-App' },
    },
    {
      name: 'Football was my first love',
      href: l('/work/kicker'),
      icon: '/apps/football-was-my-first-love.jpg',
      description: { en: 'Football audio', de: 'Fußball-Audio' },
    },
    {
      name: 'ABL Configuration',
      href: l('/work/abl'),
      icon: '/apps/abl-configuration.jpg',
      description: { en: 'Wallbox configuration', de: 'Wallbox-Konfiguration' },
    },
    {
      name: 'Meine BARMER',
      href: l('/work/ibm'),
      icon: '/apps/meine-barmer.jpg',
      description: { en: 'Healthcare app', de: 'Gesundheits-App' },
    },
    {
      name: 'Enerparc ESS',
      href: 'https://www.enerparc.de',
      icon: '/apps/enerparc-ess.png',
      description: { en: 'Energy service', de: 'Energy-Service' },
      external: true,
    },
    {
      name: 'Finanzguru',
      href: 'https://apps.apple.com/de/app/finanzguru-konten-vertr%C3%A4ge/id1214803607',
      icon: '/apps/finanzguru.jpg',
      description: { en: 'Finance app', de: 'Finanz-App' },
      external: true,
    },
    {
      name: 'Yuu Yoga',
      href: l('/work/yuuyoga'),
      icon: '/apps/yuu-yoga.jpg',
      description: { en: 'Yoga', de: 'Yoga' },
    },
    {
      name: 'PropRate',
      href: 'https://play.google.com/store/apps/details?id=de.proprate.mobile&hl=en',
      icon: '/apps/proprate.png',
      description: { en: 'Property valuation', de: 'Immobilienbewertung' },
      external: true,
    },
    {
      name: 'SWK',
      href: 'https://apps.apple.com/de/app/swk/id1558861525',
      icon: '/apps/swk.jpg',
      description: { en: 'Energy & mobility', de: 'Energie & Mobilität' },
      external: true,
    },
    {
      name: 'kaarst lokal',
      href: 'https://apps.apple.com/de/app/kaarst-lokal/id6746488444',
      icon: '/apps/kaarst-lokal.jpg',
      description: { en: 'Local commerce', de: 'Lokaler Handel' },
      external: true,
    },
    {
      name: 'Glowing Blox',
      href: l('/work/glowing-blox'),
      icon: '/apps/glowing-blox.png',
      description: { en: 'Strategy game', de: 'Strategiespiel' },
    },
    {
      name: 'Alpine Welten',
      href: 'https://play.google.com/store/apps/details?id=com.alpinewelten.tourguide',
      icon: '/apps/alpine-welten-tourguide.jpg',
      description: { en: 'Tour guide', de: 'Tourguide' },
      external: true,
    },
    {
      name: 'Goory',
      href: l('/work/goory'),
      icon: '/apps/goory.jpg',
      description: { en: 'Local products', de: 'Lokale Produkte' },
    },
    {
      name: 'GreenSP',
      href: l('/work/greensp'),
      icon: '/apps/greensp.png',
      description: { en: 'Ranger', de: 'Ranger' },
    },
    {
      name: 'ME SENSE',
      href: l('/work/me-sense'),
      icon: '/apps/me-sense.jpg',
      description: { en: 'Weatherdock', de: 'Weatherdock' },
    },
    {
      name: 'Quasaro',
      href: 'https://apps.apple.com/de/app/quasaro/id1557640802',
      icon: '/apps/quasaro.jpg',
      description: { en: 'Productivity', de: 'Produktivität' },
      external: true,
    },
    {
      name: 'Performance Suite',
      href: 'https://apps.apple.com/de/app/performance-suite/id1222858824',
      icon: '/apps/performance-suite.jpg',
      description: { en: 'SEO tooling', de: 'SEO-Tooling' },
      external: true,
    },
    {
      name: 'mingleup',
      href: 'https://apps.apple.com/de/app/mingleup/id6670564412',
      icon: '/apps/mingleup.jpg',
      description: { en: 'Social events', de: 'Social Events' },
      external: true,
    },
  ]
}

export const homeCopy = {
  en: {
    title: 'Patrick Wozniak: Software Engineer',
    description:
      'Patrick Wozniak is a self-taught Software Engineer from Nuremberg, Germany.',
    hello: "Hi, I'm Patrick Wozniak",
    status: 'Available · Software Engineer & Freelance Developer',
    location: 'Nuremberg, Germany',
    experience: '10+ years of experience',
    bio: "I've been programming since I was 16. Today I work as a frontend engineer with TypeScript, React and React Native, and take care of DevOps on the side: Docker, Kubernetes and CI/CD pipelines.",
    contactLabel: 'Contact',
    more: 'Also:',
    availabilityLabel: 'Availability',
    availabilityTitle: 'Open for new projects',
    availabilityBody:
      'Freelance work in React Native, React and DevOps. A short note is enough, I will get back to you.',
    availabilityCta: 'Get in touch',
    skillsLabel: 'Skills · 12',
    skillsTitle: 'What I work with',
    skillsSubtitle: 'The twelve technologies I use every day.',
    skillsLink: 'All skills →',
    clientsLabel: 'Work',
    clientsTitle: 'Clients',
    clientsSubtitle: 'Companies I have worked for as a freelancer.',
    clientsLink: 'All projects →',
    appsLabel: 'Apps · 20',
    appsTitle: "Apps I've worked on",
    appsSubtitle: 'On the App Store and Google Play.',
    appsLink: 'All projects →',
    projectLabel: 'Own project',
    projectTitle: 'Nürnberg Maps Review Removals',
    projectBody:
      'Data project on review-removal notices for Google Maps reviews in Nuremberg.',
    projectWebsite: 'Website',
    projectGithub: 'GitHub',
    piparoLabel: 'piparo.tech',
    piparoBody:
      'Together with two colleagues I run piparo.tech, an IT service company for software development and operations.',
    blogLabel: 'Blog',
    blogLink: 'All posts →',
  },
  de: {
    title: 'Patrick Wozniak: Software Engineer',
    description:
      'Patrick Wozniak ist ein autodidaktischer Software Engineer aus Nürnberg, Deutschland.',
    hello: 'Hallo, ich bin Patrick Wozniak',
    status: 'Verfügbar · Software Engineer & Freelance Entwickler',
    location: 'Nürnberg, Deutschland',
    experience: '10+ Jahre Erfahrung',
    bio: 'Ich programmiere seit meinem 16. Lebensjahr. Heute arbeite ich als Frontend Engineer mit TypeScript, React und React Native. Daneben kümmere ich mich um DevOps: Docker, Kubernetes und CI/CD-Pipelines.',
    contactLabel: 'Kontakt',
    more: 'Außerdem:',
    availabilityLabel: 'Verfügbarkeit',
    availabilityTitle: 'Aktuell frei für neue Projekte',
    availabilityBody:
      'Freelance-Arbeit in React Native, React und DevOps. Eine kurze Nachricht genügt, ich melde mich zurück.',
    availabilityCta: 'Kontakt aufnehmen',
    skillsLabel: 'Kompetenzen · 12',
    skillsTitle: 'Womit ich arbeite',
    skillsSubtitle: 'Die zwölf Technologien, mit denen ich täglich arbeite.',
    skillsLink: 'Alle Kompetenzen →',
    clientsLabel: 'Referenzen',
    clientsTitle: 'Kunden',
    clientsSubtitle: 'Unternehmen, für die ich als Freelancer gearbeitet habe.',
    clientsLink: 'Alle Projekte →',
    appsLabel: 'Apps · 20',
    appsTitle: 'Apps, an denen ich gearbeitet habe',
    appsSubtitle: 'Im App Store und bei Google Play.',
    appsLink: 'Alle Projekte →',
    projectLabel: 'Eigenes Projekt',
    projectTitle: 'Nürnberg Maps Review Removals',
    projectBody:
      'Datenprojekt zu Löschhinweisen bei Google-Maps-Bewertungen in Nürnberg.',
    projectWebsite: 'Website',
    projectGithub: 'GitHub',
    piparoLabel: 'piparo.tech',
    piparoBody:
      'Mit zwei Kollegen betreibe ich piparo.tech, einen IT-Dienstleister für Software-Entwicklung und Betrieb.',
    blogLabel: 'Blog',
    blogLink: 'Alle Beiträge →',
  },
} satisfies Record<Language, Record<string, string>>
