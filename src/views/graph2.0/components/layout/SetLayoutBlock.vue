<template>
    <div style="width: 100%;">
        <a-select :default-value="currentSetLayout" style="width: 200px" @change="handleLayoutChange">
            <a-select-opt-group label="力引导布局">
                <a-select-option :value="item.key" v-for="(item, index) in forceLayout" :key="index">
                    {{item.value}}
                </a-select-option>
            </a-select-opt-group>
            <a-select-opt-group label="一般布局">
                <a-select-option :value="item.key" v-for="(item, index) in layoutType" :key="index">
                    {{item.value}}
                </a-select-option>
            </a-select-opt-group>
        </a-select>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: "SetLayoutBlock",
        computed: {
            ...mapGetters([
                'currentSetLayout',
                'forceLayout',
                'layoutType'
            ]),
        },
        methods: {
            handleLayoutChange(value) {
                console.log(`selected ${value}`);
            },
        },
        watch: {
            currentSetLayout: {
                immediate: true,
                handler(){

                }
            }
        }
    }
</script>

<style scoped>

</style>
