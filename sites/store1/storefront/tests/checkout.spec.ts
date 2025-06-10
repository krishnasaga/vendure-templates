import { test, expect } from '@playwright/test';

test('can checkout', async ({ page }) => {
  // Go to home page
  await page.goto('/');

  // Add first product to cart
  const addButton = page.locator('button:has-text("Add to cart")').first();
  await addButton.click();

  // Open cart from header
  await page.locator('button[aria-label*="items in cart"]').click();

  // Proceed to checkout
  await page.getByRole('link', { name: 'Checkout' }).click();

  // Fill out shipping form
  await page.fill('input[name="fullName"]', 'John Doe');
  await page.fill('input[name="streetLine1"]', '123 Main St');
  await page.fill('input[name="city"]', 'Metropolis');
  await page.fill('input[name="postalCode"]', '12345');
  await page.fill('input[name="phoneNumber"]', '1234567890');
  const countrySelect = page.locator('select[name="countryCode"]');
  if (await countrySelect.count()) {
    await countrySelect.selectOption({ index: 0 });
  }

  await page.getByRole('button', { name: /proceed to payment/i }).click();

  await expect(page.locator('button:has-text("Pay with")')).toBeVisible();
});
