import { test, expect } from '@playwright/test';
import path from "node:path";

test.describe('pdf translate full flow', async () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/ai_translate/index/index#pdf');
    })
    test('upload and translate', async ({ page }) => {
        // await page.getByText('拖入/选择 PDF文档').click();
        await page.setInputFiles('.mp-upload.file-content-box-item-wrap .mp-upload-input', path.join(__dirname, '../../data/GPT文档翻译需求变更单.pdf'));
        await page.getByText('立即翻译').nth(1).click();
        await page.getByText('确定').click();

        // 验证翻译加载状态
        await expect(page.getByText('关注查看进度')).toBeVisible();

        // 等待翻译完成
        await expect(page.locator('#iframe_translated iframe')).toBeVisible({
            timeout: 2 * 60 * 1000
        });
    })

    test('check translation detail', async ({ page }) => {
        await expect(page.getByText('GPT文档翻译需求变更单').first()).toBeVisible();

        // 跳转详情
        const detailPagePromise = page.waitForEvent('popup');
        await page.getByText('GPT文档翻译需求变更单').click();
        const detailPage = await detailPagePromise;

        await expect(detailPage.getByText('GPT文档翻译需求变更单')).toBeVisible();
    })

    test('delete translation task', async ({ page }) => {
        await expect(page.getByText('GPT文档翻译需求变更单').first()).toBeVisible();

        await page.locator('.close-btn').first().click();
        await page.getByRole('button', { name: '确认' }).click();

        await expect(page.getByText('GPT文档翻译需求变更单').first()).not.toBeVisible();
    })
});
