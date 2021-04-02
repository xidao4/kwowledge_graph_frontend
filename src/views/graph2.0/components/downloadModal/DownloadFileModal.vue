<template>
    <a-modal
            title="下载数据文件"
            @cancel="cancel"
            :visible="showDownloadFileModal"
    >
        <template slot="footer">
            <a-button type="primary" :loading="loading" @click="download">
                {{btnText}} </a-button>
            <a-button @click="cancel">
                取消
            </a-button>
        </template>

        <a-form :form="fileForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
            <a-form-item
                label="文件名"
                help='默认文件名为"知识图谱"'   >
                <a-input style="border-radius: 20px; height: 40px"
                         v-model="name"
                />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex';

    const btnTextType = {
        download: '下载',
        fileLoading: '生成中...',
    }

    export default {
        name: "DownloadFileModal",
        data(){
            return {
                fileForm: this.$form.createForm(this, { name: 'fileForm' }),
                btnText: btnTextType.download,
                loading: false,
                name: '知识图谱'
            }
        },
        props: {
            type: {
                type: String,
                default: 'json'
            }
        },
        computed:{
            ...mapGetters([
                'currentGraph',
                'showDownloadFileModal'
            ])
        },
        methods: {
            ...mapMutations([
                'set_showDownloadFileModal',
            ]),
            ...mapActions({
                downloadAct: 'downloadFile'
            }),
            cancel(){
                this.set_showDownloadFileModal(false)
            },
            async download(){
                this.loading = true;
                this.btnText = btnTextType.fileLoading;
                let res = await this.downloadAct();
                console.log('res', res)
                let blob = new Blob([res]);
                let url = URL.createObjectURL(blob);
                let name = this.name || "知识图谱";
                let fileLink = document.createElement("a");
                fileLink.href = url;
                fileLink.download = name + "." + this.type;
                fileLink.click();
                window.URL.revokeObjectURL(url);
                setTimeout(()=>{
                    this.loading = false;
                    this.btnText = btnTextType.download;
                    this.set_showDownloadFileModal(false)
                }, 500)
            },
        }
    }
</script>

<style scoped>

</style>
