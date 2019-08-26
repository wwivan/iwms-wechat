<template>
  <!-- 多个采购计划订单 -->
  <div class="purchase_plan_order">
    <van-pull-refresh v-model="loading" @refresh="onRefreshList">
      <van-list v-model="loading" :finished="finished">
        <div
          v-for="(item, index) in records"
          :key="index"
          class="list"
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
              style="background: linear-gradient(135deg, #4181ff, #2360ef);"
            ></span>
            <span
              v-show="item.status == 3"
              class="bot"
              style="background: linear-gradient(135deg, #4181ff, #2360ef);"
            ></span>
            <span
              v-show="item.status == 4"
              class="bot"
              style="background: linear-gradient(135deg, #F7C77F, #FF9860);"
            ></span>
            <span class="context">{{ item.purchasePlanOrder.orderNo }}</span>
            <span class="context text-right">{{
              item.status | statusFilter
            }}</span>
          </div>
          <div class="content d-flex jc-between">
            <div>
              <div>采购量: {{ item.actualNum }} 个</div>
              <div>采购总价: {{ item.amount }} 元</div>
              <div>创建日期: {{ item.createTime }}</div>
              <div style="margin-bottom:0.05rem"></div>
            </div>
            <div class="confirm">
              <div
                style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
                @click="findPurchasePlanOrderItem(item)"
              >
                查看详情
              </div>
            </div>
            <!-- <div class="confirm">
              <div
                style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
                @click="findReserveOrderItem(item)"
              >审核通过</div>
            </div>
            <div class="confirm">
              <div
                style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
                @click="findReserveOrderItem(item)"
              >审核驳回</div>
            </div>-->
          </div>
        </div>
      </van-list>
      <div class="van-list__loading">
        <div
          v-if="!loading && records.length === 0"
          @click="purchasePlanOrderList"
          style="height: 10rem"
        >
          <span class="van-list__loading-text">暂无数据, 下拉刷新</span>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapGetters } from "vuex";
import { purchasePlanOrderList } from "@/api/api";
import { setStore } from "@/util/util";
// import { Dialog } from "vant";
export default {
  data() {
    return {
      active: 1,
      loading: false,
      finished: false,
      act: undefined,
      StockInType: undefined,
      records: [],
      searchParams: {},
      params: {
        page: 1,
        pageSize: 10,
        // purchasePlanOrderId: "dd080d60-5018-456e-9d54-ed8c4680cd92",
        searchParams: {}
      }
    };
  },
  created() {
    this.onRefreshList();
  },
  mounted() {
    this.params.fid = this.fid;
    // let StockInType = getStore("StockInType");
    // this.StockInType = StockInType;
    // // console.log(this.StockInType);

    // let active = getStore("active");
    // this.act = active;
    // console.log(this.act);
    // let temp = getStore("ReserveSearchParam");
    // if (temp) {
    //   removeStore("ReserveSearchParam");
    //   this.searchParams = JSON.parse(temp);
    // } else {
    //   this.searchParams = {};
    // }
  },
  methods: {
    onRefreshList() {
      // 刷新
      //this.params.pageNumber = 1;
      this.records = [];
      this.purchasePlanOrderList();
    },
    // onLoadMore() {
    //   this.findReserveOrderList();
    // },
    purchasePlanOrderList() {
      this.params.searchParams = this.searchParams;
      this.params.searchParams["EQ_status"] = "0";
      // 获取记录
      purchasePlanOrderList(this.params)
        .then(res => {
          // console.log(JSON.stringify(res));
          this.loading = false;
          this.finished = res.data.last;
          this.records.push(...res.data.content);
        })
        .catch(error => {
          this.finished = true;
          this.loading = false;
          Toast("请求错误" + error);
        });
    },
    // onTitleClickLeft() {
    //   // 返回
    //   this.$router.push({
    //     name: "Main"
    //   });
    // },
    // onTitileClickRight() {
    //   // 查询
    //   this.$router.push({
    //     name: "StockInSearch"
    //   });
    // },
    // onClickForm() {
    //   this.$router.push({
    //     name: "ReserveOrderForm"
    //   });
    // },
    // onClickSearch() {
    //   this.$router.push({
    //     name: "StockInSearch"
    //   });
    // },
    // onTabChange(active) {
    //   if (active == "0") {
    //     this.$router.push({
    //       name: "Main"
    //     });
    //   } else if (active == "1") {
    //     this.$router.push({
    //       name: "Statistics"
    //     });
    //   } else if (active == "2") {
    //     this.$router.push({
    //       name: "Mine"
    //     });
    //   }
    // },
    findPurchasePlanOrderItem(PurchasePlanOrderItemParams) {
      //获取单个入库单详细
      // setStore("StockInType", this.StockInType);
      // setStore("act", this.act);
      setStore(
        "purchasePlanOrderId",
        PurchasePlanOrderItemParams.purchasePlanOrder.id
      );
      setStore("planOrderId", PurchasePlanOrderItemParams.id);
      this.$router.push("/purchase/plan/order/detail");
    }
  },
  computed: {
    ...mapGetters(["fid"])
  },
  filters: {
    statusFilter(value) {
      let realVal = "";
      if (value == 0) {
        realVal = "未审核";
      } else if (value == 1) {
        realVal = "已审核";
      } else if (value == 2) {
        realVal = "已拒绝";
      }
      return realVal;
    }
  }
};
</script>

<style scoped>
.list {
  margin-left: 0.12rem;
  margin-top: 0.22rem;
  margin-right: 0.12rem;
}
.list .header {
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
  margin-right: 0.13rem;
  display: flex;
  align-items: center;
}
.content div div {
  font-family: PingFangSC-Regular;
  color: #4a4a4a;
  font-size: 0.13rem;
  line-height: 0.28rem;
}

.bottom {
  border-bottom: 0.01rem solid rgba(0, 0, 0, 0.25);
}
</style>
