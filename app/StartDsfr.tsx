'use client';

import { startReactDsfr } from '@codegouvfr/react-dsfr/next-appdir/StartDsfr';

declare module '@codegouvfr/react-dsfr/next-appdir/StartDsfr' {
  interface RegisterLink {
    href: string;
  }
}

startReactDsfr({
  defaultColorScheme: 'light',
});

export default function StartDsfr() {
  return null;
}
