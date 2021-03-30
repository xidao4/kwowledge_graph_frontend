<template>
    <div id="layout">
        <HomeNav></HomeNav>
        <transition name="fade-transform" mode="out-in">
            <router-view style="padding: 20px 80px 144px;"/>
        </transition>
    </div>
</template>
<script>
    import HomeNav from "./HomeNav";
    export default {
        name: 'layout',
        components: {
            HomeNav
        },
        data(){
            return{

            }
        },
        methods:{

        }
    }
</script>
