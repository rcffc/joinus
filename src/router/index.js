import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import EventFinder from '../components/EventFinder.vue'
import Event from '../components/EntityPage/Event.vue'
import Group from '../components/EntityPage/Group.vue'
import GroupFinder from '../components/GroupFinder.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/welcome', component: Welcome},
  { path: '/login', component: Login },
  { path: '/register', component: Register},
  { path: '/events', component: EventFinder },
  { path: '/home', redirect: '/welcome' },
  { path: '/events/:id',
    component: Event,
    props: { default: true }
  },
  { path: '/groups/:id',
    component: Group,
    props: { default: true }
  },
  { path: '/groups', component: GroupFinder },
]


Vue.use(VueRouter)

Vue.config.productionTip = false

export default new VueRouter({ routes })