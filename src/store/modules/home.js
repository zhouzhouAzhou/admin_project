import mockRequest from '@/utils/mockRequest'
const state={
    list: {}
}
const mutations={
    GETDAPTE(state,list) {
        state.list=list
    }
}
const actions={
    //获取首页的mock结果
    async getDate({commit}) {
        let res=await mockRequest.get('/home/list');
        // console.log(res);
        if(res.code==20000) {
            commit("GETDAPTE",res.data)
        }
    }
}
const getters={

}
export default {
    state,
    mutations,
    actions,
    getters

}