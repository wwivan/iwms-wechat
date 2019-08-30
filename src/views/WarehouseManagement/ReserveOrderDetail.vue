/* eslint-disable no-unused-vars */
<template>
  <div>
    <van-pull-refresh v-model="loading" @refresh="onRefreshList">
      <van-list v-model="loading" :finished="finished" @load="onLoadMore">
        <!-- <van-panel
          v-for="(item, index) in records"
          :title="item.barcode == undefined ? '' : item.barcode"
          :key="index"
          :status="item.status | statusFilter"
        >
          <div class="panel-item">
            <div >物料名称: {{ item.materielSku.name }}</div>
            <div >物料型号: {{ item.materielSku.model }}</div>
            <div >送货数量: {{ item.purchaseNum }}</div>
            <div v-if="item.status == '1'">确认数量: {{ item.qty }}</div>
            <van-field
              v-if="item.status == '0'"
              clearable
              label="确认数量"
              placeholder="请输入 确认数量"
              v-model="item.qty"
              style="background-color:#F4F4F4;"
            ></van-field>
          </div>
        </van-panel> -->
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
            <!-- <span
              v-show="item.stockIn.status == '1'"
              class="bot"
              style="background: linear-gradient(135deg, #F7C77F, #FF9860);"
            ></span> -->
            <span class="context">{{ item.status | statusFilter }}</span>
          </div>
          <div class="content">
            <div>
              <div>物料名称: {{ item.materielSku.name }}</div>
              <div>物料型号: {{ item.materielSku.model }}</div>
              <div>送货数量: {{ item.purchaseNum }}</div>
              <div v-if="item.status == '1'">确认数量: {{ item.qty }}</div>
              确认数量:
              <input
                v-if="item.status == '0'"
                placeholder="请输入确认数量"
                v-model="item.qty"
              />
              <div style="margin-bottom:0.05rem"></div>
            </div>
          </div>
        </div>
        <div
          class="confirm fs-md mt-3"
          v-if="records.length > 0 && status == '0'"
          @click="confirm()"
        >
          确认收货
        </div>
      </van-list>
      <div class="van-list__loading">
        <div
          v-if="!loading && records.length === 0"
          @click="findReserveOrderItemList"
          style="height: 10rem"
        >
          <span class="van-list__loading-text">暂无数据, 下拉刷新</span>
        </div>
      </div>
    </van-pull-refresh>
    <!-- 弹出框 -->
    <van-dialog
      v-model="show"
      confirmButtonText="确认收货"
      show-cancel-button
      :before-close="beforeClose"
    >
      <div>
        <van-nav-bar title="确认收货" />
        <van-pull-refresh v-model="loading" @refresh="onRefreshList">
          <!-- <van-list v-model="loading" :finished="finished" @load="onLoadMore"> -->
          <div class="panel-item">
            <picker-popup
              :title="'入库类型'"
              :placeholder="'请选提入库类型'"
              :selectedItem.sync="selectedStockInType"
              :columns="stockInTypes"
            />
            <picker-popup
              :title="'仓库'"
              :placeholder="'请选择仓库'"
              :selectedItem.sync="selectedWarehouse"
              :columns="sarehouses"
            />
          </div>
          <!-- </van-list> -->
        </van-pull-refresh>
      </div>
    </van-dialog>
    <!-- <van-nav-bar
      title="预约明细记录"
      left-text="返回"
      left-arrow
      @click-left="onTitleClickLeft"
    >
      <van-button
        slot="right"
        v-if="records.length == 0 || status == '0'"
        @click="onClickForm(StockInType)"
      >
        <van-icon name="plus" size="1.5em" />
      </van-button>
      <van-button slot="right" @click="onClickSearch">
        <van-icon name="search" size="1.5em" />
      </van-button>
    </van-nav-bar> -->
    <div
      class="btn d-flex"
      style="position:fixed;bottom:0.8rem;right:0.4rem;width:0.92rem;height:0.3rem;border-radius:0.3rem;overflow:hidden"
    >
      <button
        class="bg-peach-red-dark text-white"
        style="width:0.45rem;height:0.3rem;border:none"
        @click="onClickForm(StockInType)"
      >
        <span class="iconfont icon-xinjian"></span>
      </button>
      <div class="bg-white" style="width:0.02rem;height:0.3rem"></div>
      <button
        class="bg-peach-red text-white"
        style="width:0.45rem;height:0.3rem;border:none"
        @click="onClickSearch"
      >
        <span class="iconfont icon-sousuo"></span>
      </button>
    </div>
  </div>
</template>

<script>
import { Dialog } from "vant";
import PickerPopup from "@/component/PickerPopup";

import { Toast } from "vant";
import { mapGetters } from "vuex";
import {
  findReserveOrderItemList,
  findWareHouseList,
  confirmReserveOrderItem
} from "@/api/api";
import { getStore, setStore, formatFen2Yuan, removeStore } from "@/util/util";
export default {
  name: "StockInDetail",
  data() {
    return {
      show: false,
      active: 1,
      act: undefined,
      StockInType: undefined, //1明细，2封盘，3上架
      loading: false,
      finished: false,
      status: undefined,
      checkedInQty: undefined,
      reserveOrdertail: {},
      records: [],
      searchParams: {},
      params: {
        id: "",
        qty: undefined,
        reserveOrderNo: undefined,
        pageNumber: 1,
        inType: undefined,
        pageSize: 30,
        wareHouseId: undefined,
        sortType: "auto",
        fid: undefined,
        status: "0",
        searchParams: {}
      },
      findWareHouseListParams: {
        pageNumber: 1,
        pageSize: 99,
        sortType: "auto",
        fid: undefined,
        searchParams: {}
      },
      // 选择的入库类型
      selectedStockInType: {
        id: "",
        name: ""
      },
      // 入库类型候选项
      stockInTypes: [
        {
          name: "全部"
        },
        {
          id: "1",
          name: "采购入库"
        },
        {
          id: "2",
          name: "退货入库"
        },
        {
          id: "3",
          name: "外协入库"
        },
        {
          id: "4",
          name: "借用入库"
        },
        {
          id: "5",
          name: "废品入库"
        }
      ],
      selectedWarehouse: {
        name: ""
      },
      sarehouses: [
        {
          id: undefined,
          name: undefined,
          loading: true
        }
      ]
    };
  },
  mounted() {
    this.params.fid = this.fid;
    this.findWareHouseListParams.fid = this.fid;
    let temp = getStore("ReserveDetailSearchParams");
    if (temp) {
      removeStore("ReserveDetailSearchParams");
      this.searchParams = JSON.parse(temp);
    } else {
      this.searchParams = {};
    }
    let StockInType = getStore("StockInType");
    this.StockInType = StockInType;
    // eslint-disable-next-line no-console
    console.log(this.StockInType);
    let act = getStore("active");
    if (act) {
      // removeStore("active")
      this.act = act;
      // eslint-disable-next-line no-console
      console.log(this.act);
    }
    let temps = getStore("ReserveOrderItemParams");
    let reserveOrdertailParams = JSON.parse(temps);
    this.reserveOrdertail = reserveOrdertailParams;
    this.params.reserveOrderNo = reserveOrdertailParams.reserveOrderNo;
    this.params.reserveOrderId = reserveOrdertailParams.id;
  },
  methods: {
    onRefreshList() {
      // 刷新
      this.records = [];
      this.findReserveOrderItemList();
    },
    onLoadMore() {
      this.findReserveOrderItemList();
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
    confirm(item) {
      // eslint-disable-next-line no-console
      console.log(item);
      this.findWareHouseList();
      this.show = true;
    },
    findWareHouseList() {
      // 仓库列表
      findWareHouseList(this.findWareHouseListParams)
        .then(res => {
          this.sarehouses = [];
          let items = res.data.content;
          this.sarehouses.push(...items);
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
          Toast("请求仓库列表错误");
        });
    },
    //封闭托盘
    beforeClose(action, done) {
      if (action === "confirm") {
        Dialog.confirm({
          title: "提示",
          message: "确认收货？"
        })
          .then(() => {
            // on confirm
            // eslint-disable-next-line no-console
            console.log("1111111111111111111111111111111111111");
            this.params.wareHouseId = this.selectedWarehouse.id;
            this.params.inType = this.selectedStockInType.id;
            let qty = "";
            let id = "";
            // eslint-disable-next-line no-console
            console.log(this.records);
            for (let item of this.records) {
              qty += item.qty + ",";
              id += item.id + ",";
            }
            this.params.qty = qty.substring(0, qty.length - 1);
            this.params.id = id.substring(0, id.length - 1);
            // eslint-disable-next-line no-console
            console.log(this.params);

            // 获取记录
            confirmReserveOrderItem(this.params)
              .then(res => {
                // eslint-disable-next-line no-console
                console.log(JSON.stringify(res));
                this.loading = false;
                this.finished = res.data.last;
                Toast("收货成功!");
                done();
                this.$router.push("/warehouse/stockIn");
                setStore("stockType", "1");
              })
              .catch(error => {
                this.finished = true;
                this.loading = false;
                // eslint-disable-next-line no-console
                console.log(JSON.stringify(error));
                Toast("请求错误");
              });
          })
          .catch(() => {
            // on cancel
            // eslint-disable-next-line no-console
            console.log("2222222222222222222222222222222222222");
            done();
          });
      } else {
        done();
      }
    },

    findReserveOrderItemList() {
      this.params.searchParams = this.searchParams;
      // 获取记录
      findReserveOrderItemList(this.params)
        .then(res => {
          // eslint-disable-next-line no-console
          console.log(res.data);
          this.loading = false;
          this.finished = res.data.last;
          let items = res.data.content;
          for (let item of items) {
            if (item.qty == undefined) {
              item.qty = item.purchaseNum;
              this.status = item.status;
            }
          }
          this.records.push(...items);
        })
        .catch(error => {
          this.finished = true;
          this.loading = false;
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(error));
          Toast("请求错误");
        });
    },

    getCheckedInQty(id) {
      // eslint-disable-next-line no-console
      console.log(id);
      this.params.stockInItemId = id;
      // eslint-disable-next-line no-undef
      getCheckedInQty(this.params)
        .then(res => {
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(res));
          let items = res.data;
          // eslint-disable-next-line no-unused-vars
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
            // eslint-disable-next-line no-console
            console.log(items[key]);
          }
        })
        .catch(error => {
          this.finished = true;
          this.loading = false;
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(error));
          Toast("请求错误");
        });
    },
    toCell(materielSku) {
      setStore("toCells", materielSku);
      // eslint-disable-next-line no-console
      console.log(materielSku);
      this.$router.push({
        name: "StockInCameraCell"
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
      this.$router.push("/warehouse/stockIn");
      // setStore("stockType", "1");
    },
    onClickForm(StockInType) {
      setStore("StockInType", StockInType);
      setStore("act", this.act);
      setStore("reserveOrdertail", this.reserveOrdertail);
      //getStore("StockInDetailParams");
      this.$router.push("/warehouse/reserve/order/detail/form");
    },
    onClickSearch() {
      this.$router.push("/warehouse/reserve/order/detail/search");
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
  components: {
    PickerPopup
  },
  filters: {
    numFilter(value) {
      let realVal = formatFen2Yuan(value);
      return realVal;
    },
    statusFilter(value) {
      let realVal = "";
      if (value == 0) {
        realVal = "待确认";
      } else if (value == 1) {
        realVal = "已确认";
      }
      return realVal;
    }
  }
};
</script>

<style lang="scss" scoped>
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
  div {
    font-size: 0.13rem;
    div {
      font-family: PingFangSC-Regular;
      color: #4a4a4a;
      font-size: 0.13rem;
      line-height: 0.28rem;
    }
    input {
      font-family: PingFangSC-Regular;
      color: #4a4a4a;
      font-size: 0.13rem;
      line-height: 0.28rem;
      border: none;
    }
  }
}
.confirm {
  margin: 0 auto;
  background: linear-gradient(135deg, #4181ff, #2360ef);
  color: white;
  width: 80px;
  height: 40px;
  line-height: 40px;
  border-radius: 6px;
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
