<template>
  <div class="charts" ref="charts">

  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name: 'progressCharts',
    mounted() {
        let lineChart=echarts.init(this.$refs.charts);
        let option={
            xAxis: {
                show:false,
                min: 0,
                max: 100
            },
            yAxis: {
                show:false,
                type: 'category'
            },
            series: [
                {
                data: [78],
                type: 'bar',
                //挂点样式的设置
                barWidth: 10,
                color: 'yellowgreen',
                showBackground: true,
                backgroundStyle: {
                    color: '#eee'
                },
                lable: {
                    show: true,
                    formatter: '|',
                    position: 'right'
                }
                }
            ],
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            },
            tooltip: {

            },
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