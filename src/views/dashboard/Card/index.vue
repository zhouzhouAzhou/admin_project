<template>
    <div>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-card>
                <Detail title="总销售额" count="￥ 126569">
                    <template slot="charts">
                        <span>周同比&nbsp;&nbsp;56.67% <svg t="1683797553769" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6170" width="16" height="16"><path d="M541.866667 285.866667l345.6 345.6c17.066667 17.066667 17.066667 42.666667 0 59.733333-8.533333 8.533333-19.2 12.8-29.866667 12.8H168.533333c-23.466667 0-42.666667-19.2-42.666666-42.666667 0-10.666667 4.266667-21.333333 12.8-29.866666l343.466666-345.6c17.066667-17.066667 42.666667-17.066667 59.733334 0z" fill="#d81e06" p-id="6171"></path></svg></span>
                        <span style="margin: 0 0 0 20px">日同比&nbsp;&nbsp;19.75%<svg t="1683797663152" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6525" width="16" height="16"><path d="M482.133333 738.133333L136.533333 392.533333c-17.066667-17.066667-17.066667-42.666667 0-59.733333 8.533333-8.533333 19.2-12.8 29.866667-12.8h689.066667c23.466667 0 42.666667 19.2 42.666666 42.666667 0 10.666667-4.266667 21.333333-12.8 29.866666L541.866667 738.133333c-17.066667 17.066667-42.666667 17.066667-59.733334 0z" fill="#1afa29" p-id="6526"></path></svg></span>
                    </template>

                    <template slot="footer">
                        <span>日销售额￥123423</span>
                    </template>
                </Detail>
            </el-card>
          </el-col>
          
          <el-col :span="6">
            <el-card>
                <Detail title="访问量"  count="88460">
                    <template slot="charts">
                        <lineChart>
                        </lineChart>
                    </template>
                    <template slot="footer">
                        <span>日访问 1234</span>
                    </template>
                </Detail>
            </el-card>
          </el-col>

          <el-col :span="6">
            <el-card>
                <Detail title="支付笔数"  count="88460"> 
                    <template slot="charts">
                        <barChart></barChart>
                    </template>
                    <template slot="footer">
                        <span>转化率 65%</span>
                    </template>
                </Detail>
            </el-card>
          </el-col>

          <el-col :span="6">
            <el-card>
                <Detail title="运营活动效果" count="78%">
                    <template slot="charts">
                        <progressCharts></progressCharts>
                    </template>
                    <template slot="footer">
                        <span>周同比&nbsp;&nbsp;12%<svg t="1683808522473" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6926" width="12" height="12"><path d="M541.866667 285.866667l345.6 345.6c17.066667 17.066667 17.066667 42.666667 0 59.733333-8.533333 8.533333-19.2 12.8-29.866667 12.8H168.533333c-23.466667 0-42.666667-19.2-42.666666-42.666667 0-10.666667 4.266667-21.333333 12.8-29.866666l343.466666-345.6c17.066667-17.066667 42.666667-17.066667 59.733334 0z" fill="#d81e06" p-id="6927"></path></svg> </span>
                        <span style="margin: 0 0 0 10px">日同比&nbsp;&nbsp;11%<svg t="1683797663152" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6525" width="12" height="12"><path d="M482.133333 738.133333L136.533333 392.533333c-17.066667-17.066667-17.066667-42.666667 0-59.733333 8.533333-8.533333 19.2-12.8 29.866667-12.8h689.066667c23.466667 0 42.666667 19.2 42.666666 42.666667 0 10.666667-4.266667 21.333333-12.8 29.866666L541.866667 738.133333c-17.066667 17.066667-42.666667 17.066667-59.733334 0z" fill="#1afa29" p-id="6526"></path></svg></span>
                </template>
                </Detail>
            </el-card>
          </el-col>
        </el-row>

    </div>
</template>

<script>
import Detail from './Detail'
import lineChart from './lineChart'
import barChart from './barChart'
import progressCharts from './progressCharts'
export default {
    name: 'Card',
    components: {
        Detail,
        lineChart,
        barChart,
        progressCharts
    },
    mounted() {
        this.$store.dispatch('getDate');
    }
}
</script>

<style>

</style>