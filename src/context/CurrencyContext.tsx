import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CurrencyCode = 'NGN' | 'USD' | 'EUR' | 'GBP';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (amountInBase: number) => string;
}

// Assumed exchange rates (NGN base)
const rates: Record<CurrencyCode, number> = {
  NGN: 1,
  USD: 1 / 1500, // ~1500 NGN to 1 USD
  EUR: 1 / 1600,
  GBP: 1 / 1900,
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>('NGN');

  const formatPrice = (amountInBase: number) => {
    const converted = amountInBase * rates[currency];
    
    // NGN formatting
    if (currency === 'NGN') {
      return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(converted);
    }

    // Other currencies formatting
    return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : currency === 'GBP' ? 'en-GB' : 'en-IE', {
      style: 'currency',
      currency: currency,
    }).format(converted);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
