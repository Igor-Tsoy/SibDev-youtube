<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="#fff"
    text-color="#1390E5"
  >
    <el-container class="container">
      <router-link to="/"
        ><el-menu-item index="1">Поиск</el-menu-item></router-link
      >
      <router-link to="/favorites"
        ><el-menu-item index="2">Избранное</el-menu-item></router-link
      >
      <el-menu-item index="2" class="log-out" @click="logOutHandler"
        >Выйти</el-menu-item
      >
    </el-container>
  </el-menu>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Navbar',
  data: () => ({
    router: true
  }),
  methods: {
    logOutHandler() {
      this.userLogOut();
      this.resetVideos();
      if (this.$route.path !== '/') {
        this.$router.push('/');
      }
    },
    ...mapActions('users', ['userLogOut']),
    ...mapActions('youtube', ['resetVideos'])
  }
};
</script>

<style scoped>
.router-link-active {
  text-decoration: none;
}

.router-link-exact-active {
  border-bottom: 2px solid #1390e5;
}

.log-out {
  margin-left: auto;
}
</style>
