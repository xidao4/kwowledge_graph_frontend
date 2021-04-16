<template>
  <a-config-provider :locale="zh_CN">
    <div id="app">
      <transition name="fade-transform" mode="out-in" v-if="isRouterAlive">
        <router-view/>
      </transition>
    </div>
  </a-config-provider>
</template>

<script>
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

  export default {
    name: 'app',
    provide (){
      return {
        reload:this.reload
      }
    },
    methods:{
      //解决强制刷新页面重新渲染问题
      reload (){
        this.isRouterAlive = false
        this.$nextTick(function(){
          this.isRouterAlive = true
        })
      }
    },
    data() {
      return {
        zh_CN,
        isRouterAlive:true
      };
    },
    created(){
      console.log('refresh', this.$store.state);
      //在页面加载时读取sessionStorage里的状态信息
      if(sessionStorage.getItem("store")){
        this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
      }
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
      })
    }
  };
</script>

<style>
body{
  /*height: 100%;*/
  /*overflow: hidden;*/
}
#nprogress .bar {
  background: #D99CA8 !important;
}
</style>
