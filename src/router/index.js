import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import EventFinder from '../components/EventFinder.vue'
import Event from '../components/EntityPage/Event.vue'
import EventForm from '../components/FormPages/EventForm.vue'
import Group from '../components/EntityPage/Group.vue'
import GroupFinder from '../components/GroupFinder.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/events', component: EventFinder },
  { path: '/home', component: Home },
  { path: '/events/:id',
    component: Event,
    props: { default: true }
  },
  { path: '/groups/:id',
    component: Group,
    props: { default: true }
  },
  { path: '/groups', component: GroupFinder },
  { path: '/events/edit/:id', component: EventForm }
]


Vue.use(VueRouter)

Vue.config.productionTip = false

export default new VueRouter({ routes })