<template>
  <div>
    <!-- <van-nav-bar title="入库明细记录" left-text="返回" right-text="查询" left-arrow @click-left="onTitleClickLeft" @click-right="onTitileClickRight" > -->
    <!-- <van-nav-bar title="入库明细记录" left-text="返回" left-arrow @click-left="onTitleClickLeft">
      <van-button v-if="StockInType == 1" slot="right" @click="onClickForm(stockIn,StockInType)">
        <van-icon name="plus" size="1.5em"/>
      </van-button>
      <van-button slot="right" @click="onClickSearch">
        <van-icon name="search" size="1.5em"/>
      </van-button>
    </van-nav-bar>-->
    <!-- <div class="top-bar">
      <div style="height:0.2rem"></div>
      <div class="stock-in-header">
        <div @click="onTitleClickLeft">
          <span style="font-size:0.24rem;color:#3F7FFE"
                class="iconfont icon-ai207"></span>
        </div>
        <div style="margin-left:0.45rem;">
          <span style="text-algin:center;color:#030303">入库明细记录</span>
        </div>
        <div>
          <span v-if="StockInType == 1"
                style="margin-left:0.2rem;font-size:0.2rem;color:#4A4A4A "
                class="iconfont icon-icon-test"
                @click="onClickForm(stockIn,StockInType)"></span>
          <span style="margin-left:0.2rem;font-size:0.2rem;color:#4A4A4A "
                class="iconfont icon-iconset0157"
                @click="onClickSearch"></span>
        </div>
      </div>
    </div>-->
    <van-pull-refresh v-model="loading" @refresh="onRefreshList">
      <van-list v-model="loading" :finished="finished" @load="onLoadMore">
        <div
          v-for="(item, index) in records"
          :key="index"
          class="stock-in-detail"
          :class="index < records.length - 1 ? 'bottom' : ''"
        >
          <div class="header">
            <span
              v-show="item.status == 0"
              class="bot"
              style="background: linear-gradient(135deg, #4181ff, #2360ef);"
            ></span>
            <span
              v-show="item.status == 4"
              class="bot"
              style="background: linear-gradient(135deg, #F7C77F, #FF9860);"
            ></span>
            <span
              v-show="item.stockIn.status == '1'"
              class="bot"
              style="background: linear-gradient(135deg, #F7C77F, #FF9860);"
            ></span>
            <span class="context">{{ item.status | statusFilter }}</span>
          </div>
          <div class="content">
            <div>
              <div>入库数量: {{ item.qty }}</div>
              <!-- <div>未理数量: {{item.qty - item.checkedInQty}}</div> -->
              <div>物料条码: {{ item.materielSku.barcode }}</div>
              <div>物料名称: {{ item.materielSku.name }}</div>
              <div style="margin-bottom:0.05rem"></div>
            </div>
            <div class="confirm">
              <!-- <div v-if="item.status == 0 || item.status == 1"
                   style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #FF9779, #F6617B);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
                   @click="findTrayList(item)">理货</div>
              <div v-if="item.status == '1'||item.status == '2'" style="height:0.2rem;"></div>-->
              <div
                v-if="item.status == '1' || item.status == '2'"
                style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
                @click="toCell(item.materielSku)"
              >
                上架
              </div>
            </div>
          </div>
        </div>
      </van-list>
      <div class="van-list__loading">
        <div
          v-if="!loading && records.length === 0"
          @click="findStockInItemList"
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
        @click="stockInItemForm"
      >
        <span class="iconfont icon-xinjian"></span>
      </button>
      <div class="bg-white" style="width:0.02rem;height:0.3rem"></div>
      <button
        class="bg-peach-red text-white"
        style="width:0.45rem;height:0.3rem;border:none"
        @click="stockInItemSearch"
      >
        <span class="iconfont icon-sousuo"></span>
      </button>
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapGetters } from "vuex";
import {
  findStockInItemList,
  confirmSealedTray,
  getCheckedInQty
} from "@/api/api";
import { getStore, setStore, formatFen2Yuan, removeStore } from "@/util/util";
export default {
  name: "StockInDetail",
  data() {
    return {
      active: 1,
      StockInType: undefined, //1明细，2封盘，3上架
      loading: false,
      stockIn: {},
      finished: false,
      checkedInQty: undefined,
      records: [],
      searchParams: {},
      params: {
        stockInItemId: undefined,
        stockInId: undefined,
        pageNumber: 1,
        stockInItem: {},
        pageSize: 30,
        sortType: "auto",
        fid: undefined,
        searchParams: {}
      }
    };
  },
  mounted() {
    this.params.fid = this.fid;
    let temp = getStore("StockInDetailSearchParams");
    if (temp) {
      removeStore("StockInDetailSearchParams");
      this.searchParams = JSON.parse(temp);
    } else {
      this.searchParams = {};
    }
    let temps = getStore("StockInDetailParams");
    console.log(temps);
    let stockInDetailParams = JSON.parse(temps);
    this.params.stockInId = stockInDetailParams.id;
    this.stockIn = stockInDetailParams;
    let StockInType = getStore("StockInType");
    this.StockInType = StockInType;
  },
  methods: {
    stockInItemSearch() {
      console.log("查询");
    },
    stockInItemForm() {
      this.$router.push("/stockIn/item/form");
    },
    onRefreshList() {
      // 刷新
      this.records = [];
      this.findStockInItemList();
    },
    onLoadMore() {
      this.findStockInItemList();
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

    findStockInItemList() {
      this.params.searchParams = this.searchParams;

      // 获取记录
      findStockInItemList(this.params)
        .then(res => {
          console.log(res.data);
          this.loading = false;
          this.finished = res.data.last;
          let items = res.data.content;
          console.log(items);
          let result = "";
          for (let item of items) {
            result += item.id + ",";
          }
          console.log(result);
          // if (result != "") {
          //   this.getCheckedInQty(result);
          // }
          this.records.push(...items);
          console.log(this.records);
        })
        .catch(error => {
          this.finished = true;
          this.loading = false;
          console.log(JSON.stringify(error));
          Toast("请求错误");
        });
    },

    getCheckedInQty(id) {
      console.log(id);
      this.params.stockInItemId = id;
      getCheckedInQty(this.params)
        .then(res => {
          console.log(JSON.stringify(res));
          let items = res.data;
          let result = "";
          for (let key in items) {
            for (
              let indexOfItem = 0;
              indexOfItem < this.records.length;
              indexOfItem++
            ) {
              // console.log(indexOfItem);
              let record = this.records[indexOfItem];
              // console.log("record",record);
              if (record.id == key) {
                // console.log("id",record.id);
                record.checkedInQty = items[key];
                this.records.splice(indexOfItem, 1, record);
              }
            }
            this.checkedInQty = items[key];
            console.log(items[key]);
          }
        })
        .catch(error => {
          this.finished = true;
          this.loading = false;
          console.log(JSON.stringify(error));
          Toast("请求错误");
        });
    },
    toCell(materielSku) {
      setStore("toCells", materielSku);
      console.log(materielSku);
      this.$router.push({
        name: "StockInCameraCell"
      });
    },
    confirmSealedTray(StockInItem) {
      this.params.stockInItem.id = StockInItem.id;
      // 获取记录
      confirmSealedTray(this.params)
        .then(res => {
          this.onRefreshList();
          Toast("确定理货成功!");
        })
        .catch(error => {
          this.finished = true;
          this.loading = false;
          console.log(JSON.stringify(error));
          Toast("请求错误");
        });
    },

    findTrayList(StockInDetail) {
      //获取单个入库单详细
      setStore("StockInDetail", StockInDetail);
      setStore("SealandShelf", "1");
      this.$router.push({
        name: "StockInCamera"
      });
    },
    onTitleClickLeft() {
      // 返回
      if (this.StockInType == "1") {
        this.$router.push({
          name: "StockIn"
        });
      } else if (this.StockInType == "2") {
        this.$router.push({
          name: "StockInTally"
        });
      }
    },
    onClickForm(stockIn, StockInType) {
      setStore("StockInType", StockInType);
      setStore("stockIn", stockIn);
      //getStore("StockInDetailParams");
      this.$router.push({
        name: "StockInItemForm"
      });
    },
    onClickSearch() {
      this.$router.push({
        name: "StockInDetailSearch"
      });
    },
    onTitileClickRight() {
      // 查询
      this.$router.push({
        name: "StockInDetailSearch"
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
    },
    statusFilter(value) {
      let realVal = "";
      if (value == 0) {
        realVal = "收货";
      } else if (value == 1) {
        realVal = "理货中";
      } else if (value == 2) {
        realVal = "理货完成";
      } else if (value == 3) {
        realVal = "上架中";
      } else if (value == 4) {
        realVal = "上架完成";
      }
      return realVal;
    }
  }
};
</script>

<style scoped>
.top-bar {
  background: white;
  position: sticky;
  top: 0;
  z-index: 999;
  height: 0.7rem;
  box-shadow: 0 0.1rem 0.5rem rgba(168, 168, 168, 0.25);
}
.stock-in-header {
  display: flex;
  height: 0.46rem;
  justify-content: space-around;
  align-items: center;
}
.stock-in-detail {
  margin-left: 0.12rem;
  margin-top: 0.22rem;
  margin-right: 0.12rem;
}
.stock-in-detail .header {
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

.bottom {
  border-bottom: 0.01rem solid rgba(0, 0, 0, 0.25);
}

.btn {
  z-index: 999;
  /* .iconfont {
        font-size: 0.13rem;
      } */
}
</style>
