import { Product } from './product';

export interface PricingRule {
  apply(items: Product[]): { total: number; processedItems: Product[] }; // Updated return type
}
