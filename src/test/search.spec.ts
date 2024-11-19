import { expect, test } from '@playwright/test';

test.describe('SearchPanel Component', () => {
    test('должен обновить состояние и UI при вводе текста поиска', async ({ page }) => {
        await page.goto('http://localhost:5173/');
        const searchInput = page.locator('input[placeholder="Поиск в таблице"]');

        const initialValue = await searchInput.inputValue();
        expect(initialValue).toBe('');

        const searchText = 'Bt';
        await searchInput.fill(searchText);

        const updatedValue = await searchInput.inputValue();
        expect(updatedValue).toBe(searchText);

        const visibleItems = page.locator('[data-testid="symbol"]');
        const itemsCount = await visibleItems.count();

        for (let i = 0; i < itemsCount; i++) {
            const itemText = await visibleItems.nth(i).textContent();
            expect(itemText?.toLowerCase()).toContain(searchText.toLowerCase());
        }
    });
});
