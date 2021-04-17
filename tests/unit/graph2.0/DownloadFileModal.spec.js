import { mount, createLocalVue } from '@vue/test-utils'
import DownloadFileModal from '@/views/graph2.0/components/downloadModal/DownloadFileModal.vue'
import Antd from 'ant-design-vue';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Antd);
localVue.use(Vuex);

describe('DownloadImgModal.vue', () => {
    let getters;
    let mutations;
    let actions;
    let store;
    let wrapper;

    beforeEach(() => {
        getters = {
            showDownloadFileModal: () => true,
            currentGraph: () => {
                return {
                    toDataURL: jest.fn()
                }
            }
        };
        mutations = {
            set_showDownloadFileModal: jest.fn()
        };
        actions = {
            downloadFile: jest.fn()
        };
        store = new Vuex.Store({
            state: {},
            getters,
            mutations,
            actions
        });
        wrapper = mount(DownloadFileModal, {
            store,
            localVue,
            data() {
                return {
                    name: '知识图谱'
                }
            },
            propsData: {
                type: ''
            }
        });
    });
    it('download snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('用户将图谱名改为空', async () => {
        global.URL.createObjectURL = jest.fn();
        global.fetch = jest.fn(() => new Promise<Blob>(resolve => resolve()));
        let buttons = wrapper.findAll('button');
        for(let i = 0; i < buttons.length; i++){
            let button = buttons.at(i);
            button.trigger('click');
        }
        await wrapper.setData(
            {
                name: '',
                noBackground: true
            }
        );
        for(let i = 0; i < buttons.length; i++){
            let button = buttons.at(i);
            button.trigger('click');
        }
        expect(mutations.set_showDownloadFileModal).toHaveBeenCalled();
    });
});
