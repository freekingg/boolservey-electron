const MainRoutes = {
    path: '/main',
    meta: {
        requiresAuth: true
    },
    redirect: '/main',
    component: () => import('@/layouts/full/FullLayout.vue'),
    children: [
        // {
        //     name: 'dashboard',
        //     path: '/dashboard1',
        //     component: () => import('@/views/dashboard/dashboard1.vue'),
        // },
        {
            name: 'dashboard',
            path: '/dashboard',
            component: () => import('@/views/dashboard/dashboard2.vue'),
        },
        {
            name: 'Earn',
            path: '/pages/earn',
            component: () => import('@/views/pages/earn/index.vue')
        },
        {
            name: 'Record',
            path: '/pages/record',
            component: () => import('@/views/pages/record/index.vue')
        },
        {
            name: 'Posts',
            path: '/apps/posts',
            component: () => import('@/views/apps/blog/Posts.vue')
        },
        {
            name: 'Detail',
            path: '/posts/:id',
            component: () => import('@/views/apps/blog/Detail.vue')
        },
        {
            name: 'Account Setting',
            path: '/pages/account-settings',
            component: () => import('@/views/pages/account-settings/AccountSettings.vue')
        },

        {
            name: 'FAQ',
            path: '/pages/faq',
            component: () => import('@/views/pages/faq/Faq.vue')
        },
    ]
};

export default MainRoutes;
