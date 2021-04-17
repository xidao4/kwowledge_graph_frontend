import { mount, createLocalVue } from '@vue/test-utils'
import LayoutBlock from '@/views/graph2.0/components/LayoutBlock.vue'
import Antd from 'ant-design-vue';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Antd);
localVue.use(Vuex);


describe('LayoutBlock', () => {
    let mutations;
    let getters;
    let store;
    let wrapper;

    beforeEach(() => {
        mutations = {
            set_currentSetLayout: jest.fn(),
            set_currentCombos: jest.fn(),
            set_currentShowCombos: jest.fn(),
        };
        getters = {
            currentGraphId: () => 'typesetting',
            graphIds: () => {
                return {
                    force: 'force',
                    typesetting: 'typesetting'
                }
            },
            currentSetLayout: () => 'radial',
            forceLayout: () => {
                return [
                    {
                        key: 'gForce',
                            value: '经典力导向布局(gForce)'
                    },
                    {
                        key: 'force',
                            value: '经典力导向布局(force)'
                    },
                    {
                        key: 'forceAtlas2',
                            value: 'FA2力导向布局(forceAtlas2)'
                    },
                    {
                        key: 'fruchterman',
                            value: 'Fruchterman布局(fruchterman)'
                    },
                ]
            },
            layoutType: () => {
                return [
                    {
                        key: 'random',
                        value: '随机布局(random)'
                    },
                    {
                        key: 'circular',
                        value: '环形布局(circular)'
                    },
                    {
                        key: 'radial',
                        value: '辐射状布局(Radial)'
                    },
                    {
                        key: 'mds',
                        value: '高维数据降维算法布局(mds)'
                    },
                    {
                        key: 'dagre',
                        value: '层次布局(dagre)'
                    },
                    {
                        key: 'concentric',
                        value: '同心圆布局(concentric)'
                    },
                    {
                        key: 'grid',
                        value: '格子布局(grid)'
                    },
                ]
            },
            currentGraph: () => {
                return {
                    data: jest.fn(),
                    updateLayout: jest.fn()
                }
            },
            forceGraph: () => {
                return {
                    data: jest.fn(),
                    updateLayout: jest.fn(() => {
                        console.log('force update')
                    }),
                    render: jest.fn()
                }
            },
            typesettingGraph: () => {
                return {
                    data: jest.fn(),
                    updateLayout: jest.fn(() => {
                        console.log('typesetting update')
                    }),
                    render: jest.fn()
                }
            },
            currentCombos: () => ["c0", "c1"],
            currentShowCombos: () => false,
            currentShowGraphData: () => {
                return {
                    typesetting: {},
                    force: {}
                }
            }
        };
        store = new Vuex.Store({
            state: {},
            mutations,
            getters,
        });
        wrapper = mount(LayoutBlock, {
            store,
            localVue
        });
    });

    it('layoutBlock snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    });

    // it('handleLayoutChange',  () => {
    //     let outputData = "";
    //     let storeLog = inputs => (outputData += inputs);
    //     console["log"] = jest.fn(storeLog);
    //     let select = wrapper.find('.a-select');
    //     select.element.value = 'radial';
    //     select.trigger('change');
    //     expect(outputData).toBe("force updatetypesetting update");
    //     // expect(getters.currentGraph().updateLayout).toHaveBeenCalled();
    //     // expect(getters.forceGraph().updateLayout()).toBe('update');
    // });

    // it('input修改作用力', () => {
    //     let input = wrapper.find('input');
    //     input.element.value = '1';
    //     input.trigger('input')
    // })

    it('changeGroup', () => {
        let button = wrapper.find('.ant-switch');
        button.element.value = '1';
        button.trigger('click')
    });

    it('handleLayoutChange', () => {
        // TODO 监听到ant组件
        let select = wrapper.find('.ant-select-selection__rendered');
        select.trigger('change')
    })
});

