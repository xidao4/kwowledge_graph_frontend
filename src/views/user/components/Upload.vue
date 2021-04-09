<template>
    <div>
        <a-upload-dragger
            name="file"
            :multiple="true"
            action="http://118.182.96.49:8001/api/graph/getAll"
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
                Click or drag file to this area to upload
            </p>
            <p class="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
            </p>
        </a-upload-dragger>
    </div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
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
            // uploadText: '点击上传".json"文件',
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
        ]),
        handleBeforeUpload(file, fileList) {
            const size=fileList.length;
            console.log('fileList in handleBeforeUpload',fileList.length);
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
                }else{
                    resolve(file);
                }
            });
        },
        handleChange(info){
            let fileList=[...info.fileList];
            if(info.file.status==='done'){
                // this.times=1;
                if(info.file.response.code>=0){
                    let resData=info.file.response.data;
                    console.log('upload res',resData);
                    this.set_picId(resData.picId);
                    // TODO: 设置显示图谱所需要的数据
                    // this.set_(resData.fnodes);
                    // this.set_(resData.fedges);
                    // this.set_(resData.snodes);
                    // this.set_(resData.sedges);
                    router.push('/editor');
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