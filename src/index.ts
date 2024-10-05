// src/index.ts
import { Checkout } from './checkout';
import { AppleTvRule } from './rules/appleTVRule';
import { IpadBulkDiscountRule } from './rules/ipadBulkDiscountRule';

// Pricing rules
const pricingRules = [new AppleTvRule(), new IpadBulkDiscountRule()];

// Initialize checkout
const co = new Checkout(pricingRules);

// Example scans
co.scan('atv');
co.scan('atv');
co.scan('atv');
co.scan('vga');

console.log(`Total: $${co.total().toFixed(2)}`); // Expected: 249.00

co.scan('ipd');
co.scan('ipd');
co.scan('ipd');
co.scan('ipd');
co.scan('ipd');

console.log(`Total: $${co.total().toFixed(2)}`); // Expected: 2718.95
