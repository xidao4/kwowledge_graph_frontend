import { mount,createLocalVue, shallowMount } from '@vue/test-utils'
import Graph from '@/views/graph/components/Graph.vue'
import echarts from 'echarts'
import Antd from 'ant-design-vue';
import store from '../../../../src/store'
// import VueRouter from '../../src/router'

// 创建临时Vue实例，挂载组件中使用的插件
const localVue = createLocalVue();
localVue.use(Antd);
localVue.prototype.$echarts = echarts

describe('Views-Graph', () => {
    let defaultColor = "#000";
    const triggerGraphImgDownload = jest.fn();
    let wrapper = mount(Graph,{
        localVue,
        store,
        // router
    });

    const showGraphEdges = jest.fn(() => [
        {
            name: '操作系统集团',
            color: "#F5222D"
        }, {
            name: '浏览器有限公司',
            color: "#FA541C"
        }, {
            name: 'HTML科技',
            color: "#FAAD14"
        }, {
            name: 'JavaScript科技',
            color: "#13C2C2"
        }, {
            name: 'CSS科技',
            color: "#52C41A"
        }, {
            name: 'Chrome',
            color: "#1890FF"
        }, {
            name: 'IE',
            color: "#FFB8C6"
        }, {
            name: 'Firefox',
            color: "#FFB8C6"
        }, {
            name: 'Safari',
            color: "#FFB8C6"
        }
    ]);
    const showGraphNodes = jest.fn(() => [
        {
            node1: '浏览器有限公司',
            node2: '操作系统集团',
            name: '参股',
            type: 'hasProperty',
            color: '#000'
        }, {
            node1: 'HTML科技',
            node2: '浏览器有限公司',
            name: '参股',
            type: 'hasProperty',
            color: '#000'
        }, {
            node1: 'CSS科技',
            node2: '浏览器有限公司',
            name: '参股',
            type: 'hasProperty',
            color: '#000'
        }, {
            node1: 'JavaScript科技',
            node2: '浏览器有限公司',
            name: '参股',
            type: 'hasProperty',
            color: '#000'
        }, {
            node1: 'Chrome',
            node2: '浏览器有限公司',
            name: '是',
            type: 'is',
            color: '#000'
        }, {
            node1: 'IE',
            node2: '浏览器有限公司',
            name: '是',
            type: 'is',
            color: '#000'
        }, {
            node1: 'Firefox',
            node2: '浏览器有限公司',
            name: '董事',
            type: 'is',
            color: '#000'
        }, {
            node1: 'Safari',
            node2: '浏览器有限公司',
            name: '董事',
            type: 'is',
            color: '#000'
        }, {
            node1: 'Chrome',
            node2: 'JavaScript科技',
            name: '法人',
            type: 'is',
            color: '#000'
        }
    ]);
    wrapper.vm.$on('showGraphEdges', showGraphEdges);
    wrapper.vm.$on('showGraphNodes', showGraphNodes);
    beforeEach(() => {
        // wrapper.vm.$on('closeModal', mockFn);
    });

    it('测试draw', () => {
        wrapper.vm.$on('draw', showGraphEdges);
        expect(showGraphEdges).toBeCalled()
    })

})

