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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*background-color: #2c3e50;*/
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
