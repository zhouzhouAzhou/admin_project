<template>
  <div class="charts" ref="charts">

  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name: 'barChart',
    mounted() {
        let lineChart=echarts.init(this.$refs.charts);
        let option={
            xAxis: {
                show:false,
                type: 'category'
            },
            yAxis: {
                show:false

            },
            series: [
                {
                data: [10, 7, 33, 12, 88, 9,20,34,45],
                type: 'bar',
                //挂点样式的设置
               
                }
            ],
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            },
            tooltip: {

            }
        }
        lineChart.setOption(option)
    }
}
</script>

<style>
    .charts {
        width: 100%;
        height: 100%;
    }
</style>