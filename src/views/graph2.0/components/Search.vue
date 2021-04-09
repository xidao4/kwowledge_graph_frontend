<template>
<div>
    <a-dropdown :trigger="['click']" class="myDropDown">
        <a-input
            placeholder="输入关键字"
            class="ant-dropdown-link"
            @click="e => e.preventDefault()"
            v-model="inputText"/>
        <a-menu
            slot="overlay"
            @click="clickItem">
            <template v-for="item in userHistory">
                <a-menu-item :key="item">
                    <span>{{item}}</span>
                </a-menu-item>
            </template>
        </a-menu>
    </a-dropdown>
    <a-button size="small" type="primary" @click="clickBtn" class="myBtn">
        <a-icon type="search" />
        {{searchBtnText}}
    </a-button>
</div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
    name: "Search",
    data(){
        return{
            list:[
                '1st menu item 一',
                '2nd menu item 二',
                '3rd menu item 三'
            ],
            isSearching:false,
            inputText:'',
            searchBtnText:'搜索',
        }
    },
    components: {

    },
    watch:{
        isSearching(data){
            if(data){
                this.searchBtnText='取消搜索';
            }else{
                this.searchBtnText='搜索';
            }
        }
    },
    computed:{
        ...mapGetters([
            'userHistory',
            'userId',
            'picId',
            'searchNodes',
            'searchEdges',
        ])
    },
    mounted(){
        this.getHistory({
            userId:this.userId
        })
    },
    methods: {
        ...mapMutations([

        ]),
        ...mapActions([
            'getHistory',
            'search',
        ]),
        async clickItem({ key }) {
            console.log(`Click on item ${key}`);
            this.inputText=key;
            await this.getHistory({
                keyWord:key,
                userId:this.userId,
                picId:this.picId
            })
            this.isSearching=true;
            //TODO 将searchNodes、Edges中的节点、边的style设置为highlight
        },
        async clickBtn(){
            if(!this.isSearching){
                this.isSearching=true;
                await this.search({
                    keyWord:this.inputText,
                    userId:this.userId,
                    picId:this.picId
                })
                //TODO 将searchNodes、Edges中的节点、边的style设置为highlight
            }else{
                this.stopSearch();
            }
        },
        stopSearch(){
            //TODO 将searchNodes、Edges中的节点、边的style设置为初始状态（active？）
            this.isSearching=false;
            this.inputText='';
        }
    },
}
</script>

<style scoped>
.myDropDown{
    width:200px;
    margin-right: 10px;
}
.myBtn{
    /*float:right;*/

    /*margin: auto 10px;*/
}
</style>