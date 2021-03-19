<template>
    <div class="up">
        <a-upload
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :headers="headers"
                @change="handleChange"
                :file-list="fileList"
                accept=".json"
                :beforeUpload="handleBeforeUpload"
        >
            <a-button> <a-icon type="upload" /> {{this.uploadText}} </a-button>
        </a-upload>
    </div>
</template>

<script>
    import {mapGetters,mapMutations,mapActions} from 'vuex'
    export default {
        name: "UploadFile",
        props: ['triggerGraphDraw'],
        data() {
            return {
                headers: {
                    authorization: 'authorization-text',
                },
                maxNum: 1,
                times: 0,
                fileList:[

                ],
                uploadText: '点击上传".json"文件',
            };
        },
        components: {

        },
        computed:{
            ...mapGetters([
            ])
        },
        methods: {
            ...mapMutations([
                'set_graph',
                'set_picId',
                'set_nodes',
                'set_links',
                'set_relationTypeSet'

            ]),
            handleBeforeUpload(file,fileList){
                const size=fileList.length;
                return new Promise((resolve, reject) => {
                    if(size!==1){
                        if(this.maxNum===1) {
                            this.$message.error('一次只能上传一个文件')
                            this.maxNum++;
                            console.log(this.maxNum)
                            reject(file)
                        }
                        else{
                            this.maxNum++;
                            reject(file)
                        }
                        if(this.maxNum===size+1){
                            this.maxNum=1;
                            reject(file)
                        }
                    }
                    else{
                        resolve(file)
                    }
                })
            },
            handleChange(info) {
                let fileList = [...info.fileList];
                console.log('???????')


                if (info.file.status === 'done') {
                    this.$message.success(`${info.file.name} 文件上传成功`);
                    this.times=1;
                    if(this.times===1){
                        this.uploadText="再次上传.json文件"
                    }
                    // this.set_picId(info.file.response)
                    // this.set_links(info.file.links)
                    // this.set_nodes(info.file.nodes)
                    // this.set_relationTypeSet(info.file.links)
                } else if (info.file.status === 'error') {
                    this.$message.error(`${info.file.name} 文件上传失败.`);
                }
                console.log('!!!!!!!!!')
                fileList = fileList.slice(-1);
                this.fileList = fileList;
            },

        }
    }
</script>

<style scoped>
.up{
    /*margin-top: 30px;*/
    width: 30%;
    height: 100px;
    margin:0 auto;
    /*padding-top: 6px;*/
}
</style>
