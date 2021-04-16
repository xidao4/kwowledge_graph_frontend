<template>
  <div>
    <a-row class="row">
      <a-col :xs="12" :sm="12" :md="12" :lg="12" >
        <div id="nodePie" :style="this.heightStr"></div>
      </a-col>
      <a-col :xs="12" :sm="12" :md="12" :lg="12" >
        <div id="edgePie" :style="this.heightStr"></div>
      </a-col>
    </a-row>
  </div>

</template>

<script>
import * as echarts from 'echarts';
import {mapActions, mapGetters} from "vuex";
export default {
  name: "PieBottom",
  data(){
    return{
      nodePie:null,
      edgePie:null,
      heightStr: "height: "+window.screen.height * 0.3 +'px',
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
        console.log('0000 watch currentShowBoard',data);
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
    console.log('0000 PieBottom mounted');
    this.nodePie=echarts.init(document.getElementById('nodePie'));
    this.edgePie=echarts.init(document.getElementById('edgePie'));
    await this.draw();
  },
  methods:{
    ...mapActions([
      'getPicTypes',
    ]),
    drawNodePie(){

      this.optionNode && this.nodePie.setOption(this.optionNode);
    },
    drawEdgePie(){

      this.optionEdge && this.edgePie.setOption(this.optionEdge);
    },
    async draw(){
      await this.getPicTypes({
        picId:this.picId
      })

      this.nodesFormat=[];
      this.edgesFormat=[];

      for(let[key,value] of this.nodesTypeCntMap){
        this.nodesFormat.push({
          value:value,
          name:key
        })
      }
      console.log('0000 this.nodeForamt',this.nodesFormat);
      this.optionNode.series[0].data=this.nodesFormat;

      for(let[key,value] of this.edgesTypeCntMap){
        this.edgesFormat.push({
          value:value,
          name:key
        })
      }
      console.log('0000 this.edgeForamt',this.edgesFormat);
      this.optionEdge.series[0].data=this.edgesFormat;

      this.$nextTick(()=>{
        this.optionNode && this.nodePie.setOption(this.optionNode);
        this.optionEdge && this.edgePie.setOption(this.optionEdge);
      })
    }
  }
}
</script>

<style scoped>

</style>