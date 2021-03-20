<template>
    <div class="tagContainer">
        <h3 style="margin-bottom: 16px;margin-bottom: 5px;text-align: center">
            实体
        </h3>
        <div class="tagList">
            <a-row type="flex" justify="center">
                <a-col span="20">
                    <a-tag :color="node.color" v-for="(node, index) in showGraphNodes" :key="index"
                           class="tag-item">
                        {{node.name}}
                    </a-tag>

<!--                    <a-tag style="cursor: pointer;" class="tag-item" @click="handleAddEntity">-->
<!--                        增加节点-->
<!--                    </a-tag>-->

                    <a-tag style="cursor: pointer; border-style: dashed;" @click="handleAddEntity"
                            class="tag-item">
                        <a-icon type="plus" /> 增加节点
                    </a-tag>
                </a-col>
            </a-row>

<!--            <a-modal-->
<!--              title="修改实体"-->
<!--              :visible="changeEntityVisible"-->
<!--              @cancel="handleChangeCancel"-->
<!--            >-->
<!--                <template slot="footer">-->
<!--                    <a-popconfirm-->
<!--                      title="确定删除此实体么"-->
<!--                      ok-text="确定"-->
<!--                      cancel-text="取消"-->
<!--                      @confirm="handleDelete"-->

<!--                    >-->
<!--                        <a-button key="back" type="danger">-->
<!--                            删除-->
<!--                        </a-button>-->
<!--                    </a-popconfirm>-->

<!--                    <a-button key="submit" type="primary" @click="handleChangeOk">-->
<!--                        修改-->
<!--                    </a-button>-->
<!--                </template>-->

<!--                <a-form :form="changeForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">-->
<!--                    <a-form-item label="实体值：">-->
<!--                        <a-input-->
<!--                          v-decorator="['entityValue', { rules: [{ required: true, message: 'Please input your entity value!' }] }]"-->
<!--                          placeholder="关系一"-->
<!--                        />-->
<!--                    </a-form-item>-->
<!--                    <color-picker style="margin-left: 10%" @childFn="parentFn1"></color-picker>-->
<!--                </a-form>-->

<!--            </a-modal>-->

            <a-modal
              title="添加实体"
              :visible="addEntityVisible"
              @cancel="handleAddCancel"
              @ok="handleAdd"
            >

                <a-form :form="addForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
                    <a-form-item label="实体值："
                                 :validate-status="name.validateStatus"
                                 :help="name.errorMsg || tips">
                        <a-input
                                v-model="name.value"
                                :maxLength="15"
                                @change="handleNameChange"
                        />
                    </a-form-item>
                    <a-form-item label="颜色：" style="display: flex; align-items: center;">
                        <color-picker2 :default-color="colorValue" @childFn="parentFn1"></color-picker2>
                    </a-form-item>
                </a-form>

            </a-modal>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex';
    import ColorPicker from "./ColorPicker";
    import ARow from "ant-design-vue/es/grid/Row";
    import ACol from "ant-design-vue/es/grid/Col";
    import ColorPicker2 from './ColorPicker2';
    import { validateEntityName } from '@/utils/validator.js'

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
                colorValue: '#FFB8C6',
                name: {
                    value: '',
                },
                tips: '请输入1-15位实体值，与现有实体值不相同',
            }
        },
        props: ['triggerGraphDraw'],
        computed:{
            ...mapGetters([
                'colorList',
                'showGraphNodes',
                'picId'
            ])
        },
        methods:{
            ...mapMutations([
                'add_showGraphNodes'
            ]),
            ...mapActions([
              'addEntity'
            ]),
            parentFn1(val){
                this.colorValue = val;
            },
            parentFn2(val){
                this.colorValue2 = val
                console.log(val)
            },
            handleChangeEntity(){
                this.changeEntityVisible = true
            },
            handleChangeOk(e) {
                this.changeEntityVisible = false
            },
            handleDelete(e) {
                this.changeEntityVisible = false;
            },
            handleChangeCancel(e){
                  this.changeEntityVisible = false;
            },
            handleAddEntity(){
                  this.addEntityVisible = true;
            },
            handleAddCancel(e){
                  this.addEntityVisible = false;
            },
            handleAdd(e){
                this.name = {
                    ...validateEntityName(this.name.value, null, this.showGraphNodes),
                    value: this.name.value,
                };
                if(this.name.errorMsg === null){
                    this.add_showGraphNodes({
                        name: this.name.value,
                        color: this.colorValue
                    });
                    this.addEntity({
                        picId:this.picId,
                        name: this.name.value
                    })
                    this.triggerGraphDraw();
                    this.addEntityVisible = false;
                    this.name.value = '';
                }
            },
            handleNameChange(value) {
                this.name = {
                    ...validateEntityName(this.name.value, null, this.showGraphNodes),
                    value: this.name.value,
                };
            },
        },
        components:{
            ACol,
            ARow,
            ColorPicker,
            ColorPicker2
        }
    }
</script>

<style scoped>
.tagContainer{
    width: 100%;
}
.tagList{
    /*width: 65%;*/
    /*margin: 0 auto;*/
    /*height: 100px;*/
    display: flex;
    justify-content: center;
    /*padding: 10px;*/
    align-items: center;
    text-align: center;
}
.entity-list{
    display: flex;
    align-items: center;
    justify-content: center;
}
.tag-item{
    line-height: 28px;
    cursor: pointer;
    margin: 10px 6px;
}
</style>
