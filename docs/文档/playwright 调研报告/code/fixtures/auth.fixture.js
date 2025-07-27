import { test as base } from '@playwright/test';
import { createAuthContext } from '../utils/auth';

export const test = base.extend({
    loggedInContext: [
        async ({ browser }, use) => {
            // TODO: 做多用户的时候可以改为动态获取
            const username = '15640071419';
            const password = '123456.';

            const { context } = await createAuthContext(browser, username, password);

            // 将上下文传递给测试用例
            await use(context);

            await context.close();
        },
        { scope: 'worker' }
    ],
    page: async ({ loggedInContext }, use) => {
        const page = await loggedInContext.newPage();
        await use(page);
        await page.close();
    }
});

export { expect } from '@playwright/test';
