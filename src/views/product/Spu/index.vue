<template>
  <div>
    <el-card style="margin: 10px 0;">
        <CategorySelect @getCategory="getCategoryId" :show="scene!=0"/>
    </el-card>
    <el-card>
        <div v-show="scene==0">
            <el-button type="primary" icon="el-icon-plus"  :disabled="!category3Id" @click="addSpu">添加spu</el-button>

            <el-table style="width: 100%;" border :data="records">
              <el-table-column label="序号" width="80" type="index" align="center"></el-table-column>
              <el-table-column label="SPU名称" prop="spuName"></el-table-column>
              <el-table-column label="SPU描述" prop="description"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="{row,$index}">
                    <div>
                        <!-- 将来用hintbutton代替 -->
                        <HintButton type="success" icon="el-icon-plus" size="mini" title="添加sku" @click="addSku(row)"></HintButton>

                        <HintButton type="warning" icon="el-icon-edit" size="mini" title="修改spu" @click="updateSpu(row)"></HintButton>

                        <HintButton type="info" icon="el-icon-info" size="mini" title="查看当前spu全部sku列表" @click="handler (row)"></HintButton>

                        <el-popconfirm
                        title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)"
                        >
                            <HintButton type="danger" icon="el-icon-delete" size="mini" title="删除spu" slot="reference"></HintButton>
                        </el-popconfirm>

                    </div>
                </template>
              </el-table-column>
            </el-table>

            <el-pagination 
            style="text-align: center;"
            :total="total" 
            :current-page="page" 
            :page-size="limit"
            :page-sizes="[3,5,10]" 
            layout="prev,pager,next,jumper,->,sizes,total"
            @current-change="getSpuList"
            @size-change="handleSizeChange"></el-pagination>
        </div>

        <SpuForm ref="spu" v-show="scene==1" @changeScene="changeScene"></SpuForm>

        <SkuForm v-show="scene==2" ref="sku" @changeScenes="changeScenes"></SkuForm>

    </el-card>


    <el-dialog :title="`${spu.spuName}的SKU列表`" :visible.sync="dialogTableVisible">
        <el-table :data="skuList" border v-loading="loading" :before-close="close">
            <el-table-column label="名称" prop="skuName" width="width"></el-table-column>
            <el-table-column  label="价格" width="width" prop="price" ></el-table-column>
            <el-table-column label="重量" width="width" prop="weight" ></el-table-column>
            <el-table-column label="默认图片" width="width">
                <template slot-scope="{row,$index}">
                    <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px;">
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
  </div>
</template>

<script>
    import SpuForm from './SpuForm'
    import SkuForm from './SkuForm'

    export default {
        name: 'Spu',
        components: {
            SpuForm,
            SkuForm
        },
        data() {
            return {
                category1Id: '',
                category2Id: '',
                category3Id: '',
                totalCount: 33,
                page: 1,//分页器当前页
                limit: 3,//每页所展示的数据个数,
                records: [],
                total: 0,//分页器一共需要展示数据的条数多少
                scene: 0,//scene表示不同的table内容
                dialogTableVisible: false,
                spu: [],
                skuList: [],
                loading: true
            }
        },
        methods: {
            async getSpuList(pages=1) {  
                // console.log(pages);
                this.page=pages       
                const {limit,category3Id}=this
                let res=await this.$API.spu.reqSpuList(this.page,limit,category3Id);
                // console.log(res);
                if(res.code==200) {

                    this.records=res.data.records
                    this.total=res.data.total
                }
            },
            getCategoryId({categoryId,level}) {
                if(level==1) {
                    this.category1Id=categoryId;
                    this.category2Id='';
                    this.category3Id=''
                } else if(level==2) {
                    this.category2Id=categoryId;
                    this.category3Id=''
                } else if(level==3) {
                    this.category3Id=categoryId;
                    this.getSpuList();
                }
            },
            /* handleCurrentChange(page) {
                this.page=page
                this.getSpuList()
            } */
            handleSizeChange(limit) {
                this.limit=limit;
                this.getSpuList();
            },
            addSpu() {
                this.scene=1;
                this.$refs.spu.addSpuData(this.category3Id)
            },
            updateSpu(row) {
                this.scene=1;
                this.$refs.spu.initSpuData(row)
            },
            changeScene({scene,flag}) {
                console.log(scene);
                if(flag=="修改") {
                    this.scene=scene
                    this.getSpuList(this.page)
                }
                else {
                    this.scene=scene
                    this.getSpuList(1)
                    
                }
                // console.log('scene',scene);
            },
            async deleteSpu(row) {
                // alert('sss')
                let res=await this.$API.spu.reqDeleteSpu(row.id);
                if(res.code==200) {
                    this.$message({
                        message: '删除成功',
                        type: 'success'
                    })
                    //如果spu个数大于1停留在当前页数，否则去上一页
                    this.getSpuList(this.records.length>1?this.page:this.page-1)
                }
            },
            addSku(row) {
                this.scene=2;
                this.$refs.sku.getData(this.category1Id,this.category2Id,row)
            },
            changeScenes(scene) {
                this.scene=scene
            },
            //查看sku
            async handler(row) {
                this.spu=row
                this.dialogTableVisible=true
                let res=await this.$API.spu.reqSkuList(row.id);
                if(res.code==200) {
                    this.skuList=res.data
                    this.loading=false
                }
            },
            //关闭对话框
            close(done) {
                this.loading=true;
                this.skuList=[]
                done()//关闭对话框
            }
        }
    }
</script>

<style>

</style>