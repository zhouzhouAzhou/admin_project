<template>
    <div>
        <el-form ref="form" :model="spu" label-width="80px">
            <el-form-item label="SPU名称">
                <el-input v-model="spu.spuName" placeholder="请输入SPU名称"></el-input>
            </el-form-item>
            <el-form-item label="品牌">
                <el-select v-model="spu.tmId" placeholder="请选择品牌">
                <el-option :label="tm.tmName" :value="tm.id" v-for="tm in tradeMarkList" :key="tm.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input rows="4" 
                placeholder="描述" type="textarea" v-model="spu.description"></el-input>
            </el-form-item>
            <el-form-item label="SPU图片">
                <!-- upload上传图片 -->
                <!-- :file-list="fileList"fileList数组必须得有name属性 -->
                <el-upload
                    action="/dev-api/admin/product/upload"
                    :file-list="spuImageList"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove" :on-success="handlerSucsess">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrIdAndAttrName">
                  <el-option :label="unselect.name" :value="`${unselect.id}:${unselect.name}`" v-for="unselect in unSelectSaleAttr" :key="unselect.id"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaleAttr" >添加销售属性</el-button>
                <el-table :data="spu.spuSaleAttrList" style="width: 100%;" border>
                  <el-table-column label="序号" width="80" type="index" align="center"></el-table-column>
                  <el-table-column prop="saleAttrName" label="属性名" width="150"></el-table-column>
                  <el-table-column label="属性值名称列表" width="width">
                    <template slot-scope="{row,$index}">
                        <el-tag
                        :key="tag.id"
                        v-for="(tag,index) in row.spuSaleAttrValueList"
                        closable
                        :disable-transitions="false"
                        @close="row.spuSaleAttrValueList.splice(index,1)">
                        {{tag.saleAttrValueName}}
                        </el-tag>
                        <el-input
                        class="input-new-tag"
                        v-if="row.inputVisible"
                        v-model="row.inputValue"
                        ref="saveTagInput"
                        size="small"
                        @keyup.enter.native="handleInputConfirm(row)"
                        @blur="handleInputConfirm(row)"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>

                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="150">
                    <template slot-scope="{row,$index}">
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index,1)"></el-button>
                    </template>
                  </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        name: 'SpuForm',
        data() {
            return {
                dialogImageUrl: '',
                dialogVisible: false,
                spu: {
                    "category3Id": 0,
                    "description": "",
                    //新增的spu不需要id
                    // "id": 0,
                    "spuImageList": [
                       
                    ],
                    //品牌Id
                    "tmId": "",
                    "spuName": "",
                    // 品台属性和属性值的收集
                    "spuSaleAttrList": [
                       /*  {
                        "baseSaleAttrId": 0,
                        "id": 0,
                        "saleAttrName": "",
                        "spuId": 0,
                        "spuSaleAttrValueList": [
                            {
                            "baseSaleAttrId": 0,
                            "id": 0,
                            "isChecked": "",
                            "saleAttrName": "",
                            "saleAttrValueName": "",
                            "spuId": 0
                            }
                        ]
                        } */
                    ],
                    // attrIdAndAttrName: ''//收集未选择属性的Id
                },
                tradeMarkList: [],
                spuImageList: [],
                saleAttrList: [],
                attrIdAndAttrName: ''//收集未选择属性的Id
            };
        },
        mounted() {
        },
        methods: {
            // 删除照片墙某一个图片
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            //照片墙预览的回调
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            //图片上传成功
            handlerSucsess(response,file,fileList) {
                console.log(response,file,fileList);
                this.spuImageList=fileList
            },
            async initSpuData(spu) {
                //发请求 获取spu信息的数据
                let res=await this.$API.spu.reqSpu(spu.id);
                // console.log(res);
                if(res.code==200) {
                    // console.log(res);
                    this.spu=res.data
                }

                //获取品牌的信息
               let res1= await this.$API.spu.reqTradeMarkList();
               if(res1.code==200) {
                this.tradeMarkList=res1.data
               }

               //获取spu图片的数据
               let res2=await this.$API.spu.reqSpuImageList(spu.id);
               if(res2.code==200) {
                let listArr= res2.data
                listArr.forEach(item => {
                    item.name=item.imgName;
                    item.url=item.imgUrl
                });

                this.spuImageList=listArr
               }

            //    获取平台全部的销售属性
            let res3=await this.$API.spu.reqBaseSaleAttrList();
            if(res3.code==200) {
                this.saleAttrList=res3.data
            }
            },
            addSaleAttr() {
                const [baseSaleAttrId,saleAttrName]=this.attrIdAndAttrName.split(':');
                //向spu对象的spuSaleAttrList添加新的销售属性
                let newSaleAttr={baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]};
                this.spu.spuSaleAttrList.push(newSaleAttr)
                this.attrIdAndAttrName=''
            },
            addSaleAttrValue(row) {
                //不是响应式数据，改变不了
                // row.inputVisible=true
                this.$set(row,'inputVisible',true)
                this.$set(row,'inputValue','')
                // console.log(row.inputVisible,'eeee');
                this.$nextTick(()=>{
                this.$refs.saveTagInput.focus()

                })

            },
            //el-input失焦点的事件
            handleInputConfirm(row) {
            //     console.log(row);
                // /console.log(1);
                row.inputVisible=false
                const {baseSaleAttrId,inputValue}=row
                if(inputValue.trim()=='') {
                    this.$message('属性值不能为空')
                    return
                }
                //属性值不能重复
                let res=row.spuSaleAttrValueList.every(item=>item.saleAttrValueName!=inputValue)
                if(res==false) {
                    this.$message('属性值重复！！！')
                    return;
                }

                let newSaleAttrValue={baseSaleAttrId,saleAttrValueName: inputValue}
                row.spuSaleAttrValueList.push(newSaleAttrValue)
            },
            //删除属性值
           /*  handleClose(row,tag) {
                row.spuSaleAttrValueList.forEach(item=>{
                    if(item.saleAttrValueName==tag)
                })
            } */
            async addOrUpdateSpu() {
                //image需要携带imgurl、name,map会产生新的数组
                this.spu.spuImageList=this.spuImageList.map(item=>{
                    return {
                        imageName: item.name,
                        imageUrl: (item.response&&item.response.data)||item.url
                    }
                })
                let res=await this.$API.spu.reqAddOrUpdateSpu(this.spu);
                if(res.code==200) {
                    // console.log(res);
                    this.$message({
                    message: this.spu.id?"修改成功":"添加成功",
                    type: 'success'
                    });
                    this.$emit('changeScene',{scene:0,flag: this.spu.id?"修改":"添加"});
                     Object.assign(this._data,this.$options.data())

                }

            },
            async addSpuData(category3Id) {
                this.spu.category3Id=category3Id
                 //获取品牌的信息
               let res1= await this.$API.spu.reqTradeMarkList();
               if(res1.code==200) {
                this.tradeMarkList=res1.data
               }

               //    获取平台全部的销售属性
                let res3=await this.$API.spu.reqBaseSaleAttrList();
                if(res3.code==200) {
                    this.saleAttrList=res3.data
                }

            },
            cancel() {
                this.$emit('changeScene',{scene: 0,flag: '修改'});
                // 清理数据
                Object.assign(this._data,this.$options.data())
            }
        },
        computed: {
            //计算还未选择的销售属性
            unSelectSaleAttr() {
                //从已有的数组中过滤出未选择的
                let arr=[1,2,2,3,3];
                let res=arr.filter(item=> item!=1);
               
                let result=this.saleAttrList.filter(item=>{
                    return this.spu.spuSaleAttrList.every(item1=>item1.saleAttrName!=item.name)
                    
                })
                // console.log(this.saleAttrList,result);
          /*       this.$nextTick(()=>{
                    console.log('com',this.saleAttrList);
                }) */

                return this.saleAttrList;
               

                

            }
        },
     
    }
</script>

<style>

</style>