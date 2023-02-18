import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//创建仓库对象
let store = new Vuex.Store({
    state:{
        num:0,
        user:{},
    }
})
export default store
