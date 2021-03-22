<template>
  <div class="favorites">
    <div class="container">
      <h2>Избранное</h2>
      <FavoritesItem
        v-for="(item, index) in favoritesList[currentUser]"
        :favoritesItem="item"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import FavoritesItem from '../components/FavoritesItem';

export default {
  name: 'Favorites',
  components: {
    FavoritesItem
  },
  computed: {
    ...mapGetters('youtube', ['favoritesList', 'currentUser'])
  }
};
</script>

<style scoped>
h2 {
  font-size: 28px;
  margin: 40px 0;
  text-align: left;
}
</style>
