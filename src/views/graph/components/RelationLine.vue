<template>
  <a-modal
    title="修改关系"
    :visible="showModal"
    @ok="handleOk"
    @cancel="handleCancel"
    :footer="null"
  >

    <div class="relationLine">
      <div class="keyValue">
        <span>定义域：</span>
        <a-select :default-value="info.source">
          <a-icon slot="suffixIcon" type="smile" />
          <a-select-option :value="info.source">
            {{info.source}}
          </a-select-option>
        </a-select>
      </div>

      <div class="keyValue" style="margin-left: 14px">
        <span>值域：</span>
        <a-select :default-value="info.target">
          <a-icon slot="suffixIcon" type="smile" />
          <a-select-option :value="info.target">
            {{info.target}}
          </a-select-option>
        </a-select>
      </div>
      <div class="keyValue" style="margin-left: 14px">
        <span>类型：</span>
        <a-select
          show-search
          placeholder="选择一种关系类型"
          option-filter-prop="children"
          :filter-option="filterOption"
          @focus="handleFocus"
          @blur="handleBlur"
          @change="handleChange"
          :default-value="info.type"
        >
          <a-icon slot="suffixIcon" type="smile" />
          <a-select-option :value="type" v-for="type in this.relationTypeSet">
            {{type}}
          </a-select-option>
        </a-select>
      </div>
      <div class="keyValue">
        <span>关系值：</span>
        <a-input :placeholder="this.info.name" id="newNameValue" style="width: 200px"/>
      </div>


      <div class="buttonArea">
        <a-popconfirm
          title="确定修改这个关系？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="confirmChangeRelation"
          @cancel="cancelChange"
        >
          <a-button type="danger" size="small">
            保存修改
          </a-button>
        </a-popconfirm>

        <a-popconfirm
          title="删除这个关系？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="confirmDeleteRelation"
          @cancel="cancelDelete"
        >
          <a-button type="danger" size="small">
            删除
          </a-button>
        </a-popconfirm>
      </div>
    </div>

  </a-modal>
</template>

<script>
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  export default {
    name: "RelationLine",
    props:{
      showModal: Boolean,
      info: Object
    },
    data(){
      return{
        newType: '',
        newName: '',
      }
    },
    computed:{
      ...mapGetters([
        'relationTypeSet',
        'picId'
      ])
    },
    methods:{
      ...mapActions([
        'deleteRelation',
        'changeRelation'
      ]),
      confirmDeleteRelation(){
        let that=this;
        let data={
          picId: that.picId,
          name: that.info.name,
          node1: that.source,
          node2: that.target
        }
        this.deleteRelation(data)
      },
      cancelDelete(){

      },
      confirmChangeRelation(){
        this.newName=document.getElementById("newNameValue").value
        let that=this;
        let data={
          picId: that.picId,
          name: that.info.name,
          newName: that.newName,
          newType: that.newType,
          node1: that.source,
          node2: that.target
        }
        this.changeRelation(data)
      },
      cancelChange(){

      },
      handleOk(e) {
        this.showModal=false;
      },
      handleCancel(e) {
        this.showModal = false;
      },
      handleChange(value) {
        console.log(`selected ${value}`);
        this.newType=value;
      },
      handleBlur() {
        console.log('blur');
      },
      handleFocus() {
        console.log('focus');
      },
      filterOption(input, option) {
        return (
          option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
      },
    }
  }
</script>

<style scoped>
.relationLine{
  width: 80%;
  margin: 0 auto;
  padding-bottom: 20px;
}
.keyValue{
  width: 400px;
  margin-bottom: 16px;
}
.ant-select{
  width: 200px
}
.ant-btn-sm {
  height: 29px;
  padding: 0 7px;
  font-size: 14px;
  border-radius: 2px;
  margin-left: 18px;
}
.buttonArea{
  margin-left: 60px;
}
</style>