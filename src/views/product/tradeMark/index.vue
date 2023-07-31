<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px;"  @click="showDialog">添加</el-button>
    <!-- 表格组件，data：表格组件将来需要展示的数据--数组类型 :data="data" -->
    <el-table style="width: 100%;" border :data="list">
        <el-table-column 
        type="index"
        width="80px" align="center" label="序号"></el-table-column>
        <el-table-column label="品牌名称" prop="tmName"></el-table-column>
        <el-table-column label="品牌LOGO" prop="">
            <!-- 作用域插槽 -->
            <template slot-scope="{row,$index}">
                <img :src="row.logoUrl" alt="" style="width: 100px; height: 100px;">
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="{row,$index}">
                <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <!-- page-sizes每一页可以展示多少条数据，可以进行切换 -->
    <el-pagination 
    style="margin-top: 20px; text-align: center;"
    :total="total" :current-page="page" :page-size="limit" 
    :page-sizes="[3,5,10]"
    layout="prev,pager,next,jumper,->,sizes,total"
    @current-change="getPageList"
    @size-change="handleSizeChange"></el-pagination>

    <!-- 对话框 -->
    <el-dialog :title="tmForm.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
    <!-- :model属性：把表单上的数据收集到那个对象身上，将来表单验证，也需要这个属性 -->
    <!-- rules表单验证 -->
    <el-form title="" style="width: 80%" :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input autocomplete="off" v-model="tmForm.tmName" ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
            <!-- :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload" -->
            <!-- 这里收集数据不能使用v-model，因为不是表单数据 -->
            <!-- action：设置图片上传的地址 -->
            <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
        </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
    </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: 'TradeMark',
        data() {
            return {
                page:1,
                limit: 3,
                total: 0,
                list: [],//列表展示的数据,
                dialogFormVisible: false,
                // imageUrl: '',
                tmForm: {
                    tmName: '',
                    logoUrl: '',
                    // id: 
                },
                rules: {
                    //表单验证规则
                    tmName: [
                            { required: true, message: '请输入品牌名称',
                            //代表用户行为
                            trigger: 'blur' },
                            // min：品牌名称最小数量，max：最大数量
                            { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
                        ],
                    logoUrl: [
                        { required: true, message: '请选择品牌图片', 
                        /* upload不是表单元素，所以trigger没有
                        trigger: 'change' */ }
                    ],
                }
            }
        },
        mounted() {
            //获取列表数据的方法
            this.getPageList();
            // console.log(this.$API);
        },
        methods: {
            async getPageList(pager=1) {
                this.page=pager
                //解构参数
                const {page,limit}=this
                let res=await this.$API.trademark.requireMarkList(page,limit);
                if(res.code==200) {
                    // console.log(res);
                    this.total=res.data.total;
                    this.list=res.data.records
                }
            },
            handleSizeChange(limit) {
                this.limit=limit;
                this.getPageList();
            },
            //点击添加品牌的按钮
            showDialog() {
                // console.log(121);
                //显示对话框
                this.dialogFormVisible = true;
                //清除数据
                this.tmForm = { tmName: "", logoUrl: "" };
            },
            closeDialog() {
                this.dialogFormVisible = false;
                //清除数据
                this.tmForm = { tmName: "", logoUrl: "" };
            },
            //修改选中的图片信息
            updateTradeMark(row) {
                this.dialogFormVisible = true;
                //将选择的深拷贝
                // this.tmForm=row
                // 浅拷贝
                this.tmForm={...row};
            },
            //图片上传成功
            handleAvatarSuccess(res, file) {
                //res、file：上传成功后返回前端的数据
                this.tmForm.logoUrl=res.data
                // this.imageUrl = URL.createObjectURL(file.raw);
            },
            //图片上传失败
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },

            addOrUpdateTradeMark() {
                this.dialogFormVisible=false;
                // 当全部验证字段通过
                this.$refs.ruleForm.validate(async (success)=>{
                    if(success) {
                        let res=await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm);
                    if(res.code==200) {
                        this.$message({
                            message: this.tmForm.id?'修改品牌成功':'添加品牌成功',
                            type: 'success'
                        });
                        //添加品牌留在第一页，修改品牌留在当前页
                        this.getPageList(this.tmForm.id?this.page:1);
                    } else {
                        this.$message('失败');
                    }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                    
                })
                

                
            },

            //删除品牌信息
            deleteTradeMark(row) {
                this.$confirm(`你确定删除${row.tmName}?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async() => {
                    //点击确定的时候出发
                    let res=await this.$API.trademark.reqDeleteTradeMark(row.id)
                    if(res.code==200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getPageList(this.list.length>1?this.page:1);
                    };
                    
                    
                }).catch(() => {
                    // 点击取消时触发
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>