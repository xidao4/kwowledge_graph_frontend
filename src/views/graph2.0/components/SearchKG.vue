<template>
  <body>
    <form class="search-form" onkeypress="return event.keyCode !== 13;">
      <img src="https://ydl8023.oss-cn-beijing.aliyuncs.com/搜索.png" id="searchIcon"/>
      <input v-model="searchString" placeholder="搜你想搜" class="search-input" @keydown.enter="searchContent">
    </form>
  </body>
</template>

<script>
  import {mapGetters,mapMutations,mapActions} from 'vuex'
  import $ from 'jquery'
  export default {
    name: "SearchKG",
    data(){
      return{
        searchString:''
      }
    },
    computed: {
      ...mapGetters([
        "searchString"
      ]),
    },
    methods:{
      ...mapMutations([
        'set_searchString'
      ]),
      searchContent(){
        console.log(this.searchString)
        this.set_searchString(this.searchString)
        this.$router.push({
          path:`/searchList`
        })
      }
    },
    mounted() {
      $('.search-input').focus(function(){
        $(this).parent().addClass('focus');
      }).blur(function(){
        $(this).parent().removeClass('focus');
      })
    }
  }
</script>

<style scoped lang="scss">
  /*--------------------
  Body
  --------------------*/
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  $color: #e24040;

  body {
    height: 100vh;
    margin: 0;
    background: #DEDEDE;
    color: #5a6674;
    font-size: 13px;
    font-family: 'Roboto', sans-serif;
    overflow: hidden;
  }


  /*--------------------
  App
  --------------------*/
  .search-form {
    position: relative;
    top: 46%;
    left: 50%;
    width: 480px;
    height: 50px;
    border-radius: 40px;
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
    transform: translate(-50%, -50%);
    background: #fff;
    transition: all 0.3s ease;

  &.focus {
     box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
   }
  }

  .search-input {
    position: absolute;
    top: 10px;
    left: 38px;
    font-size: 18px;
    background: none;
    color: #5a6674;
    width: 195px;
    height: 30px;
    border: none;
    appearance: none;
    outline: none;

  &::-webkit-search-cancel-button {
     appearance: none;
   }
  }

  img{
    width: 30px;
    height: 30px;
    margin-top: 10px;
    margin-left: 10px;
  }

</style>