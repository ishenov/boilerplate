<template lang="pug">
  el-menu.el-menu-demo(mode='horizontal' background-color='#545c64' text-color='#fff' active-text-color='#ffd04b')
    el-menu-item.logout-button(@click='logoutRequest') Logout
</template>

<script>
import {mapActions} from "vuex";
import {AUTH_LOGOUT} from "../../store/actions/user";

export default {
  name: "Header",
  data() {
    return {};
  },
  methods: {
    ...mapActions('user', {
      logoutRequest: AUTH_LOGOUT
    }),
  }
}
</script>

<style>
.el-menu-demo {
  position: relative;
}
.logout-button {
  float: right!important;
}
</style>
