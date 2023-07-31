<template>
  <el-card>
    <div slot="header" class="category-header">
        <span>销售类别占比</span>
        <div>
            <el-radio-group v-model="value">
            <el-radio-button label="全部渠道"></el-radio-button>
            <el-radio-button label="线上"></el-radio-button>
            <el-radio-button label="门店"></el-radio-button>
            </el-radio-group>
        </div>
    </div>
    <div>
        <div class="charts" ref="charts"></div>
    </div>
  </el-card>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name: 'Category',
    data() {
        return {
            value: ''
        }
    },
    mounted() {
        let myCharts=echarts.init(this.$refs.charts);
        myCharts.setOption({
            title: {
                text: '视频广告',
                subtext: '300',
                left: 'center',
                top: 'center'
            },
            tooltip: {
                trigger: 'item'
            },
            series: [
                {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: true,
                    position: 'outsize'
                },
               /*  emphasis: {
                    label: {
                    show: false,
                    fontSize: 30,
                    fontWeight: 'normal'
                    }
                }, */
                labelLine: {
                    show: true
                },
                data: [
                    { value: 300, name: '视频广告' },
                    { value: 1048, name: '搜索引擎' },
                    { value: 750, name: '直接访问' },
                    { value: 580, name: '邮件营销' },
                    { value: 484, name: '联盟广告' }
                ]
                }
            ]
        })
        //图标绑定事件
        myCharts.on('mouseover',parmas=>{
            let {name,value}=parmas
            myCharts.setOption({
            title: {
                text: name,
                subtext: value,
                left: 'center'
            }})
        })
    }
}
</script>

<style scoped>
.header {
    border-bottom: 1px solid;
}

.category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.charts {
    height: 300px;
}
</style>