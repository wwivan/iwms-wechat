<template>
  <div class="reserve-order">
    <van-pull-refresh v-model="loading" @refresh="onRefreshList">
      <van-list v-model="loading" :finished="finished">
        <div
          v-for="(item, index) in records"
          :key="index"
          class="reserve-order-detail"
          :class="(index < (records.length-1))?'bottom':''"
        >
          <div class="header">
            <span
              v-show="item.status==0"
              class="bot"
              style="background: linear-gradient(135deg, #4181ff, #2360ef);"
            ></span>
            <!-- <span
                  v-show="item.status==1"
                  class="bot"
                  style="background: linear-gradient(135deg, #FF9779, #F6617B);"
                ></span>
                <span
                  v-show="item.status==2"
                  class="bot"
                  style="background: linear-gradient(135deg, #4181ff, #2360ef);"
                ></span>
                <span
                  v-show="item.status==3"
                  class="bot"
                  style="background: linear-gradient(135deg, #4181ff, #2360ef);"
                ></span>
                <span
                  v-show="item.status==4"
                  class="bot"
                  style="background: linear-gradient(135deg, #F7C77F, #FF9860);"
            ></span>-->
            <span class="context">{{item.status | statusFilter}}</span>
          </div>
          <div class="content">
            <div>
              <div>入库仓库: {{item.wareHouse == undefined? "":item.wareHouse.name}}</div>
              <div>供应商: {{item.supplier == undefined? "":item.supplier.name}}</div>
              <div>送货单号:{{item.deliveryNumber}}</div>
              <div style="margin-bottom:5px"></div>
            </div>

            <div class="confirm">
              <div
                style="width:80px;height:33px;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:33px;color:white;border-radius:3px;font-size:15px"
                @click="findReserveOrderItem(item)"
              >确认收货</div>
            </div>
          </div>
        </div>
      </van-list>

      <div class="van-list__loading">
        <div
          v-if="!loading && records.length === 0"
          @click="findReserveOrderList"
          style="height: 1000px"
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
import { findReserveOrderList } from "@/api/api";
import { setStore, getStore, removeStore } from "@/util/util";
import { Dialog } from "vant";
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
        pageNumber: 1,
        pageSize: 30,
        sortType: "auto",
        fid: "", //42dd7498-b9d3-43b3-b736-3e9844f03ff5
        searchParams: {}
      }
    };
  },
  created() {
    this.onRefreshList();
  },
  mounted() {
    this.params.fid = this.fid;
    let StockInType = getStore("StockInType");
    this.StockInType = StockInType;
    // console.log(this.StockInType);

    let active = getStore("active");
    this.act = active;
    // console.log(this.act);
    let temp = getStore("ReserveSearchParam");
    if (temp) {
      removeStore("ReserveSearchParam");
      this.searchParams = JSON.parse(temp);
    } else {
      this.searchParams = {};
    }
  },
  methods: {
    onRefreshList() {
      // 刷新
      //this.params.pageNumber = 1;
      this.records = [];
      this.findReserveOrderList();
    },
    // onLoadMore() {
    //   this.findReserveOrderList();
    // },
    findReserveOrderList() {
      this.params.searchParams = this.searchParams;
      this.params.searchParams["EQ_status"] = "0";
      // 获取记录
      findReserveOrderList(this.params)
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
          Toast("请求错误");
        });
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
    findReserveOrderItem(ReserveOrderItemParams) {
      //获取单个入库单详细
      setStore("StockInType", this.StockInType);
      setStore("act", this.act);
      setStore("ReserveOrderItemParams", ReserveOrderItemParams);
      this.$router.push('/reserve/order/detail');
    }
  },
  computed: {
    ...mapGetters(["fid"])
  },
  filters: {
    statusFilter(value) {
      let realVal = "";
      if (value == 0) {
        realVal = "等待确认";
      } else if (value == 1) {
        realVal = "已确认";
      } else if (value == 2) {
        realVal = "已拒绝";
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
.reserve-order-header {
  display: flex;
  height: 46px;
  justify-content: space-around;
  align-items: center;
}
.reserve-order .tab {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
}
.reserve-order .tab .tab-active {
  font-size: 13px;
  color: #3f7ffe;
  font-weight: 500;
}
.reserve-order .tab .tab-normal {
  font-size: 13px;
  color: #4a4a4a;
}
.reserve-order .tab_line_left {
  width: 20px;
  height: 3px;
  background: linear-gradient(0, #4181ff, #2360ef);
  margin-top: -10px;
  margin-left: 84px;
}
.reserve-order .tab_line_right {
  width: 20px;
  height: 3px;
  background: linear-gradient(0, #4181ff, #2360ef);
  margin-top: -10px;
  margin-left: 272px;
}
.reserve-order-detail {
  margin-left: 12px;
  margin-top: 22px;
  margin-right: 12px;
}
.reserve-order-detail .header {
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
  margin-left: 135px;
}
.bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}
</style>