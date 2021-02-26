import Vue from 'vue'

export function saveShopCartList(id, cartlist) {
    let cartlistobj = {}
    cartlist.forEach(food => {
        cartlistobj[food.id] = food.count
    })
    console.log(cartlistobj);
    sessionStorage.setItem(id + '_key', JSON.stringify(cartlistobj))
}

export function getShopCartList(id, goods) {
    let cartlistobj = {}
    let shopcartlist = []
    cartlistobj =  JSON.parse(sessionStorage.getItem(id + '_key')) || {}
    goods.forEach(good => {
        good.foods.forEach(food => {
            if (cartlistobj[food.id]) {
                Vue.set(food, 'count', cartlistobj[food.id])
                shopcartlist.push(food)
            }
        })
    })
    return shopcartlist
}