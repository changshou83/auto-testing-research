# Jest测试工具调研

### 核心特性

1. **开箱即用，零配置**

   - 安装后基本无需额外配置。
   - 内置测试运行器、断言库、Mock 库、覆盖率工具、DOM 操作环境（`jsdom`）。
   - 自动发现测试文件（默认查找 `__tests__` 目录或 `.test.js`/`.spec.js` 文件）。

### Jest Mocking

Jest 的 Mocking 功能是其最强大的特性之一，它允许你创建模拟对象（mocks）来替代真实依赖，从而实现测试的隔离性、可控性和高效性：

 - 切断被测代码与外部依赖的联系；
 - 模拟各种场景（成功、失败、超时等）；
 - 避免真实网络请求或复杂计算；
 - 检查被测代码是否正确调用依赖；

#### 核心 API

**jest.fn(implementation?)** - 创建一个模拟函数 (Mock Function)

这是最基础的 Mock 工具。它创建一个新的、空的、什么都不做的函数，但这个函数会记住它何时被调用、被谁调用、调用时传递了什么参数：

```angular2html
   // 创建一个什么都不做的模拟函数
   const mockCallback = jest.fn();
   
   // 创建一个返回固定值 42 的模拟函数
   const mockReturn = jest.fn().mockReturnValue(42);
   console.log(mockReturn()); // 输出: 42
   
   // 创建一个模拟异步成功的函数
   const mockAsyncSuccess = jest.fn().mockResolvedValue({ data: 'success' });
   mockAsyncSuccess().then(data => console.log(data)); // 输出: { data: 'success' }
   
   // 记录调用信息
   function testFunction(callback) {
     callback('arg1', 'arg2');
   }
   testFunction(mockCallback);
   expect(mockCallback.mock.calls.length).toBe(1); // 被调用了一次
   expect(mockCallback.mock.calls[0][0]).toBe('arg1'); // 第一次调用的第一个参数是 'arg1'
   expect(mockCallback.mock.calls[0][1]).toBe('arg2'); // 第一次调用的第二个参数是 'arg2'
```



### Jest 生命周期

1. 全局设置	**beforeAll()** 所有测试前执行
```js
   beforeAll(() => {...})
```
2. 测试间设置	**beforeEach()**	每个测试前执行	
```js
   beforeEach(() => {...})
```
3. 测试间清理		**afterEach()**	每个测试后执行
```js
   afterEach(() => {...})
```
4. 全局清理	**afterAll()**	所有测试后执行
```js
   afterAll(() => {...})
```
### NestJS 与 Jest 的关联

#### 什么是 NestJS？

NestJS 是一个用于构建高效、可扩展的 Node.js 服务器端应用的渐进式框架，而Jest是一个JavaScript测试框架。 它们之间的关联在于：NestJS官方推荐并内置集成了Jest作为其测试框架。

#### 核心关系说明

NestJS 和 Jest 形成了高度集成的技术协作关系，这种关系体现在多个层面：

| **维度**     | **NestJS 的角色**       | **Jest 的角色**          | **协作方式**                                |
|--------------|------------------------|--------------------------|--------------------------------------------|
| **官方支持** | 框架提供者             | 官方测试方案             | NestJS CLI 默认集成 Jest                   |
| **测试类型** | 应用架构基础           | 测试执行引擎             | Jest 测试 Nest 应用各层级                  |
| **开发体验** | 提供测试工具           | 提供断言和运行环境       | 无缝结合的测试开发流程                     |
| **生态整合** | 模块化系统             | 测试框架                 | Jest 扩展 Nest 模块测试能力                 |

#### 分层测试支持

Jest 完美适配 NestJS 的分层架构：

| 测试类型   | 测试对象         | Jest 在 Nest 中的实现                           |
|------------|------------------|------------------------------------------------|
| **单元测试** | 单个类/服务       | 使用 `Test.createTestingModule()`              |
| **集成测试** | 模块间交互       | 模拟依赖关系并测试模块集成                     |
| **E2E 测试** | 完整应用流       | 通过 `supertest` 测试 HTTP 端点                |

#### 协作优势对比

| 特性 | 单独使用 Jest | NestJS + Jest 集成 | 优势提升 |
|------|---------------|--------------------|----------|
| **依赖注入测试** | 需手动模拟 | 内置 DI 容器支持 | 测试复杂度降低 70% |
| **模块化测试** | 困难 | TestingModule 原生支持 | 模块隔离性提升 |
| **配置复杂度** | 中等 | CLI 自动生成优化配置 | 初始化时间减少 90% |
| **中间件测试** | 复杂 | 专用测试工具链 | 测试代码减少 50% |
| **TypeScript 支持** | 需额外配置 | 开箱即用完美支持 | 类型安全保证 |


## 自动化测试工具实例

#### 1. 接入项目

1. 安装 Jest
```bash
npm install --save-dev jest@28.1.3
```
2. 安装 NestJS
```bash
npm install -g @nestjs/cli
```
3. 添加测试脚本
```json
{
  "scripts": {
    "test": "jest"
  }
}
```
4. 配置 Jest
```js
// package.json
"jest": {
    "moduleFileExtensions": ["js", "json", "ts"],
        "testMatch": [
        "**/*.spec.ts",
        "**/*.e2e-spec.ts"
    ],
    "rootDir": ".",
    "transform": {
        "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": ["**/*.(t|j)s"],
    "coverageDirectory": "../coverage",
    "testEnvironment": "node",
    "moduleNameMapper": {
        "^@app/(.*)$": "<rootDir>/application/$1"
    },
    "verbose": true,
    "testPathIgnorePatterns": []
}
```

#### 2. 编写测试脚本
 2.1  AIGC导出服务测试

在`test`目录下创建`export-aigc.service.spec.ts`文件

```js
// 导入测试所需的NestJS测试工具
import { Test, TestingModule } from '@nestjs/testing';
// 导入要测试的AIGC导出服务
import { ExportAIGCService } from '@app/export/export-aigc.service';
// 导入AIGC导出服务依赖的浏览器服务
import { BrowserService } from '@app/browser/browser.service';
// 导入AIGC导出服务使用的数据传输对象（DTO）
import { ExportAIGCReportDto } from '@app/export/dto/ExportAIGCReport.dto';
```
设置全局测试超时为60秒`（因为集成测试需要访问真实网络资源）`

```js
jest.setTimeout(60000);
```

定义测试套件：AIGC导出服务测试
```js
describe('ExportAIGCService', () => {...});
```
声明测试中使用的变量
```js
 // AIGC导出服务实例
let service: ExportAIGCService;
// 浏览器服务实例
let browserService: BrowserService;
// NestJS测试模块实例
let module: TestingModule;
```

使用beforeAll在所有测试开始前执行（只执行一次）

```js
beforeAll(async () => {
    // 创建NestJS测试模块
    module = await Test.createTestingModule({
        // 配置测试模块中需要使用的服务
        providers: [
            // 要测试的AIGC导出服务
            ExportAIGCService,
            // 使用真实的浏览器服务
            BrowserService,
        ],
    }).compile();  // 编译测试模块，准备依赖注入

    // 从测试模块中获取AIGC导出服务实例
    service = module.get<ExportAIGCService>(ExportAIGCService);
    // 从测试模块中获取浏览器服务实例
    browserService = module.get<BrowserService>(BrowserService);
    // 手动初始化浏览器池
    await (browserService as any).initPool();
});
```
使用 afterAll 在所有测试结束后执行（只执行一次）

```js
afterAll(async () => {
    // 获取浏览器服务中的浏览器池实例
    const pool = (browserService as any).browserPool;

    // 如果浏览器池存在，进行清理工作
    if (pool) {
        // 停止接受新任务
        await pool.drain();
        // 关闭所有浏览器实例
        await pool.clear();
    }

    // 关闭测试模块，释放所有资源
    await module.close();

    // 恢复日志记录器的原始实现
    jest.restoreAllMocks();
});
```
编写测试用例1: 成功导出AIGC报告

```js
it('应该成功导出AIGC PDF报告', async () => {
    // 创建测试数据传输对象(DTO)
    const dto: ExportAIGCReportDto = {
        taskId: 'ag250702144740050894819842'
    };

    // 调用AIGC导出服务的方法
    const [result, error] = await service.exportAIGCReport(dto);
    // 断言验证
    expect(error).toBeNull();  // 期望没有错误
    expect(typeof result).toBe('string');  // 期望结果是字符串
});
```

编写测试用例2: 测试处理无效参数的情况

```js
it('处理无效参数', async () => {
    // 创建测试数据传输对象(DTO)，包含无效的参数
    const dto: ExportAIGCReportDto = {
        taskId: ''
    };

    // 调用服务的方法
    const [result, error] = await service.exportAIGCReport(dto);

    // 断言1: 期望结果为空（result应为null）
    expect(result).toBeNull();

    // 断言2: 期望有错误信息（error不应为null）
    expect(error).not.toBeNull();
    // 快照测试：捕获错误对象的完整结构
    expect(error).toMatchSnapshot();
});
```

#### 3. 执行测试

```bash
npm test
```

#### 4. 执行结果

执行进行中状态

```js
//输入执行命令
PS E:\service_node> npm test

> service_node@0.0.1 test
> jest

//执行会默认会把配置好匹配文件后缀名匹配的文件过滤出来
 RUNS  test/export-drawing.service.spec.ts
 RUNS  test/export-journal-compare.spec.ts
 RUNS  test/export-resume.service.spec.ts
 RUNS  test/export-aigc.service.spec.ts
 RUNS  test/export-journal-report.service.spec.ts
 RUNS  test/app.e2e-spec.ts

// 执行进度（当前进行进行的文件/总文件）
Test Suites: 0 of 6 total

//测试用例数量（当前完成数量）
Tests:       0 total

//屏幕快照 （当前完成数量）
Snapshots:   0 total

//预计时间 （执行时间/预计时间）
Time:        3 s, estimated 15 s
```

**执行已完成**
 - 报错文件信息
```js
FAIL  test/app.e2e-spec.ts
  ● Test suite failed to run
    Your test suite must contain at least one test.
      at onResult (node_modules/@jest/core/build/TestScheduler.js:172:18)
      at node_modules/@jest/core/build/TestScheduler.js:300:17
      at node_modules/emittery/index.js:311:13
          at Array.map (<anonymous>)
      at Emittery.emit (node_modules/emittery/index.js:309:23)
```
- 成功文件信息

```js
//测试文件地址以及运行消耗时间
 PASS  test/export-journal-report.service.spec.ts (6.319 s)
    // 测试套件名称
  ExportJournalReportService
    //测试用例完成状态与耗时
    √ 生成期刊报告PDF (1736 ms)
    √ 处理无效参数 (452 ms)    
```
- 执行完成状态

```js
// 测试文件完成情况
Test Suites: 1 failed, 5 passed, 6 total
// 测试用例完成情况
Tests:       11 passed, 11 total
//屏幕快照信息
Snapshots:   1 passed, 1 total
//测试所用时间
Time:        16.126 s
Ran all test suites.
```
##### 屏幕快照信息

在 Jest 测试框架中，Snapshots（快照） 是一种特殊的测试机制，主要用于验证输出结果是否与预期一致。

1. 核心作用
   - 自动生成参考模板,首次运行测试时，Jest 会捕获被测对象的输出（如 UI 渲染结果、数据结构等）;
   - 自动生成 .snap 并且文件保存在 __snapshots__ 目录中作为"黄金标准";
   - 后续测试运行时，Jest 会将当前输出与快照文件比对,任何不一致都会导致测试失败（除非是预期变更）;</br>

###### 具体使用方式：

```js
// 测试用例2: 测试处理无效参数的情况
it('处理无效参数', async () => {
// 创建测试数据传输对象(DTO)，包含无效的参数
   const dto: ExportAIGCReportDto = {
      taskId: ''
   };
   // 调用服务的方法
   const [result, error] = await service.exportAIGCReport(dto);
   // 快照测试：捕获错误对象的完整结构
    expect(error).toMatchSnapshot();
});
```
运行测试结束后生文件生成位置是与测试文件同级创建一个 __snapshots__ 文件夹下面创建与测试文件同名，后缀名为.snap 的文件：

<img src="http://chat.xishanyigu.com/img_1.png">







如果后续需求变更了未传id **报错msg发生了变更**，然后进行测试那么屏幕快照信息就会显示报错：


```js
Snapshot Summary

//这里有显示报错信息，他也会提醒你执行命令来更新屏幕快照信息
 › 1 snapshot failed from 1 test suite. Inspect your code changes or run `npm test -- -u` to update them.
Test Suites: 2 failed, 4 passed, 6 total
Tests:       1 failed, 10 passed, 11 total
//这里显示快照一共一项未通过一项
Snapshots:   1 failed, 1 total
Time:        16.425 s
Ran all test suites.
```
遇到这种信息变更我们需要执行命令 `jest --updateSnapshot` 更新屏幕快照信息,更新后运行结果

```js
// 快照摘要
Snapshot Summary
 › 1 snapshot updated from 1 test suite.

Test Suites: 1 failed, 5 passed, 6 total
Tests:       11 passed, 11 total
// 快照信息会显示更新信息
Snapshots:   1 updated, 1 total
Time:        16.165 s
Ran all test suites.
```
屏幕快照的适用场景：
   - 输出结构稳定但内容复杂（如大段 HTML/XML）
   - 需要防止意外变更的配置对象
   - 跨团队共享的接口规范

屏幕快照的不适用场景：
   - 包含动态数据（时间戳、随机 ID）
   - 频繁变更的输出
   - 简单的数值/布尔值断言

目前我的nodejs服务里面的导出返回结果信息差不多都是文件信息，base64编码的PDF内容非常长，然后就是即使PDF内容有微小变化（比如时间戳、随机ID等），整个base64字符串就会完全不同，导致快照失败。

如下图，我们将正确返回的pdf,ba64文件信息进行快照保存，同一个id，导出测试两次的ba64信息也不相同所以此处使用快照并不合适：

<img src="http://chat.xishanyigu.com/img_2.png">
