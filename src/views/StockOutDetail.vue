<template>
    <div>
         <van-pull-refresh v-model="loading"
                      @refresh="onRefreshList">
      <van-list v-model="loading"
                :finished="finished"
                @load="onLoadMore">
        <div v-for="(item, index) in records"
             :key="index"
             class="stock-out"
             :class="(index < (records.length-1))?'bottom':''">
          <div class="header">
            <span v-show="item.status == 3"
                  class="bot"
                  style="background: linear-gradient(135deg, #4181ff, #2360ef);"></span>
            <span v-show="item.status == 4"
                  class="bot"
                  style="background: linear-gradient(135deg, #FF9779, #F6617B);"></span>
            <span v-show="item.status == 5"
                  class="bot"
                  style="background: linear-gradient(135deg, #F7C77F, #FF9860);"></span>
            <span style="font-size:13px;color:#4181FF">{{item.stockOut==undefined? '':item.stockOut.orderNo}}</span>
          </div>
          <div class="content">
            <div>
              <div>物料名称: {{item.materielSku.name}}</div>
              <div>物料型号: {{item.materielSku.model}}</div>
              <div>出库数量: {{item.qty}}</div>
              <div>总库存: {{stockUseNum}}</div>
              <div>仓库: {{item.stockOut.wareHouse==undefined? '':item.stockOut.wareHouse.name}}</div>
              <div style="margin-bottom:5px"></div>
            </div>
          </div>
          <div class="confirm"
               style="margin-left:135px">
            <div v-if="item.status != '1'"
                 style="width:80px;height:33px;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:33px;color:white;border-radius:3px;font-size:15px"
                 @click="findStockOutItemDetail(item)">查看详情</div>
            <div v-if="item.status == '1'"
                 @click="toLocation(item)"
                 style="width:80px;height:33px;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:33px;color:white;border-radius:3px;font-size:15px">开始配货</div>
          </div>
        </div>
      </van-list>
      <div class="van-list__loading">
        <div v-if="!loading && records.length === 0"
             @click="findStockOutItemList"
             style="height: 1000px">
          <span class="van-list__loading-text">暂无数据, 下拉刷新</span>
        </div>
      </div>
    </van-pull-refresh>
    </div>
</template>
<script>
  import Vue from "vue";
  import { Toast } from "vant";
  import { mapGetters } from "vuex";
  import {
    findStockOutItemList,
    toLocation,
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
      console.log(stockOutDetailParams.id);
      this.params.stockOutId = stockOutDetailParams.id;
      this.params.id = stockOutDetailParams.id;
      this.stockOut = stockOutDetailParams;
      let StockOutType = getStore("StockOutType");
      console.log(StockOutType);
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
        console.log(this.params.pageNumber);
        this.findStockOutItemList();
      },
      findStockOutItemList() {
        this.params.searchParams = this.searchParams;
        // 获取记录
        console.log("获取记录");
        findStockOutItemList(this.params)
          .then(res => {
            this.loading = false;
            this.finished = res.data.last;
            let items = res.data.content;
            for (let item of items) {
              this.findStockList(item.materielSku.id);
              this.status = item.status;
              console.log(this.status);
              //console.log(item.materielSku.id);
              //Vue.set(item, "checked", false);
            }
            this.records.push(...items);
          })
          .catch(error => {
            this.finished = true;
            this.loading = false;
            console.log(JSON.stringify(error));
            Toast("请求错误");
          });
      },
      findStockList(id) {
        this.params.searchParams["EQ_materielSku.id"] = id;
        // 获取记录
        findStockList(this.params)
          .then(res => {
            console.log(JSON.stringify(res));
            let stockUseNums = res.data.content;
            for (let item of stockUseNums) {
              this.stockUseNum = item.stockUseNum;
            }
          })
          .catch(error => {
            this.finished = true;
            this.loading = false;
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
      toLocation(stockOut) {
        // this.params.searchParams = this.searchParams;
        // this.params.id = stockOut.id;
        // 获取记录
        toLocation(this.params)
          .then(res => {
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
        this.$router.push("/stock/out/item/detail");
      },

      onClickForm(stockOut, StockOutType) {
        setStore("StockOutType", StockOutType);
        setStore("stockOut", stockOut);
        this.$router.push({
          name: "StockOutItemForm"
        });
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
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }
  .top-bar {
    background: white;
    position: sticky;
    top: 0;
    z-index: 999;
    height: 70px;
    box-shadow: 0 10px 50px rgba(168, 168, 168, 0.25);
  }
  .stock-out-header {
    display: flex;
    height: 46px;
    justify-content: space-around;
    align-items: center;
  }
  .stock-out {
    margin-left: 12px;
    margin-top: 22px;
    margin-right: 12px;
  }
  .stock-out .header {
    margin-top: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 13px;
    margin-right: 12px;
  }
  .header .bot {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    display: inline-block;
  }
  .header .context {
      text-align: left;
    margin-left: 7px;
    flex: 1;
    font-size: 12px;
    color: #3f7ffe;
  }
  .header .icon {
    margin-right: 10px;
    width: 18px;
    height: 18px;
  }
  .content {
      text-align: left;
    margin-top: 16px;
    margin-left: 13px;
    display: flex;
    align-items: center;
  }
  .content div div {
    font-family: PingFangSC-Regular;
    color: #4a4a4a;
    font-size: 13px;
    line-height: 28px;
  }
  .content .confirm {
    margin-left: 60px;
  }
  .van-tabbar {
    border-top: 1px solid rgba(0, 0, 0, 0.25);
    height: 57px !important;
  }
  .van-tabbar-item {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    line-height: 1;
    font-size: 11px;
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
