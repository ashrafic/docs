import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'e5f'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', '173'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', '027'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', '6d7'),
            routes: [
              {
                path: '/filament-translation-suite',
                component: ComponentCreator('/filament-translation-suite', 'cb2'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/filament-translation-suite/configuration',
                component: ComponentCreator('/filament-translation-suite/configuration', '4fa'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/filament-translation-suite/features',
                component: ComponentCreator('/filament-translation-suite/features', '63d'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/filament-translation-suite/features/auto-translation-agent',
                component: ComponentCreator('/filament-translation-suite/features/auto-translation-agent', 'fec'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/filament-translation-suite/features/code-scanner',
                component: ComponentCreator('/filament-translation-suite/features/code-scanner', '8df'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/filament-translation-suite/features/content-models',
                component: ComponentCreator('/filament-translation-suite/features/content-models', 'a90'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/filament-translation-suite/features/csv-import-export',
                component: ComponentCreator('/filament-translation-suite/features/csv-import-export', '228'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/filament-translation-suite/features/file-translations',
                component: ComponentCreator('/filament-translation-suite/features/file-translations', 'db3'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/filament-translation-suite/features/form-morphing',
                component: ComponentCreator('/filament-translation-suite/features/form-morphing', '6c6'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/filament-translation-suite/features/health-dashboard',
                component: ComponentCreator('/filament-translation-suite/features/health-dashboard', 'cb2'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/filament-translation-suite/features/machine-translation',
                component: ComponentCreator('/filament-translation-suite/features/machine-translation', '6de'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/filament-translation-suite/features/translation-backups',
                component: ComponentCreator('/filament-translation-suite/features/translation-backups', 'a19'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/filament-translation-suite/features/translation-portal',
                component: ComponentCreator('/filament-translation-suite/features/translation-portal', '647'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/filament-translation-suite/features/vendor-explorer',
                component: ComponentCreator('/filament-translation-suite/features/vendor-explorer', 'e10'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/filament-translation-suite/features/webhooks',
                component: ComponentCreator('/filament-translation-suite/features/webhooks', '87e'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/filament-translation-suite/getting-started',
                component: ComponentCreator('/filament-translation-suite/getting-started', '36a'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/filament-translation-suite/pricing',
                component: ComponentCreator('/filament-translation-suite/pricing', 'd3f'),
                exact: true,
                sidebar: "docs"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
