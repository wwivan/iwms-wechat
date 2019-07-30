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
import Login from "./views/Login"
import StockInForm from "./views/StockInForm"
import StockOutDetail from "./views/StockOutDetail"
import StockOutItemDetail from "./views/StockOutItemDetail"
import StockOutForm from "./views/StockOutForm"
import Customer from "./views/Customer"


Vue.use(Router);

export default new Router({
  routes: [{
path:"/login",name:'login',component:Login
  },
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
        {path:"/logOut",component:LogOut},
        {path:"/stockIn/form",component:StockInForm},
        {path:"/stock/out/detail",component:StockOutDetail},
        {path:"/stock/out/item/detail",component:StockOutItemDetail},
        {path:"/stock/out/form",component:StockOutForm},
        {path:"/customer",component:Customer},
      ]
    }
  ]
});
