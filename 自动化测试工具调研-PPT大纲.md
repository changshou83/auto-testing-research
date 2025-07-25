## 自动化测试定义及分类

自动化测试是指利用自动化工具执行测试用例、比较实际结果与预期结果、生成测试报告的过程。它能够减少人工干预，提高测试效率和准确性。

### 按测试层次分类

1. **单元测试（Unit Testing）**
   - 测试最小可测试单元（通常是函数或方法），验证单个组件的功能正确性
   - 例如：解析Prompt转换为渲染使用的数据结构
   - 常用工具：Jest, Vitest

2. **集成测试（Integration Testing）**
   - 测试多个组件之间的交互，验证模块间接口的正确性
   - 例如：前端测试是否调用了接口，后端微服务间调用
   - 常用工具：Jest，Vitest

3. **端到端测试（End-to-End Testing）**
   - 模拟真实用户场景的完整流程测试，验证关键工作流程是否正常
   - 例如：用户注册，用户创建PDF翻译任务
   - 常用工具：Cypress, Selenium, Playwright

### 测试类型的比例

放一张测试金字塔的图片

业界普遍认可的参考比例为：

单元测试：占比约 70%
集成测试：占比约 20%
端到端测试：占比约 10%

在实际项目中，避免“唯比例论”，比例的核心是 “价值导向”，而非机械分配：

- 单元测试：覆盖 “高频变动的独立逻辑”（如工具函数、业务计算规则），避免过度测试简单逻辑（如 getter/setter）；
- 集成测试：覆盖 “关键协作点”（如接口调用、数据转换），避免重复测试单元已验证的逻辑；
- 端到端测试：只覆盖 “用户核心路径”（如注册 - 登录 - 支付），避免测试边缘流程（性价比低）。

## 自动化测试的成本与收益

成本
1. 测试工具的学习成本
2. 开发人员测试意识的培养：让项目变得更具可测试性(例如之前想测注册，但是验证码没有办法拿到所以测不了)
3. 首次适配项目的成本：封装公共能力，编写首批测试脚本
4. 测试用例的维护：新用例的编写成本，后续改版对旧用例的破坏
5. 局限：适用场景有限，并非所有测试都适合自动化(UI频繁变动，低频测试，主观性测试)；无法完全代替手工测试

收益
1. 对高频重复场景和大规模场景可以显著提升测试效率，降低重复劳动成本
2. 对核心逻辑编写对应的测试，保证后续添加新需求时不会影响旧功能
3. 支持持续集成，代码提交后自动执行测试并生成报告

## 单元测试工具 - Jest

### 简介

Jest 是 **Meta（Facebook）** 开发的一款开源 JavaScript 测试框架，主要用于单元测试和集成测试。它内置断言库、测试运行器和 mocking 功能，能够快速的编写自动化测试脚本。

### 功能介绍

#### 开箱即用的测试环境

- 极简配置：默认即可运行测试，也可通过配置文件进行配置。
- 内置断言库：提供丰富、可读性高的断言函数（`Jest Matchers`），支持链式调用。
- 内置测试运行器：支持按约定自动识别测试文件，并行执行测试、监视模式，可自动识别变更并仅运行相关测试。
- Mocking功能：可以模拟函数、模块、定时器、第三方库或 API 调用。用于隔离依赖、验证函数调用、控制依赖行为。
- 快照测试：首次运行保存快照，后续比较差异。适用于测试 UI 组件输出、配置文件、数据结构等。
- 自动生成测试报告：内置集成 `Istanbul` 工具。可通过特殊标志生成测试报告，显示代码行、分支、函数、语句的覆盖情况。

#### 测试 Node.js 项目



#### 搭配 TestingLibrary 可以完成前端组件测试



### 方案对比

| 需求/工具 | Jest | Mocha | Vitest |
|--|--|--|--|
| **断言库** | 内置 | 需要Chai等第三方库 | 内置 |
| **Mock功能** | 内置 | 需要Sinon等第三方库 | 内置 |
| **测试运行器** | 内置 | 需要Mocha CLI | 内置 |
| **并行执行** | 内置支持 | 需第三方插件 | 内置支持 |
| **性能** | 中等 | 中等 | 快（依赖Vite） |
| **配置复杂度** | 低（零配置启动） | 高（需配置多个库） | 低（与Vite共享配置） |
| **覆盖率工具** | 内置Istanbul (nyc) | 需要Istanbul等第三方工具 | 内置C8或Istanbul |
| **快照测试** | 内置支持 | 需要第三方库 | 内置支持 |
| **社区支持** | 广泛 | 广泛 | 快速增长 |
| **调试体验** | 一般 | 一般 | 内置调试工具 |

Mocha内置功能太少，Vitest与Vite(一个打包器)生态绑定较深。

## 端到端测试工具 - Playwright

### 简介

Playwright 是微软开发的一款开源自动化测试工具，主要用于 Web 应用的端到端测试。它支持所有现代渲染引擎，包括 Chromium、WebKit 和 Firefox，能够模拟真实用户在不同浏览器环境下的操作行为。

### 功能介绍

#### 支持跨浏览器

Playwright 支持所有现代渲染引擎，包括 Chromium、WebKit 和 Firefox。**可以确保网站在各种浏览器环境下都能正常运行，避免因浏览器差异导致的功能问题。**

<br />

在配置文件中添加相关配置：

```javascript
// playwright.config.js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // other config

  /* Configure projects for major browsers */
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

通过抓包工具查看请求的User-Agent可以发现使用了不同的浏览器引擎

![截图](6646f151fb1c786309193249957d294c.png)

![截图](0de3d9814efb0ca84b9118361408bc23.png)

#### 支持自动等待

Playwright 在执行操作前会等待元素变得可交互，无需手动设置等待时间，**提高测试的稳定性**。

<br />

代码示例：

```javascript
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://www.xishanyigu.com/');
    await expect(page.getByPlaceholder('请输入您的研究问题')).toBeVisible();
});
```

运行结果：

![playwright-auto-wait.png](d2c6e59c2f488a471346ae694bf33ec5.png)

#### 内置并行运行

允许同时运行多个独立的测试用例，**缩短整体测试耗时**。

默认情况下，测试文件并行运行，文件内的测试用例是在同一个工作进程中按顺序运行。在配置文件中添加相关配置：

```javascript
// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // other config

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
});
```

运行playwright执行测试，运行日志说明使用6个工作线程(默认CPU数量的一半)并行运行测试用例

![截图](f70d66bddb287e7f38feb43bd170304a.png)

#### 强大的配套工具

包括可以录制操作生成对应测试代码的代码生成器，可以调试测试脚本的调试工具以及可以查看测试过程的追踪器，**为测试开发、执行及调试提供全流程支持**。

使用代码生成器录制登录流程并自动生成相关代码：

![playwright-codegen.gif](693573997014f70c69411463f3abb239.gif)


使用调试工具和跟踪器调试测试脚本：

![playwright-trace-viewer.png](d86df3fbbda609e1b40fa895d6450aaf.png)

### 方案对比

|需求/工具|Selenium|Cypress|Playwright|
|--|--|--|--|
|多浏览器|支持|否|支持|
|旧版浏览器|支持|否|否|
|多选项卡/多窗口|支持|需要插件支持|支持|
|性能|--|比Selenium快|比Selenium快|
|自动等待与重试|否|是|是|
|并行测试|通过Selenium Grid支持|需要付费服务|内置支持|
|社区|最广泛的社区支持|比Selenium小，比Playwright大|比Cypress、Selenium小|
|学习成本|高|低|低|
