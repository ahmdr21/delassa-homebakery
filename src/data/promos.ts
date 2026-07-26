export interface BundlePromoConfig {
  id: string;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  basePrices: Record<string, number>;
  promoPrices: Record<string, number>;
  drinkUpgrades: Record<string, number>;
}

export const BUNDLE_PROMO: BundlePromoConfig = {
  id: "brownies-drink-bundle",
  title: "Bundle Hemat: Brownies + Minuman",
  startDate: "2026-07-26", // Starts today
  endDate: "2026-08-31",   // Ends August 31, 2026
  basePrices: {
    "Classic": 70000,
    "Almond": 80000,
    "Brownies Cookies": 83000,
    "Brownies Mix Topping": 85000,
  },
  promoPrices: {
    "Classic": 65000,
    "Almond": 75000,
    "Brownies Cookies": 78000,
    "Brownies Mix Topping": 80000,
  },
  drinkUpgrades: {
    "Kopi Susu Gula Aren": 0,
    "Mocha Bliss": 1000,
    "Roasted Milk Tea": 1000,
    "Butterscotch Bliss": 2000,
    "Choco Bliss": 2000,
  },
};

/**
 * Checks if the bundle promo is currently active.
 */
export function isBundlePromoActive(): boolean {
  const now = new Date();
  const start = new Date(BUNDLE_PROMO.startDate);
  const end = new Date(BUNDLE_PROMO.endDate);
  end.setHours(23, 59, 59, 999); // Include the last day fully
  return now >= start && now <= end;
}

/**
 * Calculates the bundle price based on the selected brownies and drink.
 */
export function calculateBundlePrice(browniesVarian: string, drinkVarian: string): { price: number; originalPrice: number; isPromo: boolean } {
  const isPromo = isBundlePromoActive();
  
  // Clean names to match keys
  const browniesKey = browniesVarian.replace("Brownies ", "");
  const basePrice = BUNDLE_PROMO.basePrices[browniesKey] || BUNDLE_PROMO.basePrices[browniesVarian] || 85000;
  const promoPrice = BUNDLE_PROMO.promoPrices[browniesKey] || BUNDLE_PROMO.promoPrices[browniesVarian] || 80000;
  
  const drinkUpgrade = BUNDLE_PROMO.drinkUpgrades[drinkVarian] || 0;
  
  const finalPrice = (isPromo ? promoPrice : basePrice) + drinkUpgrade;
  const originalPrice = basePrice + drinkUpgrade;
  
  return {
    price: finalPrice,
    originalPrice,
    isPromo,
  };
}
