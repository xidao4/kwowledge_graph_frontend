import { mount,createLocalVue, shallowMount } from '@vue/test-utils'
import ColorPicker from '@/views/graph/components/ColorPicker2.vue'

import Antd from 'ant-design-vue';
import store from '../../../../src/store'
// import VueRouter from '../../src/router'

// 创建临时Vue实例，挂载组件中使用的插件
const localVue = createLocalVue();
localVue.use(Antd);

describe('Views-ColorPicker', () => {
    let defaultColor = "#000";
    let wrapper = mount(ColorPicker,{
        localVue,
        propsData: { defaultColor },
        store,
        // router
    });
    const pick = jest.fn(val => {
        return val;
    });
    wrapper.vm.$on('childFn', pick);
    beforeEach(() => {
        // wrapper.vm.$on('closeModal', mockFn);
    });

    it('测试方法pick', () => {
        wrapper.find('#test-cp').trigger('click');
        expect(pick).toBeCalled()
    })

})

