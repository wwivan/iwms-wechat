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
      <reserve-order v-show="this.stockType == '0'"></reserve-order>
      <stock-in v-show="this.stockType == '1'"></stock-in>
      <stock-out v-show="this.stockType == '3'"></stock-out>
    </div>
    <div
      class="btn d-flex"
      style="position:fixed;bottom:0.8rem;right:0.4rem;width:0.92rem;height:0.3rem;border-radius:0.3rem;overflow:hidden"
    >
      <button
        class="bg-peach-red-dark text-white"
        style="width:0.45rem;height:0.3rem;border:none"
        @click="Create"
      >
        <span class="iconfont icon-xinjian"></span>
      </button>
      <div class="bg-white" style="width:0.02rem;height:0.3rem"></div>
      <button
        class="bg-peach-red text-white"
        style="width:0.45rem;height:0.3rem;border:none;"
        @click="Search"
      >
        <span class="iconfont icon-sousuo"></span>
      </button>
    </div>
  </div>
</template>

<script>
import { getStore, setStore } from "@/util/util";
import reserveOrder from "@/views/WarehouseManagement/ReserveOrder.vue";
import stockIn from "@/views/WarehouseManagement/StockIn.vue";
import stockOut from "@/views/WarehouseManagement/StockOut.vue";
export default {
  components: { reserveOrder, stockIn, stockOut },
  data() {
    return {
      stockType: "0"
    };
  },
  created() {
    this.initStockType();
  },
  methods: {
    initStockType() {
      this.stockType = getStore("stockType");
      if (this.stockType == undefined) {
        this.stockType = "1";
      }
    },
    stockTypeActive(k) {
      setStore("stockType", k);
      this.initStockType();
    },
    Create() {
      if (this.stockType == "0") {
        // eslint-disable-next-line no-console
        console.log("新建预约入库单");
        this.$router.push("/reserve/order/form");
      } else if (this.stockType == "1") {
        // eslint-disable-next-line no-console
        console.log("新建入库单");
        this.$router.push("/stockIn/form");
      } else if (this.stockType == "2") {
        // eslint-disable-next-line no-console
        console.log("新建预约出库单");
      } else if (this.stockType == "3") {
        // eslint-disable-next-line no-console
        console.log("新建出库单");
        this.$router.push("/stock/out/form");
      }
    },
    Search() {
      if (this.stockType == "0") {
        // eslint-disable-next-line no-console
        console.log("搜索预约入库单");
        this.$router.push("/reserve/order/search");
      } else if (this.stockType == "1") {
        // eslint-disable-next-line no-console
        console.log("搜索入库单");
        this.$router.push("/stockIn/search");
      } else if (this.stockType == "2") {
        // eslint-disable-next-line no-console
        console.log("搜索预约出库单");
      } else if (this.stockType == "3") {
        // eslint-disable-next-line no-console
        console.log("搜索出库单");
        this.$router.push("/stock/out/search");
      }
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
  z-index: 999;
  .iocnfont {
    font-size: 0.13rem;
  }
}
</style>
