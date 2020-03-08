import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/views/Layout/index.vue';
import Login from '@/views/Login/Login.vue';
import Password from '@/views/Login/Password.vue';
import TableData from '@/views/DataManage/TableData.vue';
import jwt_decode from 'jwt-decode';

Vue.use(VueRouter);

/*
* hidden:true   如果为true则在左侧菜单栏显示，否则不展示
*
* name:'router-name'    路由名称，必写
*
* meta:{
*   title:'title',      对应路犹在左侧菜单栏的标题名称
*   icon:'icon-class'   对应路犹在左侧菜单栏的图标样式，使用fontawesome图标库
* }
* */

export const asyncRouterMap = [
  //首页
  {
    path: '/',
    name: 'dashboard',
    component: Layout,
    hidden: true,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          title: '首页',
          icon: 'fa fa-home'
        },
        component: () => import('@/views/Home.vue')
      }
    ]
  },
  //数据管理
  {

    path: '/dataManage',
    name: 'dataManage',
    component: Layout,
    hidden: true,
    meta: {
      title: '数据管理',
      icon: 'fa fa-database'
    },
    redirect: '/tableData',
    children: [
      {
        path: '/tableData',
        name: 'tableData',
        meta: {title: '表格管理', icon: 'fa fa-table'},
        component: () => import('@/views/DataManage/TableData.vue')
      },
      {
        path: '/chartsData',
        name: 'chartsData',
        meta: {title: '图表管理', icon: 'fa fa-bar-chart'},
        component: () => import('@/views/DataManage/ChartsData.vue')
      },
      {
        path: '/formData',
        name: 'formData',
        meta: {
          title: '表单管理',
          icon: 'fa fa-file-text-o',
          roles: ['admin', 'editor']
        },
        component: () => import('@/views/DataManage/FormData.vue')
      }
    ]
  },
  //账户管理
  {
    path: '/userManage',
    name: 'userManage',
    component: Layout,
    hidden: true,
    redirect: '/accountData',
    children: [
      {
        path: '/accountData',
        name: 'accountData',
        meta: {
          title: '账户管理',
          icon: 'fa fa-user-plus',
          roles: ['admin']
        },
        component: () => import('@/views/UserManage/AccountData.vue')
      }
    ]
  },
  //个人中心
  {
    path: '/user',
    component: Layout,
    hidden: false,
    redirect: '/userInfo',
    children: [
      {
        path: '/userInfo',
        name: 'userInfo',
        meta: {
          title: '个人中心',
        },
        component: () => import('@/views/UserManage/UserInfo.vue')
      }
    ]
  },
  //404页面
  {
    path: '/404',
    name: '404',
    hidden: false,
    meta: {
      title: '404',
    },
    component: () => import('@/views/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  },
  //登录 找回密码
  {
    path: '/login',
    name: 'login',
    component: Login,
    hidden: false,
    meta: {
      title: '系统登录',
    },
  },
  {
    path: '/password',
    name: 'password',
    component: Password,
    hidden: false,
    meta: {
      title: '找回密码',
    },
  }
];


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: asyncRouterMap
});

router.beforeEach((to: any, from: any, next: any) => {
  const isLogin = localStorage.tsToken ? true : false;
  if (to.path == '/login' || to.path == '/password') {
    next();
  } else {
    if (isLogin) {
      const decoded: any = jwt_decode(localStorage.tsToken);
      const {key} = decoded;
      //权限判断，不能地址栏输入访问
      if (hasPermission(key, to)) {
        next();
      } else {
        next('/404');
      }
    } else {
      next('/login');
    }
  }
});

/*
* 判断是否有权限
* @param roles 当前角色
* @param route 当前路由对象
* */
function hasPermission(roles: string, route: any) {
  if (route.meta && route.meta.roles) {
    //如果meta.role与当前传进去的角色的key值对上了，那么就有权限查看所有路由，否则无权限
    return route.meta.roles.some((role: string) => role.indexOf(roles) >= 0);
  } else {
    return true;
  }
}

export default router;
