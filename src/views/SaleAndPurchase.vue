<template>
  <div>
    <div class="mt-3">
      <div class="nav d-flex w-80">
        <div
          class="sales_plan"
          :class="orderType=='0'?'active':''"
          @click="orderTypeActive('0')"
        >销售审核</div>
        <div
          class="sales_order"
          :class="orderType=='1'?'active':''"
          @click="orderTypeActive('1')"
        >销售订单</div>
        <div
          class="purchase_plan"
          :class="orderType=='2'?'active':''"
          @click="orderTypeActive('2')"
        >采购计划</div>
        <div
          class="purchase_order"
          :class="orderType=='3'?'active':''"
          @click="orderTypeActive('3')"
        >采购订单</div>
      </div>
    </div>
    <div class="main">
      
      <!-- <purchase-plan-order v-show="this.orderType == '2'"></purchase-plan-order> -->
      <sale-order v-if="this.orderType =='1'"></sale-order>
      <purchase-order v-if="this.orderType == '3'"></purchase-order>
      <purchase-plan v-if="this.orderType == '2'"></purchase-plan>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { getStore, setStore } from "@/util/util";
import purchasePlanOrder from "@/views/SaleAndPurchase/PurchasePlanOrder.vue";
import purchasePlan from "@/views/SaleAndPurchase/PurchasePlan"
import purchaseOrder from "@/views/SaleAndPurchase/PurchaseOrder.vue";
import saleOrder from "@/views/SaleAndPurchase/SaleOrder.vue"
export default {
  components: { purchasePlanOrder ,purchaseOrder,purchasePlan,saleOrder},
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
      if(this.orderType == undefined){
        this.orderType = '1'
      }
    },
    orderTypeActive(k) {
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