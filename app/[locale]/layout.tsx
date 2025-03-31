'use client';

import { DsfrProvider } from '@codegouvfr/react-dsfr/next-appdir/DsfrProvider';
import React, { useState } from 'react';

import { CartContext, ICart, createCart } from '../../src/cart/context';
import { EuphrosyneHeader } from '../../src/components/EuphrosyneHeader';
import { Footer } from '../../src/components/Footer';
import { LangContext } from '../../src/contexts/LangContext';
import { PageContext } from '../../src/contexts/PageContext';
import useTranslations from '../../src/hooks/useTranslations';
import { Lang } from '../../src/i18n';

export const metadata = {
  title: 'Catalogue des données de New AGLAE',
  description: 'euphrosyne-digilab',
  icons: {
    icon: '/dsfr/favicon/favicon.svg',
    apple: '/dsfr/favicon/apple-touch-icon.png',
    shortcut: '/dsfr/favicon/favicon.ico',
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: { locale: string }
}) {
  const [items, setItems] = useState<ICart['items']>();
  const [currentProject, setCurrentProject] = useState(null);
  const translations = useTranslations(params.locale as Lang);
  
  // Use Next.js usePathname() hook to derive currentPath
  const currentPath = ''; // This will be updated with actual path

  return (
    <html lang={params.locale}>
      <body>
        <DsfrProvider lang={params.locale}>
          <LangContext.Provider value={{ translations }}>
            <PageContext.Provider value={{ currentProject, setCurrentProject }}>
              <CartContext.Provider value={createCart(items, setItems)}>
                <EuphrosyneHeader 
                  currentPath={currentPath} 
                  content={translations.layoutContent.header} 
                />
                <main>{children}</main>
                <Footer />
              </CartContext.Provider>
            </PageContext.Provider>
          </LangContext.Provider>
        </DsfrProvider>
      </body>
    </html>
  );
}
