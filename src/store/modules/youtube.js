import mutations from '../mutations';
import axios from '../../plugins/axios';

const { YOUTUBE, CURRENT_USER, YOUTUBE_RESET } = mutations;

const youtubeStore = {
  namespaced: true,
  state: {
    youtubeVideos: {},
    favoritesList: JSON.parse(localStorage.getItem('favorites')) || {},
    currentUser: localStorage.getItem('id')
  },
  getters: {
    youtubeVideos: ({ youtubeVideos }) => youtubeVideos,
    favoritesList: ({ favoritesList }) => favoritesList,
    currentUser: ({ currentUser }) => currentUser
  },
  mutations: {
    [YOUTUBE](state, value) {
      state.youtubeVideos = value;
    },
    [CURRENT_USER](state) {
      state.currentUser = localStorage.getItem('id');
    },
    [YOUTUBE_RESET](state) {
      state.youtubeVideos = {};
    }
  },
  actions: {
    fetchVideos({ commit }, request) {
      axios
        .get(
          `/?q=${request.search}&maxResults=${request.maxResults}&order=${request.order}`
        )
        .then(response => {
          const youtubeVideos = {
            search: request.search,
            content: response.data.items
          };
          commit(YOUTUBE, youtubeVideos);
        });
    },
    appendFavorites({ dispatch, getters }, request) {
      dispatch('updateUser');
      const { favoritesList, currentUser } = getters;
      if (!favoritesList[currentUser]) {
        favoritesList[currentUser] = [];
      }
      const editIndex = favoritesList[currentUser].indexOf(request.edit);
      delete request.edit;
      if (editIndex > -1) {
        favoritesList[currentUser].splice(editIndex, 1, request);
      } else {
        favoritesList[currentUser].push(request);
      }
      localStorage.setItem('favorites', JSON.stringify(favoritesList));
    },
    removeFavorites({ dispatch, getters }, item) {
      dispatch('updateUser');
      const { favoritesList, currentUser } = getters;
      const removeIndex = favoritesList[currentUser].indexOf(item);
      favoritesList[currentUser].splice(removeIndex, 1);
      localStorage.setItem('favorites', JSON.stringify(favoritesList));
    },
    updateUser({ commit }) {
      commit(CURRENT_USER);
    },
    resetVideos({ commit }) {
      commit(YOUTUBE_RESET);
    }
  }
};

export default youtubeStore;
