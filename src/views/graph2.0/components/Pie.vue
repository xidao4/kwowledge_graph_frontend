<template>
<div>
  <div id="nodePie" :style="this.heightStr"></div>
  <div id="edgePie" :style="this.heightStr"></div>
</div>
</template>

<script>
import * as echarts from 'echarts';
import {mapActions, mapGetters} from "vuex";
import {getTokenByKey} from "../../../utils/cache";

export default {
  name: "Pie",
  data(){
    return{
      nodePie:null,
      edgePie:null,
      heightStr: "height: "+(window.screen.height * 0.8 + 5)/2+'px',
      option1: {
        title: {
          text: '某站点用户访问来源',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [
              {value: 1048, name: '搜索引擎'},
              {value: 735, name: '直接访问'},
              {value: 580, name: '邮件营销'},
              {value: 484, name: '联盟广告'},
              {value: 300, name: '视频广告'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      optionEdge:{
        title: {
          text: '边类型统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '边类型',
            type: 'pie',
            radius: '50%',
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      optionNode:{
        title: {
          text: '节点类型统计',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: '边类型',
            type: 'pie',
            radius: '50%',
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      },
      nodesFormat:[],
      edgesFormat:[],
    }
  },
  computed:{
    ...mapGetters([
        // 'pieModalVisible',
        'nodesTypeCntMap',
        'edgesTypeCntMap',
        'picId',
        'boardTypes',
        'currentShowBoard',
    ])
  },
  watch:{
      currentShowBoard:{
          immediate:true,
          async handler(data){
              console.log('6666 Pie: watch currentShowBoard',data);
              if(data===this.boardTypes.pie){
                  await this.draw();
              }
          }
      }

  },
  async mounted(){
      window.addEventListener('resize', ()=>{
        this.nodePie.resize();
        this.edgePie.resize();
      })
      console.log('6666 Pie: mounted picId',this.picId);
      // await this.getPicTypes({
      //     picId:this.picId
      //     //picId:getTokenByKey('picId'),
      // })
      await this.draw();
  },
  methods:{
    ...mapActions([
        'getPicTypes',
    ]),
    drawNodePie(){
        this.nodePie=echarts.init(document.getElementById('nodePie'));
        this.optionNode && this.nodePie.setOption(this.optionNode);
    },
    drawEdgePie(){
        this.edgePie=echarts.init(document.getElementById('edgePie'));
        this.optionEdge && this.edgePie.setOption(this.optionEdge);
    },
    async draw(){
      await this.getPicTypes({
        picId:this.picId
      })

      this.nodesFormat=[];
      this.edgesFormat=[];

      console.log('6666 Pie: this.nodesTypeCntMap',this.nodesTypeCntMap);
      for(let[key,value] of this.nodesTypeCntMap){
        this.nodesFormat.push({
          value:value,
          name:key
        })
      }
      this.optionNode.series[0].data=this.nodesFormat;

      console.log('6666 Pie: this.edgesTypeCntMap',this.edgesTypeCntMap);
      for(let[key,value] of this.edgesTypeCntMap){
        // this.edgesFormat.push(
        //     new Map([
        //       ['value',value],
        //       ['name',key]
        //     ])
        // );
        this.edgesFormat.push({
          value:value,
          name:key
        })
      }
      console.log('6666 Pie: this.edgesFormat',this.edgesFormat);
      this.optionEdge.series[0].data=this.edgesFormat;
      console.log('6666 Pie: this.optionEdge',this.optionEdge);

      this.$nextTick(()=>{
        this.drawNodePie();
        console.log('7777-1');
        this.drawEdgePie();
        console.log('7777-2');
      })
    }
  }
}
</script>

<style scoped>
/*.pie-wrap{*/
/*  width:100%;*/
/*  height:400px;*/
/*  !*height: 50%;*!*/
/*}*/
.nodePie{
  margin-top: 80px;
}
</style>