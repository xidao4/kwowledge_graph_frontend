import { mount,createLocalVue, shallowMount } from '@vue/test-utils'
import DownloadGraph from '@/views/graph/components/DownloadGraph.vue'

import Antd from 'ant-design-vue';
import store from '../../../../src/store'
// import VueRouter from '../../src/router'

// 创建临时Vue实例，挂载组件中使用的插件
const localVue = createLocalVue();
localVue.use(Antd);

describe('Views-DownloadGraph', () => {
    let defaultColor = "#000";
    const triggerGraphImgDownload = jest.fn();
    let wrapper = mount(DownloadGraph,{
        localVue,
        propsData: { triggerGraphImgDownload: triggerGraphImgDownload },
        store,
        // router
    });
    beforeEach(() => {
        // wrapper.vm.$on('closeModal', mockFn);
    });

    it('测试下载图片', () => {
        wrapper.vm.$data.chosenFileType = 'png';
        wrapper.find('#test-btn-dg').trigger('click');
        expect(triggerGraphImgDownload).toBeCalled();
    })

    it('测试下载文件', () => {
        wrapper.vm.$data.chosenFileType = 'png';
        wrapper.find('#test-btn-dg').trigger('click');
        expect(triggerGraphImgDownload).toBeCalled();
    })

})

