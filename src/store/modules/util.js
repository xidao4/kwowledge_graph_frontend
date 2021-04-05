const state={
  colorList: {
    red: {
      key: '薄暮', color: '#F5222D'
    },
    orange: {
      key: '火山', color: '#FA541C'
    },
    yellow: {
      key: '日暮', color: '#FAAD14'
    },
    cyan: {
      key: '明青', color: '#13C2C2'
    },
    green: {
      key: '极光绿', color: '#52C41A'
    },
    blue: {
      key: '拂晓蓝', color: '#1890FF'
    },
    blue2: {
      key: '极客蓝', color: '#2F54EB'
    },
    purple: {
      key: '酱紫', color: '#722ED1'
    },
    pink: {
      key: '粉色（默认）', color: '#FFB8C6'
    }
  },
  addEntityVisible: '',
  addRelationVisible: '',
};

const util={
  state,
  mutations:{
    set_addEntityVisible(state,data) {
      console.log('data:',data)
      console.log('state:',state.addEntityVisible)
      state.addEntityVisible = data;
      console.log('state:',state.addEntityVisible)
    },
    set_addRelationVisible(state,data) {
      console.log('data',data)
      console.log('state:',state.addRelationVisible)
      state.addRelationVisible = data;
      console.log('state:',state.addRelationVisible)
    },
  },
  actions:{

  }
};

export default util