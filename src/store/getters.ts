//获取用户状态

import {GetterTree} from 'vuex';

const getters: GetterTree<any, any> = {
  user(state: any) {
    return state.user;
  },
  routers(state: any) {
    return state.routers;
  },
};

export default getters;