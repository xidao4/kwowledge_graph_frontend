<template>
    <a-modal
            title="下载数据文件"
            @cancel="cancel"
            :visible="showDownloadJsonModal"
    >
        <template slot="footer">
            <a-button type="primary" @click="download">
                下载
            </a-button>
            <a-button @click="cancel">
                取消
            </a-button>
        </template>

        <a-form :form="jsonForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
            <a-form-item label="文件名">
                <a-input style="border-radius: 20px; height: 40px"
                         v-decorator="['name']"
                         placeholder="默认文件名为graph"
                />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "DownloadJsonModal",
        data(){
            return {
                jsonForm: this.$form.createForm(this, { name: 'jsonForm' }),
            }
        },
        computed:{
            ...mapGetters([
                'currentGraph',
                'showDownloadJsonModal'
            ])
        },
        methods: {
            cancel(){
                this.$emit('close')
            },
            download(){

            },
            changeBackground(checked) {
                console.log(`a-switch to ${checked}`);
            },
        }
    }
</script>

<style scoped>

</style>
