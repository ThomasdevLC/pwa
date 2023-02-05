import { createRouter, createWebHistory } from 'vue-router'
import AppHome from './pages/AppHome.vue'
import AppStat from './pages/AppStat.vue'
import AppPres from './pages/AppPres.vue'

const routerApp = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: AppHome
        },
        {
            path: '/stat',
            name: 'stat',
            component: AppStat
        },
        {
            path: '/pres',
            name: 'pres',
            component: AppPres
        },
    ]
})

export default routerApp
