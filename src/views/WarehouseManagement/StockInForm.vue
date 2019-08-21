<template>
  <div>
    <div class="content">
      <div class="row">
        <span style="margin-left:0" class="title">入库单号</span>
        <span class="message">{{params.reserveOrderNo}}</span>
      </div>
      <picker-popup
        class="text-left"
        style="margin-left:0.12rem"
        :title="'仓库'"
        :placeholder="'请选提仓库'"
        :selectedItem.sync="selectedWarehouse"
        :columns="sarehouses"
      />
      <picker-popup
        class="text-left"
        style="margin-left:0.12rem"
        :title="'入库类型'"
        :placeholder="'请选提入库类型'"
        :selectedItem.sync="selectedStockType"
        :columns="stockTypes"
      />
      <div class="row">
        <date-select-cell
          class="text-left"
          style="margin-left:-0.15rem;"
          :title="'入库时间'"
          :placeholder="'请输入入库时间'"
          :value.sync="params.purchaseDateVO"
        ></date-select-cell>
      </div>
      <div
        class="row d-flex ai-center"
        v-if="selectedStockType.id == '1'|| selectedStockType.id == '3' || selectedStockType.id == '4' || selectedStockType.id == '2'"
      >
        <span style="margin-left:0" class="title">供应商</span>
        <span class="message">{{params.supplierName}}</span>
        <van-button
          v-if="selectedStockType.id == '1'|| selectedStockType.id == '3' || selectedStockType.id == '4' || selectedStockType.id == '2'"
          size="small"
          @click="selectSupplier(selectedStockType,selectedWarehouse,params.deliveryNumber,params.purchaseNo)"
          style="border-radius:0.05rem;background: linear-gradient(135deg, #FF9779, #F6617B);color:white;"
        >选择</van-button>
      </div>

      <div class="row">
        <span style="margin-left:0" class="title">送货单号</span>
        <input
          type="text"
          style="text-align:right;border:0 solid rgba(0,0,0,0.25);font-size:0.13rem"
          :placeholder="'请输入送货单号'"
          v-model="params.deliveryNumber"
        />
      </div>
      <div class="row">
        <span style="margin-left:0" class="title">采购单号</span>
        <input
          type="text"
          style="text-align:right;border:0 solid rgba(0,0,0,0.25);font-size:0.13rem"
          :placeholder="'请输入采购单号'"
          v-model="params.purchaseNo"
        />
      </div>
      <div class="row" v-if="selectedStockType.id == '6'">
        <span style="margin-left:0" class="title">提交人</span>
        <input
          type="text"
          style="text-align:right;border:0 solid rgba(0,0,0,0.25);font-size:0.13rem"
          :placeholder="'请输入提交人'"
          v-model="params.operatorUser"
        />
      </div>
      <div class="row">
        <span style="margin-left:0" class="title">备注</span>
        <input
          type="text"
          style="text-align:right;border:0 solid rgba(0,0,0,0.25);font-size:0.13rem"
          :placeholder="'请输入备注'"
          v-model="params.remark"
        />
      </div>
    </div>
    <van-button
      plain
      hairline
      size="normal"
      style="margin:0.05rem 0.27rem;border-radius:0.08rem; background:linear-gradient(135deg, #F7C77F, #FF9860);color:white;"
      @click="back"
    >确认返回</van-button>
    <van-button
      plain
      hairline
      size="normal"
      style="margin:0.05rem 0.27rem;border-radius:0.08rem; background: linear-gradient(135deg, #4181ff, #2360ef);color:white;"
      @click="addItem"
    >添加明细</van-button>
  </div>
</template>

<script>
// import Home from "@/views/Main/Home/Home"
import { Toast } from "vant";
import PickerPopup from "@/component/PickerPopup";
import DateSelectCell from "@/component/DateSelectCell";
import { findWareHouseList, getStockInOrderNo, saveStockIn } from "@/api/api";
import { mapGetters } from "vuex";
import { setStore, getStore, removeStore } from "@/util/util";
export default {
  data() {
    return {
      active: 1,
      StockType: undefined,
      params: {
        orderNo: undefined, // 入库单号
        inType: undefined,
        deliveryNumber: undefined,
        supplier: {
          id: undefined,
          name: undefined
        },
        wareHouse: {
          id: undefined
        },
        customer: {
          id: undefined
        },
        customerName: undefined,
        supplierName: undefined,
        purchaseNo: undefined,
        remark: undefined,
        operatorUser: undefined,
        purchaseDateVO: undefined
      },
      findWareHouseListParams: {
        pageNumber: 1,
        pageSize: 99,
        sortType: "auto",
        fid: undefined,
        searchParams: {}
      },
      findStockInOrdeParams: {
        pageNumber: 1,
        pageSize: 99,
        sortType: "auto",
        fid: undefined,
        searchParams: {}
      },
      // 选择的入库类型
      selectedStockType: {
        id: "",
        name: ""
      },
      //选择的仓库
      selectedWarehouse: {
        id: "",
        name: ""
      },
      // 入库类型候选项
      stockTypes: [
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
        },
        {
          id: "6",
          name: "生产入库"
        }
      ],
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
    this.findWareHouseListParams.fid = this.fid;
    this.findWareHouseList();

    this.findStockInOrdeParams.fid = this.fid;
    this.getStockInOrderNo();
    let temp = getStore("supplier");
    if (temp) {
      removeStore("supplier");
      let temps = JSON.parse(temp);
      this.params.supplierName = temps.name;
      this.params.supplier.id = temps.id;
    } else {
      // this.params.supplierName = temps.name;
      // this.params.supplier.id = temps.id;
    }

    let items = getStore("selectedStockType");
    if (items) {
      removeStore("selectedStockType");
      let item = JSON.parse(items);
      console.log(item.id);
      this.selectedStockType.id = item.id;
      this.selectedStockType.name = item.name;
    }
    let selectedWarehouse = getStore("selectedWarehouse");
    if (selectedWarehouse) {
      removeStore("selectedWarehouse");
      let item = JSON.parse(selectedWarehouse);
      console.log(item.id);
      this.selectedWarehouse.id = item.id;
      this.selectedWarehouse.name = item.name;
    }
    let deliveryNumber = getStore("deliveryNumber");
    if (deliveryNumber != undefined) {
      removeStore("deliveryNumber");
      this.params.deliveryNumber = deliveryNumber;
    } else {
      this.params.deliveryNumber = "";
    }

    let purchaseNo = getStore("purchaseNo");
    if (purchaseNo != undefined) {
      removeStore("purchaseNo");
      this.params.purchaseNo = purchaseNo;
    } else {
      this.params.purchaseNo = "";
    }

    let StockType = getStore("StockType");
    this.StockType = StockType;
    console.log(this.StockType);
  },
  methods: {
    // onTabChange(active) {
    //   if(active=='0') {
    //       this.$router.push({
    //         name: "Main"
    //       });
    //     } else if(active=='1') {
    //       this.$router.push({
    //         name: "Statistics"
    //       });
    //     } else if(active=='2') {
    //       this.$router.push({
    //         name: "Mine"
    //       });
    //   }
    // Toast("2");

    // },
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
    getStockInOrderNo() {
      // 仓库列表
      getStockInOrderNo(this.findStockInOrdeParams)
        .then(res => {
          this.params.orderNo = res.data;
        })
        .catch(error => {
          console.log(error);
          Toast("请求仓库列表错误");
        });
    },
    back() {
      this.params.wareHouse.id = this.selectedWarehouse.id;
      this.params.inType = this.selectedStockType.id;
      saveStockIn(this.params)
        .then(res => {
          Toast("保存成功!");
          this.$router.push("/stockIn");
        })
        .catch(error => {
          console.log(error);
          Toast("请求仓库列表错误");
        });
    },
    selectSupplier(
      selectedStockType,
      selectedWarehouse,
      deliveryNumber,
      purchaseNo
    ) {
      setStore("deliveryNumber", deliveryNumber);
      setStore("purchaseNo", purchaseNo);
      setStore("selectedWarehouse", selectedWarehouse);
      setStore("selectedStockType", selectedStockType);
      console.log(selectedWarehouse);
      this.$router.push("/supplier");
    },
    addItem() {
      this.params.wareHouse.id = this.selectedWarehouse.id;
      this.params.inType = this.selectedStockType.id;
      saveStockIn(this.params)
        .then(res => {
          Toast("保存成功!");
          setStore("StockInDetailParams", res.data);
          this.$router.push("/stockIn/detail");
        })
        .catch(error => {
          console.log(error);
          Toast("请求仓库列表错误");
        });
    },
    center() {
      this.$router.push({
        name: "/"
      });
    },
    selectCustomer(StockType, selectedWarehouse) {
      setStore("selectedWarehouse", selectedWarehouse);
      setStore("StockType", StockType);
      console.log(StockType);
      //  this.$router.push({
      //     name: "Customer"
      //   });
    }
  },
  computed: {
    ...mapGetters(["fid"])
  },
  components: {
    PickerPopup,
    DateSelectCell
  }
};
</script>

<style scoped>
.flex-1 {
  flex: 1;
}
.top-bar {
  background: white;
  position: sticky;
  top: 0;
  z-index: 999;
  height: 0.7rem;
  /* box-shadow: 0 0.1rem 0.5rem rgba(85, 82, 82, 0.25); */
}
.stock-in-header {
  display: flex;
  height: 0.46rem;
  justify-content: space-around;
  align-items: center;
}
.content .row {
  width: 3.26rem;
  height: 0.52rem;
  margin-left: 0.27rem;
  display: flex;
  /* justify-content: space-around; */
  justify-content: space-between;
  align-items: center;
}
.content .row .title {
  color: #333333;
  font-size: 0.145rem;
}
.content .row .message {
  color: #333333;
  font-size: 0.13rem;
}
.bottom {
  border-bottom: 0.01rem solid rgba(0, 0, 0, 0.25);
}
</style>