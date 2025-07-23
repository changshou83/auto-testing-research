import {COOKIE_FILE} from "../constants";

const HOME_PAGE_URL = 'http://www.xishanyigu.com/';
const LOGIN_API_URL = 'http://user.xishanyigu.com/user/index/doLogin';

export async function createAuthContext(browser, username, password, needSave = true) {
    let context;

    try {
        context = await browser.newContext(needSave ? { storageState: COOKIE_FILE } : {});
        const page = await context.newPage();
        await page.goto(HOME_PAGE_URL);

        // 验证 cookie 是否有效
        const isLoggedIn = await page.$('.head-search') !== null;
        if (isLoggedIn) {
            return { page, context };
        }

        // 无效 cookie，关闭上下文
        await context.close();
    } catch (e) {
    }

    // 创建新上下文并登录
    context = await browser.newContext();
    const page = await context.newPage();

    // 发送登录请求
    const response = await context.request.post(
        LOGIN_API_URL,
        {
            data: {
                userName: username,
                userPsw: password,
                num: 1
            }
        }
    );

    // 处理响应
    const responseBody = await response.json();
    const msg = responseBody.msg;
    if(msg) {
        // 需要访问首页才能设置Cookie
        await page.goto(msg);
        // 保存 cookie
        await context.storageState(needSave ? { path: COOKIE_FILE } : {});
    }


    return { page, context };
}
