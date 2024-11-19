import { expect, test } from '@playwright/test';

const parseFormattedNumber = (formatted: string | null) => {
    if (formatted) {
        let valueStr = formatted.replace(/[$]/g, '').trim().toLowerCase();
        let multiplier = 1;

        if (valueStr.endsWith('k')) {
            multiplier = 1000;
            valueStr = valueStr.slice(0, -1);
        } else if (valueStr.endsWith('m')) {
            multiplier = 1000000;
            valueStr = valueStr.slice(0, -1);
        } else if (valueStr.endsWith('b')) {
            multiplier = 1000000000;
            valueStr = valueStr.slice(0, -1);
        } else if (valueStr.endsWith('t')) {
            multiplier = 1000000000000;
            valueStr = valueStr.slice(0, -1);
        }

        return parseFloat(valueStr) * multiplier;
    }
    return null;
};

test.describe('FilterList Component', () => {
    test('должен обновлять фильтр при клике на заголовок', async ({ page }) => {
        await page.goto('http://localhost:5173/');

        let items = page.locator('[data-testid="rank"]');
        let itemsCount = await items.count();
        let prevValue = await items.nth(0).textContent();

        for (let i = 1; i < itemsCount; i++) {
            const value = await items.nth(i).textContent();
            expect(Number(prevValue) < Number(value)).toBe(true);
            prevValue = value;
        }

        await page.click('th#rank');

        items = page.locator('[data-testid="rank"]');
        itemsCount = await items.count();
        prevValue = await items.nth(0).textContent();

        for (let i = 1; i < itemsCount; i++) {
            const value = await items.nth(i).textContent();
            expect(Number(prevValue) > Number(value)).toBe(true);
            prevValue = value;
        }

        await page.click('th#priceUsd');

        items = page.locator('[data-testid="price"]');
        itemsCount = await items.count();
        let prevPrice = parseFormattedNumber(await items.nth(0).textContent());

        for (let i = 1; i < itemsCount; i++) {
            const value = parseFormattedNumber(await items.nth(i).textContent());
            expect(prevPrice !== null && value !== null).toBe(true);
            // @ts-ignore
            expect(prevPrice <= value).toBe(true);
            prevPrice = value;
        }

        await page.click('th#priceUsd');

        items = page.locator('[data-testid="price"]');
        itemsCount = await items.count();
        prevPrice = parseFormattedNumber(await items.nth(0).textContent());

        for (let i = 1; i < itemsCount; i++) {
            const value = parseFormattedNumber(await items.nth(i).textContent());
            expect(prevPrice !== null && value !== null).toBe(true);
            // @ts-ignore
            expect(prevPrice >= value).toBe(true);
            prevPrice = value;
        }
    });
});
