<template lang="pug">
  .register
    el-card
      h2 Register
      el-form.register-form(:model='model' :rules='rules' ref='form' @submit.native.prevent='register')
        el-form-item(prop='email')
          el-input(v-model='model.email' placeholder='Email' prefix-icon='fas fa-user')
        el-form-item(prop='password')
          el-input(v-model='model.password' placeholder='Password' type='password' prefix-icon='fas fa-lock')
        el-form-item(prop='confirm-password')
          el-input(v-model='model.confirmPassword' placeholder='Confirm password' type='password' prefix-icon='fas fa-lock')
        el-form-item
          el-button.register-button(type='primary' native-type='submit' block='')
            | Register

</template>

<script>
import {mapActions} from "vuex";
import {REGISTER_USER} from "../store/actions/user";

export default {
  name: "Register",
  data() {
    return {
      model: {
        email: "",
        password: "",
        confirmPassword: "",
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
        ],
        'confirm-password': [
          {required: true, validator: this.confirmPassRule, trigger: "blur"},
        ],
      }
    };
  },
  methods: {
    ...mapActions('user', {
      registerRequest: REGISTER_USER
    }),
    confirmPassRule(rule, value, callback) {
      if (this.model.confirmPassword !== this.model.password) {
        callback(new Error ('Пароли не совпадают'));
      } else {
        callback()
      }
    },
    async register() {
      let valid = await this.$refs.form.validate();
      if (!valid) return;

      await this.registerRequest({data: this.model});
    }
  }
};
</script>

<style scoped>
.register {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register-button {
  width: 100%;
  margin-top: 40px;
}

.register-form {
  width: 290px;
}
</style>
