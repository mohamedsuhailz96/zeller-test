import { PricingRule } from '../models/pricingRule';
import { Product } from '../models/product';

export class IpadBulkDiscountRule implements PricingRule {
  apply(items: Product[]): { total: number; processedItems: Product[] } {
    const superIpads = items.filter(item => item.sku === 'ipd');
    const superIpadCount = superIpads.length;

    if (superIpadCount > 4) {
      const totalCost = superIpadCount * 499.99; // Bulk price
      return {
        total: totalCost,
        processedItems: superIpads // Return processed items
      };
    }

    return { total: 0, processedItems: [] }; // No discount applies
  }
}
