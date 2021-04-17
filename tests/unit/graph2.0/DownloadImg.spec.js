import { mount, createLocalVue } from '@vue/test-utils'
import DownloadImgModal from '@/views/graph2.0/components/downloadModal/DownloadImgModal.vue'
import Antd from 'ant-design-vue';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Antd);
localVue.use(Vuex);

describe('DownloadImgModal.vue', () => {
    let getters;
    let mutations;
    let store;
    let wrapper;

    beforeEach(() => {
        getters = {
            showDownloadImgModal: () => true,
            currentGraph: () => {
                return {
                    toDataURL: jest.fn()
                }
            }
        };
        mutations = {
            set_showDownloadImgModal: jest.fn()
        };
        store = new Vuex.Store({
            state: {},
            getters,
            mutations
        });
        wrapper = mount(DownloadImgModal, {
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
        global.URL.revokeObjectURL = jest.fn();
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
        expect(mutations.set_showDownloadImgModal).toHaveBeenCalled();
    });
    it('指定图片类型', async () => {
        global.URL.revokeObjectURL = jest.fn();
        await wrapper.setProps(
            {
                type: 'jpg'
            }
        );
        let buttons = wrapper.findAll('button');
        for(let i = 0; i < buttons.length; i++){
            let button = buttons.at(i);
            button.trigger('click');
        }
        expect(mutations.set_showDownloadImgModal).toHaveBeenCalled();
    });
});
