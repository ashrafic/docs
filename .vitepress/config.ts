import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'Ashrafic Labs',
  description: 'Laravel & Filament tools built for developers who ship. Open-source packages for the modern PHP ecosystem.',
  base: '/',

  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: 'https://ashraficlabs.com/icons/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/filament-translation-suite/assets/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#12352f' }],
    ['meta', { name: 'og:type', content: 'website' }],
    ['meta', { name: 'og:locale', content: 'en_US' }],
    ['meta', { name: 'og:site_name', content: 'Ashrafic Labs' }],
    ['meta', { name: 'og:image', content: 'https://ashraficlabs.com/og/ashrafic-labs.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@ashraficlabs' }],
  ],

  themeConfig: {
    logo: 'https://ashraficlabs.com/brand/ashrafic-labs-logo-horizontal-primary.svg',
    siteTitle: false,

    nav: [
      { text: 'Home', link: '/filament-translation-suite/' },
      { text: 'Guide', link: '/filament-translation-suite/getting-started' },
      { text: 'Features', link: '/filament-translation-suite/features/' },
      { text: 'Configuration', link: '/filament-translation-suite/configuration' },
      { text: 'Pricing', link: '/filament-translation-suite/pricing' },
    ],

    sidebar: {
      '/filament-translation-suite/': [
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Installation', link: '/filament-translation-suite/getting-started' },
            { text: 'Configuration', link: '/filament-translation-suite/configuration' },
          ]
        },
        {
          text: 'Features',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/filament-translation-suite/features/' },
            { text: 'File Translations', link: '/filament-translation-suite/features/file-translations' },
            { text: 'Content Models', link: '/filament-translation-suite/features/content-models' },
            { text: 'Machine Translation', link: '/filament-translation-suite/features/machine-translation' },
            { text: 'Code Scanner', link: '/filament-translation-suite/features/code-scanner' },
            { text: 'Vendor Explorer', link: '/filament-translation-suite/features/vendor-explorer' },
            { text: 'CSV Import / Export', link: '/filament-translation-suite/features/csv-import-export' },
            { text: 'Form Morphing', link: '/filament-translation-suite/features/form-morphing' },
            { text: 'Health Dashboard', link: '/filament-translation-suite/features/health-dashboard' },
            { text: 'Webhooks', link: '/filament-translation-suite/features/webhooks' },
            { text: 'Translation Portal', link: '/filament-translation-suite/features/translation-portal' },
            { text: 'Auto-Translation Agent', link: '/filament-translation-suite/features/auto-translation-agent' },
            { text: 'Translation Backups', link: '/filament-translation-suite/features/translation-backups' },
          ]
        },
        {
          text: 'Reference',
          collapsed: false,
          items: [
            { text: 'Pricing & Licensing', link: '/filament-translation-suite/pricing' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ashraficlabs' },
    ],

    footer: {
      message: 'Released under the Ashrafic Labs Commercial License.',
      copyright: 'Copyright © 2026–present Ashrafic Labs. All rights reserved.'
    },

    editLink: {
      pattern: 'https://github.com/ashraficlabs/ashrafic-docs/edit/main/:path'
    },

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3]
    }
  }
})
