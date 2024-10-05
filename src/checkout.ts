import { Product } from './models/product';
import { PricingRule } from './models/pricingRule';
import { products } from './data/products';

export class Checkout {
  private items: Product[] = [];
  private pricingRules: PricingRule[];

  constructor(pricingRules: PricingRule[]) {
    this.pricingRules = pricingRules;
  }

  scan(sku: string): void {
    const product = products[sku];
    if (product) {
      this.items.push(product); // Add product if it exists
    } else {
      console.log(`Product with SKU ${sku} not found`);
    }
  }

  total(): number {
    let total = 0;
    const processedItems: Product[] = [];

    // Apply each pricing rule and accumulate their contributions
    for (const rule of this.pricingRules) {
      const { total: ruleTotal, processedItems: items } = rule.apply(this.items);
      total += ruleTotal; // Add the total from the rule
      processedItems.push(...items); // Collect processed items
    }

    // Calculate the total for items that were not processed by any rule
    const unprocessedItems = this.items.filter(item => !processedItems.includes(item));
    const unprocessedTotal = unprocessedItems.reduce((sum, item) => sum + item.price, 0);

    return total + unprocessedTotal; // Return the final total
  }
}
