import Vue from 'vue'
import VueRouter from 'vue-router';
import routes from './routes'
import store from '../vuex/store'
Vue.use(VueRouter);

const routersArr = ['/a', '/b']
const router = new VueRouter({
    mode: 'history',
    routes,
});
router.beforeEach((to, from, next) => {

    if (routersArr.indexOf(to.path) !== -1) {
        if (!store.state.user.token) {
            next({
                name: 'login'
            })
        }else next()
    } else next()
})
export default router