import axios from 'axios'
import qs from 'qs'
import {
    Indicator,
} from 'mint-ui'
import {
    Toast,
    Dialog
} from 'vant';
import router from '../routers'
import store from '../vuex/store'

const instance = axios.create({
    baseURL: '/api',
    timeout: 7000
})

instance.interceptors.request.use(config => {
    Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
    })
    // json转urlencoding
    let data = config.data
    if (data instanceof Object) config.data = qs.stringify(data)
    const {
        token
    } = store.state.user
    if (token) config.headers['Authorization'] = token
    else {
        if (config.params && config.params.needToken) {
            throw new Error('没有token,请登录')
        }
    }

    return config
})

instance.interceptors.response.use(
    response => {
        Indicator.close()
        return response.data
    },
    error => {
        Indicator.close()
        if (!error.response) {
            if (router.currentRoute.path !== '/login') {
                router.replace('/login')
                Toast.fail(error.message)
            }
        } else {
            let status = error.response.status
            if (status === 401) {
                if (router.currentRoute.path !== '/login') {
                    router.replace('/login')
                    store.dispatch('logout')
                    Toast.fail('token过期,请登录')
                }
            } else if (status === 404) {
                Dialog.alert({
                    title: '提示',
                    message: '访问资源不存在',
                    confirmButtonColor: '#4CD96F',
                    theme: 'round-button',
                })
            } else {
                Dialog.alert({
                    title: '提示',
                    message: error.message,
                    confirmButtonColor: '#4CD96F',
                    theme: 'round-button',
                })
            }
        }
        return new Promise(() => {})
    }
)

export default instance