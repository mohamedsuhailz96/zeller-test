import { Checkout } from '../checkout';
import { AppleTvRule } from '../rules/appleTVRule';
import { IpadBulkDiscountRule } from '../rules/ipadBulkDiscountRule';

describe('Checkout system', () => {
  let co: Checkout;

  beforeEach(() => {
    const pricingRules = [new AppleTvRule(), new IpadBulkDiscountRule()];
    co = new Checkout(pricingRules);
  });

  test('should apply 3-for-2 deal on Apple TVs and correctly calculate total', () => {
    co.scan('atv');
    co.scan('atv');
    co.scan('atv');
    co.scan('vga');
    
    const total = co.total();
    expect(total).toBeCloseTo(249.00, 2);
  });

  test('should apply bulk discount on Super iPads and correctly calculate total', () => {
    co.scan('ipd');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('ipd');

    const total = co.total();
    expect(total).toBeCloseTo(2499.95, 2);
  });

  test('should handle mixed items with Apple TV and iPads', () => {
    co.scan('atv');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('atv');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('ipd');
    
    const total = co.total();
    expect(total).toBeCloseTo(2718.95, 2);
  });
});
