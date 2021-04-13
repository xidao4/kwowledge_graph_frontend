<template>
    <div>
        <a-upload-dragger
            name="mfile"
            :multiple="false"
            action="http://localhost:8001/api/graph/getAll"
            :headers="headers"
            @change="handleChange"
            :file-list="fileList"
            accept=".json"
            :beforeUpload="handleBeforeUpload"
        >
            <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">
                点击或拖拽上传".json"文件
            </p>
        </a-upload-dragger>
    </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import { getToken } from '@/utils/auth'
import router from '@/router';
export default {
    name: "Upload.vue",
    // props: ['triggerGraphDraw'],
    data() {
        return {
            headers: {
                authorization: 'authorization-text',
                token: getToken()
            },
            maxNum: 1,
            times: 0,
            fileList:[

            ],
        };
    },
    components: {

    },
    computed:{
        ...mapGetters([
        ])
    },
    methods:{
        ...mapMutations([
            'set_graph',
            'set_picId',
            'set_nodes',
            'set_links',
            'set_relationTypeSet',
            'set_showGraphNodes',
            'set_showGraphEdges',
            'init_graph',
            'set_isNew'
        ]),
        ...mapActions([

        ]),
        handleBeforeUpload(file, fileList) {
            console.log('handleBeforeUpload')
            const size=fileList.length;
            // console.log('fileList in handleBeforeUpload',fileList.length);
            return new Promise((resolve,reject)=>{
                if(size!=1){
                    if(this.maxNum===1){
                        this.$message.error('一次只能上传一个文件');
                        this.maxNum++;
                        console.log('maxNum in upload.vue',this.maxNum);
                        reject(file);
                    }else{
                        this.maxNum++;
                        reject(file);
                    }
                    if(this.maxNum===size+1){
                        this.maxNum=1;
                        reject(file);
                    }
                }
                else{
                    resolve(file);
                }
            });
        },
        handleChange(info){
            console.log('handleChange')
            console.log(info)
            let fileList=[...info.fileList];
            if(info.file.status==='done'){
                // this.times=1;
                if(info.file.response.code>=0){
                    router.push('/editor');
                    let resData = info.file.response.data;
                    console.log('upload res',resData);
                    this.set_picId(resData.picId);

                    // 设置显示图谱所需要的数据
                    this.init_graph(resData);
                    this.set_isNew(true);

                }else{
                    fileList = [];
                    this.$message.error(`${info.file.name} 文件上传失败.`);
                }
            }
            else if (info.file.status === 'error') {
                this.$message.error(`${info.file.name} 文件上传失败.`);
            }
            if(fileList.length > 1){
                fileList = fileList.slice(-1);
            }
            this.fileList = fileList;
        },
    }
}
</script>

<style scoped>

</style>
