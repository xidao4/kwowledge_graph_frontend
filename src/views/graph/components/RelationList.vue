<template>
  <div class="relationContainer">
    <br />
    <div class="relationList">
      <div class="relationLine">
        <div class="keyValue">
          <span>定义域：</span>
          <a-select @change="handleNode1">
            <a-icon slot="suffixIcon" type="smile" />
            <a-select-option :value="node.name" v-for="(node, index) in showGraphNodes" :key="index">
              {{node.name}}
            </a-select-option>
          </a-select>
        </div>
        <div class="keyValue">
          <span>值域：</span>
          <a-select @change="handleNode2">
            <a-icon slot="suffixIcon" type="smile" />
            <a-select-option :value="node.name" v-for="(node, index) in showGraphNodes" :key="index">
              {{node.name}}
            </a-select-option>
          </a-select>
        </div>
        <div class="keyValue" id="keyValue1">
          <span>类型：</span>
          <a-select @change="handleType">
            <a-icon slot="suffixIcon" type="smile" />
            <a-select-option :value="type" v-for="(type, index) in this.relationTypeSet" :key="index">
              {{type}}
            </a-select-option>
          </a-select>
        </div>
        <div class="keyValue" id="keyValue2">
          <span>关系值：</span>
          <a-input placeholder="请输入关系值" style="width: 120px" id="nameValue" :maxLength="textSize" v-model="text"/>
        </div>
      </div>
      <a-button size="small" type="primary" @click="confirmAddRelation">
        添加
      </a-button>
    </div>
    <br />
  </div>
</template>

<script>
    import {mapGetters,mapMutations,mapActions} from 'vuex'
    import {message} from "ant-design-vue";

    export default {
        name: "RelationList",
        data(){
          return{
            node1: '',
            node2: '',
            type: '',
            name: '',
            text: '',
            textSize: 10
          }
        },
        props: ['triggerGraphDraw'],
        computed:{
          ...mapGetters([
            'showGraphNodes',
            'relationTypeSet',
            'picId',
            'showGraphEdges'
          ])
        },
        watch: {
          text: {
            immediate: true,
            handler(text){
              if(text.length===10){
                message.warning('关系值请不要超过10个字符')
              }
            }
          }
        },
        methods:{
          ...mapActions([
            'addRelation'
          ]),
          ...mapMutations([
            'add_showGraphEdges'
          ]),
          async confirmAddRelation(){
            console.log(document.getElementById("nameValue").value)
            this.name=document.getElementById("nameValue").value
            let data={
              node1: this.node1,
              node2: this.node2,
              picId: this.picId,
              name: this.name,
              type: this.type
            }
            let newData={
              node1: this.node1,
              node2: this.node2,
              name: this.name,
              type: this.type,
              color: '#000'
            }
            if(newData.node1==='' || newData.node2==='' || newData.name===''){
              message.error('增加关系失败，实体和关系名不能为空')
              return ;
            }
            for(let i=0;i<this.showGraphEdges.length;i++){
              if((this.showGraphEdges[i].node1===newData.node1) && (this.showGraphEdges[i].node2===newData.node2)
              && (this.showGraphEdges[i].name===newData.name) && (this.showGraphEdges[i].type===newData.type)){
                message.error('增加关系失败，该关系已存在')
                return ;
              }
            }
            await this.addRelation(data)
            console.log('add')
            console.log(this.showGraphEdges)
            this.add_showGraphEdges(newData)
            console.log('after add, ', this.showGraphEdges)
            this.triggerGraphDraw();
            this.text=''
          },
          cancelAdd(){

          },
          // changeNameValue(e){
          //   this.name=e.data;
          // },
          handleNode1(value){
            this.node1=value;
          },
          handleNode2(value){
            this.node2=value;
          },
          handleType(value){
            this.type=value
          },
        }
    }
</script>

<style scoped>
@media screen and (max-width: 500px) {
  .relationLine{
    display: flex;
    align-items: center;
    margin: 0 auto;
    justify-content: center;
    padding-bottom: 20px;
    flex-wrap: wrap;
  }
  .keyValue{
    width: 200px;
    margin-top: 10px;
  }
  #keyValue1{
    margin-left: 12px;
  }
}
.relationLine{
  display: flex;
  align-items: center;
  /*width: 80%;*/
  margin: 0 auto;
  justify-content: center;
  padding-bottom: 20px;
  /*flex-wrap: wrap;*/
}

.keyValue{
  width: 200px;
}
.ant-select{
  width: 110px
}
.ant-btn-sm {
  height: 29px;
  padding: 0 7px;
  font-size: 14px;
  border-radius: 2px;
  /*margin-left: 18px;*/
}
</style>
