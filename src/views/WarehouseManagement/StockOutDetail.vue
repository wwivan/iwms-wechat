<template>
  <div>
    <van-pull-refresh v-model="loading" @refresh="onRefreshList">
      <van-list v-model="loading" :finished="finished" @load="onLoadMore">
        <div
          v-for="(item, index) in records"
          :key="index"
          class="stock-out"
          :class="index < records.length - 1 ? 'bottom' : ''"
        >
          <div class="header">
            <span
              v-show="item.status == 0"
              class="bot"
              style="background: linear-gradient(135deg, #4181ff, #2360ef);"
            ></span>
            <span
              v-show="item.status == 1"
              class="bot"
              style="background: linear-gradient(135deg, #FF9779, #F6617B);"
            ></span>
            <span
              v-show="item.status == 2"
              class="bot"
              style="background: linear-gradient(135deg, #F7C77F, #FF9860);"
            ></span>
            <span style="font-size:0.13rem;color:#4181FF;margin-left:0.06rem">{{
              item.stockOut == undefined ? "" : item.stockOut.orderNo
            }}</span>
          </div>
          <div class="content">
            <div>
              <div>物料名称: {{ item.materielSku.name }}</div>
              <div>物料型号: {{ item.materielSku.model }}</div>
              <div>出库数量: {{ item.qty }}</div>
              <div>总库存: {{ stockUseNum }}</div>
              <div>
                仓库:
                {{
                  item.stockOut.wareHouse == undefined
                    ? ""
                    : item.stockOut.wareHouse.name
                }}
              </div>
              <div style="margin-bottom:0.05rem"></div>
            </div>
          </div>
          <div class="confirm" style="margin-left:1.35rem">
            <div
              v-if="item.status != '1'"
              style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
              @click="findStockOutItemDetail(item)"
            >
              查看详情
            </div>
            <div
              v-if="item.status == '1'"
              @click="toLocation(item)"
              style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
            >
              开始配货
            </div>
          </div>
        </div>
      </van-list>
      <div class="van-list__loading">
        <div
          v-if="!loading && records.length === 0"
          @click="findStockOutItemList"
          style="height: 10rem"
        >
          <span class="van-list__loading-text">暂无数据, 下拉刷新</span>
        </div>
      </div>
    </van-pull-refresh>
    <div
      v-if="StockOutType == 1 && status != 3 && status != 5"
      class="btn d-flex"
      style="position:fixed;bottom:0.8rem;right:0.4rem;width:0.92rem;height:0.3rem;border-radius:0.3rem;overflow:hidden"
    >
      <button
        class="bg-peach-red-dark text-white"
        style="width:0.45rem;height:0.3rem;border:none"
        @click="onClickForm(stockOut, StockOutType)"
      >
        <span class="iconfont icon-xinjian"></span>
      </button>
      <div class="bg-white" style="width:0.02rem;height:0.3rem"></div>
      <button
        class="bg-peach-red text-white"
        style="width:0.45rem;height:0.3rem;border:none;"
        @click="onClickSearch"
      >
        <span class="iconfont icon-sousuo"></span>
      </button>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line no-unused-vars
import Vue from "vue";
import { Toast } from "vant";
import { mapGetters } from "vuex";
import {
  findStockOutItemList,
  toLocation,
  // eslint-disable-next-line no-unused-vars
  findToLocationByStockOutItemAndCell,
  findStockList
} from "@/api/api";
import { setStore, getStore, formatFen2Yuan, removeStore } from "@/util/util";
export default {
  data() {
    return {
      active: 1,
      status: undefined,
      loading: false,
      finished: false,
      records: [],
      StockOutType: undefined,
      stockOut: {},
      searchParams: {},
      stockUseNum: undefined,
      cell: {},
      params: {
        id: undefined,
        stockOutId: undefined,
        pageNumber: 1,
        pageSize: 30,
        sortType: "auto",
        fid: "42dd7498-b9d3-43b3-b736-3e9844f03ff5",
        searchParams: {}
      }
    };
  },
  mounted() {
    this.params.fid = this.fid;
    let temp = getStore("StockOutDetailSearchParams");
    if (temp) {
      removeStore("StockOutDetailSearchParams");
      this.searchParams = JSON.parse(temp);
    } else {
      this.searchParams = {};
    }
    let temps = getStore("StockOutDetailParams");

    let stockOutDetailParams = JSON.parse(temps);
    // eslint-disable-next-line no-console
    console.log(stockOutDetailParams.id);
    this.params.stockOutId = stockOutDetailParams.id;
    this.params.id = stockOutDetailParams.id;
    this.stockOut = stockOutDetailParams;
    let StockOutType = getStore("StockOutType");
    // eslint-disable-next-line no-console
    this.StockOutType = StockOutType;
  },
  methods: {
    onRefreshList() {
      // 刷新
      //this.params.pageNumber = 1;
      this.records = [];
      this.findStockOutItemList();
    },
    onLoadMore() {
      // this.params.pageNumber = this.params.pageNumber + 1;
      // eslint-disable-next-line no-console
      console.log(this.params.pageNumber);
      this.findStockOutItemList();
    },
    findStockOutItemList() {
      this.params.searchParams = this.searchParams;
      // 获取记录
      // eslint-disable-next-line no-console
      console.log("获取记录");
      findStockOutItemList(this.params)
        .then(res => {
          this.loading = false;
          this.finished = res.data.last;
          let items = res.data.content;
          for (let item of items) {
            this.findStockList(item.materielSku.id);
            this.status = item.status;
            // eslint-disable-next-line no-console
            console.log(this.status);
            //console.log(item.materielSku.id);
            //Vue.set(item, "checked", false);
          }
          this.records.push(...items);
        })
        .catch(error => {
          this.finished = true;
          this.loading = false;
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(error));
          Toast("请求错误");
        });
    },
    findStockList(id) {
      this.params.searchParams["EQ_materielSku.id"] = id;
      // 获取记录
      findStockList(this.params)
        .then(res => {
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(res));
          let stockUseNums = res.data.content;
          for (let item of stockUseNums) {
            this.stockUseNum = item.stockUseNum;
          }
        })
        .catch(error => {
          this.finished = true;
          this.loading = false;
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(error));
          Toast("请求错误");
        });
    },

    onTabChange(active) {
      if (active == "0") {
        this.$router.push({
          name: "Main"
        });
      } else if (active == "1") {
        this.$router.push({
          name: "Statistics"
        });
      } else if (active == "2") {
        this.$router.push({
          name: "Mine"
        });
      }
    },

    // 开始配货
    // eslint-disable-next-line no-unused-vars
    toLocation(stockOut) {
      // this.params.searchParams = this.searchParams;
      // this.params.id = stockOut.id;
      // console.log(this.params.id);
      // 获取记录
      toLocation(this.params)
        .then(res => {
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(res));
          this.loading = false;
          Toast("配货完成！");
          // this.finished = res.data.last;
          //this.records.push(...res.data.content);
          this.onRefreshList();
        })
        .catch(error => {
          this.finished = true;
          this.loading = false;
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(error));
          Toast(JSON.stringify(error.message));
        });
    },
    findCamera(item) {
      setStore("toLocationId", item.id);
      setStore("hasItem", "1");
      this.$router.push({
        name: "StockOutCamera"
      });
    },
    findStockOutItemDetail(stockOutItem) {
      setStore("stockOutItem", stockOutItem);
      this.$router.push("/warehouse/stock/out/item/detail");
    },

    onClickForm(stockOut, StockOutType) {
      setStore("StockOutType", StockOutType);
      setStore("stockOut", stockOut);
      this.$router.push("/warehouse/stock/out/item/form");
    },

    onTitleClickLeft(StockOutType) {
      // 返回
      setStore("StockOutType", StockOutType);
      this.$router.go(-1);
    },
    onClickSearch() {
      // 查询
      this.$router.push({
        name: "StockOutDetailSearch"
      });
    }
  },

  computed: {
    ...mapGetters(["fid"])
  },
  filters: {
    numFilter(value) {
      let realVal = formatFen2Yuan(value);
      return realVal;
    }
  }
};
</script>

<style scoped>
.bottom {
  border-bottom: 0.01rem solid rgba(0, 0, 0, 0.25);
}
.top-bar {
  background: white;
  position: sticky;
  top: 0;
  z-index: 999;
  height: 0.7rem;
  box-shadow: 0 0.1rem 0.5rem rgba(168, 168, 168, 0.25);
}
.stock-out-header {
  display: flex;
  height: 0.46rem;
  justify-content: space-around;
  align-items: center;
}
.stock-out {
  margin-left: 0.12rem;
  margin-top: 0.22rem;
  margin-right: 0.12rem;
}
.stock-out .header {
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: start;
  margin-left: 0.13rem;
  margin-right: 0.12rem;
}
.header .bot {
  width: 0.11rem;
  height: 0.11rem;
  border-radius: 50%;
  display: inline-block;
}
.header .context {
  text-align: left;
  margin-left: 0.07rem;
  flex: 1;
  font-size: 0.12rem;
  color: #3f7ffe;
}
.header .icon {
  margin-right: 0.1rem;
  width: 0.18rem;
  height: 0.18rem;
}
.content {
  text-align: left;
  margin-top: 0.16rem;
  margin-left: 0.13rem;
  display: flex;
  align-items: center;
}
.content div div {
  font-family: PingFangSC-Regular;
  color: #4a4a4a;
  font-size: 0.13rem;
  line-height: 0.28rem;
}
.content .confirm {
  margin-left: 0.6rem;
}
.van-tabbar {
  border-top: 0.01rem solid rgba(0, 0, 0, 0.25);
  height: 0.57rem !important;
}
.van-tabbar-item {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  line-height: 1;
  font-size: 0.11rem;
  color: #7d7e80;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.van-tabbar-item--active {
  color: #4181ff !important;
}
</style>
