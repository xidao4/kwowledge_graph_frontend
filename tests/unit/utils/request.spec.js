import { mount,createLocalVue, shallowMount } from '@vue/test-utils'


// 创建临时Vue实例，挂载组件中使用的插件
const localVue = createLocalVue();

// mock掉整个axios模块
// 返回值在使用的时候自定义
jest.mock('axios');
localVue.prototype.$axios = axios; // 挂载axios

describe('Utils-request', () => {
    it('test interceptors', () => {

    })
});

