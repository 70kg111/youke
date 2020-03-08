<template>
    <div ref="mychart" class="chart" :style="{width:chartWidth,height:chartHeight}">

    </div>
</template>

<script lang="ts">
  import {Component, Prop, Provide, Vue} from 'vue-property-decorator';
  import echarts from 'echarts';

  @Component({
    components: {}
  })
  export default class Charts extends Vue {
    //图标类型 line/bar/pie
    @Prop({type: String, default: 'line'}) readonly chartType !: string;
    @Prop(Object) chartData !: string | null;

    @Provide() chartWidth: string = '';
    @Provide() chartHeight: string = '';

    created() {
      this.generatorWidthAndHeight();
    }

    //图表的宽度和高度
    generatorWidthAndHeight() {
      this.chartWidth = `${document.body.offsetWidth * 0.8}px`;
      this.chartHeight = `${document.body.offsetHeight * 0.6}px`;
    }

    mounted() {
      this.drawChart();
    }

    //绘制图表
    drawChart() {
      //实例 echarts 对象
      let chart = echarts.init((this as any).$refs.mychart as HTMLCanvasElement);
      if (chart == undefined) {
        console.log('echarts init dom is failed');
        return;
      }

      switch (this.chartType) {
        case 'line':
          chart.setOption((this as any).generatorLineOption());
          break;
        case 'bar':
          chart.setOption((this as any).generatorBarOption());
          break;
        case 'pie':
          chart.setOption((this as any).generatorPieOption());
          break;
        default:
          break;
      }
    }

    //折线图
    generatorLineOption() {
      return {
        title: {
          text: '近一周学习量',
          subtext: 'test',
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: (this as any).chartData.xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: (this as any).chartData.yAxisData,
          type: 'line',
          smooth: true
        }],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        }
      };
    }

    //柱状图
    generatorBarOption() {
      return {
        title: {
          text: '近一周学习量',
          subtext: 'test',
          x: 'center'
        },
        xAxis: {
          type: 'category',
          data: (this as any).chartData.xAxisData
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: (this as any).chartData.yAxisData,
          type: 'bar',
          barWidth: '50'
        }],
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '5%'
        }
      };
    }

    //饼状图
    generatorPieOption() {
      //处理数据
      let pieData = [];
      for (const index in (this as any).chartData.xAxisData) {
        pieData.push({
          value: (this as any).chartData.yAxisData[index],
          name: (this as any).chartData.xAxisData[index]
        });
      }

      return {
        title: {
          text: '近一周学习量',
          subtext: 'test',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: (this as any).chartData.xAxisData
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: pieData
          }
        ]
      };
    }
  };
</script>


<style lang="scss" scoped>

</style>