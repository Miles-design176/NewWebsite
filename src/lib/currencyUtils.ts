export type CurrencyType = 'USD' | 'CAD';

interface ExchangeRates {
  [key: string]: number;
}

// Exchange rates relative to USD (1 USD = X units of currency)
export const exchangeRates: ExchangeRates = {
  'USD': 1.0,
  'CAD': 1.34, // Example exchange rate (1 USD = 1.34 CAD)
};

export const currencySymbols: Record<CurrencyType, string> = {
  'USD': '$',
  'CAD': 'C$',
};

/**
 * Convert amount from one currency to another
 */
export function convertCurrency(amount: number, fromCurrency: CurrencyType, toCurrency: CurrencyType): number {
  if (fromCurrency === toCurrency) return amount;

  // Convert to USD first (as base currency), then to target currency
  const amountInUSD = fromCurrency === 'USD' ? amount : amount / exchangeRates[fromCurrency];
  return toCurrency === 'USD' ? amountInUSD : amountInUSD * exchangeRates[toCurrency];
}

/**
 * Format the number according to the currency locale
 */
export function formatCurrencyValue(amount: number, currency: CurrencyType): string {
  const locale = currency === 'CAD' ? 'en-CA' : 'en-US';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a number as currency with the appropriate symbol
 */
export function formatCurrency(amount: number, currency: CurrencyType = 'USD'): string {
  const locale = currency === 'CAD' ? 'en-CA' : 'en-US';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export interface CurrencyConfig {
  symbol: string;
  code: string;
  name: string;
}

export const currencies: Record<CurrencyType, CurrencyConfig> = {
  USD: {
    symbol: '$',
    code: 'USD',
    name: 'US Dollar'
  },
  CAD: {
    symbol: 'C$',
    code: 'CAD',
    name: 'Canadian Dollar'
  }
};