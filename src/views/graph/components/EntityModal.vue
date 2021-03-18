<template>
    <a-modal
            title="修改实体"
            @cancel="handleChangeCancel"
            :visible="showModal"
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

        <a-form :form="changeForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
            <a-form-item label="实体值："
                         :validate-status="name.validateStatus"
                         :help="name.errorMsg || tips">
                <a-input
                        v-model="name.value"
                        :maxLength="15"
                        @change="handleNameChange"
                />
            </a-form-item>
<!--            <color-picker style="margin-left: 10%" @childFn="parentFn1"></color-picker>-->
            <a-form-item label="颜色：" style="display: flex; align-items: center;">
                <color-picker2 :default-color="colorValue" @childFn="parentFn1"></color-picker2>
            </a-form-item>
        </a-form>

    </a-modal>
</template>

<script>
    import ColorPicker from './ColorPicker';
    import { mapGetters, mapMutations, mapActions } from 'vuex';
    import ColorPicker2 from './ColorPicker2';

    export default {
        name: "EntityModal",
        data(){
            return {
                changeForm: this.$form.createForm(this, { name: 'changeEntityForm' }),
                colorValue: '',
                name: {
                    value: '',
                },
                tips: '请输入1-15位实体值，与现有实体值不相同',
            }
        },
        props: {
            showModal: Boolean,
            info: Object
        },
        computed:{
            ...mapGetters([
                'colorList',
                'showGraphNodes',
            ])
        },
        methods: {
            ...mapMutations([
                'update_showGraphNodes',
                'delete_showGraphNodes',
            ]),
            parentFn1(val){
                this.colorValue = val;
            },
            handleDelete() {
                let name = this.info.name;
                this.delete_showGraphNodes({
                    name: name
                });
                this.$emit('closeModal', true);
            },
            handleChangeOk(e) {
                if(this.name.errorMsg === null){
                    let oldName = this.info.name;
                    let newName = this.name.value;
                    let oldColor = this.info.color;
                    let newColor = this.colorValue;
                    if(oldName !== newName || oldColor !== newColor){
                        this.update_showGraphNodes({
                            oldName: oldName,
                            newName: newName,
                            newColor: newColor,
                        });
                        this.$emit('closeModal', true);
                    } else {
                        this.$emit('closeModal', false);
                    }
                }
            },
            handleChangeCancel(e){
                this.$emit('closeModal', false);
            },
            validateEntityName() {
                let newName = this.name.value;
                if(newName.match(/^\s*$/)){
                    return {
                        validateStatus: 'error',
                        errorMsg: '请输入实体值',
                    };
                }else if (newName.length > 0 && newName.length <= 15) {
                    for(let i = 0; i < this.showGraphNodes.length; i++){
                        if(newName !== this.info.name && this.showGraphNodes[i]['name'] === newName){
                            return {
                                validateStatus: 'error',
                                errorMsg: '与现有实体重名',
                            };
                        }
                    }
                    return {
                        validateStatus: 'success',
                        errorMsg: null,
                    };
                } else if (newName.length === 0){
                    return {
                        validateStatus: 'error',
                        errorMsg: '请输入实体值',
                    };
                } else {
                    // input的maxLength即可限制，这里防御式编程
                    return {
                        validateStatus: 'error',
                        errorMsg: '实体值应为1-15位',
                    };
                }
            },
            handleNameChange(value) {
                this.name = {
                    ...this.validateEntityName(value),
                    value: this.name.value,
                };
            },
        },
        components: {
            ColorPicker,
            ColorPicker2
        },
        watch: {
            showModal: {
                immediate: true,
                handler(showModal){
                    this.name.value = this.info.name;
                    this.colorValue = this.info.color;
                }
            }
        }
    }
</script>

<style scoped>

</style>
