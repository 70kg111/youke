import {ActionTree} from 'vuex';
import jwt_decode from 'jwt-decode';
import {asyncRouterMap} from '@/router';

const actions: ActionTree<any, any> = {
  async setUser({state, commit}, user: any) {
    const decoded: any = jwt_decode(user);
    commit('SET_USER', decoded);

    const {key} = decoded;
    //返回当前用户权限的路由
    let accessedRouters = filterAsyncRouter(asyncRouterMap, key);
    commit('SET_ROUTERS', accessedRouters);
  }
};

/*
* 递归过滤异步路由表，返回符合用户角色权限的路由表
* @param asyncRouterMap 所有路由表
* @param roles 当前角色
* */

function filterAsyncRouter(asyncRouterMap: Array<any>, roles: string) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles);
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

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

export default actions;