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
import StockIn from "./views/WarehouseManagement/StockIn";
import StockInDetail from "./views/WarehouseManagement/StockInDetail";
import StockOut from "./views/WarehouseManagement/StockOut";
import Login from "./views/Login";
import Authorize from "./views/Authorize";
import StockInForm from "./views/WarehouseManagement/StockInForm";
import ReserveOrderForm from "./views/WarehouseManagement/ReserveOrderForm";
import ReserveOrderDetail from "./views/WarehouseManagement/ReserveOrderDetail";
import ReserveOrderSearch from "./views/WarehouseManagement/ReserveOrderSearch";
import StockInSearch from "./views/WarehouseManagement/StockInSearch";
import StockInItemForm from "./views/WarehouseManagement/StockInItemForm";
import StockOutDetail from "./views/WarehouseManagement/StockOutDetail";
import StockOutItemDetail from "./views/WarehouseManagement/StockOutItemDetail";
import StockOutForm from "./views/WarehouseManagement/StockOutForm";
import StockOutSearch from "./views/WarehouseManagement/StockOutSearch";
import Customer from "./views/Customer";
import Supplier from "./views/Supplier";
import SupplierSearch from "./views/SupplierSearch";
import StockTakeForm from "./views/StockTakeForm";
import StockTakeSearch from "./views/StockTakeSearch";
import StockTakeDetail from "./views/StockTakeDetail";
import ReserveOrderDetailForm from "./views/WarehouseManagement/ReserveOrderDetailForm";
import ReserveOrderDetailSearch from "./views/WarehouseManagement/ReserveOrderDetailSearch";
import SearchPage from "./views/SearchPage";
import WarehouseManagement from "./views/WarehouseManagement";
import SaleAndPurchase from "./views/SaleAndPurchase";
//销售、采购部分
import PurchasePlanOrder from "./views/SaleAndPurchase/PurchasePlanOrder";
import PurchasePlanOrderDetail from "./views/SaleAndPurchase/PurchasePlanOrderDetail";
import PurchaseOrder from "./views/SaleAndPurchase/PurchaseOrder";
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
        //仓储管理
        { path: "/stockIn", component: StockIn },
        { path: "/stockOut", component: StockOut },
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
        //物料
        { path: "/materiel", component: Materiel },
        { path: "/materiel/search", component: MaterielSearch },
        { path: "/check/account", component: CheckAccount },
        { path: "/echart", component: Echart },
        { path: "/search/page", component: SearchPage },
        { path: "/warehouse/management", component: WarehouseManagement },
        { path: "/sale/and/purchase", component: SaleAndPurchase },
        { path: "/account/security", component: AccountSecurity },
        { path: "/logOut", component: LogOut },
        { path: "/customer", component: Customer },
        { path: "/supplier", component: Supplier },
        { path: "/supplier/search", component: SupplierSearch },
        { path: "/stock/take/form", component: StockTakeForm },
        { path: "/stock/take/search", component: StockTakeSearch },
        { path: "/stock/take/detail", component: StockTakeDetail },
        //销售采购部分
        { path: "/purchase/plan/order", component: PurchasePlanOrder },
        {
          path: "/purchase/plan/order/detail",
          component: PurchasePlanOrderDetail
        },
        { path: "/purchase/order", component: PurchaseOrder }
      ]
    }
  ]
});
