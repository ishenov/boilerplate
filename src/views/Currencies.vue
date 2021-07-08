<template lang="pug">
  .data
    el-tabs(v-model="activeName")
      el-tab-pane(label="Bitcoin (BTC) на Сбербанк" name="btcToSber")
      el-tab-pane(label="Bitcoin Cash (BCH) на Сбербанк" name="btcCashToSber")
      el-tab-pane(label="Ethereum (ETH) на Visa/MasterCard RUB" name="ethToVisa")
    el-table(
      :data="getCurrencies[activeName]"
      border
      style="width: 70%"
    )
      el-table-column(
        prop="name"
        sortable
        label="Обменник"
      )
      el-table-column(
        prop="give"
        sortable
        label="Отдаете"
      )
      el-table-column(
        prop="get"
        sortable
        label="Получаете"
      )
      el-table-column(
        prop="reserve"
        sortable
        label="Резерв"
        width="150px"
      )
      el-table-column(
        prop="reviews"
        sortable
        label="Отзывы"
        width="120px"
      )
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {GET_CURRENCIES} from "../store/actions/currencies";

export default {
  name: "Currencies",
  data() {
    return {
      activeName: 'btcToSber'
    };
  },
  computed: {
    ...mapGetters('currencies', ["getCurrencies"])
  },
  mounted() {
      this.getCurrency({})
      this.loadCurrencies()
  },
  methods: {
    ...mapActions('currencies', {
      getCurrency: GET_CURRENCIES
    }),
    loadCurrencies() {
      setInterval(() => {
        this.getCurrency({})
      }, 5000)
    }
  }
}
</script>

<style>
.data {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
</style>
