<template>
    <div class="page-div">
        <router-link to="/editor">编辑</router-link>

        <a-list
            rowKey="id"
            :grid="{gutter: 12, lg: 3, md: 2, sm: 1, xs: 1}"
            :dataSource="dataSource"
        >
            <a-list-item slot="renderItem" slot-scope="item">
                <template v-if="!item || item.id === undefined" style="margin: auto auto;">

                    <a-upload-dragger
                        class="new-btn"
                        style="height: 300px; margin: auto auto"
                        name="file"
                        :multiple="false"
                        :headers="headers"
                        @change="uploadJson"
                        accept=".json"
                    >
                        <p class="ant-upload-drag-icon">
                            <a-icon type="inbox" />
                        </p>
                        <p class="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                        <p class="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                        </p>
                    </a-upload-dragger>


                </template>
                <template v-else>
                    <a-card hoverable @click="editPic(item.id)">
                        <img
                            slot="cover"
                            alt="example"
                            v-bind:src=item.url
                        />
                        <a-card-meta>
                            <a slot="title">
                                {{item.picName}}

                            </a>
                        </a-card-meta>
                    </a-card>
                </template>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    import router from '@/router';
    import { getToken } from '@/utils/auth'

    const dataSource = []
    dataSource.push({});

    export default {
        name: "UserGraphList",
        data(){
            return {
                extraImage: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png',
                dataSource,
                headers: {
                    authorization: 'authorization-text',
                    token: getToken()
                },
                fileList:[

                ],
            }
        },
        computed:{
            ...mapGetters([
                'picsInfo',
                'userId',
            ])
        },
        methods: {
            ...mapActions([
                'testToken',
                'getUserPics',
            ]),
            ...mapMutations([
                'set_picId',
            ]),
            testFun () {
                this.$message.info('快速开始被点击！')
            },
            editPic(data){
                this.set_picId(data);
                console.log('当前图谱ID',data);
                router.push('/editor');
            },
            uploadJson(){
                router.push('/editor');
            }
        },
        mounted() {
            this.testToken();


            this.getUserPics(this.userId);
            for(var i=0;i<this.picsInfo.length;i++){
                dataSource.push({
                    id: i,
                    picName: this.picsInfo[i].picName,
                    url: this.picsInfo[i].url
                });
            }

            // test data
            for(var j=0;j<11;j++){
                dataSource.push({
                    id: j,
                    picName: "火影忍者",
                    url: "https://guide-blog-images.oss-cn-shenzhen.aliyuncs.com/2020-12/Java%E5%BC%82%E5%B8%B8%E7%B1%BB%E5%B1%82%E6%AC%A1%E7%BB%93%E6%9E%84%E5%9B%BE.png"
                })

            }

        }
    }
</script>

<style lang="less" scoped>
.card-list {
    /deep/ .ant-card-body:hover {
        .ant-card-meta-title>a {
            color: @primary-color;
        }
    }
    /deep/ .ant-card-meta-title {
        margin-bottom: 12px;
        &>a {
            display: inline-block;
            max-width: 100%;
            color: rgba(0,0,0,.85);
        }
    }
    /deep/ .meta-content {
        position: relative;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        height: 64px;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        margin-bottom: 1em;
    }
}
.card-avatar {
    width: 48px;
    height: 48px;
    border-radius: 48px;
}
.ant-card-actions {
    background: #f7f9fa;
    li {
        float: left;
        text-align: center;
        margin: 0 0;
        color: rgba(0, 0, 0, 0.45);
        width: 50%;
        &:not(:last-child) {
            border-right: 1px solid #e8e8e8;
        }
        a {
            color: rgba(0, 0, 0, .45);
            line-height: 22px;
            display: inline-block;
            width: 100%;
            &:hover {
                color: @primary-color;
            }
        }
    }
}
.new-btn {
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 190px;
}
.drag-div{
    height: 100%;
    margin: auto auto;
}
.page-div{
    width:80%; margin:auto auto;
    type:flex ;
    justify:space-around;
    align:middle;
}
</style>
