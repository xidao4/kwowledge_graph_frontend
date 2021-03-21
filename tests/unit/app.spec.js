import { mount } from '@vue/test-utils'
import App from '@/App';

describe('App', () => {
    let wrapper,
        vm;

    beforeEach(() => {
        wrapper = mount(App);
        vm = wrapper.vm;
    });

    // 为App的单元测试增加快照（snapshot）：
    it('包含预期html结构', () => {
        expect(vm.$el).toMatchSnapshot()
    })
});
