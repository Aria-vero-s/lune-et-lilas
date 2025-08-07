export const SHIPPING_THRESHOLD = 50;
export const SHIPPING_COST = 8.99;

export function calculateShipping(total: number): number {
  return total >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

export function getShippingText(total?: number, language: 'en' | 'fr' = 'en'): string {
  if (total === undefined) {
    return language === 'en' 
      ? `Free shipping for orders $${SHIPPING_THRESHOLD}+`
      : `Livraison gratuite pour les commandes de plus de ${SHIPPING_THRESHOLD}$`;
  }
  
  if (total >= SHIPPING_THRESHOLD) {
    return language === 'en' 
      ? 'Free shipping included'
      : 'Livraison gratuite incluse';
  } else {
    const remaining = SHIPPING_THRESHOLD - total;
    return language === 'en'
      ? `Add $${remaining.toFixed(2)} more for free shipping`
      : `Ajoutez ${remaining.toFixed(2)}$ de plus pour la livraison gratuite`;
  }
}

export function getShippingDisplayText(cost: number, language: 'en' | 'fr' = 'en'): string {
  if (cost === 0) {
    return language === 'en' ? 'Free' : 'Gratuit';
  }
  return `$${cost.toFixed(2)}`;
}