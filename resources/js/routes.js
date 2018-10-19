import Home from './components/Home.vue';
import Login from './components/auth/Login';
import CustomerMain from './components/Customer/Main.vue';
import CustomerList from './components/Customer/List.vue';
import NewCustomer from './components/Customer/New.vue';
import Customer from './components/Customer/View.vue';

const routes = [{
        path: '/',
        component: Home,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: Login,
    },
    {
        path: '/customers',
        component: CustomerMain,
        meta: {
            requiresAuth: true
        },
        children: [{
                path: '/',
                component: CustomerList
            },
            {
                path: 'new',
                component: NewCustomer
            },
            {
                path: ':id',
                component: Customer
            }
        ]
    }
];

export default routes;
