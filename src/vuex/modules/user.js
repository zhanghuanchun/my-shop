import {
    SAVE_USER,
    SAVE_TOKEN,
} from '../mutation_types'
import {
    reqAutoLogin,
} from '../../api'
export default {
    state: () => ({
        user: {},
        token: localStorage.getItem('token_key') || '',
    }),
    mutations: {
        [SAVE_USER](state, user) {
            state.user = user
        },
        [SAVE_TOKEN](state, token) {
            state.token = token
        },
    },
    actions: {
        saveUserInfo({
            commit
        }, user) {
            localStorage.setItem('token_key', user.token)
            commit(SAVE_TOKEN, user.token)
            delete user.token
            commit(SAVE_USER, user)
        },
        async autoLogin({
            commit,
            state
        }) {
            if (state.token) {
                const result = await reqAutoLogin()
                const {
                    code,
                    data
                } = result
                if (code === 0) {
                    commit(SAVE_USER, data)
                } else {
                    console.log('我发自动登录请求了，且失败了');
                }
            }

        },
        logout({
            commit,
        }) {
            localStorage.removeItem('token_key')
            commit(SAVE_TOKEN, '')
            commit(SAVE_USER, {})
        },

    },
    getters: {}
}