import Home from './components/Home.vue'
import Login from './components/Login.vue'
import EventFinder from './components/EventFinder.vue'
import Event from './components/Event.vue'
import Group from './components/EntityPage/Group.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/events', component: EventFinder },
  { path: '/home', redirect: '/login' },
  { path: '/events/:id',
    component: Event,
    props: { default: true }
  },
  { path: '/groups/:id',
    component: Group,
    props: { default: true }
  }
]

export default routes