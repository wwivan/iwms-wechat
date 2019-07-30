<template>
  <div>
    <van-pull-refresh v-model="loading" @refresh="onRefreshList">
      <van-list v-model="loading" :finished="finished" @load="onLoadMore">
        <div
          v-for="(item, index) in records"
          :key="index"
          class="stock-out"
          :class="(index < (records.length-1))?'bottom':''"
        >
          <div class="header">
            <span class="bot" style="background: linear-gradient(135deg, #4181ff, #2360ef);"></span>
            <span
              v-show="item.status == 4"
              class="bot"
              style="background: linear-gradient(135deg, #FF9779, #F6617B);"
            ></span>
            <span
              v-show="item.status == 5"
              class="bot"
              style="background: linear-gradient(135deg, #F7C77F, #FF9860);"
            ></span>
            <span
              style="font-size:13px;color:#4181FF;margin-left:6px;"
            >{{item.stockOutItem.stockOut==undefined? '':item.stockOutItem.stockOut.orderNo}}</span>
          </div>
          <div class="content">
            <div>
              <div>物料名称: {{item.stockOutItem==undefined? '':item.stockOutItem.materielSku.name}}</div>
              <div>物料型号: {{item.stockOutItem.materielSku.model}}</div>
              <div>出库数量: {{item.locationNum}}</div>
              <div>
                货位:{{item.cell==undefined? '':item.cell.pallet.wareArea.wareHouse.code}}仓库 {{item.cell==undefined? '':item.cell.pallet.wareArea.code}}库区
                {{item.cell==undefined? '':item.cell.pallet.code}}货架
                {{item.cell==undefined? '':item.cell.column}}列
                {{item.cell==undefined? '':item.cell.layer}}层
              </div>
              <div style="margin-bottom:5px"></div>
            </div>
          </div>
          <div class="confirm" style="margin-left:135px">
            <div
              v-if="item.status != '1'"
              @click="findCamera(item,StockOutType)"
              style="width:80px;height:33px;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:33px;color:white;border-radius:3px;font-size:15px"
            >拣货</div>
          </div>
        </div>
      </van-list>
      <div class="van-list__loading">
        <div
          v-if="!loading && records.length === 0"
          @click="findToLocationByStockOutItemAndCell"
          style="height: 1000px"
        >
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
import { findToLocationByStockOutItemAndCell } from "@/api/api";
import { setStore, getStore, formatFen2Yuan, removeStore } from "@/util/util";
export default {
  data() {
    return {
      active: 1,
      loading: false,
      finished: false,
      records: [],
      StockOutType: undefined,
      stockOut: {},
      searchParams: {},
      params: {
        stockOutItemId: undefined,
        pageNumber: 0,
        pageSize: 1,
        sortType: "auto",
        fid: "42dd7498-b9d3-43b3-b736-3e9844f03ff5",
        searchParams: {}
      }
    };
  },
  mounted() {
    this.params.fid = this.fid;
    let temp = getStore("stockOutItem");
    if (temp) {
      removeStore("stockOutItem");
      //this.searchParams = JSON.parse(temp);
    } else {
      this.searchParams = {};
    }
    let StockOutType = getStore("StockOutType");
    this.StockOutType = StockOutType;
    console.log(this.StockOutType);
    let stockOutDetailParams = JSON.parse(temp);
    //console.log(stockOutDetailParams.id);
    this.params.stockOutItemId = stockOutDetailParams.id;
    this.findToLocationByStockOutItemAndCell();
  },
  methods: {
    onRefreshList() {
      // 刷新
      this.params.pageNumber = 1;
      this.records = [];
      this.findToLocationByStockOutItemAndCell();
    },
    onLoadMore() {
      this.params.pageNumber = this.params.pageNumber + 1;
      //console.log(this.params.pageNumber);
      this.findToLocationByStockOutItemAndCell();
    },
    findToLocationByStockOutItemAndCell() {
      this.params.searchParams = this.searchParams;

      // 获取记录
      //console.log('获取记录');
      findToLocationByStockOutItemAndCell(this.params)
        .then(res => {
          this.loading = false;
          this.finished = true;
          this.records = res.data;
        })
        .catch(error => {
          this.finished = true;
          this.loading = false;
          console.log(JSON.stringify(error));
          Toast("请求错误");
        });
    },

    findCamera(item, StockOutType) {
      setStore("item", item);
      setStore("StockOutType", StockOutType);
      console.log(StockOutType);
      this.$router.push({
        name: "StockOutCamera"
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

    onTitleClickLeft() {
      // 返回
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
<style lang="scss" scoped>
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
  justify-content:start;
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
  margin-left: 7px;
  flex: 1;
  font-size: 12px;
  color: #3f7ffe;
  text-align: left;
}
.header .icon {
  margin-right: 10px;
  width: 18px;
  height: 18px;
}
.content {
  margin-top: 16px;
  margin-left: 13px;
  display: flex;
  align-items: center;
  text-align: left;
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
</style>
