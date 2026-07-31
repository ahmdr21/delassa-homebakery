import type { DBBundlePromo } from "../utils/supabase";

export interface BundlePromoConfig {
  id: string;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  basePrices: Record<string, number>;
  promoPrices: Record<string, number>;
  drinkUpgrades: Record<string, number>;
}

export const FALLBACK_BUNDLE_PROMO: BundlePromoConfig = {
  id: "brownies-drink-bundle",
  title: "Bundle Hemat: Brownies + Minuman",
  startDate: "2026-07-26",
  endDate: "2026-08-31",
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
export function isBundlePromoActive(customConfig?: DBBundlePromo | null): boolean {
  if (customConfig) {
    if (!customConfig.is_active) return false;
    const now = new Date();
    const start = new Date(customConfig.start_date);
    const end = new Date(customConfig.end_date);
    end.setHours(23, 59, 59, 999);
    return now >= start && now <= end;
  }
  
  const now = new Date();
  const start = new Date(FALLBACK_BUNDLE_PROMO.startDate);
  const end = new Date(FALLBACK_BUNDLE_PROMO.endDate);
  end.setHours(23, 59, 59, 999);
  return now >= start && now <= end;
}

/**
 * Calculates the bundle price based on the selected brownies and drink.
 */
export function calculateBundlePrice(
  browniesVarian: string,
  drinkVarian: string,
  customConfig?: DBBundlePromo | null
): { price: number; originalPrice: number; isPromo: boolean } {
  const isPromo = isBundlePromoActive(customConfig);
  
  // Clean names to match keys
  const browniesKey = browniesVarian.replace("Brownies ", "");
  
  const basePrices = FALLBACK_BUNDLE_PROMO.basePrices;
  const promoPrices = customConfig ? customConfig.promo_prices : FALLBACK_BUNDLE_PROMO.promoPrices;
  const drinkUpgrades = customConfig ? customConfig.drink_upgrades : FALLBACK_BUNDLE_PROMO.drinkUpgrades;
  
  const basePrice = basePrices[browniesKey] || basePrices[browniesVarian] || 85000;
  const promoPrice = Number(promoPrices[browniesKey] || promoPrices[browniesVarian] || 80000);
  
  const drinkUpgrade = Number(drinkUpgrades[drinkVarian] || 0);
  
  const finalPrice = (isPromo ? promoPrice : basePrice) + drinkUpgrade;
  const originalPrice = basePrice + drinkUpgrade;
  
  return {
    price: finalPrice,
    originalPrice,
    isPromo,
  };
}

