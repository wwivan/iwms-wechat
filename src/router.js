import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import AccountSecurity from "./views/AccountSecurity"
import CheckAccount from "./views/CheckAccount"
import Echart from "./views/Echart"
import ItemSearch from "./views/ItemSearch"
import LogOut from "./views/LogOut.vue"
import StockIn from "./views/StockIn"
import StockOut from "./views/StockOut"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "main",
      component: Main,
      children:[
        {path:"/stockIn",component:StockIn},
        {path:"/stockOut",component:StockOut},
        {path:"/item/search",component:ItemSearch},
        {path:"/check/account",component:CheckAccount},
        {path:"/echart",component:Echart},
        {path:"/account/security",component:AccountSecurity},
        {path:"/logOut",component:LogOut}
      ]
    }
  ]
});
