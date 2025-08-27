export const currency = (pence: number) => (pence/100).toLocaleString('en-GB', { style: 'currency', currency: 'GBP' });
export const BRAND_PRICE_PENCE = 799;
export const BRAND_PRICE = currency(BRAND_PRICE_PENCE);
export const BRAND_NAME = "Easy Power of Attorney";
export const BRAND_DOMAIN = "easypowerofattorney.co.uk";
export const SUPPORT_EMAIL = "support@easypowerofattorney.co.uk";
