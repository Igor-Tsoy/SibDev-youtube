<template>
  <div class="login-form-container">
    <el-card class="box-card login-form">
      <div slot="header" class="clearfix">
        <img class="logo" src="../assets/sibdev-logo.png" alt="Логотип" />
        <span>Вход</span>
      </div>
      <el-form
        ref="form"
        :model="loginData"
        label-width="120px"
        label-position="top"
      >
        <el-form-item class="form-label" label="Логин">
          <el-input v-model="loginData.username"></el-input>
        </el-form-item>
        <el-form-item class="form-label" label="Пароль">
          <el-input
            v-model="loginData.password"
            :type="passwordType"
          ></el-input>
          <div
            @click="showPassword"
            class="show-password"
            :class="{ hide: passwordType !== 'password' }"
          ></div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="
              logInHandler({
                username: loginData.username,
                password: loginData.password
              })
            "
            class="login-btn"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginForm',
  data: () => ({
    loginData: {
      username: '',
      password: ''
    },
    passwordType: 'password'
  }),
  methods: {
    showPassword() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text';
      } else {
        this.passwordType = 'password';
      }
    },
    logInHandler(userDaata) {
      this.userLogIn(userDaata);
      this.updateUser();
    },
    ...mapActions('users', ['userLogIn']),
    ...mapActions('youtube', ['updateUser'])
  }
};
</script>

<style scoped>
.login-form {
  width: 520px;
  margin: auto;
}

.login-form span {
  font-size: 18px;
  font-weight: 500;
}

.form-label {
  text-align: left;
  width: 70%;
  margin: auto;
}

.login-form-container {
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
}

.logo {
  display: block;
  margin: auto;
  margin-bottom: 35px;
}

.show-password {
  position: absolute;
  top: 8px;
  right: 10px;
  width: 24px;
  height: 24px;
  background-image: url('../assets/eye-off.png');
}

.show-password.hide {
  background-image: url('../assets/eye.png');
}

.login-btn {
  margin-top: 25px;
}
</style>
