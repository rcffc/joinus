import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import EventFinder from '../components/EventFinder.vue'
import Event from '../components/Event.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/events', component: EventFinder },
    { path: '/home', redirect: '/login' },
    { path: '/events/:id',
        component: Event,
        props: { default: true }
    }
]


Vue.use(VueRouter)

Vue.config.productionTip = false

export default new VueRouter({ routes });