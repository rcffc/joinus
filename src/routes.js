import Home from './components/Home.vue';
import Login from './components/Login.vue';
import EventFinder from './components/EventFinder.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/events', component: EventFinder }
]

export default routes;