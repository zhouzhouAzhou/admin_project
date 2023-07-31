<template>
  <div>
    <el-table border style="width: 100%;" :data="records">
      <el-table-column type="index" label="" prop="" width="80" align="center"></el-table-column>
      <el-table-column label="名称" prop="skuName" width="width"></el-table-column>
      <el-table-column label="描述" prop="skuDesc" width="100"></el-table-column>
      <el-table-column label="默认图片" prop="" width="110">
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg
" alt="" style="width: 80px;height: 80px;">
        </template>
      </el-table-column>
      <el-table-column label="重量(kg)" prop="weight" width="80"></el-table-column>
      <el-table-column label="价格(元)" prop="price" width="80"></el-table-column>
      <el-table-column label="操作" prop="prop" width="width" align="center">
        <template slot-scope="{row,$index}">
          <!-- 下架操作 -->
          <el-button type="success" size="mini" icon="el-icon-bottom" v-if="row.isSale==0" @click="sale(row)"></el-button>
          <!-- 上架操作 -->
          <el-button type="success" size="mini" icon="el-icon-top" v-else @click="cancel(row)"></el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit"></el-button>
          <el-button type="info" size="mini" icon="el-icon-info" @click="getSKuInfo(row)" ></el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete"></el-button>
          
          
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      :visible.sync="drawer" :show-close="false" size="50%">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}元</el-col>
      </el-row>
      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <template >
            <el-tag type="success" v-for="attr in skuInfo.skuAttrValueList" :key="attr.id" style="margin-right: 10px;">{{ attr.attrId }}-{{ attr.valueId }}</el-tag>
          </template>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl" alt="" style="height: 100%;width: 100%;">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>

    <el-pagination @current-change="getSkuList"  @size-change="handleSizeChange" style="text-align: center;" :total="total" :current-page="1" :page-size="limit" :page-sizes="[3,5,10]" layout="prev,pager,next,jumper,->,sizes,total"></el-pagination>
  </div>
</template>

<script>
    export default {
        name: 'Sku',
        data() {
          return {
            page: 1,//当前第几页
            limit: 10,//当前页面有几条数据,
            records: [],//存储sku列表的数据
            total: 0,//存储分页器一共显示的数据,,
            skuInfo: {},
            drawer: false
          }
        },
        mounted() {
          this.getSkuList()
        },
        methods: {
          async getSkuList(page=1) {
            this.page=page
            let res=await this.$API.sku.reqSkuList(this.page,this.limit);
            if(res.code==200) {
              // console.log(res.data);
              this.records=res.data.records;
              this.total=res.data.total
            }
          },
          handleSizeChange(limit) {
            this.limit=limit
            this.getSkuList()
          },
          //上架
          async save(row) {
            let res=await this.$API.sku.reqSale(row.id);
            if(res.code==200) {
              this.$message({
                type: 'success',
                message: '上架成功'
              });
              row.isSale=1
            }
          },
          //下架
          async cancel(row) {
            let res=await this.$API.sku.reqCancel(row.id);
            if(res.code==200) {
              this.$message({
                type: 'success',
                message: '下架成功'
              });
              row.isSale=0
            }
          },
          edit() {

          },
          //获取sku详情信息的方法
          async getSKuInfo(row) {
            this.drawer=true;
            let res=await this.$API.sku.reqSkuById(row.id);
            if(res.code==200) {
              this.skuInfo=res.data;
            }
          }
        }
    }
</script>

<style scoped>
   .el-row .el-col-5 {
    text-align: right;
    font-size: 18px;
  }
  .el-col {
    margin: 10px;
  }

  >>>.el-carousel__button {
    width: 10px;
    height: 10px;
    background-color: pink;
    border-radius: 50%;
  }
</style>

<style>
 .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

 /*  .el-carousel__button {
    width: 10px;
    height: 10px;
    background-color: pink;
    border-radius: 50%;
  } */
</style>