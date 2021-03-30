<template>
  <a-config-provider :locale="zh_CN">
    <div id="app">
      <transition name="fade-transform" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </a-config-provider>
</template>

<script>
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';

  export default {
    name: 'app',
    methods:{

    },
    data() {
      return {
        zh_CN
      };
    }
  };
</script>

<style>
body{
  height: 100%;
  overflow: hidden;
}
</style>
