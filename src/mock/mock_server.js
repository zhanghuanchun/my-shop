import data from './data.json'
import Mock from 'mockjs'
import shops from './shops.json'
// 定义mock接口
Mock.mock('/api/goods', {
    code: 0,
    data: data.goods
})
Mock.mock('/api/ratings', {
    code: 0,
    data: data.ratings
})
Mock.mock('/api/info', {
    code: 0,
    data: data.info
})

Mock.mock(/^\/api\/shop\/\d+$/, function (options) {
    const id = options.url.substring(10)
    const shop = shops.find(shop => shop.id === id * 1)
    return ({
        code: 0,
        data: shop || shops[0]
    })
})