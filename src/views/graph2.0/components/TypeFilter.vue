<template>
<div>
    <p>类型筛选</p>
    <ul>
        <li v-for="(item,index) in checkboxList"
            :key="item"
            :class="checkbox.includes(index)?'active':''"
            @click="check(index)">
            {{item}}
        </li>
    </ul>

</div>
</template>

<script>


import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
    name: "Filter",
    components: {

    },
    data(){
        return {
            checkbox:[],
            checkboxList:['cato1','cato2','cato2','cato3'],
        }
    },
    computed: {
        ...mapGetters([

        ])
    },
    mounted(){

    },
    methods: {
        ...mapMutations([]),
        ...mapActions({

        }),
        check(i){
            let idx=this.checkbox.indexOf(i);
            if(idx>-1){
                this.checkbox.splice(idx,1);
            }else{
                this.checkbox.push(i);
            }
        }
    }
}
</script>

<style scoped>
li{
    display: inline-block;
    font-size: 16px;
    padding: 5px;
    background-color: #e6e6e6;
    margin: 5px 10px;
    cursor: pointer;
}
.active {
    border: 2px solid red;
}
</style>