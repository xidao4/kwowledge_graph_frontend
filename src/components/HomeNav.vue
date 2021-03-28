<template>
    <div>
        <a-menu
                style="width: 100%; text-align: right;"
                :default-selected-keys="current"
                mode="horizontal"
                theme="dark"
        >
            <a-menu-item key="list">
                我的图谱
            </a-menu-item>
            <a-menu-item @click="logout">
                退出登录
            </a-menu-item>
        </a-menu>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from'vuex';
    export default {
        name: "Layout",
        data(){
            return {
                current: ['list'],
            }
        },
        computed: {
            ...mapGetters([
                'userInfo'
            ]),
        },
        methods: {
            ...mapMutations([
                'logout'
            ]),
        }
    }
</script>

<style scoped>

</style>
