<template>
  <div class="home">
    <!-- <Navbar v-if="isAuthorized"/> -->
    <LoginForm v-if="!isAuthorized" />
    <template v-else>
      <div class="container">
        <Search />
      </div>
    </template>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm';
import Search from '@/components/Search';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  data: () => ({}),
  components: {
    LoginForm,
    Search
  },
  computed: {
    ...mapGetters('users', ['isAuthorized'])
  }
};
</script>

<style scoped></style>
