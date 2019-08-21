<template>
  <div>
    <van-nav-bar title="预约明细记录" left-text="返回" left-arrow @click-left="onTitleClickLeft">
      <van-button
        slot="right"
        v-if="records.length == 0||status == '0'"
        @click="onClickForm(StockInType)"
      >
        <van-icon name="plus" size="1.5em" />
      </van-button>
      <van-button slot="right" @click="onClickSearch">
        <van-icon name="search" size="1.5em" />
      </van-button>
    </van-nav-bar>
    <van-pull-refresh v-model="loading" @refresh="onRefreshList">
      <van-list v-model="loading" :finished="finished" @load="onLoadMore">
        <van-panel
          v-for="(item, index) in records"
          :title="item.barcode == undefined? '':item.barcode"
          :key="index"
          :status="item.status | statusFilter"
        >
          <div class="panel-item">
            <div>物料名称: {{ item.materielSku.name }}</div>
            <div>物料型号: {{ item.materielSku.model }}</div>
            <div>送货数量: {{ item.purchaseNum }}</div>
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
        </van-panel>
        <van-button
          v-if="records.length>0&&status=='0'"
          @click="confirm()"
          type="primary"
          style="height:0.35rem;line-height:0.32rem;margin:0rem 1rem;"
          :text="'确认收货'"
        ></van-button>
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
    console.log(this.StockInType);
    let act = getStore("active");
    if (act) {
      // removeStore("active")
      this.act = act;
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
            console.log("1111111111111111111111111111111111111");
            this.params.wareHouseId = this.selectedWarehouse.id;
            this.params.inType = this.selectedStockInType.id;
            let qty = "";
            let id = "";
            console.log(this.records);
            for (let item of this.records) {
              qty += item.qty + ",";
              id += item.id + ",";
            }
            this.params.qty = qty.substring(0, qty.length - 1);
            this.params.id = id.substring(0, id.length - 1);
            console.log(this.params);

            // 获取记录
            confirmReserveOrderItem(this.params)
              .then(res => {
                console.log(JSON.stringify(res));
                this.loading = false;
                this.finished = res.data.last;
                Toast("收货成功!");
                done();
                this.$router.push("/stockIn");
              })
              .catch(error => {
                this.finished = true;
                this.loading = false;
                console.log(JSON.stringify(error));
                Toast("请求错误");
              });
          })
          .catch(() => {
            // on cancel
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
      this.$router.push("/stockIn");
    },
    onClickForm(StockInType) {
      setStore("StockInType", StockInType);
      setStore("act", this.act);
      setStore("reserveOrdertail", this.reserveOrdertail);
      //getStore("StockInDetailParams");
      this.$router.push("/reserve/order/detail/form");
    },
    onClickSearch() {
      this.$router.push("/reserve/order/detail/search");
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

<style scoped>
</style>