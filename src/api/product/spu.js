import request from '@/utils/request'

//获取spu列表数据的接口
// /admin/product/{page}/{limit}
export const reqSpuList=(page,limit,category3Id)=>request({url: `/admin/product/${page}/${limit}/`,method: 'get',params: {category3Id}})

//获取spu信息
// /admin/product/getSpuById/{spuId}
export const reqSpu=(spuId)=>request({url: `/admin/product/getSpuById/${spuId}`,method: 'get'})

//获取品牌信息
//GET /admin/product/baseTrademark/getTrademarkList
export const reqTradeMarkList=()=>request({url: '/admin/product/baseTrademark/getTrademarkList',method: 'get'})

//获取spu图片的接口
// /admin/product/spuImageList/{spuId}
export const reqSpuImageList=(spuId)=>request({url: `/admin/product/spuImageList/${spuId}`,method: 'get'})

//获取平台全部销售属性--整个平台销售属性一共三个
// /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList=()=>request({url: '/admin/product/baseSaleAttrList',method: 'get'})

//修改||添加SPU：对于修改或者添加，携带参数大致一样，唯一区别，修改带ID
export const reqAddOrUpdateSpu=(spuInfo)=>{
    if(spuInfo.id) {
        return request({url: '/admin/product/updateSpuInfo',method: 'post',data: spuInfo})
    } else {
        //不带Id
        return request({url: '/admin/product/saveSpuInfo',method: 'post',data: spuInfo})

    }
}

export const reqDeleteSpu=(spuId)=> request({url:`/admin/product/deleteSpu/${spuId}`,method:'delete'})

//获取图片/admin/product/spuImageList/{spuId}
/* export const  reqSpuImageList=(spuId)=>request({url: `/admin/product/spuImageList/${spuId}`,method: 'get'}) */

// 获取销售属性/admin/product/spuSaleAttrList/{spuId}
export const reqSpuSaleAttrList=(spuId)=>request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:'get'})

// 获取平台属性/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList=(category1Id,category2Id,category3Id)=>request({url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method: 'get'})

//添加sku
export const reqAddSku=(skuInfo)=>request({url:'/admin/product/saveSkuInfo',method: 'post',data: skuInfo})

//获取sku列表数据的接口
export const reqSkuList=(spuId)=>request({url: `/admin/product/findBySpuId/${spuId}`,method: 'get'})