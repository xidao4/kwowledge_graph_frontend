<template>
  <div class="relationContainer">
    <h3 style="margin-bottom: 16px;margin-bottom: 5px;text-align: center">
      关系
    </h3>
    <br />
    <div class="relationList">
      <div class="relationLine">
        <div class="keyValue">
          <span>定义域：</span>
          <a-select @change="handleNode1">
            <a-icon slot="suffixIcon" type="smile" />
            <a-select-option :value="node.name" v-for="node in showGraphNodes">
              {{node.name}}
            </a-select-option>
          </a-select>
        </div>
        <div class="keyValue">
          <span>值域：</span>
          <a-select @change="handleNode2">
            <a-icon slot="suffixIcon" type="smile" />
            <a-select-option :value="node.name" v-for="node in showGraphNodes">
              {{node.name}}
            </a-select-option>
          </a-select>
        </div>
        <div class="keyValue">
          <span>类型：</span>
          <a-select @change="handleType">
            <a-icon slot="suffixIcon" type="smile" />
            <a-select-option :value="type" v-for="type in this.relationTypeSet">
              {{type}}
            </a-select-option>
          </a-select>
        </div>
        <div class="keyValue">
          <span>关系值：</span>
          <a-input placeholder="请输入关系值" style="width: 120px" id="nameValue"/>
        </div>
        <a-button size="small" type="primary" @click="confirmAddRelation">
          添加
        </a-button>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
    import {mapGetters,mapMutations,mapActions} from 'vuex'

    export default {
        name: "RelationList",
        data(){
          return{
            node1: '',
            node2: '',
            type: '',
            name: ''
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
        methods:{
          ...mapActions([
            'addRelation'
          ]),
          ...mapMutations([
            'add_showGraphEdges'
          ]),
          confirmAddRelation(){
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
            this.addRelation(data)
            console.log('add')
            console.log(this.showGraphEdges)
            // this.showGraphEdges.push(newData)
            this.add_showGraphEdges(newData)
            console.log('after add, ', this.showGraphEdges)
            this.triggerGraphDraw();
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
.relationLine{
  display: flex;
  width: 80%;
  margin: 0 auto;
  justify-content: center;
  padding-bottom: 20px;
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
  margin-left: 18px;
}
</style>
