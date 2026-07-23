export type PiparoPartyWorkLanguage = 'en' | 'de'

type WorkContent = {
  pageTitle: string
  description: string
  home: string
  work: string
  back: string
  productLabel: string
  role: string
  company: string
  website: string
  imageAlt: string
  imageCaption: string
  intro: string
  overviewTitle: string
  overview: string[]
  contributionsTitle: string
  contributions: { title: string; text: string }[]
  stackTitle: string
  stack: { title: string; items: string[] }[]
  additionalTitle: string
  additional: string
}

export const piparoPartyWorkContent = {
  en: {
    pageTitle: 'piparo.party - Work',
    description:
      'Built piparo.party, an offline-first party-game app with 25 games, 22 languages, native subscriptions, and a shared mobile and web platform.',
    home: 'Home',
    work: 'Work',
    back: 'Back to Work',
    productLabel: 'Own product',
    role: 'Co-Founder & Lead Product Engineer',
    company: 'piparo.tech GmbH',
    website: 'Visit piparo.party',
    imageAlt: 'piparo.party home screen showing the Bomb Party game',
    imageCaption:
      'One app, 25 games, designed for a phone passed around the table.',
    intro:
      'piparo.party is an offline-first party-game app built by our small team at piparo.tech. It brings 25 games into one polished experience that starts without an account, works without a connection, and supports 22 languages.',
    overviewTitle: 'Project Overview',
    overview: [
      'We built the product end to end: product strategy, brand, mobile architecture, game content, monetisation, website, store delivery, and production operations. The central product constraint shaped the entire system: a group should move from opening the app to playing in under a minute.',
      'The app combines a restrained dark shell with a separate colour world for every game. Underneath that interface is a modular game platform that supports quick card games, timed rounds, team play, social deduction, persistent player profiles, and an upcoming local Bluetooth multiplayer mode.',
    ],
    contributionsTitle: 'Key Contributions',
    contributions: [
      {
        title: 'Product and Mobile Architecture',
        text: 'Designed the application around Expo Router, strict TypeScript, and feature-oriented modules. Shared navigation, session, theme, storage, and platform services keep the growing game catalogue consistent without forcing every game into the same interaction model.',
      },
      {
        title: 'Modular Game Platform',
        text: 'Built a plugin-based catalogue for 25 games across card, word, timing, voting, bluffing, and role-based formats. Each plugin owns its metadata and play flow while reusing common setup, crew, result, and access-control foundations.',
      },
      {
        title: 'Offline Content System',
        text: 'Implemented local SQLite content databases so games remain fully playable without a network connection. Release assets are validated and encrypted with SQLCipher, while locale-specific databases keep the installed content manageable.',
      },
      {
        title: 'Design System and Game Themes',
        text: 'Created shared design tokens, runtime themes, and reusable native primitives for buttons, tiles, sheets, navigation, and screen frames. The shell stays calm and recognisable while every game can fill the screen with its own colour, motion, and visual identity.',
      },
      {
        title: 'Local Multiplayer Foundation',
        text: 'Developed a Bluetooth Low Energy session layer for nearby devices, including hosting, joining, roster state, round synchronisation, and resilient reconnects. The architecture lets supported games add multiplayer without duplicating transport and lifecycle logic.',
      },
      {
        title: 'Internationalisation at Product Scale',
        text: 'Structured app and website copy around Lingui and locale-specific content assets. The product ships in 22 languages, including translated game content, settings, onboarding, purchase flows, metadata, and the marketing website.',
      },
      {
        title: 'Subscriptions and Cross-Platform Payments',
        text: 'Implemented the Free and Pro model with native App Store and Google Play purchases through expo-iap. The web experience adds Stripe checkout, while entitlement handling, restore flows, cancellation messaging, and local persistence remain explicit and testable.',
      },
      {
        title: 'Profiles, Trophies, and Platform Services',
        text: 'Built persistent player profiles and a quiet achievement system that works locally first. Selected milestones are mirrored to Apple Game Center and Google Play Games Services without making platform accounts a requirement for normal play.',
      },
      {
        title: 'Website and Store Delivery',
        text: 'Built the multilingual Astro website, store metadata workflows, screenshot generation, and release automation around EAS. Shared assets and product copy stay aligned across the app, website, App Store, and Google Play.',
      },
      {
        title: 'Quality and Observability',
        text: 'Established type checks, Jest coverage, deterministic fixtures, and native and web end-to-end suites across the game catalogue. Sentry, scoped logging, source maps, dSYMs, and Android mapping uploads make production failures diagnosable.',
      },
    ],
    stackTitle: 'Technology Stack',
    stack: [
      {
        title: 'Mobile',
        items: [
          'React Native 0.85',
          'Expo 56',
          'Expo Router 6',
          'TypeScript',
          'Reanimated 4',
        ],
      },
      {
        title: 'Data & State',
        items: ['Zustand', 'MMKV', 'SQLite / SQLCipher', 'XState', 'Lingui'],
      },
      {
        title: 'Platform',
        items: [
          'expo-iap',
          'Bluetooth LE',
          'Game Center',
          'Google Play Games',
          'Sentry',
        ],
      },
      {
        title: 'Delivery',
        items: ['Astro', 'EAS', 'pnpm', 'Nix', 'Jest & E2E'],
      },
    ],
    additionalTitle: 'End-to-End Product Ownership',
    additional:
      'Beyond implementation, the work includes product positioning, pricing, store compliance, release planning, content operations, analytics decisions, and the visual system. That breadth makes piparo.party a useful reference for how I approach a product when mobile, web, design, infrastructure, and operations need to move as one system.',
  },
  de: {
    pageTitle: 'piparo.party - Referenz',
    description:
      'Entwicklung von piparo.party, einer offlinefähigen Partyspiel-App mit 25 Spielen, 22 Sprachen, nativen Abos sowie gemeinsamer Mobile- und Web-Plattform.',
    home: 'Startseite',
    work: 'Referenzen',
    back: 'Zurück zu Referenzen',
    productLabel: 'Eigenes Produkt',
    role: 'Mitgründer & Lead Product Engineer',
    company: 'piparo.tech GmbH',
    website: 'piparo.party besuchen',
    imageAlt: 'Startansicht von piparo.party mit dem Spiel Wortbombe',
    imageCaption:
      'Eine App, 25 Spiele, entwickelt für ein Handy, das am Tisch weitergereicht wird.',
    intro:
      'piparo.party ist eine offlinefähige Partyspiel-App, die wir als kleines Team bei piparo.tech entwickeln. Sie verbindet 25 Spiele in einer durchgängigen App, startet ohne Account, funktioniert ohne Verbindung und unterstützt 22 Sprachen.',
    overviewTitle: 'Projektübersicht',
    overview: [
      'Wir entwickeln das Produkt durchgängig selbst: Produktstrategie, Marke, Mobile-Architektur, Spielinhalte, Monetarisierung, Website, Store-Auslieferung und Produktionsbetrieb. Eine zentrale Vorgabe prägt das gesamte System: Eine Gruppe soll in weniger als einer Minute vom Öffnen der App bis zur ersten Runde kommen.',
      'Die App kombiniert eine ruhige dunkle Oberfläche mit einer eigenen Farbwelt für jedes Spiel. Darunter liegt eine modulare Spieleplattform für schnelle Kartenrunden, Timer, Teamspiele, Social Deduction, persistente Spielerprofile und einen kommenden lokalen Bluetooth-Mehrspielermodus.',
    ],
    contributionsTitle: 'Zentrale Beiträge',
    contributions: [
      {
        title: 'Produkt- und Mobile-Architektur',
        text: 'Die Anwendung basiert auf Expo Router, strengem TypeScript und Feature-Modulen. Gemeinsame Navigation, Sessions, Themes, Storage- und Plattformdienste halten den wachsenden Spielekatalog konsistent, ohne alle Spiele in dasselbe Interaktionsmodell zu zwingen.',
      },
      {
        title: 'Modulare Spieleplattform',
        text: 'Ein Plugin-basierter Katalog bildet 25 Karten-, Wort-, Timer-, Voting-, Bluff- und Rollenspiele ab. Jedes Plugin besitzt eigene Metadaten und Spiellogik, nutzt aber gemeinsame Grundlagen für Setup, Crew, Ergebnisse und Zugriffssteuerung.',
      },
      {
        title: 'Offline-Content-System',
        text: 'Lokale SQLite-Datenbanken halten sämtliche Spiele ohne Netzwerkverbindung spielbar. Release-Assets werden validiert und mit SQLCipher verschlüsselt, während getrennte Sprachdatenbanken die installierten Inhalte beherrschbar halten.',
      },
      {
        title: 'Designsystem und Spielwelten',
        text: 'Gemeinsame Design-Tokens, Runtime-Themes und native UI-Bausteine bilden Buttons, Tiles, Sheets, Navigation und Screen-Rahmen ab. Die App-Shell bleibt ruhig und wiedererkennbar, während jedes Spiel den Bildschirm mit eigener Farbe, Bewegung und Identität füllen kann.',
      },
      {
        title: 'Lokale Multiplayer-Grundlage',
        text: 'Die Bluetooth-Low-Energy-Schicht deckt Hosting, Beitritt, Teilnehmerstatus, Rundensynchronisation und robuste Reconnects ab. Unterstützte Spiele können Mehrspieler-Funktionen ergänzen, ohne Transport und App-Lifecycle erneut implementieren zu müssen.',
      },
      {
        title: 'Internationalisierung im Produktmaßstab',
        text: 'App und Website verwenden Lingui sowie sprachspezifische Content-Assets. Das Produkt umfasst 22 Sprachen mit übersetzten Spielinhalten, Einstellungen, Onboarding-, Kauf- und Store-Texten sowie einer mehrsprachigen Marketing-Website.',
      },
      {
        title: 'Abos und plattformübergreifende Zahlungen',
        text: 'Das Free- und Pro-Modell nutzt expo-iap für App Store und Google Play. Im Web ergänzt Stripe den Kaufprozess; Freischaltungen, Wiederherstellung, Kündigungshinweise und lokale Persistenz bleiben dabei explizit und testbar.',
      },
      {
        title: 'Profile, Trophäen und Plattformdienste',
        text: 'Persistente Spielerprofile und ein zurückhaltendes Achievement-System funktionieren zuerst lokal. Ausgewählte Meilensteine werden zu Apple Game Center und Google Play Games Services gespiegelt, ohne Plattformkonten für normale Spielrunden vorauszusetzen.',
      },
      {
        title: 'Website und Store-Auslieferung',
        text: 'Zum Produkt gehören eine mehrsprachige Astro-Website, Store-Metadaten-Workflows, Screenshot-Erzeugung und Release-Automatisierung mit EAS. Gemeinsame Assets und Produkttexte bleiben über App, Website, App Store und Google Play abgestimmt.',
      },
      {
        title: 'Qualität und Observability',
        text: 'Typechecks, Jest-Tests, deterministische Fixtures sowie native und Web-End-to-End-Suites prüfen den Spielekatalog. Sentry, strukturiertes Logging, Source Maps, dSYMs und Android-Mapping-Uploads machen Produktionsfehler nachvollziehbar.',
      },
    ],
    stackTitle: 'Technologie-Stack',
    stack: [
      {
        title: 'Mobile',
        items: [
          'React Native 0.85',
          'Expo 56',
          'Expo Router 6',
          'TypeScript',
          'Reanimated 4',
        ],
      },
      {
        title: 'Daten & State',
        items: ['Zustand', 'MMKV', 'SQLite / SQLCipher', 'XState', 'Lingui'],
      },
      {
        title: 'Plattform',
        items: [
          'expo-iap',
          'Bluetooth LE',
          'Game Center',
          'Google Play Games',
          'Sentry',
        ],
      },
      {
        title: 'Auslieferung',
        items: ['Astro', 'EAS', 'pnpm', 'Nix', 'Jest & E2E'],
      },
    ],
    additionalTitle: 'Durchgängige Produktverantwortung',
    additional:
      'Über die Implementierung hinaus gehören Positionierung, Pricing, Store-Compliance, Release-Planung, Content-Betrieb, Analytics-Entscheidungen und das visuelle System zur Arbeit. piparo.party zeigt damit, wie ich ein Produkt angehe, wenn Mobile, Web, Design, Infrastruktur und Betrieb als ein gemeinsames System funktionieren müssen.',
  },
} satisfies Record<PiparoPartyWorkLanguage, WorkContent>
