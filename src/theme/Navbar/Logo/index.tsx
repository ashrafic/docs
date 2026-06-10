import React, {type ReactNode} from 'react';
import Logo from '@theme/Logo';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';

export default function NavbarLogo(): ReactNode {
  const {pathname} = useLocation();
  const isFts = pathname.startsWith('/filament-translation-suite');

  if (isFts) {
    return (
      <div className="navbar__brand">
        <Link to="/" className="navbar__logo-link">
          <div className="navbar__logo">
            <ThemedImage
              sources={{
                light: useBaseUrl('/img/icon-logo.svg'),
                dark: useBaseUrl('/img/icon-logo.svg'),
              }}
              alt="Ashrafic Labs"
            />
          </div>
        </Link>
        <Link to="/filament-translation-suite" className="navbar__logo-link">
          <ThemedImage
            sources={{
              light: useBaseUrl('/img/filament-translation-suite/title.svg'),
              dark: useBaseUrl('/img/filament-translation-suite/title-dark.svg'),
            }}
            alt="Filament Translation Suite"
            style={{height: 28}}
          />
        </Link>
      </div>
    );
  }

  return (
    <Logo
      className="navbar__brand"
      imageClassName="navbar__logo"
      titleClassName="navbar__title text--truncate"
    />
  );
}
