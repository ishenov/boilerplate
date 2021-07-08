<template lang="pug">
  .login
    el-card
      h2 Login
      el-form.login-form(:model='model' :rules='rules' ref='form' @submit.native.prevent='login')
        el-form-item(prop='email')
          el-input(v-model='model.email' placeholder='Email' prefix-icon='fas fa-user')
        el-form-item(prop='password')
          el-input(v-model='model.password' placeholder='Password' type='password' prefix-icon='fas fa-lock')
        el-form-item
          el-button.login-button(type='primary' native-type='submit' block='')
            | Login

</template>

<script>
import {mapActions} from "vuex";
import {AUTH_LOGIN} from "../store/actions/user";

export default {
  name: "Login",
  data() {
    return {
      model: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          {
            required: true,
            message: "Email is required",
            trigger: "blur"
          },
          {
            min: 4,
            message: "Email length should be at least 5 characters",
            trigger: "blur"
          }
        ],
        password: [
          {required: true, message: "Password is required", trigger: "blur"},
        ]
      }
    };
  },
  methods: {
    ...mapActions('user', {
      loginRequest: AUTH_LOGIN
    }),
    async login() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }

      await this.loginRequest({data: this.model});
    }
  }
};
</script>

<style scoped>
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}

.login-form {
  width: 290px;
}
</style>
