<template>
    <a-row type="flex" justify="center" class="margin-tb">
        <a-col :span="4">
            <a-dropdown>
                <a-menu slot="overlay" @click="handleTypeChange">
                    <a-menu-item :key="item.value" v-for="item in downloadFileType">
                        <a-icon :type="item.icon" />
                        {{item.type}}
                    </a-menu-item>
                </a-menu>
                <a-button type="primary" icon="download" style="margin-left: 8px" :loading="loading">
                    {{btnText}} <a-icon type="down" /> </a-button>
            </a-dropdown>
        </a-col>
    </a-row>
</template>

<script>
    import { mapActions } from 'vuex';
    const fileType = {
        png: 'png',
        jpeg: 'jpeg',
        xml: 'xml',
        rdf: 'rdf',
        owl: 'owl',
        json: 'json'
    };
    const btnTextType = {
        download: '下载',
        jsonLoading: '数据文件生成中',
    }
    export default {
        name: "DownloadGraph",
        props: ['triggerGraphImgDownload'],
        data(){
            return {
                downloadFileType: [
                    {
                        type: 'PNG图片文件',
                        value: fileType.png,
                        icon: 'file-image'
                    },
                    {
                        type: 'JPEG图片',
                        value: fileType.jpeg,
                        icon: 'file-image'
                    },
                    // {
                    //     type: 'XML文件',
                    //     value: fileType.xml,
                    //     icon: 'file-excel'
                    // },
                    // {
                    //     type: 'RDF文件',
                    //     value: fileType.rdf,
                    //     icon: 'file-text'
                    // },
                    // {
                    //     type: 'OWL文件',
                    //     value: fileType.owl,
                    //     icon: 'file-text'
                    // },
                    {
                        type: 'JSON文件',
                        value: fileType.json,
                        icon: 'file-text'
                    },
                ],
                chosenFileType: '',
                loading: false,
                btnText: btnTextType.download,
            }
        },
        methods: {
            ...mapActions({
                downloadAct: 'downloadFile'
            }),
            handleTypeChange(value) {
                this.chosenFileType = value.key;
                if(this.chosenFileType === fileType.png || this.chosenFileType === fileType.jpeg){
                    this.downloadImage();
                } else if(this.chosenFileType === fileType.json){
                    this.downloadFile();
                }
            },
            downloadImage(){
                this.triggerGraphImgDownload(this.chosenFileType);
            },
            async downloadFile(){
                this.loading = true;
                this.btnText = btnTextType.jsonLoading;
                let res = await this.downloadAct();
                let blob = new Blob([res]);
                let url = URL.createObjectURL(blob);
                let jsonFileLink = document.createElement("a");
                jsonFileLink.href = url;
                jsonFileLink.download = "知识图谱." + this.chosenFileType;
                jsonFileLink.click();
                window.URL.revokeObjectURL(url);
                setTimeout(()=>{
                    this.loading = false;
                    this.btnText = btnTextType.download;
                }, 500)
            }
        }
    }
</script>

<style scoped>

</style>
