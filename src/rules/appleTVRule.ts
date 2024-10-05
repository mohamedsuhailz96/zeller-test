import { PricingRule } from '../models/pricingRule';
import { Product } from '../models/product';

export class AppleTvRule implements PricingRule {
  apply(items: Product[]): { total: number; processedItems: Product[] } {
    const appleTvs = items.filter(item => item.sku === 'atv');
    const appleTvCount = appleTvs.length;
    const setsOfThree = Math.floor(appleTvCount / 3);
    const totalAppleTvCost = (setsOfThree * 2 * 109.50) + ((appleTvCount % 3) * 109.50);
    
    return {
      total: totalAppleTvCost,
      processedItems: appleTvs // Return processed items
    };
  }
}
