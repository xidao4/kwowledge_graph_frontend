<template>
    <div class="page-div">
<!--        <router-link to="/largeGraph">largeGraphTest</router-link>-->
        <a-row>
            <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" xxl="6">
                <Upload class="myUpload"></Upload>
            </a-col>
            <template v-for="(item,index) in this.dataSource">
                <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6" xxl="6">
                  <div class="myDiv" @click="editPic(item.id)">
                      <a-button type="link">
                        {{item.picName}}
                      </a-button>
                    <img
                        slot="cover"
                        alt="example"
                        v-bind:src=item.url
                        class="myImg"
                    />
                  </div>
<!--                        <a-card hoverable @click="editPic(item.id)" class="myDiv">-->
<!--                            <a-card-meta>-->
<!--                              <a slot="title">-->
<!--                                {{item.picName}}-->
<!--                              </a>-->
<!--                            </a-card-meta>-->
<!--                        </a-card>-->
                </a-col>
            </template>
        </a-row>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapMutations } from 'vuex';
    import router from '@/router';
    import Upload from "./components/Upload";

    let dataSource = [];

    export default {
        name: "UserGraphList",
        data(){
            return {
                dataSource,
                heightStr: "height: "+(window.screen.height * 0.3 )+'px',
            }
        },
        computed:{
            ...mapGetters([
                'picsInfo',
                'userId',
            ])
        },
        components:{
            Upload,
        },
        methods: {
            ...mapActions([
                'testToken',
                'getUserPics',
                'getPicElements'
            ]),
            ...mapMutations([
                'set_picId',
            ]),
            editPic(data){
                this.set_picId(data);
                console.log('当前图谱ID',data);
                router.push('/editor');
            },
        },
        async mounted() {
            await this.getUserPics({
                userId:this.userId
            });
            this.dataSource = [];
            for(let i=0;i<this.picsInfo.length;i++){
                this.dataSource.push({
                    id: this.picsInfo[i].picId,
                    picName: this.picsInfo[i].picName,
                    url: this.picsInfo[i].url
                });
            }
            console.log('dataSource in userGraphList.vue 1',this.dataSource);

            // test data
            // for(let j=0;j<11;j++){
            //     //console.log(j);
            //     this.dataSource.push({
            //         id: j,
            //         picName: "火影忍者",
            //         url: "https://guide-blog-images.oss-cn-shenzhen.aliyuncs.com/2020-12/Java%E5%BC%82%E5%B8%B8%E7%B1%BB%E5%B1%82%E6%AC%A1%E7%BB%93%E6%9E%84%E5%9B%BE.png"
            //     })
            // }
            // console.log('dataSource in userGraphList.vue 2',this.dataSource);
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
    width:80%;
    margin:auto auto;
    type:flex ;
    justify:space-around;
    align:middle;
}
.myUpload{
    height: 200px;
}
.myDiv{
  border:1px dashed #D99CA8;
  height:200px;
}
.myImg{
    height:160px;
    width:100%;

}
</style>
