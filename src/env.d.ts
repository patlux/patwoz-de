/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  turnstile?: {
    render: (
      container: HTMLElement,
      options: {
        sitekey: string
        action: string
        callback: (token: string) => void
        'expired-callback': () => void
        'error-callback': () => void
      },
    ) => string
    reset: (widgetId: string) => void
  }
}
