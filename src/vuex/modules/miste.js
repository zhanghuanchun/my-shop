import {
    latitude,
    longitude
} from '../../config'
import {
    SAVE_ADDRESS,
    SAVE_CATEGORYS,
    SAVE_SHOPLIST,
} from '../mutation_types'
import {
    reqAddress,
    reqCategorys,
    reqShopList,
} from '../../api'
export default {
    state: () => ({
        latitude, // 纬度
        longitude, // 经度
        address: {}, // 地址信息对象
        categorys: [], // 分类数组
        shops: [], //商家数组
    }),
    mutations: {
        [SAVE_ADDRESS](state, address) {
            state.address = address
        },
        [SAVE_CATEGORYS](state, categorys) {
            state.categorys = categorys
        },
        [SAVE_SHOPLIST](state, shops) {
            state.shops = shops
        },
    },
    actions: {
        async getAddress({
            commit,
            state
        }) {
            const {
                latitude,
                longitude
            } = state
            let result = await reqAddress(latitude, longitude)
            const {
                code,
                data
            } = result
            if (code === 0) commit(SAVE_ADDRESS, data)
        },
        async getCategorys({
            commit
        }) {
            let result = await reqCategorys()
            const {
                code,
                data
            } = result
            if (code === 0) commit(SAVE_CATEGORYS, data)
        },
        async getShopList({
            commit,
            state
        }) {
            const {
                latitude,
                longitude
            } = state
            let result = await reqShopList(latitude, longitude)
            const {
                code,
                data
            } = result
            if (code === 0) commit(SAVE_SHOPLIST, data)
        }

    },
    getters: {}
}