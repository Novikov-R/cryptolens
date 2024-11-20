import { expect, test } from '@playwright/test';

test.describe('Portfolio', () => {
    test('', async ({ page }) => {
        await page.goto('http://localhost:5173/');

        await page.locator('[data-testid="addBtn"]').nth(0).click();
        const modal = page.locator('[data-testid="modal"]');
        let isModalVisible = await modal.isVisible();
        expect(isModalVisible).toBe(true);

        const input = modal.locator('input[data-testid="coin-input"]');

        await input.fill('0123');
        let value = await input.inputValue();
        expect(value).toBe('123');
        await input.fill('');

        let invalidInput = '123.213,13Ilkj-as1';
        for (const char of invalidInput) {
            await input.press(char);
        }
        value = await input.inputValue();
        expect(value).toBe('123.213131');
        await input.fill('');

        await input.fill('-10');
        value = await input.inputValue();
        await input.fill('');
        expect(value).toBe('');
        await input.fill('');

        invalidInput = '3000';
        for (const char of invalidInput) {
            await input.press(char);
        }
        await input.fill('3000');
        value = await input.inputValue();
        expect(value).toBe('300');

        await input.fill('2000');
        value = await input.inputValue();
        expect(value).toBe('2000');
        await input.fill('');

        invalidInput = '00000000000000';
        for (const char of invalidInput) {
            await input.press(char);
        }
        value = await input.inputValue();
        expect(value).toBe('0');
        await input.fill('');

        const totalSum = modal.locator('[data-testid="total-sum"]');
        await input.fill('5');
        const totalValue = await totalSum.textContent();
        expect(totalValue).toContain('$');

        await page.locator('[data-testid="submitBtn"]').click();
        isModalVisible = await modal.isVisible();
        expect(isModalVisible).toBe(false);
    });
});
