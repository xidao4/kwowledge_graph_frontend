<template>
    <div>
        <div style="float: left;" v-for="(item, index) in colorList" :key="index">
            <div class="colorBlock" :style="'background-color: ' + item.color" @click="pick(item.color)">
                <div class="check-style-unequal-width" v-if="colorValue === item.color"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        name: "ColorPicker",
        data(){
            return{
                colorValue: ''
            }
        },
        props: {
            defaultColor: String
        },
        computed: {
            ...mapGetters([
                'colorList'
            ])
        },
        methods:{
            pick(val){
                this.colorValue = val;
                console.log('pick', this.colorValue);
                this.$emit('childFn', this.colorValue);
            }
        },
        watch: {
            defaultColor:{
                immediate: true,
                handler(color){
                    this.colorValue = this.defaultColor;
                }
            }
        }
    }
</script>

<style scoped>
    .colorBlock{
        width: 20px;
        height: 20px;
        float: left;
        margin-right: 10px;
    }
    .colorBlock:hover {
        box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
    }

    .check-style-unequal-width {
        width: 8px;
        height: 16px;
        margin: 0 auto;
        border-color: #ffffff;
        border-style: solid;
        border-width: 0 4px 5px 0;
        transform: rotate(45deg);
    }
</style>
