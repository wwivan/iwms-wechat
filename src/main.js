import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vant from "vant";
import "./assets/scss/style.scss";
import "vant/lib/index.css";
import "./assets/iconfont/iconfont.css";
import "./assets/iconfont-tab/iconfont.css";
import "./assets/iconfont-btn/iconfont.css";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import Card from "./component/Card.vue";
import ListCard from "./component/ListCard.vue";

Vue.use(Vant);
Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper);
Vue.component("m-card", Card);
Vue.component("m-list-card", ListCard);
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
