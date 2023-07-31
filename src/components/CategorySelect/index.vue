<template>
    <!-- inline行列表单，代表一行能放置多个表单元素 -->
    <el-form :inline="true" :model="cForm" class="demo-form-inline">
        
        <el-form-item label="一级分类">
            <el-select v-model="cForm.categroy1Id" placeholder="请选择"
            @change="handler1" :disabled="show">
                <el-option :label="c1.name" v-for="(c1) in list1" :key="c1.id" :value="c1.id" ></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
            <el-select v-model="cForm.categroy2Id"  placeholder="请选择"
            @change="handler2" :disabled="show">
                <el-option :label="c2.name" :value="c2.id" v-for="(c2) in list2" :key="c2.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
            <el-select v-model="cForm.categroy3Id"  placeholder="请选择"
            @change="handler3" :disabled="show">
                <el-option :label="c3.name" :value="c3.id" v-for="(c3) in list3" :key="c3.id"></el-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: 'CategorySelect',
        data() {
            return {
                list1: [],
                list2: [],
                list3: [],
                cForm: {
                    categroy1Id: '',
                    categroy2Id: '',
                    categroy3Id: ''
                }
            }
        },
        props: ['show'],
        methods: {
            async getCategoryList() {
                let res=await this.$API.attr.reqCategory1List();
                if(res.code==200) {
                    this.list1=res.data
                    // console.log(res);
                }
            },
            async handler1() {
                const {categroy1Id}=this.cForm;
                this.$emit('getCategory',{categoryId: categroy1Id,level: 1})
                this.list2=[];
                this.list3=[];
                this.cForm.categroy2Id=''
                this.cForm.categroy3Id=''

                let res=await this.$API.attr.reqCategory2List(categroy1Id);
                if(res.code==200) {
                    this.list2=res.data
                    // console.log(res);
                }
            },
            async handler2() {
                const {categroy2Id}=this.cForm
                this.$emit('getCategory',{categoryId: categroy2Id,level: 2})

                // categroy3Id='' 只可以读，不能改
                this.list3=[];
                this.cForm.categroy3Id='';
                let res=await this.$API.attr.reqCategory3List(categroy2Id);
                if(res.code==200) {
                    this.list3=res.data
                    // console.log(res);
                }
            },
            handler3() {
                const {categroy3Id}=this.cForm;
                this.$emit('getCategory',{categoryId: categroy3Id,level: 3})

            }
        },
        mounted() {
            this.getCategoryList();
        }
  }
</script>

<style>

</style>