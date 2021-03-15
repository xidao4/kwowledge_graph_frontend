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
      <h3 style="margin-bottom: 16px;margin-bottom: 5px;text-align: center">
        实体
      </h3>
      <div id="tagList">
        <a-tag color="pink" v-for="node in nodes" :key="node" style="margin-bottom: 8px;cursor: pointer" @click="changeNode">
          {{node}}
        </a-tag>
        <a-modal
          title="修改节点"
          :visible="changeNodeVisible"
          @ok="handleOk"
          @cancel="handleCancel"
        >
          hi
        </a-modal>

        <a-tag color="blue" style="cursor: pointer">
          增加节点
        </a-tag>
      </div>
    </div>
  </div>

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