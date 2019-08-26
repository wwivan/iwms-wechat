<template>
  <div>
    <van-pull-refresh v-model="loading" @refresh="onRefreshList">
      <van-list v-model="loading" :finished="finished" @load="onLoadMore">
        <div
          v-for="(item, index) in records"
          :key="index"
          class="check-account"
          :class="index < records.length - 1 ? 'bottom' : ''"
        >
          <div class="header">
            <span
              v-show="item.status == 3"
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
            <span class="context">{{ item.orderNo }}</span>
          </div>
          <div class="content">
            <div>
              <!-- <div>对账单号: {{item.orderNo}}</div> -->
              <div>
                供应商:
                {{ item.supplier.id == undefined ? "" : item.supplier.name }}
              </div>
              <div>
                客户:
                {{ item.customer.id == undefined ? "" : item.customer.name }}
              </div>
              <!-- <div>盘点类型: {{item.type | typeFilter}}</div>
              <div>状态: {{item.status | formatStockTakeStatus}}</div>-->
              <div>起始时间: {{ item.startTime }}</div>
              <div>结束时间: {{ item.endTime }}</div>
              <div>送货单号：{{ item.purchaseNo }}</div>
              <div style="margin-bottom:0.05rem"></div>
            </div>
            <div class="confirm">
              <div
                style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
                @click="findStockTakeDetail(item)"
              >
                详情
              </div>
            </div>
          </div>
        </div>
      </van-list>
      <div class="van-list__loading">
        <div
          v-if="!loading && records.length === 0"
          @click="findStockTakeList"
          style="height: 10rem"
        >
          <span class="van-list__loading-text">暂无数据, 下拉刷新</span>
        </div>
      </div>
    </van-pull-refresh>
    <div
      class="bg-primary d-flex"
      style="position:fixed;bottom:0.8rem;right:0.4rem;width:0.92rem;height:0.3rem;border-radius:0.3rem;overflow:hidden"
    >
      <button
        class="bg-peach-red-dark text-white"
        style="width:0.45rem;height:0.3rem;border:none"
        @click="checkAccountCreate"
      >
        <span class="iconfont icon-xinjian"></span>
      </button>
      <div class="bg-white" style="width:0.02rem;height:0.3rem"></div>
      <button
        class="bg-peach-red text-white"
        style="width:0.45rem;height:0.3rem;border:none"
        @click="checkAccountSearch"
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
import { findCheckAccountList, doToCell } from "@/api/api";
import {
  setStore,
  getStore,
  removeStore,
  formatStockTakeStatus
} from "@/util/util";
// eslint-disable-next-line no-unused-vars
import { Dialog } from "vant";
Vue.filter("formatStockTakeStatus", formatStockTakeStatus);
export default {
  data() {
    return {
      active: 1,
      loading: false,
      finished: false,
      records: [],
      searchParams: {},
      params: {
        pageNumber: 1,
        pageSize: 10,
        sortType: "auto",
        fid: "", //42dd7498-b9d3-43b3-b736-3e9844f03ff5
        searchParams: {}
      }
    };
  },
  mounted() {
    this.params.fid = this.fid;
    let temp = getStore("stockTakeSearchParams");
    if (temp) {
      removeStore("stockTakeSearchParams");
      this.searchParams = JSON.parse(temp);
    } else {
      this.searchParams = {};
    }
  },
  methods: {
    checkAccountCreate() {
      // eslint-disable-next-line no-console
      console.log("新建对账单");
      this.$router.push("/check/account/form");
    },
    checkAccountSearch() {
      // eslint-disable-next-line no-console
      console.log("对账单查询");
      this.$router.push("/check/account/search");
    },
    onRefreshList() {
      // 刷新
      //this.params.pageNumber = 1;
      this.records = [];
      this.findCheckAccountList();
    },
    onLoadMore() {
      // eslint-disable-next-line no-console
      console.log("############");
      //this.params.pageNumber = this.params.pageNumber + 1;
      // eslint-disable-next-line no-console
      console.log(this.params.pageNumber);
      this.findCheckAccountList();
    },
    findCheckAccountList() {
      this.params.searchParams = this.searchParams;
      // 获取记录
      findCheckAccountList(this.params)
        .then(res => {
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(res));
          this.loading = false;
          this.finished = res.data.last;
          this.records.push(...res.data.content);
        })
        .catch(error => {
          this.finished = true;
          this.loading = false;
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(error));
          Toast("请求错误");
        });
    },
    // onTitleClickLeft() {
    //   // 返回
    //   this.$router.push({
    //     name: "Main"
    //   });
    // },
    // onClickSearch() {
    //   // 查询
    //   this.$router.push({
    //     name: "StockTakeSearch"
    //   });
    // },
    findCheckAccountDetail(CheckAccountDetailParams) {
      //获取单个盘点单详细
      setStore("CheckAccountDetailParams", CheckAccountDetailParams);
      this.$router.push("/check/account/detail");
    }
    // onClickForm() {
    //   this.$router.push({
    //     name: "StockTakeForm"
    //   });
    // }
  },
  computed: {
    ...mapGetters(["fid"])
  },
  filters: {
    typeFilter(value) {
      let realVal = "";
      if (value == 1) {
        realVal = "按区盘点";
      } else if (value == 2) {
        realVal = "按物料盘点";
      }
      return realVal;
    }
  }
};
</script>

<style lang="scss" scoped>
.stock-take {
  margin-left: 0.12rem;
  margin-top: 0.22rem;
  margin-right: 0.12rem;
}
.stock-take .header {
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
</style>
