const PRICE_FORMMATTER = new Intl.NumberFormat(undefined, { currency: 'BRL', style: 'currency' });

export const formatPrice = (number: number) => {
  return PRICE_FORMMATTER.format(number);
};
