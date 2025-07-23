# jest测试
## 自动化测试？
自动化测试工具是一种软件测试工具，它能够自动执行预设的测试用例，模拟用户操作，并自动验证测试结果。这类工具可以帮助测试人员减少重复性工作，提高测试效率和准确性。

主要特点：
1. 自动化执行：能够按照预设的测试脚本自动运行测试
2. 可重复性：保证测试过程的一致性和可重复性
3. 效率提升：显著减少人工测试时间和成本
4. 结果可靠：降低人为错误，提供准确的测试结果

## jest介绍

**零配置与易用性** <br>
Jest提供开箱即用的测试环境，内置断言库、模拟函数和代码覆盖率报告功能，无需额外配置即可快速启动测试。其链式断言语法（如expect(value).toBe(5)）简化了测试用例编写流程，支持TypeScript、React等主流技术栈。 ‌

**自动化与效率** <br>
Jest支持并行执行测试用例，可缩短整体测试时间（如上百个测试用例执行时间从分钟级降至秒级）。快照测试功能可自动捕获组件UI状态并生成快照文件，便于快速发现界面变化问题。 ‌

**模块化与扩展性** <br>
框架支持异步代码测试（含Promise、async/await），可灵活集成Webpack、Babel等工具。开发者可通过插件系统扩展功能，例如使用ts-jest转换器适配TypeScript文件。 ‌

**社区与维护** <br>
Jest拥有庞大的用户社区和活跃的生态系统，提供详细的测试报告及持续更新支持，便于问题定位和解决方案查询。

## jest相关配置

### 安装相关依赖
对应的nodeV12版本,下载26版本的jest
- `jest@26` 测试框架
- `babel-jest@26` 和 `@babel/preset-env` 让 Jest 支持 ES6+ 语法（如 import ）。
- `vue-jest@4` 让 Jest 能处理 .vue 文件（类似 Vue 编译器的“翻译官”）。
- `@vue/test-utils@^1.3.6` 和 `@testing-library/vue@^5` 用于测试 Vue 组件。
```bash
 npm install --save-dev jest@26 babel-jest@26 vue-jest@4 @vue/test-utils@^1.3.6 @testing-library/vue@^5 @babel/preset-env 
```

### 配置jest.config.js(项目根目录)

```js
module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  transform: {
    '^.+\.vue': 'vue-jest',
    '^.+\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@common/(.*)$': '<rootDir>/src/common/$1',
    '^@component/(.*)$': '<rootDir>/src/component/$1',
    '^@page/(.*)$': '<rootDir>/src/page/$1',
    '^@asset/(.*)$': '<rootDir>/src/asset/$1',
    '^@plugin/(.*)$': '<rootDir>/src/asset/$1',
    '^@svg/(.*)$': '<rootDir>/src/svg/$1',
  },
    // 单元测试文件匹配规则/tests/unit/目录下的spec.js文件
    //目录位置可以配置，但是官网说明：
    // `可以为你的测试文件随意设计自己习惯的文件结构。不过要当心 Jest 会为快照测试在临近测试文件的地方创建一个 __snapshots__ 目录。`
  testMatch: [
    '<rootDir>/tests/unit/**/*.spec.(js|jsx|ts|tsx)',
  ],
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,vue}',
    '!src/main.js',
    '!**/node_modules/**'
  ],
  clearMocks: true,

  // 是否生成覆盖率文件
  collectCoverage: false,

  // 覆盖率文件生成的位置
  coverageDirectory: "coverage",
}
```
`*.spec.js‌：通常用于标注单元测试文件，其中spec是"specification"的缩写，表示该文件定义了特定代码模块的预期行为规范。例如，如果你有一个计算函数sum.js，对应的测试文件通常命名为sum.spec.js。
‌命名规则‌：Jest默认会查找所有以.spec.js结尾的文件，并运行其中的测试用例。这种命名方式有助于快速定位测试代码位置`

### 配置babel.config.js
```js
module.exports = {
    //用于处理es5以上语法，可支持import导入等
    presets: [['@babel/preset-env', {targets: {node: 'current'}}]],
}
```

### package.json
```json
{
  "scripts": {
    "test:unit": "jest"
  }
}
```
## 编写单元测试用例

### 组件测试
`@vue/test-utils`中文文档
```url
https://v1.test-utils.vuejs.org/zh/api/wrapper/#text
```
`CommonSwitch.vue`组件
```vue
<template>
    <div class="public-switch"
         :class="{'public-switch_active':val,'disabled':disabled}"
         @click="active"
         :style="{
             width: width + 'px',
             height: height + 'px',
             '--height': height + 'px',
             backgroundColor: val ? activeColor : inactiveColor
         }"
    ></div>
</template>

<script>
export default {
    name: "CommonSwitch",
    data(){
        return {
            val:false,
        };
    },
    props:{
        width: {
            type: Number,
            default: 44,
        },
        height: {
            type: Number,
            default: 24,
        },
        value:{
            type:Boolean,
            default:true
        },
        activeColor: {
            type: String,
            default: '#3070F4'
        },
        inactiveColor: {
            type: String,
            default: '#C5C5C5'
        },
        //是否禁用
        disabled: {
            type: Boolean,
            default: false
        }
    },

    methods:{
        active(){
            this.val = !this.val;
            this.$emit('input', this.val);
            this.$nextTick(() => {
                // 用户点击数据触发事件
                this.$emit('change', this.val);
            });
        },
    },

    watch: {
        value: {
            handler(){
                if(this.val !== this.value){
                    this.val = this.value;
                }
            },
            immediate:true
        }
    },
};
</script>
```

`CommonSwitch.spec.js`测试用例<br>
使用`shallowMount`方法挂载组件，可以直接访问到组件根元素<br>
以下用例主要是验证组件渲染结果和props变化

```js
//CommonSwitch.spec.js
import { shallowMount } from '@vue/test-utils';
import CommonSwitch from '@/component/CommonSwitch';

describe('CommonSwitch.vue', () => {
    // 测试基本渲染
    it('正确渲染组件', () => {
        const wrapper = shallowMount(CommonSwitch)
        expect(wrapper.classes()).toContain('public-switch');
        //渲染成功创建快照
        expect(wrapper.element).toMatchSnapshot();
    })

    // 测试默认props
    it('使用默认props正确渲染', () => {
        const wrapper = shallowMount(CommonSwitch)
        expect(wrapper.props('value')).toBe(true)
        //expect(wrapper.props('activeColor')).toBe('#0052D9')
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

    // 测试点击事件和状态切换
    it('点击时正确触发事件和切换状态', async () => {
        const wrapper = shallowMount(CommonSwitch)
        await wrapper.trigger('click')

        // 验证事件触发
        expect(wrapper.emitted('input')).toBeTruthy()
        expect(wrapper.emitted('input')[0]).toEqual([false])
        expect(wrapper.emitted('change')).toBeTruthy()
        expect(wrapper.emitted('change')[0]).toEqual([false])
    })

    // 测试watch value变化
    it('当value prop变化时更新内部状态', async () => {
        const wrapper = shallowMount(CommonSwitch, {
            propsData: {
                value: true
            }
        })

        await wrapper.setProps({ value: false })
        expect(wrapper.vm.val).toBe(false)
    })
})

```
修改组件类名后，快照对比报错
<img src="E:\9a0aca913f08078d1f82a7b9a7003c76.png"/>
<img src="E:\cb7cc67203996ecd6104e266f4063b65.png"/>


### 功能函数测试
以下测试用例主要是：
 - 体现jest的mock功能，模拟方法的返回值和参数，验证方法的调用次数和参数
 - Timer mocks，模拟setTimeout和clearTimeout方法，验证定时器的执行时间
 - 测试js函数的输入输出，验证函数的输入输出是否符合预期

mock使用场景:<br>
**单元测试**‌：隔离依赖组件或函数，确保测试独立可控。<br>
**调试验证**：检查函数调用频率、参数匹配度等，提升测试覆盖率。 Jest 通过 jest.fn() 自动推断模拟函数的类型，确保类型安全，减少手动定义返回类型的错误风险

#### `parcelLabel`函数测试
1. 原函数
```js
/**
 * 在任意 html 中添加标签至给定的目标文本
 * @param html {string} 参与匹配的 html
 * @param target {string} 需要添加标签的文本
 * @param ignoreClass {string[]} 匹配时要忽略的节点 class 列表
 * @param startIndex {number} 匹配结果的起始索引，会添加至类名，默认与 targetClass 中的 class 通过中划线 "-" 拼接，形成新的 class
 * @param targetClass {string[]} 匹配中的元素添加的标签类名
 * @param targetLabel {string} 匹配中的元素要添加的标签名
 * @returns {[string, number]} 添加高亮标签后的 html 文本, 以及匹配中的次数
 */
export function parcelLabel(html = '', target, ignoreClass = [], startIndex = 0, targetClass = ['match-result'], targetLabel = 'span'){
    // 递归参数 当前递归的 html 内容基于原 html 的偏移索引
    let position = arguments[6] || 0;
    // 递归参数 匹配中的起止索引
    let targetIndex = arguments[7] || [];
    // 递归参数 递归层级
    let level = arguments[8] || 1;

    // 生成 dom 对象
    let dom = document.createElement('div');
    dom.innerHTML = html;
    // 暂存 忽略的标签内容 html
    let ignoreHTMLMap = {};
    // 占位 class
    let placeholder = '__ignore-class__';

    // 第一层递归，初始化匹配结果
    if(level === 1){
        // 清空需要忽略的标签内容，防止参与匹配
        ignoreClass.map(t => {
            let ignoreNodes = dom.getElementsByClassName(t);
            for (let i = 0; i < ignoreNodes.length; i++) {
                let uuClass = `${placeholder}-${i}`;
                ignoreNodes[i].classList.add(placeholder);
                ignoreNodes[i].classList.add(uuClass);
                ignoreHTMLMap[uuClass] = ignoreNodes[i].innerHTML;
                ignoreNodes[i].innerHTML = '';
            }
        });
        targetIndex = matchText(strToHTML(dom.innerText), target);
        // 无结果则返回原 html
        if(targetIndex.length === 0){
            return [html, 0];
        }
    }

    // 最小处理粒度为 #text，其余标签递归处理
    let newHtml = '';
    for (let i = 0; i < dom.childNodes.length; i++) {
        if(dom.childNodes[i].nodeName === '#text'){
            // 当前节点文本列表
            let text = strToHTML(dom.childNodes[i].textContent);
            // 当前节点的纯文本长度
            let currentLen = text.length;
            // 当前节点与 匹配中的文本的交集
            let collection = [];
            // 遍历匹配结果，查看是否有交集
            for (let j = 0; j < targetIndex.length; j++) {
                // 交集最大值, 取两个区间结束索引的最小值
                let max = Math.min(position + currentLen - 1,  targetIndex[j][1]);
                // 交集最小值，取两个区间起始索引的最大值
                let min = Math.max(position,  targetIndex[j][0]);
                if( !(position + currentLen - 1 < targetIndex[j][0] || position > targetIndex[j][1]) ){
                    collection.unshift({ matchIndex: j, min: Math.min(max, min), max: Math.max(max, min) });
                }
            }
            if(collection.length === 0){
                // 无匹配，直接拼接纯文本
                newHtml += text;
            }else{
                // 匹配中，将匹配结果包裹标签，并拼接
                text = text.split('');
                collection.map(t => {
                    text.splice(t.max + 1 - position, 0, `</${targetLabel}>`);
                    text.splice(t.min - position, 0, `<${targetLabel} class="${targetClass.join(' ')} ${targetClass.map(n => `${n}-${startIndex + t.matchIndex}`).join(' ')}">`);
                });
                newHtml += text.join('');
            }

            // 更新当前遍历到的位置，即纯文本字符索引
            position += currentLen;
        }else{
            // 非 #text 标签递归处理，并拼接处理后的html文本、更新当前遍历到的文本索引
            let result = parcelLabel(dom.childNodes[i].innerHTML, target, ignoreClass, startIndex, targetClass, targetLabel, position, targetIndex, level + 1);
            dom.childNodes[i].innerHTML = result[0];
            newHtml += dom.childNodes[i].outerHTML;
            position += dom.childNodes[i].innerText.length;
        }
    }

    // 执行完后 重新写入被忽略的 html
    if(level === 1 && Object.keys(ignoreHTMLMap).length !== 0){
        dom.innerHTML = newHtml;
        Object.keys(ignoreHTMLMap).map(t => {
            dom.getElementsByClassName(t)[0].innerHTML = ignoreHTMLMap[t];
            dom.getElementsByClassName(t)[0].classList.remove(placeholder);
            dom.getElementsByClassName(t)[0].classList.remove(t);
        });
        return [dom.innerHTML, targetIndex.length];
    }else{
        return [newHtml, targetIndex.length];
    }
}
```
2. 测试用例<br>
该函数依赖于另外两个函数，所以此处将另外两个函数mock掉，只测试`parcelLabel`函数
```js
// parcelLabel.spec.js
import { parcelLabel, strToHTML, matchText } from '@/common/util';

// 模拟 strToHTML 和 matchText 函数,其他函数不用mock
jest.mock('@/common/util', () => ({
    ...jest.requireActual('@/common/util'),
    strToHTML: jest.fn(str => str),
    matchText: jest.fn()
}));

describe('parcelLabel', () => {
    beforeEach(() => {
        // 清除所有模拟函数的调用记录
        jest.clearAllMocks();
    });

    test('应该处理空HTML输入', () => {
        matchText.mockReturnValue([]);
        const [result, count] = parcelLabel('', 'test');
        expect(result).toBe('');
        expect(count).toBe(0);
    });

    test('应该处理简单文本匹配', () => {
        const html = 'Hello World';
        const target = 'World';
        // mock strToHTML 和 matchText 函数的返回值
        strToHTML.mockReturnValueOnce('Hello World');
        matchText.mockReturnValueOnce([[6, 10]]);

        const [result, count] = parcelLabel(html, target);

        expect(count).toBe(1);
        expect(result).toContain('<span class="match-result match-result-0">World</span>');
    });

    test('应该处理多个匹配', () => {
        const html = 'Hello World Hello World';
        const target = 'World';
        strToHTML.mockReturnValueOnce('Hello World Hello World');
        matchText.mockReturnValue([[6, 10], [17, 21]]);

        const [result, count] = parcelLabel(html, target);

        expect(count).toBe(2);
        expect(result).toContain('<span class="match-result match-result-0">World</span>');
        expect(result).toContain('<span class="match-result match-result-1">World</span>');
    });

    test('应该处理带有HTML标签的内容', () => {
        const html = '<div>Hello <p>World</p></div>';
        const target = 'World';
        strToHTML.mockReturnValueOnce('<div>Hello <p>World</p></div>');
        matchText.mockReturnValue([[11, 15]]);

        const [result, count] = parcelLabel(html, target);

        expect(count).toBe(1);
        expect(result).toContain('<span class="match-result match-result-0">World</span>');
    });

    test('应该忽略指定class的内容', () => {
        const html = '<div>Hello <span class="ignore">World</span> Test</div>';
        const target = 'World';
        const ignoreClass = ['ignore'];
        matchText.mockReturnValue([]);

        const [result, count] = parcelLabel(html, target, ignoreClass);

        expect(count).toBe(0);
        expect(result).toBe(html);
    });

    test('应该使用自定义标签和类名', () => {
        const html = 'Hello World';
        const target = 'World';
        const customClass = ['custom-match'];
        const customLabel = 'mark';
        strToHTML.mockReturnValueOnce('Hello World');
        matchText.mockReturnValue([[6, 10]]);

        const [result, count] = parcelLabel(html, target, [], 0, customClass, customLabel);

        expect(count).toBe(1);
        expect(result).toContain('<mark class="custom-match custom-match-0">World</mark>');
    });

    test('应该处理嵌套的HTML结构', () => {
        const html = '<div>Hello <span>Beautiful <b>World</b></span></div>';
        const target = 'World';
        strToHTML.mockReturnValueOnce('<div>Hello <span>Beautiful <b>World</b></span></div>');
        matchText.mockReturnValue([[19, 23]]);

        const [result, count] = parcelLabel(html, target);

        expect(count).toBe(1);
        expect(result).toContain('<span class="match-result match-result-0">World</span>');
    });

    test('应该处理带有特殊字符的HTML', () => {
        const html = '<div>Hello & World</div>';
        const target = 'World';
        strToHTML.mockReturnValueOnce('<div>Hello & World</div>');
        matchText.mockReturnValue([[8, 12]]);

        const [result, count] = parcelLabel(html, target);

        expect(count).toBe(1);
        expect(result).toContain('<span class="match-result match-result-0">World</span>');
    });

    test('应该正确处理startIndex参数', () => {
        const html = 'Hello World';
        const target = 'World';
        const startIndex = 5;
        strToHTML.mockReturnValueOnce('Hello World');
        matchText.mockReturnValue([[6, 10]]);

        const [result, count] = parcelLabel(html, target, [], startIndex);

        expect(count).toBe(1);
        expect(result).toContain('<span class="match-result match-result-5">World</span>');
    });
});
```


#### `checkVip`mock测试
```js
//checkVip函数为请求接口返回是否是vip用户的函数
import { checkVip } from '@common/util';

//mock checkVip函数，返回值是Promise对象
jest.mock('@common/util', () => {
    return {
        checkVip: jest.fn()
    };
});
//模拟checkVip函数返回值
checkVip.mockResolvedValue({ code: 200 });
describe('util.js-checkVip测试', () => {
    // 调用mock后的checkVip
    it('测试等待checkVip函数返回结果', async () => {
        let data = await checkVip();
        //验证checkVip函数是否被调用
        expect(checkVip).toHaveBeenCalled();
        //验证checkVip函数的返回值是否符合预期
        expect(data.code).toBe(200)

    })
})
```

#### `Time Mock`测试

```js
function timerGame(callback) {
    console.log('进入了定时器函数');
    setTimeout(() => {
        console.log("定时器执行结束!");
        callback && callback();
    }, 1000);
}

jest.useFakeTimers();
describe('Time Mock测试', () => {
    // 定时器mock测试
    it('定时器mock测试', async () => {
        const callback = jest.fn();
        timerGame(callback);
        expect(callback).not.toBeCalled();
        // 改为 999 毫秒，不到 1秒
        jest.advanceTimersByTime(999);
        //此时为999毫秒，没有执行回调函数
        expect(callback).not.toBeCalled();
        expect(callback).toHaveBeenCalledTimes(0);
        // 又快进了 1 毫秒
        jest.advanceTimersByTime(1);
        expect(callback).toBeCalled();
        expect(callback).toHaveBeenCalledTimes(1);

    })
})
```

#### matchText函数测试
主要测试machtText函数的输入输出是否符合预期，以及是否能正确处理特殊字符、大小写、重叠字符串、包含空格的目标字符串等情况<br>
1. 原函数
```js
/**
 * 文本中查找目标字符，并返回所有匹配的起止索引列表
 * @param text
 * @param target
 * @returns [array]
 */
export function matchText(text, target){
    let index = -1;
    let result = [];
    //查找文本不区分大小写
    text = text.toLowerCase();
    target = target.toLowerCase();
    do {
        index = text.indexOf(target, index);
        if(index !== -1){
            result.push([index, index + target.length - 1]);
            index += target.length;
        }
    }while (index !== -1);

    return result;
}
```
2. 测试用例
```js
import { matchText } from '@/common/util.js';

describe('matchText', () => {
    test('应该返回空数组当目标字符串不存在时', () => {
        const text = 'Hello World';
        const target = 'xyz';
        expect(matchText(text, target)).toEqual([]);
    });

    test('应该找到单个匹配项', () => {
        const text = 'Hello World';
        const target = 'world';
        expect(matchText(text, target)).toEqual([[6, 10]]);
    });

    test('应该找到多个匹配项', () => {
        const text = 'Hello World, Hello JavaScript';
        const target = 'hello';
        expect(matchText(text, target)).toEqual([[0, 4], [13, 17]]);
    });

    test('应该处理空字符串输入', () => {
        expect(matchText('', 'test')).toEqual([]);
        expect(matchText('test', '')).toEqual([]);
        expect(matchText('', '')).toEqual([]);
    });

    test('应该正确处理特殊字符', () => {
        const text = 'Hello! @#$% Hello';
        const target = '@#$%';
        expect(matchText(text, target)).toEqual([[6, 9]]);
    });

    test('应该不区分大小写', () => {
        const text = 'Hello HELLO hElLo';
        const target = 'hello';
        expect(matchText(text, target)).toEqual([[0, 4], [6, 10], [12, 16]]);
    });

    test('应该处理重叠字符串', () => {
        const text = 'aaaa';
        const target = 'aa';
        expect(matchText(text, target)).toEqual([[0, 1], [2, 3]]);
    });

    test('应该处理包含空格的目标字符串', () => {
        const text = 'Hello World Hello World';
        const target = 'Hello World';
        expect(matchText(text, target)).toEqual([[0, 10], [12, 22]]);
    });
});
```


