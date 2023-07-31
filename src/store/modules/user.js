import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { anyRouters,asyncRoutes,resetRouter,constantRoutes } from '@/router'
import router from '@/router'
const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    routes: [],
    roles: [],
    buttons: [],
    //项目中已有的一部路由与服务器返回的标记信息进行对比最终需要展示的信息
    resultAsyncRouters: {},
    resultAllRoutes: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
/*   SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  } */
  //存储用户信息
  SET_USERINFO: (state,userInfo)=> {
    state.name=userInfo.name;
    state.avatar=userInfo.avatar;
    //菜单权限标记
    state.routes=userInfo.routes;
    state.buttons=userInfo.buttons;
    state.roles=userInfo.roles;
  },
  SET_RESULTASYNCROUTES(state,asyncRouters) {
    state.resultAsyncRouters=asyncRouters
    state.resultAllRoutes=constantRoutes.concat(state.resultAsyncRouters,anyRouters)
    router.addRoutes(state.resultAllRoutes)
    // router.options.routes=state.resultAllRoutes
    // console.log(11,router.options.routes);
  }
}

const computedAsyncRoutes=(asyncRoutes,routes)=>{
  // console.log(asyncRoutes,routes);
  return asyncRoutes.filter(item=>{
      if(routes.indexOf(item.name)!=-1) {
        if(item.children&&item.children.length) {
          // 递归
          item.children=computedAsyncRoutes(item.children,routes);
        }
        return true;
      }
  })
}
const actions = {
  // user login
  async login({ commit }, userInfo) {
    // console.log('eee');
    const { username, password } = userInfo
    const res=await login({ username: username.trim(), password: password });
    // console.log(res);
    if(res.code==20000) {
      // console.log(222);

      commit('SET_TOKEN',res.data.token);
      setToken(res.data.token);
      return 'ok'
    } else {
      // console.log(1111);
      return Promise.reject(new Error('faile'))
    }
    /* return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    }) */
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
    
        commit('SET_USERINFO',data)
        commit('SET_RESULTASYNCROUTES',computedAsyncRoutes(asyncRoutes,data.routes))
       /*  const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar) */
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

