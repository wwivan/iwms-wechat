import Vue from "vue";
import Router from "vue-router";
import Main from "./views/Main.vue";
import Home from "./views/Home.vue";
import AccountSecurity from "./views/AccountSecurity";
import CheckAccount from "./views/CheckAccount";
import Echart from "./views/Echart";
import Materiel from "./views/Materiel";
import MaterielSearch from "./views/MaterielSearch";
import LogOut from "./views/LogOut.vue";
import StockIn from "./views/StockIn";
import StockInDetail from "./views/StockInDetail";
import StockOut from "./views/StockOut";
import Login from "./views/Login";
import Authorize from "./views/Authorize";
import StockInForm from "./views/StockInForm";
import ReserveOrderForm from "./views/ReserveOrderForm";
import ReserveOrderDetail from "./views/ReserveOrderDetail";
import ReserveOrderSearch from "./views/ReserveOrderSearch";
import StockInSearch from "./views/StockInSearch";
import StockInItemForm from "./views/StockInItemForm";
import StockOutDetail from "./views/StockOutDetail";
import StockOutItemDetail from "./views/StockOutItemDetail";
import StockOutForm from "./views/StockOutForm";
import StockOutSearch from "./views/StockOutSearch";
import Customer from "./views/Customer";
import Supplier from "./views/Supplier";
import SupplierSearch from "./views/SupplierSearch";
import StockTakeForm from "./views/StockTakeForm";
import StockTakeSearch from "./views/StockTakeSearch";
import StockTakeDetail from "./views/StockTakeDetail";
import ReserveOrderDetailForm from "./views/ReserveOrderDetailForm";
import ReserveOrderDetailSearch from "./views/ReserveOrderDetailSearch";
import SearchPage from "./views/SearchPage";
import WarehouseManagement from "./views/WarehouseManagement";
import SaleAndPurchase from "./views/SaleAndPurchase";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/authorize",
      name: "authorize",
      component: Authorize
    },
    {
      path: "/",
      name: "main",
      component: Main,
      redirect: "/home",
      children: [
        { path: "/home", component: Home },
        { path: "/stockIn", component: StockIn },
        { path: "/stockOut", component: StockOut },
        { path: "/materiel", component: Materiel },
        { path: "/materiel/search", component: MaterielSearch },
        { path: "/check/account", component: CheckAccount },
        { path: "/echart", component: Echart },
        { path: "/search/page", component: SearchPage },
        { path: "/warehouse/management", component: WarehouseManagement },
        { path: "/sale/and/purchase", component: SaleAndPurchase },
        { path: "/account/security", component: AccountSecurity },
        { path: "/logOut", component: LogOut },
        { path: "/stockIn/detail", component: StockInDetail },
        { path: "/stockIn/form", component: StockInForm },
        { path: "/reserve/order/form", component: ReserveOrderForm },
        { path: "/reserve/order/detail", component: ReserveOrderDetail },
        { path: "/stockIn/search", component: StockInSearch },
        { path: "/reserve/order/search", component: ReserveOrderSearch },
        {
          path: "/reserve/order/detail/form",
          component: ReserveOrderDetailForm
        },
        {
          path: "/reserve/order/detail/search",
          component: ReserveOrderDetailSearch
        },
        { path: "/stockIn/item/form", component: StockInItemForm },
        { path: "/stock/out/detail", component: StockOutDetail },
        { path: "/stock/out/item/detail", component: StockOutItemDetail },
        { path: "/stock/out/form", component: StockOutForm },
        { path: "/stock/out/search", component: StockOutSearch },
        { path: "/customer", component: Customer },
        { path: "/supplier", component: Supplier },
        { path: "/supplier/search", component: SupplierSearch },
        { path: "/stock/take/form", component: StockTakeForm },
        { path: "/stock/take/search", component: StockTakeSearch },
        { path: "/stock/take/detail", component: StockTakeDetail }
      ]
    }
  ]
});
