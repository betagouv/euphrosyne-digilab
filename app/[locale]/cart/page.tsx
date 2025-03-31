'use client';

import { useContext } from 'react';
import { CartContext } from '../../../src/cart/context';
import { LangContext } from '../../../src/contexts/LangContext';

// Import cart components from your existing implementation
// import CartTable from '../../../src/cart/CartTable';
// import CartSubmitForm from '../../../src/cart/CartSubmitForm';

export default function CartPage() {
  const { cart } = useContext(CartContext);
  const { translations } = useContext(LangContext);
  
  // Access translations for the cart page
  // const content = translations.cartContent;
  
  return (
    <div className="fr-container fr-my-8w">
      <h1>Cart Page</h1>
      {/* In the real implementation, use your cart components */}
      {/*
      <CartTable items={cart.items} onRemoveItem={cart.removeItem} />
      <CartSubmitForm />
      */}
    </div>
  );
}

// Pre-generate cart page at build time for both locales
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'fr' },
  ];
}