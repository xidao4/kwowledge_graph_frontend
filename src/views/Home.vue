<template>
  <a-layout>
    <a-layout-content>


    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      changeNodeVisible: false,
      headers: {
        authorization: 'authorization-text',
      },
      nodes: [
        '节点1',
        '节点2',
        '节点略略略略略1',
        '节点啦啦啦2',
        '吧啦吧啦吧啦3',
        '吧啦吧啦吧啦4',
        '节点略略略略略5',
        '节点略略略略略6',
        '节点略略略略略7',
        '节点略略略略略8',
        '节点略略略略略9',
        '节点啦啦啦10',
        '节点啦啦啦11',
      ]
    };
  },
  components: {
    ALayoutSider

  },
  methods: {
    changeNode(){
      this.changeNodeVisible=true
    },
    handleOk(e) {
      this.changeNodeVisible=false
    },
    handleCancel(e) {
      this.changeNodeVisible=false
    },
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
  height: 160px;
  margin:0 auto;
  padding-top: 30px;
}
#tagContainer{
  width: 100%;
}
#tagList{
  width: 65%;
  margin: 0 auto;
}
</style>
