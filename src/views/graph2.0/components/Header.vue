<template>
    <a-page-header
            style="border: 1px solid rgb(235, 237, 240)"
            title="编辑图谱"
            sub-title=""
            @back="() => $router.go(-1)"
    >
        <template slot="extra">
            <a-button key="3" type="primary" style="margin-right: 10px;" >
                保存
            </a-button>
            <a-dropdown>
                <a-menu slot="overlay" @click="handleTypeChange">
                    <a-menu-item :key="item.value" v-for="item in downloadFileType">
                        <a-icon :type="item.icon" />
                        {{item.type}}
                    </a-menu-item>
                </a-menu>
                <a-button type="primary" style="margin-left: 8px" :loading="loading" id="test-btn-dg">
                    {{btnText}} <a-icon type="down" /> </a-button>
            </a-dropdown>
        </template>
        <template slot="footer">
            <a-tabs :default-active-key="currentGraphId" @change="changeCurrentGraph">
                <a-tab-pane :key="graphIds.force" tab="力引导模式" />
                <a-tab-pane :key="graphIds.typesetting" tab="排版模式" />
            </a-tabs>
        </template>
    </a-page-header>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    import { message } from 'ant-design-vue'
    const fileType = {
        png: 'png',
        jpeg: 'jpeg',
        xml: 'xml',
        rdf: 'rdf',
        owl: 'owl',
        json: 'json',
        webp: 'webp',
        bmp: 'bmp'
    };
    const btnTextType = {
        download: '导出',
        jsonLoading: '数据文件生成中',
    }
    export default {
        name: "Header",
        data(){
            return {
                downloadFileType: [
                    {
                        type: 'PNG图片',
                        value: fileType.png,
                        icon: 'file-image'
                    },
                    {
                        type: 'JPEG图片',
                        value: fileType.jpeg,
                        icon: 'file-image'
                    },
                    {
                        type: 'WEBP图片',
                        value: fileType.jpeg,
                        icon: 'file-image'
                    },
                    {
                        type: 'BMP图片',
                        value: fileType.jpeg,
                        icon: 'file-image'
                    },
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
        computed: {
            ...mapGetters([
                'graph',
                'graphIds',
                'currentGraphId'
            ])
        },
        methods: {
            ...mapMutations([
                'set_currentGraphId'
            ]),
            ...mapActions({
                downloadAct: 'downloadFile'
            }),
            handleTypeChange(value) {
                this.chosenFileType = value.key;
                if (this.chosenFileType === fileType.png || this.chosenFileType === fileType.jpeg) {
                    this.downloadImage();
                } else if (this.chosenFileType === fileType.json) {
                    this.downloadFile();
                }
            },
            downloadImage() {
                if(null === this.graph){
                    message.error("图谱不存在，请重新加载！")
                } else {
                    let imageConfig = {
                        backgroundColor: '#fff',
                        padding: 10,
                    };
                    let imageType = 'image/' + this.chosenFileType;
                    this.graph.toFullDataUrl(
                        (res) => {
                            console.log(res);
                        },
                        imageType,
                        imageConfig
                    );

                    // const imgLink = document.createElement('a');
                    // imgLink.download = '知识图谱.' + chosenFileType;
                    // imgLink.style.display = 'none';
                    // imgLink.href = imgUrl;
                    // document.body.appendChild(imgLink);
                    // imgLink.click();
                    // URL.revokeObjectURL(imgLink.href); // 释放URL 对象
                    // document.body.removeChild(imgLink)
                }
            },
            async downloadFile() {
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
                setTimeout(() => {
                    this.loading = false;
                    this.btnText = btnTextType.download;
                }, 500)
            },
            changeCurrentGraph(key){
                this.set_currentGraphId(key);
            }
        }
    }
</script>

<style scoped>
tr:last-child td {
    padding-bottom: 0;
}
#components-page-header-demo-responsive .content {
    display: flex;
}
#components-page-header-demo-responsive .ant-statistic-content {
    font-size: 20px;
    line-height: 28px;
}
@media (max-width: 576px) {
    #components-page-header-demo-responsive .content {
        display: block;
    }

    #components-page-header-demo-responsive .main {
        width: 100%;
        margin-bottom: 12px;
    }

    #components-page-header-demo-responsive .extra {
        width: 100%;
        margin-left: 0;
        text-align: left;
    }
}
</style>
