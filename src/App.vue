<template lang="pug">
  div
    Header(v-if="isAuthenticated")
    router-view
</template>

<script>

import Header from "./components/Layout/Header";
import {mapGetters} from "vuex";
export default {
  name: 'App',
  components: {Header},
  computed: {
    ...mapGetters('user', [
      'isAuthenticated',
    ]),
  }
}
</script>

<style>
*, *:before, *:after {
  box-sizing: border-box;
  font-family: Arial,sans-serif;
}
body {
  margin: 0;
  padding: 0;
}
</style>
