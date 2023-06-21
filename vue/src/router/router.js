import login from '../components/login.vue';
import prime from '../components/prime.vue';
import Master from '../components/Main/Master/Master.vue';
import Msg from '../components/Main/Msg/Msg.vue';
import HomePage from '../components/Main/HomePage/HomePage.vue';

import axios from 'axios';

const routes = [
    { path: '/', component: login },
    {
        path: '/prime/:id',
        component: prime,
        // 路由守卫，如果session检验不正确不允许登录
        beforeEnter: async (to, from) => {
            const key =
                await axios.get("http://localhost:3000/inspect")
                    .catch(err => {
                        console.log(err);
                    })
            if (!sessionStorage.getItem(key.data.name)) {
                router.push('/')
            } else if (!sessionStorage.getItem(key.data.name) ||
                sessionStorage.getItem(key.data.name) !== key.data.value) {
                return false
            }
        },
        children: [
            {
                path: '',
                component: HomePage
            },
            {
                path: 'master',
                component: Master
            },
            {
                path: 'msg',
                component: Msg
            }
        ]
    },
]

export default routes;