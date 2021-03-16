<template>
    <div class="tagContainer">
        <h3 style="margin-bottom: 16px;margin-bottom: 5px;text-align: center">
            实体
        </h3>
        <div class="tagList">
            <a-tag :color="node.color" v-for="(node, index) in nodes" :key="index" style="margin-bottom: 8px;cursor: pointer" @click="changeEntity">
                {{node.name}}
            </a-tag>
            <a-modal
              title="修改实体"
              :visible="changeEntityVisible"
              @cancel="handleChangeCancel"
            >
                <template slot="footer">
                    <a-popconfirm
                      title="确定删除此实体么"
                      ok-text="确定"
                      cancel-text="取消"
                      @confirm="handleDelete"

                    >
                        <a-button key="back" type="danger">
                            删除
                        </a-button>
                    </a-popconfirm>

                    <a-button key="submit" type="primary" @click="handleChangeOk">
                        修改
                    </a-button>
                </template>

                <a-form :form="changeForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-form-item label="实体值：">
                        <a-input
                          v-decorator="['entityValue', { rules: [{ required: true, message: 'Please input your entity value!' }] }]"
                          placeholder="关系一"
                        />
                    </a-form-item>
                    <color-picker style="margin-left: 10%" @childFn="parentFn1"></color-picker>
                </a-form>

            </a-modal>

            <a-tag style="cursor: pointer" @click="addEntity">
                增加节点
            </a-tag>
            <a-modal
              title="添加实体"
              :visible="addEntityVisible"
              @cancel="handleAddCancel"
              @ok="handleAdd"
            >

                <a-form :form="addForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                    <a-form-item label="实体值：">
                        <a-input
                          v-decorator="['entityValue', { rules: [{ required: true, message: 'Please input your entity value!' }] }]"
                          placeholder="请输入新的实体值"
                        />
                    </a-form-item>
                    <color-picker style="margin-left: 10%" @childFn="parentFn2"></color-picker>
                </a-form>

            </a-modal>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import ColorPicker from "./ColorPicker";
    const testNodes = [
        {
            name: '节点12345',
            color: "#FFB8C6"
        },
        {
            name: '节点2啦啦啦啦',
            color: "#FFB8C6"
        },
        {
            name: '节点3略略略略',
            color: "#FFB8C6"
        },
    ];
    export default {
        name: "EntityList",
        data(){
            return {
                nodes: testNodes,
                changeEntityVisible: false,
                addEntityVisible: false,
                entityValue: '',
                changeForm: this.$form.createForm(this, { name: 'changeEntityForm' }),
                addForm: this.$form.createForm(this, { name: 'addEntityForm' }),
                colorValue1: '',
                colorValue2: '',
            }
        },
        computed:{
            ...mapGetters[(
                'colorList'
            )]
        },
        methods:{
          parentFn1(val){
            this.colorValue1=val
            console.log(val)
          },
          parentFn2(val){
            this.colorValue2=val
            console.log(val)
          },
          changeEntity(){
            this.changeEntityVisible=true
          },
          handleChangeOk(e) {
            this.changeEntityVisible=false
          },
          handleDelete(e) {
            this.changeEntityVisible = false;
          },
          handleChangeCancel(e){
              this.changeEntityVisible = false;
          },
          addEntity(){
              this.addEntityVisible=true;
          },
          handleAddCancel(e){
              this.addEntityVisible=false;
          },
          handleAdd(e){
              this.addEntityVisible=false;
          }
        },
        components:{
            ColorPicker
        }
    }
</script>

<style scoped>
.tagContainer{
    width: 100%;
}
.tagList{
    width: 65%;
    margin: 0 auto;
    height: 100px;
}
</style>
