<template>
  <div>
    <div class="mt-3">
      <div class="nav d-flex w-80">
        <div
          class="reserve_in"
          :class="stockType == '0' ? 'active' : ''"
          @click="stockTypeActive('0')"
        >
          入库预约
        </div>
        <div
          class="stock_in"
          :class="stockType == '1' ? 'active' : ''"
          @click="stockTypeActive('1')"
        >
          入库登记
        </div>
        <div
          class="reserve_out"
          :class="stockType == '2' ? 'active' : ''"
          @click="stockTypeActive('2')"
        >
          出库预约
        </div>
        <div
          class="stock_out"
          :class="stockType == '3' ? 'active' : ''"
          @click="stockTypeActive('3')"
        >
          出库登记
        </div>
      </div>
    </div>
    <div class="main">
      <router-view></router-view>
      <!-- <reserve-order v-show="this.stockType == '0'"></reserve-order>
      <stock-in v-show="this.stockType == '1'"></stock-in>
      <stock-out v-show="this.stockType == '3'"></stock-out> -->
    </div>
  </div>
</template>

<script>
import { getStore, setStore } from "@/util/util";
// import reserveOrder from "@/views/WarehouseManagement/ReserveOrder.vue";
// import stockIn from "@/views/WarehouseManagement/StockIn.vue";
// import stockOut from "@/views/WarehouseManagement/StockOut.vue";
export default {
  // components: { reserveOrder, stockIn, stockOut },
  data() {
    return {
      stockType: "1"
    };
  },
  created() {
    this.stockType = getStore("stockType");
    if (this.stockType == undefined) {
      this.stockType = "1";
    }
    // this.initStockType();
  },
  updated() {
    this.stockType = getStore("stockType");
  },
  methods: {
    initStockType() {
      this.stockType = getStore("stockType");
      if (this.stockType == undefined) {
        this.stockType = "1";
      } else if (this.stockType == "0") {
        this.$router.push("/warehouse/reserve/order");
      } else if (this.stockType == "1") {
        this.$router.push("/warehouse/stockIn");
      } else if (this.stockType == "2") {
        this.$router.push("/warehouse/reserve/order");
      } else if (this.stockType == "3") {
        this.$router.push("/warehouse/stockOut");
      }
    },
    stockTypeActive(k) {
      setStore("stockType", k);
      this.initStockType();
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
  .reserve_in {
    border-bottom-left-radius: 0.05rem;
    border-top-left-radius: 0.05rem;
  }
  //   .supplier-search {
  //   }
  .stock_out {
    border-bottom-right-radius: 0.05rem;
    border-top-right-radius: 0.05rem;
  }
}
.btn {
  z-index: 2;
  .iocnfont {
    font-size: 0.13rem;
  }
}
</style>
