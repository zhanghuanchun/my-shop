import instance from './myAxios'

//1、根据经纬度获取位置详情
export const reqAddress = (latitude, longitude) => instance.get(`/position/${latitude},${longitude}`)

//2、获取食品分类列表
export const reqCategorys = () => instance.get('/index_category', {
    params: {
        needToken: true,
    }
})

//3、根据经纬度获取商铺列表
export const reqShopList = (latitude, longitude) => instance.get('/shops', {
    params: {
        latitude,
        longitude,
        needToken: true,
    }
})

// 4、发送短信验证码
export const reqPhoneCode = (phone) => instance.get('/sendcode', {
    params: {
        phone,
    }
})

// 5、手机号验证码登陆
export const reqSmslogin = (phone, code) => instance.post('/login_sms', {
    phone,
    code,
})

// 6、用户名密码登陆
export const reqPwdlogin = (name, pwd, captcha) => instance.post('/login_pwd', {
    name,
    pwd,
    captcha
})

// 7、自动登录
export const reqAutoLogin = () => instance.get('/auto_login')

// 8、mock获取店铺详细信息
export const reqShopGoods = () => instance.get('/goods')

export const reqShopRatings = () => instance.get('/ratings')

export const reqShopInfo = () => instance.get('/info')

export const reqShopById = (id) => instance.get(`/shop/${id}`)