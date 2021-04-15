<template>
<div>
    <a-dropdown :trigger="['click']" class="myDropDown" :style="{width: width}">
        <a-input
            placeholder="输入关键字"
            class="ant-dropdown-link"
            @click="e => e.preventDefault()"
            maxLength=10
            v-model="inputText"/>
        <a-menu
            slot="overlay"
            @click="clickItem">
            <template v-for="item in userHistory.data">
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
import { setHighlight,cancelHighlight } from '../../../components/g6/Graph.js';
import {getTokenByKey} from "../../../utils/cache";

export default {
    name: "Search",
    props: {
        width: {
            type: String,
            default: '200px'
        }
    },
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
            'currentGraph',
        ])
    },
    async mounted(){
        await this.getHistory({
            userId:this.userId
        })
        console.log('userHistory',this.userHistory);
    },
    methods: {
        ...mapMutations([
            'set_searchNodes',
            'set_searchEdges',
        ]),
        ...mapActions([
            'getHistory',
            'search',
        ]),
        async clickItem({ key }) {
            console.log(`Click on item ${key}`);
            this.inputText=key;
            await this.search({
                keyWord:key,
                userId:this.userId,
                picId:this.picId
                //picId:getTokenByKey('picId'),
            })//等待的圈
            console.log('searchNodes',this.searchNodes);
            console.log('searchEdges',this.searchEdges);
            this.isSearching=true;
            //将searchNodes、Edges中的节点、边的style设置为highlight
            setHighlight(this.currentGraph,this.searchNodes,this.searchEdges);

            //重新获取最新的搜索记录
            await this.getHistory({
                userId:this.userId
            });
        },
        async clickBtn(){
            if(!this.isSearching){
                this.isSearching=true;
                await this.search({
                    keyWord:this.inputText,
                    userId:this.userId,
                    picId:this.picId,
                    //picId:getTokenByKey('picId'),
                })//等待的圈
                //将searchNodes、Edges中的节点、边的style设置为highlight
                setHighlight(this.currentGraph,this.searchNodes,this.searchEdges);
                //重新获取最新的搜索记录
                await this.getHistory({
                    userId:this.userId
                });
            }else{
                this.stopSearch();
            }
        },
        stopSearch(){
            this.isSearching=false;
            this.inputText='';
            //将searchNodes、Edges中的节点、边的style设置为初始状态
            cancelHighlight(this.currentGraph,this.searchNodes,this.searchEdges);


            this.set_searchEdges([]);
            this.set_searchNodes([]);
        }
    },
}
</script>

<style scoped>
.myDropDown{
    width:300px;
    margin-right: 10px;
}
.myBtn{
    /*float:right;*/

    /*margin: auto 10px;*/
}
</style>
