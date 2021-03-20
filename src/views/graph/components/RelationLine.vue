<template>
  <a-modal
    title="修改关系"
    :visible="showModal"
    @ok="handleOk"
    @cancel="handleCancel"
    :footer="null"
  >

    <a-row type="flex" justify="center">
      <div class="relationLine">
        <div class="keyValue">
          <span>定义域：</span>
          <a-input :placeholder="this.info.source"  style="width: 200px" disabled/>
        </div>

        <div class="keyValue" style="margin-left: 14px">
          <span>值域：</span>
          <a-input :placeholder="this.info.target"  style="width: 200px" disabled/>
        </div>

        <div class="keyValue" style="margin-left: 14px">
          <span>类型：</span>
          <a-select
            show-search
            option-filter-prop="children"
            :filter-option="filterOption"
            @focus="handleFocus"
            @blur="handleBlur"
            @change="handleChange"
            :value="this.type"
          >
            <a-icon slot="suffixIcon" type="smile" />
            <a-select-option :value="type" v-for="(type, index) in this.relationTypeSet" :key="index">
              {{type}}
            </a-select-option>
          </a-select>
        </div>
        <div class="keyValue">
          <span>关系值：</span>
          <a-input v-model="nameText" id="newNameValue" style="width: 200px" maxLength="10"/>
        </div>


        <div class="buttonArea">
          <a-button type="primary" size="small" @click="confirmChangeRelation">
            保存修改
          </a-button>

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
    </a-row>
  </a-modal>
</template>

<script>
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  import {message} from "ant-design-vue";
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
        type:'',
        nameText: '',
      }
    },
    computed:{
      ...mapGetters([
        'relationTypeSet',
        'picId',
        'showGraphEdges'
      ])
    },
    watch: {
      info: {
        immediate: true,
        handler(){
          this.nameText=this.info.name
          this.type = this.info.type;
        }
      },
      nameText: function(){
        if(this.nameText.length===10){
          message.warning('关系值不能超过10个字符')
        }
      },

    },
    methods:{
      ...mapActions([
        'deleteRelation',
        'changeRelation'
      ]),
      ...mapMutations([
        'delete_showGraphEdges',
        'change_showGraphEdges'
      ]),
      async confirmDeleteRelation(){
        let that=this;
        let data={
          picId: that.picId,
          name: that.info.name,
          node1: that.info.source,
          node2: that.info.target
        }
        await this.deleteRelation(data)
        console.log(this.showGraphEdges)
        this.delete_showGraphEdges(data)
        console.log(this.showGraphEdges)
        this.$emit('closeModal', true);
        message.success(`成功删除(${data.node1},${data.node2},${data.name})`)
        this.newName=''
        this.newType=''
      },
      cancelDelete(){
        this.$emit('closeModal', false);
      },
      async confirmChangeRelation(){
        this.newName=document.getElementById("newNameValue").value
        console.log('name',this.nameText)
        console.log('newType',this.newType)
        console.log('newName',this.newName)
        if(this.newType==='' && this.newName===this.info.name){
          message.error('未做任何修改')
          return ;
        }

        let that=this;
        let data={
          picId: that.picId,
          name: that.info.name,
          newName: that.newName,
          node1: that.info.source,
          node2: that.info.target
        }
        if(this.newType===''){
          data.newType=this.type
        }
        else{
          data.newType=this.newType
        }
        if(this.newName===''){
          message.error(`修改失败，关系名不能为空`)
          return ;
        }
        await this.changeRelation(data)

        this.change_showGraphEdges(data)

        if(this.newType==='' && this.newName===''){
          this.$emit('closeModal', false);
        }
        else{
          this.$emit('closeModal', true);
        }

      },
      cancelChange(){
        this.$emit('closeModal', true);
      },
      handleOk() {
        this.$emit('closeModal', false);
      },
      handleCancel() {
        this.$emit('closeModal', false);
      },
      handleChange(value) {
        console.log(`selected ${value}`);
        this.newType=value;
        this.type=value
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
