import { mount, createLocalVue } from '@vue/test-utils'
import EntityList from '@/views/graph/components/EntityList.vue'
import Antd from 'ant-design-vue';
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Antd);
localVue.use(Vuex);

describe('EntityList',()=>{
  let mutations;
  let getters;
  let store;
  let wrapper;
  beforeEach(()=>{
    mutations = {
      set_nodeId:jest.fn(),
      set_currentShowGraphData:jest.fn(),
      set_currentShowGraphData_typesetting:jest.fn(),
      set_currentGraphData:jest.fn(),
      set_currentShowBoard:jest.fn(),
    };
    getters={
      colorList:()=>[],
      picId:()=>'6075ab0c1f3a46144cf5c4c1',
      currentGraph: () => {
        return {
          data: jest.fn(),
          updateLayout: jest.fn()
        }
      },
      currentGraphData:()=>{
        return{
          data: jest.fn()
        }
      },
      nodeId:()=>0,
      currentShowGraphData: () => {
        return {
          typesetting: {},
          force: {}
        }
      },
      boardTypes:()=>{
        return{
          none: '0',
          pie: '1',
          entityList: '2',
          relationList: '3',
          entityEdit: '4',
          relationEdit: '5',
        }
      }
    }
    store = new Vuex.Store({
      state: {},
      mutations,
      getters,
    });
    wrapper = mount(EntityList, {
      store,
      localVue
    });
  })
  it('entityList snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  });
  it("has label input",()=>{
    expect(wrapper.html()).toContain('<label title="实体值：" class="">实体值</label>')
  })
  it("has labelValue input",()=>{
    expect(wrapper.html()).toContain('<label title="实体类型：" class="">实体类型</label>')
  })
  it("has button",()=>{
    expect(wrapper.html()).toContain('确认增加')
  })
  it("input value",async ()=>{
    await wrapper.find('input.ant-input').trigger('keydown',{
      key:'a'
    })
  })
})