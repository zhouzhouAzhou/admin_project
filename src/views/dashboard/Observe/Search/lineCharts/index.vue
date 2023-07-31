<template>
    <div>
        <div class="header">
            <span class="search-header">搜索用户数</span>
            <svg t="1683796452931" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2380" data-spm-anchor-id="a313x.7781069.0.i1" width="25" height="25"><path d="M509.92 795.84c157.904 0 285.92-128.016 285.92-285.92C795.84 352 667.808 224 509.92 224 352 224 224 352 224 509.92c0 157.904 128 285.92 285.92 285.92z m0 48C325.504 843.84 176 694.32 176 509.92 176 325.504 325.504 176 509.92 176c184.416 0 333.92 149.504 333.92 333.92 0 184.416-149.504 333.92-333.92 333.92z m-2.448-400.704h16a16 16 0 0 1 16 16v201.728a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16V459.136a16 16 0 0 1 16-16z m0-100.176h16a16 16 0 0 1 16 16v23.648a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-23.648a16 16 0 0 1 16-16z" fill="#000000" p-id="2381"></path></svg>

        </div>
        <div class="main">
            <span class="main-title">12321</span>
            <span class="main-content">17.1</span>
            <svg t="1683797553769" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6170" width="16" height="16"><path d="M541.866667 285.866667l345.6 345.6c17.066667 17.066667 17.066667 42.666667 0 59.733333-8.533333 8.533333-19.2 12.8-29.866667 12.8H168.533333c-23.466667 0-42.666667-19.2-42.666666-42.666667 0-10.666667 4.266667-21.333333 12.8-29.866666l343.466666-345.6c17.066667-17.066667 42.666667-17.066667 59.733334 0z" fill="#d81e06" p-id="6171" ></path></svg>
            <svg v-show="false" t="1683797663152" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6525" width="16" height="16"><path d="M482.133333 738.133333L136.533333 392.533333c-17.066667-17.066667-17.066667-42.666667 0-59.733333 8.533333-8.533333 19.2-12.8 29.866667-12.8h689.066667c23.466667 0 42.666667 19.2 42.666666 42.666667 0 10.666667-4.266667 21.333333-12.8 29.866666L541.866667 738.133333c-17.066667 17.066667-42.666667 17.066667-59.733334 0z" fill="#1afa29" p-id="6526"></path></svg>
        </div>
        <div class="footer">
            <div class="charts" ref="charts"></div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name: 'lineCharts',
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
                type: 'line',
                //挂点样式的设置
                itemStyle: {
                    opacity: 0,
                },
                lineStyle: {
                    color: 'blue'
                },
                areaStyle: {
                    color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'blue' // 0% 处的颜色
                    }, {
                        offset: 1, color: '#fff' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                    }
                }
                }
            ],
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        }
        lineChart.setOption(option)
    }
}
</script>

<style scoped>
    .footer {
        width: 100%;
        height: 45px;
    }
    .charts {
        width: 100%;
        height: 100%;
    }
    .header {
        display: flex;
        align-items: center;
        /* color: #eee; */
    }

    .search-header {
        margin-right: 20px;
    }

    .main {
        margin: 10px 0px;
    }
    .main-title {
        margin-right: 30px;

    }

    .main-content {
        margin-right: 10px;
    }
</style>