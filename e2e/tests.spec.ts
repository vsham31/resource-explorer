import { test, expect } from '@playwright/test';

test('happy path: search, open detail, favorite', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.getByLabel('Search by name').fill('rick');
  await page.waitForURL(/\?q=rick/);
  await page.waitForSelector('text=Rick');
  await page.locator('a:has-text("Rick")').first().click();
  await page.waitForSelector('text=Personal note');
  await page.getByRole('button', { name: 'Add to favorites' }).click();
  await page.goBack();
  await page.waitForURL((url) => url.pathname === '/');
  await page.click('text=★ Favorites');
  await expect(page.locator('a:has-text("Rick")').first()).toBeVisible();
});
