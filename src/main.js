import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant"
import "./assets/scss/style.scss";
import 'vant/lib/index.css';
Vue.use(Vant)
Vue.config.productionTip = false;


import {
  formatStockInStatus,
  formatFen2Yuan,
  formatNextStockInStatus
} from "./util/util.js";

Vue.filter("formatStockInStatus", formatStockInStatus);
Vue.filter("formatFen2Yuan", formatFen2Yuan);
Vue.filter("formatNextStockInStatus", formatNextStockInStatus);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");