<template>
    <div>
        <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                {{ratioStr}} <a-icon type="down" />
            </a>
            <a-menu slot="overlay" @click="onClick">
                <a-menu-item :key="0.25">
                    25%
                </a-menu-item>
                <a-menu-item :key="0.5">
                    50%
                </a-menu-item>
                <a-menu-item :key="0.75">
                    75%
                </a-menu-item>
                <a-menu-item :key="1">
                    100%
                </a-menu-item>
                <a-menu-item :key="1.25">
                    125%
                </a-menu-item>
                <a-menu-item :key="1.5">
                    150%
                </a-menu-item>
                <a-menu-item :key="1.75">
                    175%
                </a-menu-item>
                <a-menu-item :key="2">
                    200%
                </a-menu-item>
            </a-menu>
        </a-dropdown>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "tmpToolBar",
        data(){
            return {
                ratio: 1,
                ratioStr: '100%'
            }
        },
        computed: {
            ...mapGetters([
                'currentGraph'
            ])
        },
        methods: {
            zoom(){
                this.currentGraph.zoom(0.05)
            },
            onClick({ key }) {
                this.ratio = key;
                this.ratioStr = key * 100 + '%';
                this.currentGraph.zoomTo(this.ratio);
            },
        }
    }
</script>

<style scoped>

</style>
