<template>
  <div>
    <span style="float: left;font-size: 14px">
      * 颜色：
    </span>
    <div style="float: left;">
      <div class="colorBlock" style="background-color:red;" @click="pick1">
        <div class="check-style-unequal-width" v-if="colorValue==='1'"></div>
      </div>
      <div class="colorBlock" style="background-color:blue;" @click="pick2">
        <div class="check-style-unequal-width" v-if="colorValue==='2'"></div>
      </div>
      <div class="colorBlock" style="background-color:pink;" @click="pick3">
        <div class="check-style-unequal-width" v-if="colorValue==='3'"></div>
      </div>
      <div class="colorBlock" style="background-color:purple;" @click="pick4">
        <div class="check-style-unequal-width" v-if="colorValue==='4'"></div>
      </div>
      <div class="colorBlock" style="background-color:green;" @click="pick5">
        <div class="check-style-unequal-width" v-if="colorValue==='5'"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "ColorPicker",
    data(){
      return{
        colorValue: '0'
      }
    },
    methods:{
      pick1(){
        this.colorValue='1';
      },
      pick2(){
        this.colorValue='2';
      },
      pick3(){
        this.colorValue='3';
      },
      pick4(){
        this.colorValue='4';
      },
      pick5(){
        this.colorValue='5';
      }
    }
  }
</script>

<style scoped>
.colorBlock{
  width: 20px;
  height: 20px;
  float: left;
  margin-right: 10px;
}
.colorBlock:hover {
  box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
}

.check-style-unequal-width {
  width: 8px;
  height: 16px;
  margin: 0 auto;
  border-color: #ffffff;
  border-style: solid;
  border-width: 0 4px 5px 0;
  transform: rotate(45deg);
}
</style>
