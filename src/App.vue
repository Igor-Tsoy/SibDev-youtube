<template>
  <div id="app">
    <Navbar v-if="isAuthorized" />
    <router-view />
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import { mapGetters } from 'vuex';

export default {
  components: {
    Navbar
  },
  computed: {
    ...mapGetters('users', ['isAuthorized'])
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Roboto', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container {
  width: 1040px !important;
  margin: 0 auto;
}

a {
  text-decoration: none;
}

body {
  background-color: #fafafa;
  padding-bottom: 40px;
}
</style>
