import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: () => import("../views/DashboardView.vue"),
    },
    {
        path: '/gcp-resources',
        name: 'gcp-resources',
        component: () => import("../views/GcpResourcesView.vue"),
    },
    {
        path: '/aws-resources',
        name: 'aws-resources',
        component: () => import("../views/AwsResourcesView.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;