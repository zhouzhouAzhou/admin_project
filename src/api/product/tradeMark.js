import request from '@/utils/request'
//获取品牌列表接口
export const requireMarkList=(page,limit)=>request({url: `/admin/product/baseTrademark/${page}/${limit}`,method: 'get'});

//处理添加品牌/admin/product/baseTrademark/save 两个参数名称和logo
//修改品牌/admin/product/baseTrademark/update put 三个参数：id 品牌名称 品牌logo

export const reqAddOrUpdateTradeMark=(tradeMark)=> {
    if(tradeMark.id) {
        return request({url: '/admin/product/baseTrademark/update',method:'put',data: tradeMark})
    } else {
        return request({url: '/admin/product/baseTrademark/save',method:'post',data: tradeMark})
    }
}

// 删除品牌接口
export const reqDeleteTradeMark=(id)=>request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})
