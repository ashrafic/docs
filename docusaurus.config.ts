import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Ashrafic Labs',
  tagline: 'Tools for the Laravel & Filament ecosystem.',
  favicon: '/img/favicon.ico',
  url: 'https://docs.ashraficlabs.com',
  baseUrl: '/',
  organizationName: 'ashrafic',
  projectName: 'docs',
  trailingSlash: false,
  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/ashrafic/docs/edit/dev/',
          showLastUpdateTime: true,
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en'],
        indexDocs: true,
        indexPages: true,
        searchContextByPaths: [
          '/filament-translation-suite',
          '/filament-white-label',
          '/filament-automation-bridge',
        ],
        useAllContextsWithNoSearchContext: true,
      },
    ],
  ],

  themeConfig: {
    colorMode: { disableSwitch: false, respectPrefersColorScheme: true },
    navbar: {
      title: '',
      logo: {
        alt: 'Ashrafic Labs',
        src: '/img/ashrafic-labs-logo-horizontal-primary.svg',
        srcDark: '/img/ashrafic-labs-logo-horizontal-primary-light.svg',
      },
      items: [
        { to: '/#packages', label: 'Docs', position: 'right' },
        { href: 'https://ashraficlabs.com', label: 'Main Site', position: 'right' },
        { href: 'https://packages.ashraficlabs.com', label: 'Our Packages', position: 'right' },
        { href: 'https://github.com/ashrafic', label: 'GitHub', position: 'right', className: 'github-icon' },
      ],
    },
    footer: {
      style: 'light',
      logo: {
        alt: 'Ashrafic Labs',
        src: '/img/ashrafic-labs-logo-horizontal-primary.svg',
        srcDark: '/img/ashrafic-labs-logo-horizontal-primary-light.svg',
        height: 32,
      },
      links: [
        {
          items: [
            { label: 'Main Site', href: 'https://ashraficlabs.com' },
            { label: 'GitHub', href: 'https://github.com/ashrafic' },
            { label: 'hello@ashraficlabs.com', href: 'mailto:hello@ashraficlabs.com' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Ashrafic Labs. All rights reserved.`,
    },
  },
};

export default config;
