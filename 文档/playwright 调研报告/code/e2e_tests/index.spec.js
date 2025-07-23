import { test, expect } from "@playwright/test";

test.describe('first test', async () => {
    test('GPT Translate - PDF Home', async ({ page }) => {
        await page.goto('/ai_translate/index/index#pdf');

        await expect(page.locator('.pdf-wrap')).toBeVisible();
    });
});