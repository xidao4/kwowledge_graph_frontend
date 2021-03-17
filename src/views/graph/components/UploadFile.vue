<template>
    <div class="up">
        <a-upload
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :headers="headers"
                @change="handleChange"
                accept=".rdf,.owl"
                :beforeUpload="handleBeforeUpload"
        >
            <a-button> <a-icon type="upload" /> 点击上传".rdf/.owl"文件 </a-button>
        </a-upload>
    </div>
</template>

<script>
    export default {
        name: "UploadFile",
        data() {
            return {
                headers: {
                    authorization: 'authorization-text',
                },
                maxNum: 1
            };
        },
        components: {

        },
        methods: {
            handleBeforeUpload(file,fileList){
                console.log('beforeUpload')
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
                if (info.file.status === 'done') {
                    this.$message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    this.$message.error(`${info.file.name} file upload failed.`);
                }
            },

        }
    }
</script>

<style scoped>
.up{
    /*margin-top: 30px;*/
    width: 30%;
    height: 130px;
    margin:0 auto;
    /*padding-top: 6px;*/
}
</style>
