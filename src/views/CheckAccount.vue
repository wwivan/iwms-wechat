<template>
  <div>
    <div class="mt-3">
      <div class="nav d-flex w-80">
        <div
          class="sales_plan"
          :class="orderType == '0' ? 'active' : ''"
          @click="orderTypeActive('0')"
        >
          对账审核
        </div>
        <div
          class="sales_order"
          :class="orderType == '1' ? 'active' : ''"
          @click="orderTypeActive('1')"
        >
          应付对账
        </div>
        <div
          class="purchase_plan"
          :class="orderType == '2' ? 'active' : ''"
          @click="orderTypeActive('2')"
        >
          应收对账
        </div>
        <div
          class="purchase_plan"
          :class="orderType == '3' ? 'active' : ''"
          @click="orderTypeActive('3')"
        >
          智能应付对账
        </div>
        <div
          class="purchase_order"
          :class="orderType == '4' ? 'active' : ''"
          @click="orderTypeActive('4')"
        >
          智能应收对账
        </div>
      </div>
    </div>
    <div class="main">
      <!-- <purchase-plan-order v-show="this.orderType == '2'"></purchase-plan-order> -->
      <!-- <sale-plan v-if="this.orderType == '0'"></sale-plan>
      <sale-order v-if="this.orderType == '1'"></sale-order>
      <purchase-plan v-if="this.orderType == '2'"></purchase-plan>
      <purchase-order v-if="this.orderType == '3'"></purchase-order> -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { getStore, setStore } from "@/util/util";
// import salePlan from "@/views/SaleAndPurchase/SalePlanOrder.vue";
// import purchasePlanOrder from "@/views/SaleAndPurchase/PurchasePlanOrder.vue";
// import purchasePlan from "@/views/SaleAndPurchase/PurchasePlan";
// import purchaseOrder from "@/views/SaleAndPurchase/PurchaseOrder.vue";
// import saleOrder from "@/views/SaleAndPurchase/SaleOrder.vue";
export default {
  // components: {
  //   // eslint-disable-next-line vue/no-unused-components
  //   purchasePlanOrder,
  //   purchaseOrder,
  //   purchasePlan,
  //   saleOrder,
  //   salePlan
  // },
  data() {
    return {
      orderType: ""
    };
  },
  created() {
    this.initOrderType();
  },
  methods: {
    initOrderType() {
      this.orderType = getStore("orderType");
      if (this.orderType == undefined) {
        this.orderType = "1";
      } else if (this.orderType == "0") {
        // this.$router.push("/sap/sale/plan/order");
      } else if (this.orderType == "1") {
        // this.$router.push("/sap/sale/order");
      } else if (this.orderType == "2") {
        // this.$router.push("/sap/purchase/plan");
      } else if (this.orderType == "3") {
        // this.$router.push("/sap/purchase/order");
      }
    },
    orderTypeActive(k) {
      if (k == "0") {
        // this.$router.push("/sap/sale/plan/order");
      } else if (k == "1") {
        // this.$router.push("/sap/sale/order");
      } else if (k == "2") {
        // this.$router.push("/sap/purchase/plan");
      } else if (k == "3") {
        // this.$router.push("/sap/purchase/order");
      } else if (k == "4") {
        // this.$router.push("/");
      }
      setStore("orderType", k);
      this.initOrderType();
    }
  }
};
</script>

<style lang="scss" scoped>
.nav {
  margin: 0 auto;
  div {
    background: grey;
    text-align: center;
    line-height: 0.3rem;
    font-size: 0.13rem;
    color: white;
    width: 25%;
    height: 0.3rem;
  }
  .active {
    background: #ff9860;
    color: white;
  }
  .sales_plan {
    border-bottom-left-radius: 0.05rem;
    border-top-left-radius: 0.05rem;
  }
  //   .supplier-search {
  //   }
  .purchase_order {
    border-bottom-right-radius: 0.05rem;
    border-top-right-radius: 0.05rem;
  }
}
</style>
