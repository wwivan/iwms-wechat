<template>
  <!-- 采购计划详情单 -->
  <div class="purchase_plan_order_detail">
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
            <!-- <span class="context text-right">{{
              item.status | statusFilter
            }}</span> -->
          </div>
          <div class="content d-flex jc-between">
            <div>
              <div>物料名称: {{ item.materielSku.name }}</div>
              <div>物料型号: {{ item.materielSku.model }}</div>
              <div>订单需求量: {{ item.demandNum }} 个</div>
              <div>实际采购量: {{ item.actualNum }} 个</div>
              <div>库存数量: {{ item.materielSku.stockUseNum }} 个</div>
              <div>价格小计: {{ item.materielSku.price }} 元</div>
              <div style="margin-bottom:0.05rem"></div>
            </div>
            <div style="width:0.8rem">
              <div class="confirm">
                <div
                  style="width:0.6rem;height:0.33rem;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
                  @click="purchasePlanOrderSupplier(item)"
                >
                  详情
                </div>
              </div>
            </div>
          </div>
        </div>
      </van-list>
      <div class="d-flex jc-around ml-3" v-if="this.purchasePlanStatus == 1">
        <div class="confirm mt-3">
          <div
            style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #F7C77F, #FF9860);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
            @click="purchaseOrderPass()"
          >
            审核通过
          </div>
        </div>
        <div class="confirm mt-3">
          <div
            style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #FF9779 , #F6617B);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
            @click="purchaseOrderUnPass()"
          >
            审核驳回
          </div>
        </div>
      </div>
      <div
        class="confirm ml-4"
        v-if="
          this.records.length &&
            (this.orderType != '2' || this.purchasePlanStatus != 1)
        "
      >
        <div
          style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
          @click="back"
        >
          返回
        </div>
      </div>
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
import { purchasePlanOrderList, purchaseOrderPass } from "@/api/api";
import { setStore, getStore } from "@/util/util";
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
      purchasePlanStatus: undefined,
      orderType: "2",
      params: {
        page: 1,
        pageSize: 10,
        purchasePlanOrderId: "",
        searchParams: {}
      },
      detailParams: {
        page: 1,
        pageSize: 10,
        purchasePlanOrderItemId: "87eebe08-bd2a-429e-a717-0f24e2a369a3",
        searchParams: {}
      },
      passParams: {
        id: "233e3",
        status: "2"
      },
      unPassParams: {
        id: "233e3",
        status: "3"
      }
    };
  },
  created() {
    this.onRefreshList();
  },
  mounted() {
    this.params.fid = this.fid;
    this.params.purchasePlanOrderId = getStore("purchasePlanId");
    this.detailParams.PurchasePlanOrderItem = getStore("purchasePlanId");
    this.passParams.id = getStore("purchasePlanId");
    this.purchasePlanStatus = getStore("purchasePlanStatus");
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
          // console.log(JSON.stringify(error));
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
    //查看供应商分配
    purchasePlanOrderSupplier(PurchasePlanOrderItem) {
      setStore("planOrderId", PurchasePlanOrderItem.id);
      this.$router.push("/purchase/plan/distribution/detail");
    },
    //审核通过
    purchaseOrderPass() {
      this.passParams.id = getStore("purchasePlanId");
      purchaseOrderPass(this.passParams);
      this.$router.push("/sale/and/purchase");
    },
    // purchaseOrderPass1(){
    //
    //   // purchaseOrderPass(this.passParams).then(res=>{

    //   // })

    // }
    //审核驳回
    purchaseOrderUnPass() {
      this.unPassParams.id = getStore("purchasePlanId");
      purchaseOrderPass(this.unPassParams);
      this.$router.push("/sale/and/purchase");
    },
    back() {
      this.$router.push("/sale/and/purchase");
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
