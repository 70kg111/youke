import {MutationTree} from 'vuex';

const mutations: MutationTree<any> = {
  SET_USER(state: any, user: any) {
    state.user = user;
  },
  SET_ROUTERS(state: any, routers: any) {
    state.routers = routers;
  },
};

export default mutations;