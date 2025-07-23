import { test as setup } from '@playwright/test';
import {createAuthContext} from "../utils/auth";

// 测试账户的密码
const TEST_USERNAME = process.env.TEST_USERNAME || '15640071419';
const TEST_PASSWORD = process.env.TEST_PASSWORD || '123456.';

setup('authenticate and save cookies', async ({ browser }) => {
    const { page, context } = await createAuthContext(browser, TEST_USERNAME, TEST_PASSWORD);

    await page.close();
    await context.close();
});