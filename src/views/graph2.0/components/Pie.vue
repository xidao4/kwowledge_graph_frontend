<template>
<div>
<!--  <div id="chartPie" class="pie-wrap"></div>-->
  <div id="chartPie" :style="this.heightStr"></div>
  <div id="edgePie" :style="this.heightStr"></div>
</div>
</template>

<script>
import * as echarts from 'echarts';
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Pie",
  data(){
    return{
      chartPie:null,
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
      nodesFormat:[],
      edgesFormat:[],

    }
  },
  computed:{
    ...mapGetters([
        'pieModalVisible',
        'nodesTypeCntMap',
        'edgesTypeCntMap',
        'picId',
    ])
  },
  watch:{
      pieModalVisible(){
        this.$nextTick(()=>{
          this.drawChartPie();
          this.drawEdgePie();
        })
        // this.chartPie.removeAttribute('_echarts_instance_');
      }
  },
  async mounted(){
      // window.addEventListener('resize', ()=>{
      //   this.chartPie.resize();
      //   this.edgesPie.resize();
      // })
      console.log('getPicTypes param in Pie mounted',this.picId);
      await this.getPicTypes({
          picId:this.picId
      })
      console.log('edgesTypeCntMap after getPicTypesAPI',this.edgesTypeCntMap);
      // Invalid attempt to iterate non-iterable instance
      for(let[key,value] of this.edgesTypeCntMap){
          this.edgesFormat.push({
              value:value,
              name:key
          });
      }
      this.optionEdgethis.get('series')[0].set('data',this.edgesFormat);
  },
  methods:{
    ...mapActions([
        'getPicTypes',
    ]),
    drawChartPie(){
      this.chartPie = echarts.init(document.getElementById('chartPie'));
      this.option1 && this.chartPie.setOption(this.option1);
    },
    drawEdgePie(){
        this.edgePie=echarts.init(document.getElementById('edgePie'));
        this.optionEdge && this.edgePie.setOption(this.optionEdge);
    },
  }
}
</script>

<style scoped>
/*.pie-wrap{*/
/*  width:100%;*/
/*  height:400px;*/
/*  !*height: 50%;*!*/
/*}*/
</style>