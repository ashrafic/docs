import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {
  useThemeConfig,
  ErrorCauseBoundary,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import {
  splitNavbarItems,
  useNavbarMobileSidebar,
} from '@docusaurus/theme-common/internal';
import {useLocation} from '@docusaurus/router';
import NavbarItem, {type Props as NavbarItemConfig} from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';

import styles from './styles.module.css';

function useNavbarItems(): NavbarItemConfig[] {
  const {pathname} = useLocation();
  const isFts = pathname.startsWith('/filament-translation-suite');
  const isFwl = pathname.startsWith('/filament-white-label');

  if (isFts) {
    return [
      {to: '/filament-translation-suite', label: 'Home', position: 'right'} as NavbarItemConfig,
      {to: '/filament-translation-suite/getting-started', label: 'Guide', position: 'right'} as NavbarItemConfig,
      {to: '/filament-translation-suite/features', label: 'Features', position: 'right'} as NavbarItemConfig,
      {to: '/filament-translation-suite/configuration', label: 'Configuration', position: 'right'} as NavbarItemConfig,
      {to: '/filament-translation-suite/pricing', label: 'Pricing', position: 'right'} as NavbarItemConfig,
      {href: 'https://ashraficlabs.com', label: 'Main Site', position: 'right'} as NavbarItemConfig,
      {href: 'https://github.com/ashrafic', label: 'GitHub', position: 'right'} as NavbarItemConfig,
    ];
  }

  if (isFwl) {
    return [
      {to: '/filament-white-label', label: 'Home', position: 'right'} as NavbarItemConfig,
      {to: '/filament-white-label/getting-started', label: 'Guide', position: 'right'} as NavbarItemConfig,
      {to: '/filament-white-label/features', label: 'Features', position: 'right'} as NavbarItemConfig,
      {to: '/filament-white-label/configuration', label: 'Configuration', position: 'right'} as NavbarItemConfig,
      {href: 'https://ashraficlabs.com', label: 'Main Site', position: 'right'} as NavbarItemConfig,
      {href: 'https://github.com/ashrafic', label: 'GitHub', position: 'right'} as NavbarItemConfig,
    ];
  }

  return useThemeConfig().navbar.items as NavbarItemConfig[];
}

function NavbarItems({items}: {items: NavbarItemConfig[]}): ReactNode {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              {cause: error},
            )
          }>
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}

function NavbarContentLayout({
  left,
  right,
}: {
  left: ReactNode;
  right: ReactNode;
}) {
  return (
    <div className="navbar__inner">
      <div className={clsx(ThemeClassNames.layout.navbar.containerLeft, 'navbar__items')}>
        {left}
      </div>
      <div className={clsx(ThemeClassNames.layout.navbar.containerRight, 'navbar__items navbar__items--right')}>
        {right}
      </div>
    </div>
  );
}

export default function NavbarContent(): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const [leftItems, rightItems] = splitNavbarItems(items);
  const searchBarItem = items.find((item) => item.type === 'search');

  return (
    <NavbarContentLayout
      left={
        <>
          {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
          <NavbarLogo />
          <NavbarItems items={leftItems} />
        </>
      }
      right={
        <>
          <NavbarItems items={rightItems} />
          <NavbarColorModeToggle className={styles.colorModeToggle} />
          {!searchBarItem && (
            <NavbarSearch>
              <SearchBar />
            </NavbarSearch>
          )}
        </>
      }
    />
  );
}
