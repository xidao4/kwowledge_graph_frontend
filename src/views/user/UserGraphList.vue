<template>
    <div>
        我的图谱页
        <router-link to="/editor">编辑</router-link>
    </div>
</template>

<script>
    import { mapActions } from 'vuex';
    export default {
        name: "UserGraphList",
        data(){
            return {

            }
        },
        methods: {
            ...mapActions([
                'testToken'
            ])
        },
        mounted() {
            this.testToken();
        }
    }
</script>

<style scoped>

</style>
