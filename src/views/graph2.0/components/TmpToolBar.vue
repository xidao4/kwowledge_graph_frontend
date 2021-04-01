<template>
    <div>
        <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                {{ratioStr}} <a-icon type="down" />
            </a>
            <a-menu slot="overlay" @click="onClick">
                <a-menu-item :key="item.key" v-for="item in ratios">
                    {{ item.value }}
                </a-menu-item>
            </a-menu>
        </a-dropdown>
        <a-button @click="recover">恢复</a-button>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex';
    const ratios = [
        {
            key: 0.25,
            value: '25%'
        },
        {
            key: 0.5,
            value: '50%'
        },
        {
            key: 0.75,
            value: '75%'
        },
        {
            key: 1,
            value: '100%'
        },
        {
            key: 1.25,
            value: '125%'
        },
        {
            key: 1.5,
            value: '150%'
        },
        {
            key: 1.75,
            value: '175%'
        },
        {
            key: 2,
            value: '200%'
        }
    ]
    export default {
        name: "tmpToolBar",
        data(){
            return {
                ratios
            }
        },
        computed: {
            ...mapGetters([
                'currentGraph',
                'typesettingGraphRatio',
                'forceGraphRatio',
                'graphIds',
                'currentGraphId',
            ]),
            ratioStr(){
                if(this.currentGraphId === this.graphIds.force){
                    return this.forceGraphRatio * 100 + "%"
                } else if(this.currentGraphId === this.graphIds.typesetting){
                    return this.typesettingGraphRatio * 100 + "%"
                }
                return '100%'
            }
        },
        methods: {
            ...mapMutations([
                'set_typesettingGraphRatio',
                'set_forceGraphRatio'
            ]),
            onClick({ key }) {
                this.currentGraph.zoomTo(key);
                // this.currentGraph.fitCenter()
                if(this.currentGraphId === this.graphIds.force){
                    return this.set_forceGraphRatio(key)
                } else if(this.currentGraphId === this.graphIds.typesetting){
                    return this.set_typesettingGraphRatio(key)
                }
            },
            recover(){
                this.currentGraph.zoomTo(1);
                // this.currentGraph.fitCenter()
                if(this.currentGraphId === this.graphIds.force){
                    return this.set_forceGraphRatio(1)
                } else if(this.currentGraphId === this.graphIds.typesetting){
                    return this.set_typesettingGraphRatio(1)
                }
            }
        }
    }
</script>

<style scoped>

</style>
