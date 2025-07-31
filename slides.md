---
theme: default
# some information about your slides (markdown enabled)
title: 自动化测试分享
# apply unocss classes to the current slide
class: text-left
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: fade
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
# open graph
seoMeta:
  ogImage: auto
hideInToc: true
---

# 自动化测试分享

<div class="flex gap-8">
  <span>分享人：谢唯</span><span>日期：2025.08.04</span>
</div>

<!--
大家好，很高兴能在这里给大家分享自动化测试相关的知识
-->

---
transition: fade
hideInToc: true
---

# 目录

<!-- 1. 自动化测试定义及分类
2. 自动化测试的成本与收益
3. 测试工具 - Jest
4. 端到端测试工具 - Playwright
5. 总结与展望 -->

<Toc minDepth="1" maxDepth="1" />

<!--
今天分享的内容和顺序是这样的，
我会先介绍一下什么是自动化测试以及它的分类
然后会实施自动化测试的成本以及自动化测试带来的的收益
接着会对各种类型的自动化测试进行举例讲解，最后进行总结。
好的，现在我们开始分享的第一部分。
-->

---
transition: fade
title: 自动化测试定义及分类
---

# 自动化测试定义

<div>
定义：自动化测试是指利用自动化工具执行测试用例、比较实际结果与预期结果、生成测试报告的过程。它能够减少人工干预，提高测试效率和准确性。
</div>

<!--
首先介绍一下什么是自动化测试，顾名思义，就是把测试工具通过自动化工具来实现测试工作的自动化。
-->

---
transition: fade
hideInToc: true
---

# 自动化测试分类

按测试粒度分类

1. **单元测试**：测试最小可测试单元（通常是函数或方法），验证单个组件的功能正确性。常用工具：Jest, Vitest。
2. **集成测试**：测试多个组件之间的交互，验证模块间接口的正确性。常用工具：Jest，Vitest。
3. **端到端测试**：模拟真实用户场景的完整流程测试，验证关键工作流程是否正常。常用工具：Cypress, Selenium, Playwright。

<!--
我们可以按照测试粒度的大小对自动化测试进行分类。

首先是离我们开发最近的单元测试，它通常是对最小可测试单元，通常是我们写的函数或者方法进行测试，来验证单个组件的功能是否正常，各种语言基本都有自己的单元测试框架，JS里常用的就是Jest以及Vitest，我们后面会用Jest进行讲解。

然后就是集成测试，相较于单元测试测试单个组件是否正常工作，集成测试关心的是多个组件共同工作的时候会不会出问题，就比如前后端自己都测都没问题，但是对接就有可能会出问题。基本单元测试框架也都会支持集成测试。

最后就是端到端测试，他关心的是在真实用户场景中，系统是否正常走完关键工作流程。他会模仿用户访问真实的网页并进行一些操作，端到端测试一般由专门的端到端测试工具来实现，常用的一般是Playwright和Cypress，如果是特别复杂的系统并且有专业的测试团队可能会上Selenium。

我们以用户登录这个功能来讲解一下各类测试的关注点有哪些不同，
单元测试可能会对表单验证方法进行测试；
集成测试会对登录接口是否正确工作进行测试；
端到端测试就会访问真实的登录页面，然后输入账号密码点击登录按钮，然后检查你是否进入到首页来判断是否通过测试。
-->

---
transition: fade
hideInToc: true
layout: image-left
image: ./test-pyramid.png
backgroundSize: contain
---

# 测试对象

- 单元测试：覆盖 “高频变动的独立逻辑”，避免过度测试简单逻辑
- 集成测试：覆盖 “关键协作点”，避免重复测试单元已验证的逻辑
- 端到端测试：只覆盖 “用户核心路径”，或者叫关键业务流程，避免测试边缘流程

<!--
左侧是由麦克·科恩(Mike Cohn)提出的一个经典的测试金字塔模型，从上到下分为三层，每一层代表一类测试，且层级越低，测试数量应越多、成本越低、执行速度越快；层级越高，测试数量越少、成本越高、维护难度越大，测试用例比例是1：2：7，但是在实际应用中没有必要按严格照这个标准做，因为我们实际上关注的就是我们的系统能否按照预期进行工作,只要我们的测试代码可以完成这个目标即可，
那么我们对那些测试对象编写测试代码能够高效率的完成这个目标呢？讲解测试对象

单元测试：（如工具函数、业务计算规则），（如：调用标准库函数）
-->

---
transition: fade
title: 自动化测试的成本与收益
layout: two-cols
layoutClass: gap-16
---

# 成本

<v-clicks>
  <ol>
    <li>测试工具的学习成本</li>
    <li>开发人员测试意识的培养：让项目变得更具可测试性</li>
    <li>首次适配项目的成本：封装公共能力，编写首批测试脚本</li>
    <li>测试用例的维护：新用例的编写成本，后续改版对旧用例的破坏</li>
    <li>局限：适用场景有限，并非所有测试都适合自动化；无法完全代替手工测试</li>
  </ol>
</v-clicks>

::right::

# 收益

<v-clicks>
  <ol>
    <li>对高频重复场景和大规模场景可以显著提升测试效率，降低重复劳动成本</li>
    <li>对核心逻辑编写对应的测试，保证后续添加新需求时不会影响旧功能</li>
    <li>支持持续集成，代码提交后自动执行测试并生成报告</li>
  </ol>
</v-clicks>

<!--
那么我们落地自动化测试所需的成本都有哪些呢？
分别是测试工具的学习成本，
开发人员测试意识的培养，例如之前想测注册，但是验证码没有办法拿到所以测不了，所以在编写代码的时候就要想到如何让代码变得可测试，
然后是首次适配项目的成本，包括封装测试工具的公共能力，编写首批测试脚本
还有测试用例的维护成本，后续有新功能了要为新功能编写测试代码，系统改版对就旧用例的破坏
需要注意的是自动化测试的适用场景是有限的，它并不能完全代替手工测试，例如UI频繁变动的系统维护成本会很高，低频测试的功能自动化后的收益也不会太大。

讲完成本，我们说一下自动化测试可以带来的收益：
对高频重复的场景以及大规模场景可以显著提升测试效率，降低重复劳动成本，高频重复场景可以很好理解，大规模场景指的就是并发测试这种手动测试很难操作的场景。
对有测试过的代码可以放心的修改，而不用担心破坏现有的功能。
最后自动化测试还支持CI/CD，代码提交之后可以自动执行测试用例。
-->

---
transition: fade
title: 单元测试和集成测试
class: grid place-content-center
---

# 单元测试和集成测试

<!--
接下来会以Jest为工具来介绍单元测试及集成测试在项目中的实践。
除此之外还会介绍Jest的特点功能。
-->

---
transition: fade
hideInToc: true
class: grid place-content-center
---

<JestIntro />

<!--
Jest 是 Meta（Facebook） 开发的一款开源 JavaScript 测试框架，主要用于单元测试和集成测试。它内置断言库、测试运行器和 mocking 功能，能够快速的编写自动化测试脚本。我们可以看到他的github stars数和npm 下载量都很高。

Jest具有这些特色功能：
- 极简配置：默认即可运行测试，也可通过配置文件进行配置。
- 内置断言库：提供丰富、可读性高的断言函数（`Jest Matchers`），支持链式调用。
- 内置测试运行器：支持按约定自动识别测试文件，并行执行测试、监视模式，可自动识别变更并仅运行相关测试。
- Mocking功能：可以模拟函数、模块、定时器、第三方库或 API 调用。用于隔离依赖、验证函数调用、控制被测代码的依赖行为。
- 快照测试：首次运行保存快照，后续比较差异。适用于测试 UI 组件输出、配置文件、数据结构等。
- 自动生成测试报告：内置集成 `Istanbul`[ˌɪstɑnˈbul] 工具。可通过特殊标志生成测试报告，显示代码行、分支、函数、语句的覆盖情况。

这些功能后面都会介绍
-->

---
transition: fade
hideInToc: true
class: grid place-content-center
---

# 单元测试

<!--
接下来介绍一下如何编写单元测试
-->

---
transition: fade
hideInToc: true
---

# 单元测试

```js
/**
 * 从文本中提取可用变量
 * @param content
 * @param usableVariables
 * @param returnUndefinedVariable
 * @returns {*|*[]}
 */
export function drawUsableVariablesInString(content, usableVariables, returnUndefinedVariable = false) {
    const matchResult = content.match(CODE_REFERENCE_REG);
    if(!matchResult) return [];
    return matchResult.map(variableStr => {
        const variable = usableVariables.find(variable => variableStr === `%(${variable.key})s`);
        if(variable) {
            return variable;
        } else {
            return returnUndefinedVariable ? { key: variableStr.slice(2, -2) } : null;
        }
    }).filter(Boolean);
}
```

<!--
单元测试的测试对象通常是工具函数或者业务计算规则。

因此我这里以我最近写的一个功能举例，它是一个可以从字符串中提取 %(xx_xx)s 格式字符串并检查其是否在变量列表中的函数
-->

---
transition: fade
hideInToc: true
---

# 单元测试

```js {all|11-12|13-14|15-16|all}
import { drawUsableVariablesInString } from '../util';

describe('drawUsableVariablesInString', () => {
    // 准备测试用数据
    const usableVariables = [
        { key: 'name' },
        { key: 'age' }
    ];

    test('should return matched variables when all exist', () => {
        // 1. 准备测试数据
        const content = 'Hello, %(name)s! You are %(age)s years old.';
        // 2. 执行测试代码  
        const result = drawUsableVariablesInString(content, usableVariables);
        // 3. 断言执行结果
        expect(result).toEqual([usableVariables[0], usableVariables[1]]);
    });

    // 其他测试脚本
});
```

<!--
describe和test都是Jest提供的API，用来定义测试用例的，我们主要关心测试用例的逻辑。

(点击空格查看代码高亮)
讲解编写单元测试用例的基本思路：
1. 准备测试环境和测试数据
2. 执行测试代码
3. 断言执行结果
-->

---
transition: fade
hideInToc: true
---

# 运行测试

使用`npx jest`运行测试用例。

<v-click>
<img src="/public/unit-test-result.png" />
</v-click>

<!--
编写玩测试代码我们可以通过命令行来运行jest，得到如图所示的运行结果。

运行结果里我们可以看到测试用例的名称，还有相关的数据统计，包括运行的测试文件数量，测试用例数量，快照测试的数量以及总执行用时。
-->

---
transition: fade
hideInToc: true
---

# Mock 功能与快照测试

- 快照测试：首次运行测试时，Jest 会捕获被测对象的输出（如 UI 渲染结果、数据结构等），并将其保存在自动生成的 `.snap` 文件中作为“基准”。后续测试运行时，Jest 会将当前输出与快照文件比对，任何不一致都会导致测试失败。
- Mock：可以模拟函数、模块、定时器、第三方库或 API 调用。用于隔离依赖、验证函数调用、控制被测代码的依赖行为。

<!--
然后介绍一下Jest的两个特点功能，Mock功能以及快照测试功能。

快照测试：
适用场景：
- 输出结构稳定但内容复杂（如大段 HTML/XML，复杂对象等）
- 需要防止意外变更的配置对象

不适用场景：
- 包含动态数据（时间戳、随机 ID）
- 频繁变更的输出
- 简单的数值 / 布尔值断言
-->

---
transition: fade
hideInToc: true
---

# Mock

```js {all|4-5,8-13|all}
import { parsePrompt } from '../util';
import * as utils from '../getUniqueID';

// mock测试代码中对此模块的导入
jest.mock('../getUniqueID');

describe('parsePrompt', () => {
    let counter = 1;
    utils.getUniqueID.mockImplementation(() => `mock-id-${counter++}`);
    beforeEach(() => {
        // 重置计数器
        counter = 1;
    });
    // 测试脚本
});
```

<!--
例如我们要对这样一个功能编写单元测试：它可以解析prompt（JSON）并将其转换为渲染时需要的数据结构。

（点击空格查看代码高亮）
这里由于parsePrompt中使用getUniqueID生成唯一ID，而getUniqueID 生成的ID有随机数会导致测试结果不可控，因此需要mock getUniqueID的实现来保证测试的稳定性。
-->

---
transition: fade
hideInToc: true
---

# 快照测试

```js
const data = {
  "annotation": {
        "article_title": "论文标题",
        "writing_tips": "章节写作提示",
        "research_idea": "研究内容"
  },
  "preprocessing": {
        "writing_ideas": "%(writing_tips)s"
  },
  "prompt": [
        { "role": "system", "content": "System message" },
        { "role": "user", "content": "%(article_title)s%(writing_tips)s%(research_idea)s%(writing_ideas)s" }
  ],
  "module": "gen_research_ideas",
  "name": "AI本科毕业论文生成写作提示",
  "language": "all",
  "model": "default"
};
```

<!--
然后我们准备测试输入如下：
-->

---
transition: fade
hideInToc: true
---

````md magic-move {lines: true}
```js
it('should parse single prompt correctly', () => {
   const data = { ... };

   const result = parsePrompt(data, langList, modelList);

   // 验证基本结构
   expect(result).toHaveLength(1);
   const node = result[0];
   expect(node.title).toBe('AI本科毕业论文生成写作提示');
   expect(node.id).toBe('prompt0');

   // 验证 prompt 内容
   const prompt = node.data;
   expect(prompt.name).toBe('AI本科毕业论文生成写作提示');
   expect(prompt.module).toBe('gen_research_ideas');
   // ...

   // 验证 messageList
   expect(prompt.messageList[0].content).toBe('System message');
   expect(prompt.messageList[4].content).toBe('%(article_title)s%(writing_tips)s%(research_idea)s%(writing_ideas)s');

   // 验证 annotationList
   expect(prompt.annotationList).toEqual([{ id: 'mock-id-1', key: 'article_title', value: '论文标题' },// ...]);

   // 验证 preprocessList
   expect(prompt.preprocessList).toEqual([{ id: 'mock-id-4', key: 'writing_ideas', value: '%(writing_tips)s' }]);
});
```

```js
it('should match snapshot', () => {
   const data = { ... };

   const result = parsePrompt(data, langList, modelList);

   // 生成快照
   expect(result).toMatchSnapshot();
});
```
````

<!--
想要验证输出的结构是否是预期的，如果使用断言需要编写大量的断言语句。

但是（点击空格查看代码变化），我们可以将输入捕捉为一个快照并对其进行断言，来代替大量的断言语句。
(点击空格查看快照文件并讲解快照测试的执行逻辑)
-->

---
transition: fade
hideInToc: true
---

<img src="/public/snap.png" style="margin: 0 auto;" class="h-full" alt="" />

<!--
之后执行该快照测试时都会进行对比，如果预期结构发生变更，也可先运行该测试查看变更是否正确，然后在运行测试时使用`updateSnapshot`标志更新快照。

图中就是快照测试生成的快照文件。
-->

---
transition: fade
hideInToc: true
class: grid place-content-center
---

# 集成测试

<!-- 
介绍一下集成测试的定义。

测试AIGC的导出服务（一个Nest.js编写的Node.js后端项目）
 -->

---
transition: fade
hideInToc: true
---

````md magic-move {lines: true}
```js
// 导入测试所需的NestJS测试工具,要测试的AIGC导出服务,AIGC导出服务依赖的浏览器服务,AIGC导出服务使用的数据传输对象（DTO）
// 设置全局测试超时为60秒`（因为集成测试需要访问真实网络资源）
jest.setTimeout(60_000);

describe('ExportAIGCService', () => {
   // 准备测试环境
   let service: ExportAIGCService;
   let browserService: BrowserService;
   let module: TestingModule;
   
   // 在执行测试用例前执行，创建测试环境
   beforeAll(async () => {
      // 创建测试模块
      module = await Test.createTestingModule({
         providers: [ExportAIGCService, BrowserService],
      }).compile();
      // 从测试模块中获取AIGC导出服务实例和浏览器服务实例
      service = module.get<ExportAIGCService>(ExportAIGCService);
      browserService = module.get<BrowserService>(BrowserService);
      // 手动初始化浏览器池
      await (browserService as any).initPool();
   });
   // 在执行所有测试用例后执行，回收资源
   afterAll(async () => { ... });
   // 测试脚本
});
```

```js
// 导入语句
// 设置全局测试超时为60秒`（因为集成测试需要访问真实网络资源）
jest.setTimeout(60_000);

describe('ExportAIGCService', () => {
   // 准备测试环境
   let service: ExportAIGCService;
   let browserService: BrowserService;
   let module: TestingModule;
   
   // 在执行测试用例前执行，创建测试环境
   beforeAll(async () => { ... });
   // 在执行所有测试用例后执行，回收资源
   afterAll(async () => {
      // 如果浏览器池存在，进行清理工作
      const pool = (browserService as any).browserPool;
      if (pool) {
         await pool.drain();
         await pool.clear();
      }
      // 关闭测试模块，释放所有资源
      await module.close();
      // 恢复日志记录器的原始实现
      jest.restoreAllMocks();
   });
   // 测试脚本
});
```
````

<!-- 
准备测试环境
 -->

---
transition: fade
hideInToc: true
---

```js {all|2-3|4-5|6-8|all}
it('应该成功导出', async () => {
   // 1. 准备测试数据
   const dto: ExportAIGCReportDto = { taskId: 'ag250702144740050894819842' };
   // 2. 调用AIGC导出服务的方法
   const [result, error] = await service.exportAIGCReport(dto);
   // 3. 断言验证
   expect(error).toBeNull();  // 期望没有错误
   expect(typeof result).toBe('string');  // 期望结果是字符串
});
```

---
hideInToc: true
layout: center
class: text-center
---

# 组件测试

---
transition: fade
hideInToc: true
---

# 组件测试

````md magic-move {lines: true}
```js
// Vue.js 官方提供的用于测试 Vue 组件的工具库，可模拟组件渲染、用户交互等场景，简化组件测试流程
import { shallowMount } from '@vue/test-utils';
import CommonSwitch from '@/component/CommonSwitch';

describe('CommonSwitch.vue', () => {
    // 测试脚本
});
```

```js
// 测试默认props
it('使用默认props正确渲染', () => {
    const wrapper = shallowMount(CommonSwitch)
    expect(wrapper.props('value')).toBe(true)
    expect(wrapper.props('inactiveColor')).toBe('#C5C5C5')
})

// 测试自定义props
it('使用自定义props正确渲染', () => {
    const wrapper = shallowMount(CommonSwitch, {
        propsData: {
            value: false,
            activeColor: '#000000',
            inactiveColor: '#FFFFFF'
        }
    })
    expect(wrapper.props('value')).toBe(false)
    expect(wrapper.props('activeColor')).toBe('#000000')
    expect(wrapper.props('inactiveColor')).toBe('#FFFFFF')
})
```

```js
// 测试点击事件
it('点击时正确触发事件和切换状态', async () => {
    const wrapper = shallowMount(CommonSwitch)
    await wrapper.trigger('click')

    // 验证事件触发
    expect(wrapper.emitted('input')).toBeTruthy()
    expect(wrapper.emitted('input')[0]).toEqual([false])
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')[0]).toEqual([false])
})
```
````

<!-- 
介绍一下组件测试的定义及功能。

测试一个支持自定义激活颜色和宽高的开关组件
 -->

---
transition: fade
hideInToc: true
---

# 生成测试覆盖率报告

执行`npx jest --coverage`即可生成报告，测试报告如图所示。

<div class="relative">
  <img v-click.hide="1" class="absolute" src="/public/report-1.png" alt="" />
  <img v-click.show="1" class="absolute" src="/public/report-2.png" alt="" />
</div>

<!-- 
报告显示了项目的总测试覆盖率中各个模块的测试覆盖率，点击components目录可查看该目录下的测试覆盖率。
 -->

---
transition: fade
hideInToc: true
---

# 其他方案

- JS：`Jest`（Webpack项目推荐），`Vitest`（Vite项目推荐），`Mocha`（库项目推荐）
- Python：`pytest`
- PHP：`PHPUnit`

---
transition: fade
title: 端到端测试
layout: center
class: text-center
---

# 端到端测试

<!-- 
简介：Playwright 是微软开发的一款开源自动化测试工具，主要用于 Web 应用的端到端测试。它支持所有现代渲染引擎，包括 Chromium、WebKit 和 Firefox，能够模拟真实用户在不同浏览器环境下的操作行为。

提一下端到端测试的定义。先介绍如何编写一个端到端测试用例，然后介绍一下这个工具的一些特性。

以Playwright以及@playwright/test为工具来介绍端到端测试在项目中的实践。
除此之外还会介绍Playwright的特点功能。
 -->

---
transition: fade
hideInToc: true
class: grid place-content-center
---

<PlaywrightIntro />

---
transition: fade
hideInToc: true
---

# 一个端到端测试用例 - 登录

```js {all|4-5|6-13|14-15|all}
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    // 跳转到目标页面
    await page.goto('http://user.xishanyigu.com/user/index/login/');
    // 执行用户操作
    await page.locator('.imgApp').click();
    await page.getByRole('textbox', { name: '请输入用户名/手机号' }).click();
    await page.getByRole('textbox', { name: '请输入用户名/手机号' }).fill('15640071419');
    await page.getByRole('textbox', { name: '请输入用户名/手机号' }).press('Tab');
    await page.getByRole('textbox', { name: '请输入密码' }).fill('123456.');
    await page.locator('.check_img').click();
    await page.getByRole('button', { name: '登录' }).click();
    // 断言执行结果 
    await expect(page.getByPlaceholder('请输入您的研究问题')).toBeVisible();
});
```

---
transition: fade
hideInToc: true
---

# 运行测试

使用`npx playwright test`运行测试用例。

<v-click>
<img src="/public/e2e-result.png" />
</v-click>

<!-- 
描述一下运行结果
 -->

---
transition: fade
hideInToc: true
---

# 支持多浏览器

<div>支持的浏览器：Playwright 支持所有现代渲染引擎，包括 Chromium、WebKit 和 Firefox。可以确保网站在各种浏览器环境下都能正常运行，避免因浏览器差异导致的功能问题。</div>

<div class="mt-4">
  <img src="/public/Browsers.png" alt="" />
</div>

---
transition: fade
hideInToc: true
---

# 支持多浏览器

配置
```js [playwright.config.js] {7-12}
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  // other config
  /* Configure projects for major browsers */
  projects: [
    {name: 'chromium',use: { ...devices['Desktop Chrome'] }},
    {name: 'firefox',use: { ...devices['Desktop Firefox'] }},
    {name: 'webkit',use: { ...devices['Desktop Safari'] }},
  ],
});
```

---
transition: fade
hideInToc: true
---

# 支持多浏览器
User-Agent

<div class="relative">
  <img v-click.hide="1" class="absolute" src="/public/e2e-chromium-ua.png" alt="" />
  <img v-click.show="1" class="absolute" src="/public/e2e-firefox-ua.png" alt="" />
</div>

---
transition: fade
hideInToc: true
---

# 支持自动等待

```javascript {all|5-6|all}
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://www.xishanyigu.com/');
    // 使用支持自动等待的断言语句
    await expect(page.getByPlaceholder('请输入您的研究问题')).toBeVisible();
});
```

<!-- 
Playwright 在执行操作前会等待元素变得可交互，无需手动设置等待时间，**提高测试的稳定性**。
 -->

---
transition: fade
hideInToc: true
---

<img src="/public/e2e-auto-wait.png" alt="" />

---
transition: fade
hideInToc: true
---

# 内置并行运行

```javascript
// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // other config

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
});
```

<img v-click class="mt-2" src="/public/e2e-parallel.png" alt="" />

<!-- 
允许同时运行多个独立的测试用例，**缩短整体测试耗时**。

默认情况下，测试文件并行运行，文件内的测试用例是在同一个工作进程中按顺序运行。在配置文件中添加相关配置。

运行playwright执行测试，运行日志说明使用6个工作线程(默认CPU数量的一半)并行运行测试用例
 -->

---
transition: fade
hideInToc: true
---

# 强大的配套工具

<div class="relative">
  <img v-click.hide="1" class="absolute" src="/public/e2e-generate.gif" alt="" />
  <img v-click.show="1" class="absolute" src="/public/e2e-debugger.png" alt="" />
</div>

<!-- 
包括可以录制操作生成对应测试代码的代码生成器，可以调试测试脚本的调试工具以及可以查看测试过程的追踪器，**为测试开发、执行及调试提供全流程支持**。

使用代码生成器录制登录流程并自动生成相关代码

使用调试工具和跟踪器调试测试脚本
 -->

---
transition: fade
hideInToc: true
---

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

---
transition: fade
title: 总结
---

# 总结

- 什么是自动化测试及自动化测试的分类
- 自动化测试的成本与收益
- 使用Jest编写单元测试和集成测试
- 使用Playwright编写端到端测试

---
hideInToc: true
layout: center
class: text-center
---

# 感谢观看
