<template>
  <div>
    <div id="up">
      <a-upload
        name="file"
        :multiple="true"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        :headers="headers"
        @change="handleChange"
      >
        <a-button> <a-icon type="upload" /> Click to Upload </a-button>
      </a-upload>
    </div>
    <div id="tagContainer">
      <h4 style="margin-bottom: 16px;margin-bottom: 5px;text-align: center">
        实体
      </h4>
      <a-tag color="pink">
        节点1
      </a-tag>
      <a-tag color="red">
        节点2
      </a-tag>
      <a-tag color="blue">
        节点略略略略略
      </a-tag>
      <a-tag color="blue">
        节点略略略略略
      </a-tag>
      <a-tag color="blue">
        节点略略略略略
      </a-tag>
      <a-tag color="blue">
        节点略略略略略
      </a-tag>
      <a-tag color="blue">
        节点略略略略略
      </a-tag>
      <a-tag color="blue">
        节点略略略略略
      </a-tag>


    </div>
  </div>

</template>

<script>

export default {
  name: 'Home',
  data() {
    return {
      headers: {
        authorization: 'authorization-text',
      },
    };
  },
  components: {

  },
  methods: {
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
  }
}
</script>

<style>
#up{
  /*margin-top: 30px;*/
  width: 30%;
  margin:0 auto;
  padding-top: 30px;
}
#tagContainer{
  position: absolute;
  margin-top: 60px;
  width: 100%;
}
</style>