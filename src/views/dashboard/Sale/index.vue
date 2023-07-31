<template>
  <div>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <!-- 头部右侧内容 -->
            <div class="right" style="z-index: 100;">
            <span @click="setDay">今日</span>
            <span @click="setWeek">本周</span>
            <span @click="setMonth">本月</span>
            <span @click="setYear">本年</span>
            <el-date-picker 
                class="date"
                v-model="date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始月份"
                end-placeholder="结束月份"
                size="mini"
                value-format="yyyy-MM-dd">
            </el-date-picker>
           </div>
            <!-- 头部左侧内容 -->
            <template>
                <el-tabs class="tab" v-model="activeName">
                    <el-tab-pane label="销售额" name="sale">
                        
                    </el-tab-pane>
                    <el-tab-pane label="访问量" name="visit"></el-tab-pane>
                </el-tabs>
            </template>
        </div>
        <el-row :gutter="10">
            <el-col :span="18">
                <div class="charts" ref="charts"></div>
            </el-col>
            <el-col :span="6" class="right">
                <h4>门店{{title}}排名</h4>
                <ul>
                    <li>
                    <span class="rindex">0</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                    </li>
                    <li>
                    <span class="rindex">1</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                    </li>
                    <li>
                    <span class="rindex">3</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                    </li>
                    <li>
                    <span>4</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                    </li>
                    <li>
                    <span>5</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                    </li>
                    <li>
                    <span>6</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                    </li>
                    <li>
                    <span>7</span>
                    <span>肯德基</span>
                    <span class="rvalue">123456</span>
                    </li>
                </ul>
            </el-col>
        </el-row>
       
    </el-card>
    
  </div>
</template>

<script>
import * as echarts from 'echarts';
import dayjs from 'dayjs'
import { mapState } from 'vuex'
export default {
    name: 'Sale',
    data() {
        return {
            activeName: 'sale',
            myCharts: null,
            date: []
        }
    },
    mounted() {
        this.myCharts=echarts.init(this.$refs.charts);
       /*  let option = {
            title: {
                text: '销售额趋势'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                type: 'category',
                data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月'],
                axisTick: {
                    alignWithLabel: true
                }
                }
            ],
            yAxis: [
                {
                type: 'value'
                }
            ],
            series: [
                {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220,10, 52, 200, 334, 390]
                }
            ]
        }; */
        this.myCharts.setOption({
            title: {
                text: '销售额趋势'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                type: 'category',
                data: this.listData.orderFullYearAxis,
                axisTick: {
                    alignWithLabel: true
                }
                }
            ],
            yAxis: [
                {
                type: 'value'
                }
            ],
            series: [
                {
                name: 'Direct',
                type: 'bar',
                barWidth: '60%',
                data: this.listData.orderFullYear
                }
            ]
        })
    },
    computed: {
        ...mapState({listData: state=>state.home.list}),
        title() {
            return this.activeName=='sale'?'销售额':'访问量'
        }
    },
    watch: {
        immediate: true,
        title() {
            console.log(this.title=="销售额");
            this.myCharts.setOption({
                title: {
                    text: this.title
                },
                // '一月', '二月', '三月', '四月', '五月', '六月', '七月','八月','九月','十月','十一月','十二月'
                xAxis: {
                    data: this.title=="销售额"?this.listData.orderFullYearAxis:this.listData.userFullYearAxis
                },
                series: [
                    {
                        name: 'Direct',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.title=="销售额"?this.listData.orderFullYear:this.listData.userFullYear
                    }
                ]
            })
        },
        ...mapState({
            listData: (state)=>state.home.list
        })
    },
    methods: {
        setDay() {
            let day=dayjs().format("YYYY-MM-DD");
            this.date=[day,day]
        },
        setWeek() {
            //本周一
            let start=dayjs().day(1).format("YYYY-MM-DD");
             //本周日
             let end=dayjs().day(7).format("YYYY-MM-DD");
            this.date=[start,end]
        },
        setMonth() {
            let start=dayjs().startOf('month').format("YYYY-MM-DD");
             //本周日
             let end=dayjs().endOf('month').format("YYYY-MM-DD");
            this.date=[start,end]
        },
        setYear() {
            let start=dayjs().startOf('year').format("YYYY-MM-DD");
             //本周日
             let end=dayjs().endOf('year').format("YYYY-MM-DD");
            this.date=[start,end]
        }
    }
}
</script>

<style scoped>
    .el-card__header {
        position: relative;
        border: 0px;
    }
    .tab {
        width: 100%;
    }
    .right {
        position: absolute;
        right: 80px;
    }
    .date {
        z-index: 100;
        width: 250px;
        /* margin: 0 20px 0 0; */
    }
    .right span {
        margin: 0px 10px;
    }
    .charts {
        width: 100%;
        height: 300px;
     }
     ul {
        list-style: none;
        width: 100%;
        height: 300px;
     }
     ul li {
        height: 8%;
        margin: 10px 0;
     }
     .rindex {
        float: left;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background-color: black;
        color: white;
        text-align: center;
     }
     .rvalue {
        float: right;
     }
</style>