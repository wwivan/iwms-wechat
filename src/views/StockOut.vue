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
            <span
              v-show="item.status == 3"
              class="bot"
              style="background: linear-gradient(135deg, #4181ff, #2360ef);"
            ></span>
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
            <span class="context">{{item.orderNo}}</span>
            <span style="font-size:13px;color:#4181FF">{{item.status | formatStockOutStatus}}</span>
          </div>
          <div class="content">
            <div>
              <div>出库类型: {{item.type | formatType}}</div>
              <div
                v-if="item.type == '1'|| item.type == '2'||item.type == '4'"
              >客户: {{item.customer==undefined? '':item.customer.name}}</div>
              <div v-if="item.type == '1'">送货单号: {{item.deliveryNo}}</div>
              <!-- <div>状态: {{item.status | formatStockInStatus}}</div> -->
              <!-- <div>发票号: {{item.purchaseNo}}</div> -->
              <!-- <div>仓库: {{item.wareHouse==undefined? '':item.wareHouse.name}}</div> -->
              <div v-if="item.type=='3'">领用人: {{item.operatorUser}}</div>
              <!-- <div>操作人: {{item.operatorUser}}</div> -->
              <div>出库时间: {{item.createTime }}</div>
              <div style="margin-bottom:5px"></div>
            </div>
            <div class="confirm">
              <div
                v-if="StockOutType == 1"
                style="width:80px;height:33px;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:33px;color:white;border-radius:3px;font-size:15px"
                @click="findStockOutDetail(item)"
              >详情</div>
              <div
                v-if="StockOutType == 3"
                style="width:80px;height:33px;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:33px;color:white;border-radius:3px;font-size:15px"
                @click="findStockOutDetail(item)"
              >查看明细</div>
            </div>
          </div>
        </div>
      </van-list>
      <div class="van-list__loading">
        <div
          v-if="!loading && records.length === 0"
          @click="findStockOutList"
          style="height: 1000px"
        >
          <span class="van-list__loading-text">暂无数据, 下拉刷新</span>
        </div>
      </div>
    </van-pull-refresh>
    <div
      class="bg-primary d-flex"
      style="position:fixed;bottom:80px;right:40px;width:92px;height:30px;border-radius:30px;overflow:hidden"
    >
      <button
        class="bg-peach-red-dark text-white"
        style="width:45px;height:30px;border:none"
        @click="stockOutCreate"
      >新建</button>
      <div class="bg-white" style="width:2px;height:30px"></div>
      <button
        class="bg-peach-red text-white"
        style="width:45px;height:30px;border:none"
        @click="stockOutSearch"
      >搜索</button>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Toast } from "vant";
import { mapGetters } from "vuex";
import { findStockOutList, toLocation, saveStockLibrary } from "@/api/api";
import { CompleteGetStockOutList } from "@/api/api";
import {
  setStore,
  getStore,
  removeStore,
  formatStockOutStatus
} from "@/util/util";
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
    console.log(1212321231122);
    console.log(this.StockOutType);
    // if(StockOutType == '2'){//分配货位
    //   this.searchParams.EQ_status = 1;
    // }else if(StockOutTy2pe == '3'){//拣货
    //   this.params.searchParams["IN_status"] = 1,2,3;
    // }else {
    //   console.log(`StockOutType: ${ StockOutType }`)
    // }
  },
  methods: {
    stockOutCreate(){
      console.log("新建出库单")
      this.$router.push("/stock/out/form")
    },
    stockOutSearch(){
      console.log("搜索出库单")
      this.$router.push("/stock/out/search")
    },
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
      console.log("############");
      //this.params.pageNumber = this.params.pageNumber + 1;
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
      this.$router.push({
        name: "StockOutSearch"
      });
    },
    onClickForm() {
      setStore("StockOutType", "1");
      this.$router.push({
        name: "StockOutForm"
      });
    },
    onTitileClickRight() {
      // 查询
      this.$router.push({
        name: "StockOutSearch"
      });
    },
    findStockOutDetail(StockOutDetailParams) {
      //获取单个出库单详细
      // if(StockOutDetailParams.status == '3') {
      //    this.addStockLibrary(StockOutDetailParams.id);
      // }
      console.log("11111111111111111")
      setStore("StockOutDetailParams", StockOutDetailParams);
      this.$router.push('/stock/out/detail');
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

