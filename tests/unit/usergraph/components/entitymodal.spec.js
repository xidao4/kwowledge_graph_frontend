import { mount,createLocalVue, shallowMount } from '@vue/test-utils'
import EntityModal from '@/views/graph/components/EntityModal.vue'

import Antd from 'ant-design-vue';
import store from '../../../../src/store'
// import VueRouter from '../../src/router'

// 创建临时Vue实例，挂载组件中使用的插件
const localVue = createLocalVue();
localVue.use(Antd);
// localVue.use(VueRouter);
// const router = new VueRouter();

// mock掉整个axios模块
// 返回值在使用的时候自定义
// jest.mock('axios');
// localVue.prototype.$axios = axios; // 挂载axios


describe('Views-EntityModal', () => {
    let showModal = true;
    let info = {
        name: 'test EntityModal',
        color: '#000'
    };
    let wrapper = mount(EntityModal,{
        localVue,
        propsData: { showModal, info },
        store,
        // router
    });
    const mockFn = jest.fn();
    const mockFn2 = jest.fn();
    wrapper.vm.$on('closeModal', mockFn);
    wrapper.vm.$on('validateEntityName', mockFn2);
    beforeEach(() => {
        // wrapper.vm.$on('closeModal', mockFn);
    });

    it('渲染EntitModal，加载默认数据', () => {
        let preData = wrapper.vm.$data;
        expect(preData.name.value).toBe(info.name);
        expect(preData.name.errorMsg).toBeNull();
    });

    it('获取props传参', () => {
        let propData = wrapper.vm.$props
        expect(propData.showModal).toBeTruthy();
        expect(propData.info).toBe(info);
        // expect(wrapper.html()).toContain('忘记密码')
    })

    // it('测试方法handleDelete', () => {
    //     wrapper.find('#test-pop-em').trigger('confirm')
    //     expect(mockFn).toBeCalled()
    // })

    it('测试方法handleChangeOk', () => {
        wrapper.find('#test-btn-em2').trigger('click')
        expect(mockFn).toBeCalled()
    })

    // it('测试方法handleChangeCancel', () => {
    //     wrapper.trigger('cancel');
    //     expect(mockFn).toBeCalled();
    // })

    // it('测试方法handleNameChange', () => {
    //     wrapper.find('#test-input-em').trigger('change');
    //     expect(mockFn2).toBeCalled();
    // })

})

