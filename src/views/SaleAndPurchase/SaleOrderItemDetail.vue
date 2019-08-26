<template>
  <!-- 销售订单详情 -->
  <div class="sale_order">
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
              v-if="item.status == 1"
              class="bot"
              style="background: linear-gradient(135deg, #4181ff, #2360ef);"
            ></span>
            <span
              v-if="item.status == 1"
              class="bot"
              style="background: linear-gradient(135deg, #4181ff, #2360ef);"
            ></span>
            <span
              v-if="item.status == 0"
              class="bot"
              style="background: linear-gradient(135deg, #FF9779, #F6617B);"
            ></span>
            <span
              v-if="item.status == 3"
              class="bot"
              style="background: linear-gradient(135deg, #FF9779, #F6617B);"
            ></span>
            <span
              v-if="item.status == 4"
              class="bot"
              style="background: linear-gradient(135deg, #F7C77F, #FF9860);"
            ></span>
            <span
              v-if="item.status == 5"
              class="bot"
              style="background: linear-gradient(135deg, #F7C77F, #FF9860);"
            ></span>
            <span
              v-if="item.status == 6"
              class="bot"
              style="background: linear-gradient(135deg, #F7C77F, #FF9860);"
            ></span>
            <span
              v-if="item.status == 99"
              class="bot"
              style="background: linear-gradient(135deg, #F7C77F, #FF9860);"
            ></span>
            <span class="context">{{ item.saleOrder.orderNo }}</span>
            <!-- <span class="context text-right">{{
              item.status | statusFilter
            }}</span> -->
          </div>
          <div class="content d-flex jc-between">
            <div>
              <div>物料名称: {{ item.materielSku.name }}</div>
              <div>物料型号: {{ item.materielSku.model }}</div>
              <div>销售订单数量: {{ item.qty }}</div>
              <div>当前库存: {{ item.materielSku.stockUseNum }}</div>
              <div>单价: {{ item.price }}</div>
              <div>总价: {{ item.price * item.qty }}</div>
              <div style="margin-bottom:0.05rem"></div>
            </div>
          </div>
        </div>
      </van-list>
      <div
        class="d-flex jc-around ml-3"
        v-if="this.orderType == '0' && this.saleOrderItemStatus == 1"
      >
        <div class="confirm mt-3">
          <div
            style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #F7C77F, #FF9860);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
            @click="saleOrderPass()"
          >
            审核通过
          </div>
        </div>
        <div class="confirm mt-3">
          <div
            style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #FF9779 , #F6617B);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
            @click="saleOrderUnPass()"
          >
            审核驳回
          </div>
        </div>
      </div>
      <div
        class="confirm ml-4"
        v-if="
          this.records.length &&
            (this.orderType == '1' || this.saleOrderItemStatus != 1)
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
          @click="findSaleOrderItemList"
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
import { findSaleOrderItemList, SaleOrderPass } from "@/api/api";
import { getStore } from "@/util/util";
// import { Dialog } from "vant";
export default {
  data() {
    return {
      active: 1,
      loading: false,
      finished: false,
      act: undefined,
      orderType: undefined,
      StockInType: undefined,
      saleOrderItemStatus: 1,
      records: [],
      searchParams: {},
      params: {
        page: 1,
        pageSize: 10,
        saleOrderId: "1111",
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
    this.saleOrderItemStatus = getStore("saleOrderItemStatus");
    // eslint-disable-next-line no-console
    console.log(this.saleOrderItemStatus);
  },
  mounted() {
    this.params.fid = this.fid;
    this.params.saleOrderId = getStore("SaleOrderItemId");
    this.orderType = getStore("orderType");

    // let StockInType = getStore("StockInType");
    // this.StockInType = StockInType;
    // // console.log(this.StockInType);

    // let active = getStore("active");
    // this.act = active;
    // // console.log(this.act);
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
      this.findSaleOrderItemList();
    },
    // onLoadMore() {
    //   this.findReserveOrderList();
    // },
    findSaleOrderItemList() {
      this.params.searchParams = this.searchParams;
      // this.params.searchParams["EQ_status"] = "0";
      // 获取记录
      findSaleOrderItemList(this.params)
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
    saleOrderPass() {
      this.passParams.id = getStore("SaleOrderItemId");
      SaleOrderPass(this.passParams);
      this.$router.push("/sale/and/purchase");
    },
    saleOrderUnPass() {
      this.unPassParams.id = getStore("SaleOrderItemId");
      SaleOrderPass(this.unPassParams);
      this.$router.push("/sale/and/purchase");
    },
    onTitleClickLeft() {
      // 返回
      this.$router.push({
        name: "Main"
      });
    },
    onTitileClickRight() {
      // 查询
      this.$router.push({
        name: "StockInSearch"
      });
    },
    onClickForm() {
      this.$router.push({
        name: "ReserveOrderForm"
      });
    },
    onClickSearch() {
      this.$router.push({
        name: "StockInSearch"
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
    back() {
      this.$router.push("/sale/order");
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
        realVal = "待审核";
      } else if (value == 2) {
        realVal = "审核通过";
      } else if (value == 3) {
        realVal = "审核驳回";
      } else if (value == 4) {
        realVal = "未发货";
      } else if (value == 5) {
        realVal = "部分发货";
      } else if (value == 6) {
        realVal = "全部发货";
      } else if (value == 99) {
        realVal = "已关闭";
      }
      return realVal;
    },
    inTypeValue(value) {
      let realVal = "";
      if (value == 1) {
        realVal = "采购入库";
      } else if (value == 2) {
        realVal = "退货入库";
      } else if (value == 3) {
        realVal = "外协入库";
      } else if (value == 4) {
        realVal = "借用入库";
      } else if (value == 5) {
        realVal = "废品入库";
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
