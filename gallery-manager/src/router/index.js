import vue from 'vue';
import Router from 'vue-router';

import Index from '@/views/Index';

// import Login from '@/views/Login';

import EntryView from '@/views/EntryView';

vue.use(Router);

const routes = [
  {
    path: '/entryView',
    name: 'entryView',
    notvisible: true,
    component: EntryView,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
  },
  {
    path: '/',
    component: Index,
    meta: { title: '首页' },
    redirect: '/level/list',
    children: [
      /**
       *  icon: '菜单图标',
       *  path: '菜单路由',
       *  name: '组件名',
       *  meta: { title: '闯关测试', keepAlive: true, permission: [ 'table' ] }
       *  children: [子菜单配置]
       * */

      {
        // icon: 'lock',

        path: '/level/list',
        name: 'levelList',

        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.

        component: () => import('@/views/levelTest/LevelList'),
        meta: { title: '测试列表', headerName: '闯关测试', keepAlive: true },
      },
     
      {
        path: '/meeting/editForm/:mode',
        name: 'meetingForm',
        component: () => import('@/views/meetingManage/editForm'),
        meta: { title: '会议详情', keepAlive: true },
      },
      
      {
        path: '/meeting/videoList/:id',
        name: 'videoList',
        component: () => import('@/views/meetingManage/videoList'),
        meta: { title: '会议视频列表', keepAlive: true },
      },
      {
        path: '/meetingManage',
        name: 'meetingManage',
        component: () => import('@/views/meetingManage/meetingTable'),
        meta: { title: '会议管理', keepAlive: true },
      },
    ],
  },
];

const router = new Router({
  mode: 'history',
  base: '/',
  routes,
});

export default router;
