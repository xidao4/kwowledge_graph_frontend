<template>
    <div style="width: 100%;">
        <a-row type="flex" justify="space-between" align="middle">
            <a-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
                <span class="label">当前布局</span>
            </a-col>
            <a-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                <span class="title">力引导布局</span>
            </a-col>
        </a-row>
        <a-row type="flex" justify="space-between" align="middle">
            <a-col :xs="24" :sm="24" :md="7" :lg="7" :xl="7">
                <span class="label">作用力</span>
            </a-col>
            <a-col :xs="24" :sm="24" :md="6" :lg="8" :xl="8">
                <a-slider v-model="nodeStrength" :min="-50" :max="50" class="slider"/>
            </a-col>
            <a-col :xs="0" :sm="0" :md="10" :lg="8" :xl="8">
                <a-input-number v-model="nodeStrength" :min="-50" :max="50"/>
            </a-col>
        </a-row>
    </div>
</template>

<script>
    export default {
        name: "ForceLayoutBlock",
        data(){
            return {
                nodeStrength: 30
            }
        },
    }
</script>

<style scoped>

</style>
