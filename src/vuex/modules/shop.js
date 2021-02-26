import Vue from 'vue'
import {
    // SAVE_GOODS,
    // SAVE_RATINGS,
    SAVE_SHOP,
    ADD_FOOD_COUNT,
    REDUCE_FOOD_COUNT,
    CLEAR_FOOD_CART,
} from '../mutation_types'
import {
    // reqShopGoods,
    // reqShopRatings,
    // reqShopInfo,
    reqShopById
} from '../../api'
import {
    getShopCartList
} from '../../utils'
export default {
    state: () => ({
        id: '',
        goods: [],
        ratings: [],
        info: {},
        shopcartlist: [],
    }),
    mutations: {
        // [SAVE_GOODS](state, goods) {
        //     state.goods = goods
        // },
        // [SAVE_RATINGS](state, ratings) {
        //     state.ratings = ratings
        // },
        // [SAVE_INFO](state, info) {
        //     state.info = info
        // },
        [SAVE_SHOP](state, {
            id = '',
            goods = [],
            ratings = [],
            info = {},
            shopcartlist = [],
        }) {
            state.id = id
            state.goods = goods
            state.ratings = ratings
            state.info = info
            state.shopcartlist = shopcartlist
        },
        [ADD_FOOD_COUNT](state, food) {
            if (food.count) {
                food.count++
            } else {
                Vue.set(food, 'count', 1)
                state.shopcartlist.push(food)
            }
        },
        [REDUCE_FOOD_COUNT](state, food) {
            if (food.count > 0) food.count--
            if (food.count === 0) state.shopcartlist.splice(state.shopcartlist.indexOf(food), 1)
        },
        [CLEAR_FOOD_CART](state) {
            state.shopcartlist.forEach(food => {
                food.count = 0
            })
            state.shopcartlist = []
        },
    },
    actions: {
        // async getShopGoods({
        //     commit,
        // }) {
        //     let result = await reqShopGoods()
        //     const {
        //         code,
        //         data
        //     } = result
        //     if (code === 0) commit(SAVE_GOODS, data)
        // },
        // async getShopRatings({
        //     commit,
        // }) {
        //     let result = await reqShopRatings()
        //     const {
        //         code,
        //         data
        //     } = result
        //     if (code === 0) commit(SAVE_RATINGS, data)
        // },
        // async getShopInfo({
        //     commit,
        // }) {
        //     let result = await reqShopInfo()
        //     const {
        //         code,
        //         data
        //     } = result
        //     if (code === 0) commit(SAVE_INFO, data)
        // },
        async getShop({
            commit,
            state
        }, id) {
            if (id * 1 === state.id) {
                return
            }
            if (state.id) commit(SAVE_SHOP, {})
            let result = await reqShopById(id)
            const {
                code,
                data
            } = result
            if (code === 0) {
                let shopcartlist = getShopCartList(id, data.goods)
                commit(SAVE_SHOP, {
                    ...data,
                    shopcartlist
                })
            }
        },
        foodCountControl({
            commit
        }, {
            isAdd,
            food
        }) {
            if (isAdd) {
                commit(ADD_FOOD_COUNT, food)
            } else {
                commit(REDUCE_FOOD_COUNT, food)
            }
        }
    },
    getters: {
        totalNumber(state) {
            return state.shopcartlist.reduce((pre, food) => pre + food.count, 0)
        },
        totalMoney(state) {
            return state.shopcartlist.reduce((pre, food) => pre + food.count * food.price, 0)
        },
    }
}