<template>
    <div>
        <el-form :model="skuInfo" label-width="80px">
          <el-form-item label="SPU名称">
            {{spu.spuName}}
          </el-form-item>

          <el-form-item label="SKU名称">
            <el-input v-model="skuInfo.skuName" placeholder="SKU名称"></el-input>
          </el-form-item>

          <el-form-item label="价格(元)">
            <el-input v-model="skuInfo.price" placeholder="价格" type="number"></el-input>
          </el-form-item>

          <el-form-item label="重量(千克)">
            <el-input v-model="skuInfo.weight" placeholder="重量"></el-input>
          </el-form-item>

          <el-form-item label="规格描述">
            <el-input v-model="skuInfo.skuDesc" placeholder="规格描述" type="textarea" rows="4"></el-input>
          </el-form-item>

          <el-form-item label="平台属性">
            <el-form :inline="true" label-width="80px">
              <el-form-item :label="attr.attrName" v-for="attr in attrInfoList" :key="attr.id">
                <el-select placeholder="请选择" v-model="attr.attrIdAndValueId">
                  <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="attrValue in attr.attrValueList" :key="attrValue.id"></el-option>
                </el-select>
                
              </el-form-item>
            </el-form>
          </el-form-item>

          <el-form-item label="销售属性">
            <el-form :inline="true" label-width="80px">
              <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
                <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
                  <el-option :value="`${saleAttr.id}:${saleAttrValue.id}`" :label="saleAttrValue.saleAttrValueName" v-for="saleAttrValue in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"></el-option>
                </el-select>
                
              </el-form-item>
            </el-form>
          </el-form-item>

          <el-form-item label="图片列表">
            <el-table style="width: 100%;" border :data="spuImageList"   @selection-change="handleSelectionChange">
              <el-table-column type="selection"  prop="prop" width="80" align="center"></el-table-column>
              <el-table-column label="图片" prop="prop" width="width">
                <template slot-scope="{row,$index}">
                    <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px;">
                </template>
              </el-table-column>
              <el-table-column label="名称" prop="imgName" width="width"></el-table-column>
              <el-table-column label="操作" prop="prop" width="width">
                <template slot-scope="{row,$index}">
                    <!-- <el-button type="primary" v-if="!row.isDefault" @click="row.isDefault=1">设置默认</el-button> -->
                    <el-button type="primary" v-if="!row.isDefault" @click="changeDefault(row)">设置默认</el-button>
                    <el-button v-else>默认</el-button>
                    
                </template>
              </el-table-column>

            </el-table>
          </el-form-item>

          <el-form-item >
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>

        </el-form>
    </div>
</template>

<script>
    export default {
        name: 'SkuForm',
        data() {
            return {
                skuInfo: {
                    //从父组件收集到的数据
                    "category3Id": 0,
                    "spuId": 0,
                    "tmId": 0,
                    // 需要通过数据绑定获得的数据
                    "skuName": "",
                    "price": 0,
                    "weight": "",
                    "skuDefaultImg": "",
                    "skuDesc": "",
                    //平台属性 
                    "skuAttrValueList": [
                        {
                        "attrId": 0,
                        "attrName": "string",
                        "id": 0,
                        "skuId": 0,
                        "valueId": 0,
                        "valueName": "string"
                        }
                    ],
                    "skuImageList": [
                        /* {
                        "id": 0,
                        "imgName": "string",
                        "imgUrl": "string",
                        "isDefault": "string",
                        "skuId": 0,
                        "spuImgId": 0
                        } */
                    ],
                    //收集销售属性
                    "skuSaleAttrValueList": [
                        {
                        "id": 0,
                        "saleAttrId": 0,
                        "saleAttrName": "string",
                        "saleAttrValueId": 0,
                        "saleAttrValueName": "string",
                        "skuId": 0,
                        "spuId": 0
                        }
                    ]
                },
                spuImageList: [],
                //销售属性
                spuSaleAttrList: [],
                //存储平台属性的
                attrInfoList: [],
                spu: {},
                //收集图片的数组
                imageList: []
            }
        },
        methods: {
            async getData(category1Id,category2Id,row) {
                // console.log(row);
                this.skuInfo.category3Id=row.category3Id;
                this.skuInfo.spuId=row.id;
                this.skuInfo.tmId=row.tmId
                this.spu=row
                // console.log('getData',row);
                //获取图片
                let res1=await this.$API.spu.reqSpuImageList(row.id);
                if(res1.code==200) {
                    let list=res1.data;
                    //为每一条数据加上isDefault
                    list.forEach(item => {
                        item.isDefault=0;
                    });
                    this.spuImageList=list
                }

                let res2=await this.$API.spu.reqSpuSaleAttrList(row.id);
                if(res2.code==200) {
                    this.spuSaleAttrList=res2.data
                }

                let res3=await this.$API.spu.reqAttrInfoList(category1Id,category2Id,row.category3Id);
                if(res3.code==200) {
                    this.attrInfoList=res3.data
                }
            },
            handleSelectionChange(params) {
                //获取到用户选择图片的信息数据，但是要注意的是当前收集的数据中，缺少isDefault字段
                this.imageList=params;


            },
            changeDefault(row) {
                this.spuImageList.forEach(item=>{
                    item.isDefault=0
                });
                row.isDefault=1;
                this.skuInfo.skuDefaultImg=row.imgUrl;
            },
            cancel() {
                this.$emit('changeScenes',0);
                // 清理数据
                Object.assign(this._data,this.$options.data())
            },
            async save() {
                //整理参数
                const {attrInfoList,skuInfo,spuSaleAttrList}=this

                /* let arr=[]
                attrInfoList.forEach(item=>{
                    if(item.attrIdAndValueId) {
                        const [attrId,valueId]=itme.attrIdAndValueId.split(':');
                        let obj={attrId,valueId}
                        arr.push(obj);
                    }
                }) */

                skuInfo.skuAttrValueList =attrInfoList.reduce((prev,item)=>{
                    if(item.attrIdAndValueId) {
                        const [attrId,valueId]=item.attrIdAndValueId.split(':');
                        prev.push({attrId,valueId});
                    }
                    return prev;
                },[])

                //销售属性
                skuInfo.skuSaleAttrValueList=spuSaleAttrList.reduce((prev,item)=>{
                    if(item.attrIdAndValueId) {
                        const [saleAttrId,saleAttrValueId]=item.attrIdAndValueId.split(':');
                        prev.push({saleAttrId,saleAttrValueId});
                    }
                    return prev;
                },[]);

                //整理图片信息
                skuInfo.skuImageList=this.imageList.map(item=>{
                    return {
                        imgName: item.imgName,
                        imgUrl: item.imgUrl,
                        isDefault: item.isDefault,
                        spuImgId: item.id
                    }
                })

                let res=await this.$API.spu.reqAddSku(this.skuInfo);
                if(res.code==200) {
                    this.$message({message:'添加成功',type: 'success'});
                    this.$emit('changeScenes',0);
                    // 清理数据
                    Object.assign(this._data,this.$options.data())
                }
            }
        }
    }
</script>

<style>

</style>