import request from '@/utils/request'
//获取一级分类的数据
/* GET /admin/product/get/category2/{id}
获取二级分类

GET /admin/product/get/category3/{id}
获取三级分类

GET /admin/product/getCategory1
getCategory1

GET /admin/product/getCategory2/{category1Id}
getCategory2

GET /admin/product/getCategory3/{category2Id}
getCategory3 */
export const reqCategory1List=()=>request({url:`/admin/product/getCategory1`,method: 'get'})

//获取二级分类
export const reqCategory2List=(category1Id)=>request({url:`/admin/product/getCategory2/${category1Id}`,method: 'get'})

//获取三级分类
export const reqCategory3List=(category2Id)=>request({url:`/admin/product/getCategory3/${category2Id}`,method: 'get'})

//获取商品
export const reqAttrList=(category1Id,category2Id,category3Id)=>request({url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/
${category3Id}`,method: 'get'})

// 添加属性和属性值的接口 /admin/product/getAttrValueList/{attrId}
export const reqAddOrUpdateAttr=(data)=>request({url:`/admin/product/saveAttrInfo`,method: 'post',data})
/* data携带参数
{
    "attrName": "string",
    "attrValueList": [
      {
        "attrId": 0,
        "id": 0,
        "valueName": "string"
      }
    ],
    "categoryId": 0,
    "categoryLevel": 0,
    "id": 0
  } */