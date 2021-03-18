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
            <a-form-item label="实体值：">
                <a-input
                        v-decorator="['newName',
                            {
                                rules:
                                    [
                                        {
                                            required: true,
                                            message: '请输入实体值'
                                        }
                                    ],
                                initialValue: info.name
                            }
                        ]"
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
            }
        },
        props: {
            showModal: Boolean,
            info: Object
        },
        computed:{
            ...mapGetters([
                'colorList',
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
            handleDelete(e) {
                let name = this.info.name;
                this.delete_showGraphNodes({
                    name: name
                });
                this.$emit('closeModal', true);
            },
            handleChangeOk(e) {
                this.changeForm.validateFields(err => {
                    if (!err) {
                        let oldName = this.info.name;
                        let newName = this.changeForm.getFieldValue('newName');
                        let oldColor = this.info.color;
                        let newColor = this.colorValue;
                        // console.log('color', oldColor, newColor)
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
                });
            },
            handleChangeCancel(e){
                this.$emit('closeModal', false);
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
                    this.changeForm.setFieldsValue({'newName': this.info.name});
                    this.colorValue = this.info.color;
                }
            }
        }
    }
</script>

<style scoped>

</style>
