import users from '../usersDB/users.json';
import mutations from '../mutations';

const { AUTHORIZED } = mutations;

const usersStore = {
  namespaced: true,
  state: {
    users: users,
    isAuthorized: Boolean(localStorage.getItem('token'))
  },
  getters: {
    usersList: ({ users }) => users,
    isAuthorized: ({ isAuthorized }) => isAuthorized
  },
  mutations: {
    [AUTHORIZED](state) {
      state.isAuthorized = Boolean(localStorage.getItem('token'));
    }
  },
  actions: {
    userLogIn({ commit, getters }, formData) {
      const { usersList } = getters;
      usersList.forEach(el => {
        if (
          el.username === formData.username &&
          el.password === formData.password
        ) {
          localStorage.setItem('token', el.token);
          localStorage.setItem('id', el._id);
        }
        commit(AUTHORIZED);
      });
    },
    userLogOut({ commit }) {
      localStorage.removeItem('token');
      commit(AUTHORIZED);
    }
  }
};

export default usersStore;
