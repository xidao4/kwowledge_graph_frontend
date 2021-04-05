<template>
    <div>
        <a-page-header
                style="background-color: white; border: 1px solid rgb(235, 237, 240)"
                title="编辑图谱"
                sub-title=""
                @back="back"
        >
            <template slot="extra">
                <a-button key="3" type="primary" style="margin-right: 10px;" :loading="loading" @click="save">
                    {{btnText}}
                </a-button>
                <a-dropdown>
                    <a-menu slot="overlay" @click="handleTypeChange">
                        <a-menu-item :key="item.value" v-for="item in downloadFileType">
                            <a-icon :type="item.icon" />
                            {{item.type}}
                        </a-menu-item>
                    </a-menu>
                    <a-button type="primary" style="margin-left: 8px">
                        下载 <a-icon type="down" /> </a-button>
                </a-dropdown>
            </template>
            <template slot="footer">
                <a-tabs :default-active-key="currentGraphId" @change="changeCurrentGraph">
                    <a-tab-pane :key="graphIds.typesetting" tab="排版模式" />
                    <a-tab-pane :key="graphIds.force" tab="力引导模式" />
                </a-tabs>
            </template>
            <DownloadImgModal :type="chosenFileType"></DownloadImgModal>
            <DownloadFileModal :type="chosenFileType"></DownloadFileModal>
        </a-page-header>
        <Handler
                v-if="false"
                class="handler"
                mode="horizontal"
                position="bottom"
                :expand="isExpand"
                :callback="toggleHandler"
        >
        </Handler>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    import { message } from 'ant-design-vue'
    import DownloadImgModal from "./downloadModal/DownloadImgModal";
    import DownloadFileModal from "./downloadModal/DownloadFileModal";
    import Handler from "./Handler";
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
        save: '保存',
        saveLoading: '保存中...',
    };
    export default {
        name: "Header",
        components: {
            Handler,
            DownloadFileModal,
            DownloadImgModal,
        },
        data(){
            return {
                downloadFileType: [
                    {
                        type: 'PNG图片（*.png）',
                        value: fileType.png,
                        icon: 'file-image'
                    },
                    {
                        type: 'JPEG图片（*.jpeg）',
                        value: fileType.jpeg,
                        icon: 'file-image'
                    },
                    {
                        type: 'WEBP图片（*.webp）',
                        value: fileType.webp,
                        icon: 'file-image'
                    },
                    {
                        type: 'BMP图片（*.bmp）',
                        value: fileType.bmp,
                        icon: 'file-image'
                    },
                    {
                        type: 'JSON文件（*.json）',
                        value: fileType.json,
                        icon: 'file-text'
                    },
                ],
                chosenFileType: '',
                loading: false,
                btnText: btnTextType.save,
                showDownloadImg: false,
                showDownloadJson: false,
                isExpand: true,
            }
        },
        computed: {
            ...mapGetters([
                'graphIds',
                'currentGraphId',
                'forceGraph',
                'typesettingGraph',
                'currentGraph',
                'showDownloadImgModal',
                'showDownloadJsonModal',
            ])
        },
        methods: {
            ...mapMutations([
                'set_currentGraphId',
                'set_currentGraph',
                'set_showDownloadImgModal',
                'set_showDownloadFileModal',
            ]),
            ...mapActions({
                saveAct: 'save',
                thumbnail: 'thumbnail'
            }),
            handleTypeChange(value) {
                this.chosenFileType = value.key;
                if(null === this.currentGraph) {
                    message.error("图谱不存在，请重新加载！")
                } else {
                    if (this.chosenFileType === fileType.png || this.chosenFileType === fileType.jpeg
                        || this.chosenFileType === fileType.webp || this.chosenFileType === fileType.bmp) {
                        this.set_showDownloadImgModal(true);
                    } else if (this.chosenFileType === fileType.json) {
                        this.set_showDownloadFileModal(true);
                    }
                }
            },
            changeCurrentGraph(key){
                this.set_currentGraphId(key);
                if(key === this.graphIds.force){
                    // this.set_currentGraph(this.forceGraph)
                } else if(key === this.graphIds.typesetting){
                    this.set_currentGraph(this.typesettingGraph)
                }
            },
            toggleHandler (val) {
                const _t = this
                _t.isExpand = val !== undefined ? val : !_t.isExpand
            },
            async save(){
                this.loading = true;
                this.btnText = btnTextType.saveLoading;
                await this.saveAct();
                this.loading = false;
                this.btnText = btnTextType.save;
            },
            back(){
                let imgUrl = this.currentGraph.toDataURL('image/jpeg', '#FFFFFF');
                this.$router.go(-1);
                this.thumbnail(imgUrl);
            }
        },
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
