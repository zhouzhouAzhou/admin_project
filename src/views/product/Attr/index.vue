<template>
  <div>
    <el-card style="margin: 10px 0;">
        <CategorySelect @getCategory="getCategoryId" :show="!isShowTable"/>
    </el-card>
    <el-card>
        <div v-show="isShowTable">
            <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px;"  :disabled="!category3Id" @click="addAttr">添加属性</el-button>
            <el-table :data="attrList" style="width: 100%;" border>
            <el-table-column label="序号" width="80" type='index' align="center"></el-table-column>
            <el-table-column label="属性名称" width="150" prop="attrName">
            </el-table-column>
            <el-table-column label="属性值列表" width="width">
                <template slot-scope="{row,index}">
                    <el-tag type="success" v-for="(attrValue,index) in row.attrValueList" :key="attrValue.id">{{ attrValue.valueName }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="{row,$index}">
                    <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)"></el-button>
                    <el-button icon="el-icon-delete" type="danger" size="mini"></el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
        <!-- 添加属性或修改属性的结构 -->
        <div v-show="!isShowTable">
            <el-form :inline="true" ref="form" label-width="80px">
              <el-form-item label="属性名">
                <el-input  placeholder="请输入属性名" v-model="attrInfo.attrName" @blur="attrInfo.attrName=attrInfo.attrName.trim();"></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="!attrInfo.attrName.trim()">添加属性值</el-button>
            <el-button @click="isShowTable=true">取消</el-button>
            <el-table style="width: 100%; margin: 20px 0" border :data="attrInfo.attrValueList">
              <el-table-column type="index" align="center" label="序号" prop="prop" width="width"></el-table-column>
              <el-table-column label="属性值名称" prop="prop" width="width">
                <template slot-scope="{row,$index}">
                    <!-- input、span来回切换 -->
                    <el-input v-model="row.valueName" placeholder="请输入属性值名称" size="mini" @blur="toLook(row)" v-if="row.flag" @keyup.native.enter="toLook(row)" :ref="$index"></el-input>
                    <span v-else @click="toEdit(row,$index)" style="display: block;">{{row.valueName}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" prop="prop" width="width">
                <template slot-scope="{row,$index}">
                    <div>
                         <el-popconfirm
                        :title="`这是一段内容确定删除${row.valueName}吗？`" @onConfirm="deleteAttrValue($index)"
                        >
                            <el-button type="danger" icon="el-icon-delete" size="mini" slot="reference"></el-button>
                        </el-popconfirm>
                    </div>
                </template>
               
              </el-table-column>
              
            </el-table>
            <!-- addOrUpdateAttr" :disabled="!attrInfo.attrName|| -->
            <el-button type="primary" @click="attrInfo.attrValueList.length<1">保存</el-button>
            <el-button @click="isShowTable=true">取消</el-button>
        </div>
    </el-card>

  </div>
</template>

<script>
    import cloneDeep from 'lodash/cloneDeep'
    export default {
        name: 'Attr',
        data() {
            return {
                category1Id: '',
                category2Id: '',
                category3Id: '',
                attrList: [],
                isShowTable: true,
                //收集新增属性|修改属性使用的
                attrInfo: {
                    "attrName": "",
                    "attrValueList": [
                    ],
                    "categoryId": 0,
                    "categoryLevel": 3,
                },
                // flag: true会影响全部的input
            }
        },
        methods: {
            getCategoryId({categoryId,level}) {
                // console.log(categoryId,level);
                if(level==1) {
                    this.category1Id=categoryId;
                    this.category2Id='';
                    this.category3Id=''
                } else if(level==2) {
                    this.category2Id=categoryId;
                    this.category3Id=''
                } else if(level==3) {
                    this.category3Id=categoryId;
                    this.getAttrList();
                }
            },
            async getAttrList(){
                const {category1Id,category2Id,category3Id}=this
                let res=await this.$API.attr.reqAttrList(category1Id,category2Id,category3Id);
                if(res.code==200) {
                    this.attrList=res.data
                }
            },
            addAttrValue() {
                if(this.attrInfo.attrName.trim()=='') {
                    // console.log(this.attrInfo.attrName);
                    this.attrInfo.attrName='';
                    return;
                }
                this.attrInfo.attrValueList.push(
                    {
                        //对于修改某一个属性的时候，可以在已有的属性值基础之上新增新的属性值（新增属性值的时候，需要把已有的属性的id带上）
                    "attrId": this.attrInfo.id,
                    "valueName": "",
                    flag: true
                    }
                );

                this.$nextTick(()=>{
                    //input有了才出现
                    this.$refs[this.attrInfo.attrValueList.length-1].focus()

                })
            },
            //添加属性按钮的回调
            addAttr() {
                this.isShowTable=false;
                // 清除数据
                this.attrInfo={
                    "attrName": "",
                    "attrValueList": [
                    ],
                    "categoryId": this.category3Id,
                    "categoryLevel": 3,
                }
            },
            updateAttr(row) {
                this.isShowTable=false;
                //深拷贝
                this.attrInfo=cloneDeep(row);
                this.attrInfo.attrValueList.forEach(item => {
                    //这一样书写也可以给属性值添加flag自动，但是会发现视图不会发生变化，因为flag不是响应式数据
                    // item.flag=false
                    this.$set(item,'flag',false)
                });
            },
            toLook(row) {
                if(row.valueName.trim()=='') {
                    this.$message('请你输入一个正常的属性值！')
                    return;
                }
                row.valueName=row.valueName.trim()
                let isRepeat=this.attrInfo.attrValueList.some((item,index)=>{
                    if(row!=item)
                    return row.valueName==item.valueName
                });
                if(isRepeat==true) {
                    this.$message('出现相同属性请重新输入！')
                    this.attrInfo.attrValueList.pop()
                }
                
                row.flag=false
            },
            toEdit(row,index) {
                row.flag=true;
                //点击span的时候，重绘一个input是需要时间的，因此我们不能一点击span立马获取到input
                // $netxTick
                this.$nextTick(()=>{
                    //input有了才出现
                    this.$refs[index].focus()

                })
            },
            //气泡确认框的按钮
            deleteAttrValue(index) {
                //删除属性值
                this.attrInfo.attrValueList.splice(index,1);
            },
            async addOrUpdateAttr() {
                //空的属性值和flag不需要
                this.attrInfo.attrValueList=this.attrInfo.attrValueList.filter(item=>{
                   if(item.valueName!='') {
                    delete item.flag;
                    return true
                   }
                })
                try {
                     await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
                     this.$message({type: 'success',message: '保存成功'});
                     this.getAttrList();
                    this.isShowTable=true
                } catch (error) {
                    this.$message({type: 'error',message: '保存失败'})
                }
               

            }
        }
    }
</script>

<style>

</style>