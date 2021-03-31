<template>
    <div>
        <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                Hover me <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
                <a-menu-item>
                    <a href="javascript:;">1st menu item</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;">2nd menu item</a>
                </a-menu-item>
                <a-menu-item>
                    <a href="javascript:;">3rd menu item</a>
                </a-menu-item>
            </a-menu>
        </a-dropdown>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "tmpToolBar",
        computed: {
            ...mapGetters([
                'currentGraph'
            ])
        },
        methods: {
            zoom(){
                this.currentGraph.zoom(0.05)
            }
        }
    }
</script>

<style scoped>

</style>
