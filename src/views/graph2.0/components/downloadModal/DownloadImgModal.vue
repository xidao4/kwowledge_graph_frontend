<template>
    <a-modal
            title="下载图谱"
            @cancel="cancel"
            :visible="showDownloadImgModal"
    >
        <template slot="footer">
            <a-button type="primary" @click="download">
                下载
            </a-button>
            <a-button @click="cancel">
                取消
            </a-button>
        </template>

        <a-form :form="imgForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
            <a-form-item
                    label="文件名"
                    help='默认文件名为"知识图谱"'>
                <a-input style="border-radius: 20px; height: 40px"
                         v-model="name"
                />
            </a-form-item>
            <a-form-item label="无背景">
                <a-switch default-checked @change="changeBackground" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex';

    export default {
        name: "DownloadImgModal",
        data(){
            return {
                imgForm: this.$form.createForm(this, { name: 'imgForm' }),
                noBackground: true,
                name: '知识图谱'
            }
        },
        props: {
            type: {
                type: String,
                default: 'png'
            }
        },
        computed:{
            ...mapGetters([
                'currentGraph',
                'showDownloadImgModal'
            ])
        },
        methods: {
            ...mapMutations([
                'set_showDownloadImgModal'
            ]),
            cancel(){
                this.set_showDownloadImgModal(false);
            },
            download(){
                let name = this.name || "知识图谱";
                let type = this.type || "png";
                let paramType = 'image/' + (this.type || "png");
                let imgUrl = '';
                if(this.noBackground){
                    imgUrl = this.currentGraph.toDataURL(paramType);
                } else {
                    imgUrl = this.currentGraph.toDataURL(paramType, '#FFFFFF');
                }
                const imgLink = document.createElement('a');
                imgLink.download = name + '.' + type;
                imgLink.style.display = 'none';
                imgLink.href = imgUrl;
                document.body.appendChild(imgLink);
                imgLink.click();
                URL.revokeObjectURL(imgLink.href);
                document.body.removeChild(imgLink)

                this.set_showDownloadImgModal(false);
            },
            changeBackground(checked) {
                this.noBackground = checked;
            },
        }
    }
</script>

<style scoped>

</style>
