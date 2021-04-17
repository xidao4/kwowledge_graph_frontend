import { mount, createLocalVue } from '@vue/test-utils'
import Header from '@/views/graph2.0/components/Header.vue'
import Antd from 'ant-design-vue';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Antd);
localVue.use(Vuex);

describe('Header.vue', () => {
    let getters;
    let mutations;
    let actions;
    let store;
    let wrapper;
    const $router = {
        go: jest.fn()
    };

    beforeEach(() => {
        getters = {
            showDownloadImgModal: () => true,
            showDownloadFileModal: () => true,
            currentGraphId: () => 'typesetting',
            graphIds: () => {
                return {
                    force: 'force',
                    typesetting: 'typesetting'
                }
            },
            currentGraph: () => {
                return {
                    data: jest.fn(),
                    updateLayout: jest.fn(),
                    toDataURL: jest.fn()
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
        };
        mutations = {
            set_currentGraphId: jest.fn(),
            set_currentGraph: jest.fn(),
            set_showDownloadImgModal: jest.fn(),
            set_showDownloadFileModal: jest.fn(),
            clear_graphs: jest.fn(),
            set_isNew: jest.fn()
        };
        actions = {
            save: jest.fn(),
            thumbnail: jest.fn()
        };
        store = new Vuex.Store({
            state: {},
            getters,
            mutations,
            actions
        });
        wrapper = mount(Header, {
            store,
            localVue,
            mocks: {
                $router
            }
        });
    });
    it('header snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('保存',  () => {
        global.URL.revokeObjectURL = jest.fn();
        let buttons = wrapper.findAll('button');
        for(let i = 0; i < buttons.length; i++){
            let button = buttons.at(i);
            button.trigger('click');
        }
        expect(actions.save).toHaveBeenCalled();
    });
    it('返回',  () => {
        let button = wrapper.find('.ant-page-header-back-button');
        button.trigger('click');
        expect(actions.thumbnail).toHaveBeenCalled();
    });
    it('模式切换',  () => {
        let tabs = wrapper.findAll('.ant-tabs-tab');
        for(let i = 0; i < tabs.length; i++){
            let tab = tabs.at(i);
            tab.trigger('click');
        }
        expect(mutations.set_currentGraphId).toHaveBeenCalled();
    });
});

