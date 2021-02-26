import Login from '../pages/Login/Login.vue'
import MSite from '../pages/MSite/MSite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Shop from '../pages/Shop/Shop.vue'
import Goods from '../pages/Shop/Goods.vue'
import Ratings from '../pages/Shop/Ratings.vue'
import Info from '../pages/Shop/Info.vue'
import A from '../pages/test/A.vue'
import B from '../pages/test/B.vue'
import B1 from '../pages/test/B1.vue'
import B2 from '../pages/test/B2.vue'
import Review from '@/pages/Review/Review.vue'
import SlotTest from '@/pages/Review/SlotTest/SlotTest.vue'
import MixinTest from '@/pages/Review/MixinTest/MixinTest.vue'
import ComponentTest from '@/pages/Review/ComponentTest/ComponentTest.vue'
import EventTest from '@/pages/Review/EventTest/EventTest.vue'
import ModelTest from '@/pages/Review/ModelTest/ModelTest.vue'
import ReactiveTest from '@/pages/Review/ReactiveTest/ReactiveTest.vue'
import LifeTest from '@/pages/Review/LifeTest/LifeTest.vue'
export default [{
        path: '/a',
        component: A
    },
    {
        path: '/b',
        component: B,
        children: [{
                path: 'b1',
                component: B1,
            },
            {
                path: 'b2',
                component: B2,
            },
        ],
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        path: '/msite',
        component: MSite,
        meta: {
            showFooterGuide: true
        }
    },
    {
        path: '/order',
        component: Order,
        meta: {
            showFooterGuide: true
        }
    },
    {
        path: '/profile',
        component: Profile,
        meta: {
            showFooterGuide: true
        }
    },
    {
        path: '/search',
        component: Search,
        meta: {
            showFooterGuide: true
        }
    },
    {
        name: 'shop',
        path: '/shop/:id',
        props: true,
        component: Shop,
        children: [{
                path: 'goods',
                component: Goods,
            },
            {
                path: 'ratings',
                component: Ratings,
            },
            {
                path: 'info',
                component: Info,
            },
            {
                path: '',
                component: Goods,
            }

        ],
    },
    {
        path: '/review',
        component: Review,
        children: [{
                path: '/review/slot',
                component: SlotTest
            },
            {
                path: '/review/mixin',
                component: MixinTest
            },
            {
                path: '/review/component',
                component: ComponentTest
            },
            {
                path: '/review/event',
                component: EventTest
            },
            {
                path: '/review/model',
                component: ModelTest
            },
            {
                path: '/review/reactive',
                component: ReactiveTest
            },
            {
                path: '/review/life',
                component: LifeTest
            },
        ]
    },
    {
        path: '/',
        component: MSite,
        meta: {
            showFooterGuide: true
        }

    },
]