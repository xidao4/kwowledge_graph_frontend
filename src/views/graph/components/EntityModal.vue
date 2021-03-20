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
    import { mapGetters, mapMutations, mapActions } from 'vuex';
    import ColorPicker2 from './ColorPicker2';
    import { validateEntityName } from '@/utils/validator.js'

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
                'picId'
            ])
        },
        methods: {
            ...mapMutations([
                'update_showGraphNodes',
                'delete_showGraphNodes',
            ]),
            ...mapActions([
              'deleteEntity',
              'changeEntity'
            ]),
            parentFn1(val){
                this.colorValue = val;
            },
            handleDelete() {
                let name = this.info.name;
                this.delete_showGraphNodes({
                    name: name
                });
                this.deleteEntity({
                    picId:this.picId,
                    name: name
                })
                this.$emit('closeModal', true);
            },
            handleChangeOk() {
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
                        this.changeEntity({
                            picId:this.picId,
                            oldName: oldName,
                            newName: newName,
                        })
                        this.$emit('closeModal', true);
                    } else {
                        this.$emit('closeModal', false);
                    }
                }
            },
            handleChangeCancel(){
                this.$emit('closeModal', false);
            },
            handleNameChange() {
                this.name = {
                    ...validateEntityName(this.name.value, this.info.name, this.showGraphNodes),
                    value: this.name.value,
                };
            },
        },
        components: {
            ColorPicker2
        },
        watch: {
            showModal: {
                immediate: true,
                handler(){
                    this.name.value = this.info.name;
                    this.name.errorMsg = null;
                    this.colorValue = this.info.color;
                }
            }
        }
    }
</script>

<style scoped>

</style>
