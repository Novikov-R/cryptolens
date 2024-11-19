import { expect, test } from '@playwright/test';

test.describe('Portfolio', () => {
    test('', async ({ page }) => {
        await page.goto('http://localhost:5173/');

        await page.locator('[data-testid="addBtn"]').nth(0).click();
        const modal = page.locator('[data-testid="modal"]');
        let isModalVisible = await modal.isVisible();
        expect(isModalVisible).toBe(true);

        const input = modal.locator('input');
        const textToInput = '123.213,13Ilkj-as1';
        for (const char of textToInput) {
            await input.press(char);
        }
        const value = await input.inputValue();
        expect(value).toBe('123.213131');

        await page.locator('[data-testid="submitBtn"]').click();
        isModalVisible = await modal.isVisible();
        expect(isModalVisible).toBe(false);

        const storedValue = await page.evaluate(() => {
            return localStorage.getItem('portfolio');
        });
        expect(!!storedValue).toBe(true);

        await page.locator('[data-testid="openPortfolioBtn"]').click();
        isModalVisible = await modal.isVisible();
        expect(isModalVisible).toBe(true);

        let items = page.locator('[data-testid="deleteCoin"]');
        let itemsCount = await items.count();

        for (let i = 1; i < itemsCount; i++) {
            await items.nth(i).click();
            await page.waitForTimeout(500);
        }

        items = page.locator('[data-testid="deleteCoin"]');
        itemsCount = await items.count();
        expect(itemsCount).toBe(0);

        await page.locator('[data-testid="closePortfolioBtn"]').click();
        isModalVisible = await modal.isVisible();
        expect(isModalVisible).toBe(false);

        const portfolioCost = await page.locator('[data-testid="openPortfolioBtn"]').textContent();
        expect(portfolioCost).toBe('$0');
    });
});
