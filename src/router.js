import {
    createRouter,
    createWebHashHistory
} from 'vue-router';
import Home from './components/Home.vue';
import Form120 from './components/Form120.vue';

const routes = [{
    path: '/',
    name: 'home',
    component: Home,
}, {
    path: '/cntm120',
    name: 'cntm120',
    component: Form120,
}, ];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;