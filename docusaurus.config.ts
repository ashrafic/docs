import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Ashrafic Labs',
  tagline: 'Tools for the Laravel & Filament ecosystem.',
  favicon: 'https://ashraficlabs.com/icons/favicon.ico',
  url: 'https://docs.ashraficlabs.com',
  baseUrl: '/',
  organizationName: 'ashraficlabs',
  projectName: 'ashrafic-docs',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
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
          editUrl: 'https://github.com/ashraficlabs/ashrafic-docs/edit/main/',
          showLastUpdateTime: true,
        },
        blog: false,
        theme: { customCss: './src/css/custom.css' },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    colorMode: { defaultMode: 'light', disableSwitch: false, respectPrefersColorScheme: true },
    navbar: {
      title: '',
      logo: {
        alt: 'Ashrafic Labs',
        src: 'https://ashraficlabs.com/brand/ashrafic-labs-logo-horizontal-primary.svg',
        srcDark: 'https://ashraficlabs.com/brand/ashrafic-labs-logo-horizontal-primary-light.svg',
        height: 40,
      },
      items: [
        { to: '/filament-translation-suite', label: 'Translation Suite', position: 'left' },
        { href: 'https://ashraficlabs.com', label: 'Main Site →', position: 'right' },
      ],
    },
    footer: {
      style: 'light',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Ashrafic Labs. All rights reserved.`,
    },
  },
};

export default config;
