import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import miste from './modules/miste';
import user from './modules/user';
import shop from './modules/shop';


Vue.use(Vuex)

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        miste,
        user,
        shop
    }
})