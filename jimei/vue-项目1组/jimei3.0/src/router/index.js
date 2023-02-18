import Vue from 'vue'
import VueRouter from 'vue-router'
import Header from '../views/Header.vue'
import Footer from '../views/Footer.vue'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Search from '../views/Search.vue'
import Detail from '../views/Detail.vue'
import ShoppingCart from '../views/ShoppingCart.vue'
import Settlement from '../views/Settlement.vue'
import Order from '../views/Order.vue'
import Evaluate from '../views/Evaluate.vue'
import Person from '../views/Person.vue'
import PersonData from '../views/PersonData.vue'
import PersonAddress from '../views/PersonAddress.vue'
import PersonOrder from '../views/PersonOrder.vue'
import PersonRelease from '../views/PersonRelease.vue'
import PersonWant from '../views/PersonWant.vue'
import PersonCollect from '../views/PersonCollect.vue'
import ReleaseProduct from '../views/ReleaseProduct.vue'
import ReleaseWant from '../views/ReleaseWant.vue'
import Want from '../views/Want.vue'
import About from '../views/About.vue'
import BuyingProcess from '../views/BuyingProcess.vue'
import QualitySecond from '../views/QualitySecond.vue'


Vue.use(VueRouter)

const routes = [
    { path: '/', components: { default: Home, 'header': Header, 'footer': Footer } },
    { path: '/login', components: { default: Login, 'header': null, 'footer': null } },
    { path: '/register', components: { default: Register, 'header': null, 'footer': null } },
    { path: '/search', components: { default: Search, 'header': Header, 'footer': Footer } },
    { path: '/detail', components: { default: Detail, 'header': Header, 'footer': Footer } },
    { path: '/shoppingCart', components: { default: ShoppingCart, 'header': Header, 'footer': Footer } },
    { path: '/settlement', components: { default: Settlement, 'header': Header, 'footer': Footer } },
    { path: '/order', components: { default: Order, 'header': Header, 'footer': Footer } },
    { path: '/evaluate', components: { default: Evaluate, 'header': Header, 'footer': Footer } },
    {
        path: '/person',
        components: {
            default: Person,
            'header': Header,
            'footer': Footer,
        },
        children: [
            { path: '', component: PersonData },
            { path: 'personAddress', component: PersonAddress },
            { path: 'personCollect', component: PersonCollect },
            { path: 'personOrder', component: PersonOrder },
            { path: 'personRelease', component: PersonRelease },
            { path: 'personWant', component: PersonWant },

        ]
    },
    { path: '/releaseProduct', components: { default: ReleaseProduct, 'header': Header, 'footer': Footer } },
    { path: '/releaseWant', components: { default: ReleaseWant, 'header': Header, 'footer': Footer } },
    { path: '/want', components: { default: Want, 'header': Header, 'footer': Footer } },
    { path: '/about', components: { default: About, 'header': Header, 'footer': Footer } },
    { path: '/buyingProcess', components: { default: BuyingProcess, 'header': Header, 'footer': Footer } },
    { path: '/qualitySecond', components: { default: QualitySecond, 'header': Header, 'footer': Footer } },
    // { path: '*', redirect: '/' },
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

// router.beforeEach((to, from, next) => {
//     console.log('to:', to);
//     console.log('from:', from);
//     next();
// })
export default router