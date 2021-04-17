import { mount, createLocalVue } from '@vue/test-utils'
import LoginForm from '@/views/user/components/LoginForm.vue'
import Antd from 'ant-design-vue';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Antd);
localVue.use(Vuex);


describe('Login', () => {
    let actions;
    let store;
    let wrapper;

    beforeEach(() => {
        actions = {
            login: jest.fn()
        };
        store = new Vuex.Store({
            state: {},
            actions
        });
        wrapper = mount(LoginForm, {
            store,
            localVue
        });
    });
    it('snapshot', () => {
        expect(wrapper).toMatchSnapshot()
    });

    it('当表单校验正确，dispatches "loginAct"', () => {
        let inputs = wrapper.findAll('input');
        for(let i = 0; i < inputs.length; i++){
            let input = inputs.at(i);
            input.element.value = 'test';
            input.trigger('input');
        }
        let form = wrapper.find('form');
        form.trigger('submit');
        expect(actions.login).toHaveBeenCalled();
    });

    it('当表单校验失败，not dispatches "loginAct"', () => {
        let form = wrapper.find('form');
        form.trigger('submit');
        expect(actions.login).not.toHaveBeenCalled();
    })
});
