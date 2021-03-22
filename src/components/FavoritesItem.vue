<template>
  <div class="favorites-item">
    <div class="text-wrapper" @click="searchFavorites">
      <p>
        {{ favoritesItem.title }}
      </p>
    </div>
    <div class="change-del-interface">
      <a class="change" @click="showRequestForm">Изменить</a>
      <SaveRequestForm
        v-if="requestForm"
        :request="favoritesItem.request"
        :title="favoritesItem.title"
        :order="favoritesItem.order"
        :results="favoritesItem.results"
        :titleDisabled="false"
        :editingObj="favoritesItem"
        @OnCloseForm="hideRequestForm"
      />
      <a class="del" @click="removeFavorites(favoritesItem)">Удалить</a>
    </div>
  </div>
</template>

<script>
import SaveRequestForm from './SaveRequestForm';
import { mapActions } from 'vuex';

export default {
  name: 'FavoritesItem',
  props: {
    favoritesItem: {
      type: Object
    }
  },
  components: {
    SaveRequestForm
  },
  data: () => ({
    requestForm: false
  }),
  methods: {
    showRequestForm() {
      if (!this.requestForm) {
        this.requestForm = true;
      }
    },
    hideRequestForm() {
      if (this.requestForm) {
        this.requestForm = false;
      }
    },
    searchFavorites() {
      const request = {
        search: this.favoritesItem.request,
        maxResults: this.favoritesItem.results,
        order: this.favoritesItem.order || 'relevance'
      };
      this.fetchVideos(request);
      this.$router.push('/');
    },
    ...mapActions('youtube', ['fetchVideos', 'removeFavorites'])
  }
};
</script>

<style scoped>
.favorites-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border: 1px solid #fafafa;
  padding: 0 20px;
  min-height: 50px;
}

.change-del-interface {
  margin-left: auto;
  display: block;
}

.change {
  cursor: pointer;
  margin-right: 25px;
  color: #fff;
}

.del {
  cursor: pointer;
  color: #fff;
}

.favorites-item:hover {
  background-color: #f1f1f1;
}

.favorites-item:hover .del {
  color: #ff0000;
}

.favorites-item:hover .change {
  color: #1390e5;
}

.text-wrapper {
  min-width: 70%;
  text-align: left;
  line-height: 50px;
  cursor: pointer;
}
</style>
