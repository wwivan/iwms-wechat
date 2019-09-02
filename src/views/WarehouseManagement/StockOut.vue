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
              v-show="item.status == 1"
              class="bot"
              style="background: linear-gradient(135deg, #4181ff, #2360ef);"
            ></span>
            <span
              v-show="item.status == 2"
              class="bot"
              style="background: linear-gradient(135deg, #FF9779, #F6617B);"
            ></span>
            <span
              v-show="item.status == 5"
              class="bot"
              style="background: linear-gradient(135deg, #4181ff, #2360ef);"
            ></span>
            <span
              v-show="item.status == 4"
              class="bot"
              style="background: linear-gradient(135deg, #FF9779, #F6617B);"
            ></span>
            <span
              v-show="item.status == 3"
              class="bot"
              style="background: linear-gradient(135deg, #F7C77F, #FF9860);"
            ></span>
            <span class="context">{{ item.orderNo }}</span>
            <span style="font-size:0.13rem;color:#4181FF">{{
              item.status | formatStockOutStatus
            }}</span>
          </div>
          <div class="content">
            <div>
              <div>出库类型: {{ item.type | formatType }}</div>
              <div
                v-if="item.type == '1' || item.type == '2' || item.type == '4'"
              >
                客户: {{ item.customer == undefined ? "" : item.customer.name }}
              </div>
              <div v-if="item.type == '1'">送货单号: {{ item.deliveryNo }}</div>
              <!-- <div>状态: {{item.status | formatStockInStatus}}</div> -->
              <!-- <div>发票号: {{item.purchaseNo}}</div> -->
              <!-- <div>仓库: {{item.wareHouse==undefined? '':item.wareHouse.name}}</div> -->
              <div v-if="item.type == '3'">领用人: {{ item.operatorUser }}</div>
              <div>
                销售单号:
                {{ item.saleOrder == undefined ? "" : item.saleOrder.orderNo }}
              </div>
              <!-- <div>操作人: {{item.operatorUser}}</div> -->
              <div>出库时间: {{ item.createTime }}</div>
              <div style="margin-bottom:0.05rem"></div>
            </div>
            <div class="confirm">
              <div
                v-if="StockOutType == 1"
                style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
                @click="findStockOutDetail(item)"
              >
                详情
              </div>
              <div
                v-if="StockOutType == 3"
                style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
                @click="findStockOutDetail(item)"
              >
                查看明细
              </div>
            </div>
          </div>
        </div>
      </van-list>
      <div class="van-list__loading">
        <div
          v-if="!loading && records.length === 0"
          @click="findStockOutList"
          style="height: 10rem"
        >
          <span class="van-list__loading-text">暂无数据, 下拉刷新</span>
        </div>
      </div>
    </van-pull-refresh>
    <div
      class="btn d-flex"
      style="position:fixed;bottom:0.8rem;right:0.4rem;width:0.92rem;height:0.3rem;border-radius:0.3rem;overflow:hidden"
    >
      <button
        class="bg-peach-red-dark text-white"
        style="width:0.45rem;height:0.3rem;border:none"
        @click="onClickForm"
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
import Vue from "vue";
import { Toast } from "vant";
import { mapGetters } from "vuex";
// eslint-disable-next-line no-unused-vars
import { findStockOutList, toLocation, saveStockLibrary } from "@/api/api";
// eslint-disable-next-line no-unused-vars
import { CompleteGetStockOutList } from "@/api/api";
import {
  setStore,
  getStore,
  removeStore,
  formatStockOutStatus
} from "@/util/util";
// eslint-disable-next-line no-unused-vars
import { Dialog } from "vant";
Vue.filter("formatStockOutStatus", formatStockOutStatus);
export default {
  data() {
    return {
      active: 1,
      StockOutType: undefined, //1明细，2分配货位，3拣货，4下架
      DownStock: {},
      show: false,
      loading: false,
      finished: false,
      records: [],
      searchParams: {},
      params: {
        pageNumber: 1,
        stockOutId: undefined,
        pageSize: 30,
        sortType: "auto",
        fid: "42dd7498-b9d3-43b3-b736-3e9844f03ff5",
        searchParams: {
          EQ_status: undefined
        }
      }
    };
  },
  created() {
    this.initStatus();
  },
  mounted() {
    this.params.fid = this.fid;
    let temp = getStore("stockOutSearchParams");
    if (temp) {
      removeStore("stockOutSearchParams");
      this.searchParams = JSON.parse(temp);
    } else {
      this.searchParams = {};
    }
    let StockOutType = getStore("StockOutType");
    this.StockOutType = StockOutType;
    // console.log(1212321231122);
    // console.log(this.StockOutType);
    // if(StockOutType == '2'){//分配货位
    //   this.searchParams.EQ_status = 1;
    // }else if(StockOutTy2pe == '3'){//拣货
    //   this.params.searchParams["IN_status"] = 1,2,3;
    // }else {
    //   console.log(`StockOutType: ${ StockOutType }`)
    // }
  },
  methods: {
    initStatus() {
      setStore("StockOutType", "1");
    },
    createGetStockOut() {
      this.$router.push({
        name: "GetStockOut"
      });
    },
    onRefreshList() {
      // 刷新
      //this.params.pageNumber = 1;
      this.records = [];
      this.findStockOutList();
    },
    onLoadMore() {
      // eslint-disable-next-line no-console
      console.log("############");
      //this.params.pageNumber = this.params.pageNumber + 1;
      // eslint-disable-next-line no-console
      console.log(this.params.pageNumber);
      this.findStockOutList();
    },
    findStockOutList() {
      this.params.searchParams = this.searchParams;
      //  if(this.StockOutType=="1"){
      //   //this.params.searchParams["EQ_status"] = "0";
      // }else if(this.StockOutType=="3"){
      //   this.params.searchParams["IN_status"] = "0,1";
      // }
      // 获取记录
      findStockOutList(this.params)
        .then(res => {
          this.loading = false;
          this.finished = res.data.last;
          this.records.push(...res.data.content);
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          this.finished = true;
          this.loading = false;
          Toast("请求错误");
        });
    },
    //拣货完成跳转货位列表
    getToLocationList(item) {
      //获取stockLibraryId
      setStore("stockLibraryId", item.stockLibrary.id);
      setStore("SealandShelf", "4"); //下架扫描
      this.$router.push({
        name: "StockInCamera"
      });
    },
    onTitleClickLeft() {
      // 返回
      this.$router.push({
        name: "Main"
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
    onClickSearch() {
      this.$router.push("/warehouse/stock/out/search");
    },
    onClickForm() {
      setStore("StockOutType", "1");
      // setStore("stockType", "3");
      this.$router.push("/warehouse/stock/out/form");
    },
    findStockOutDetail(StockOutDetailParams) {
      //获取单个出库单详细
      // if(StockOutDetailParams.status == '3') {
      //    this.addStockLibrary(StockOutDetailParams.id);
      // }
      // eslint-disable-next-line no-console
      console.log("11111111111111111");
      setStore("StockOutDetailParams", StockOutDetailParams);
      this.$router.push("/warehouse/stock/out/detail");
    }
  },
  computed: {
    ...mapGetters(["fid"])
  },
  filters: {
    formatType(value) {
      let realVal = "";
      if (value == "1") {
        realVal = "销售出库";
      } else if (value == "2") {
        realVal = "退货出库";
      } else if (value == "3") {
        realVal = "生产使用";
      } else if (value == "4") {
        realVal = "外协出库";
      } else if (value == "5") {
        realVal = "借用出库";
      } else if (value == "6") {
        realVal = "废品出库";
      }
      return realVal;
    }
  }
};
</script>

<style lang="scss" scoped>
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
  justify-content: space-between;
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
  margin-left: 0.07rem;
  flex: 1;
  font-size: 0.12rem;
  color: #3f7ffe;
  text-align: left;
}
.header .icon {
  margin-right: 0.1rem;
  width: 0.18rem;
  height: 0.18rem;
}
.content {
  margin-top: 0.16rem;
  margin-left: 0.13rem;
  display: flex;
  align-items: center;
  text-align: left;
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
.btn {
  z-index: 999;
  .iocnfont {
    font-size: 0.13rem;
  }
}
</style>
