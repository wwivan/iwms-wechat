<template>
  <div style="background-color:#ffffff;">
    <div class="content">
      <div class="row">
        <span style="margin-left:0" class="title">出库单号</span>
        <span class="message">{{params.orderNo}}</span>
      </div>
      <picker-popup
        class="text-left"
        style="margin-left:0.12rem"
        :title="'出库类型'"
        :placeholder="'请选择出库类型'"
        :selectedItem.sync="selectedStockOutType"
        :columns="stockOutTypes"
      />
      <div
        class="row d-flex ai-center"
        v-if="selectedStockOutType.id == '1' || selectedStockOutType.id == '2' || selectedStockOutType.id == '4'"
      >
        <span style="margin-left:0" class="title">客户</span>
        <span class="message">{{params.customerName}}</span>
        <van-button
          style="border-radius:0.05rem;background: linear-gradient(135deg, #FF9779, #F6617B);color:white;"
          v-if="selectedStockOutType.id == '1' || selectedStockOutType.id == '2' || selectedStockOutType.id == '4'"
          size="small"
          @click="selectSupplier(selectedStockOutType)"
        >选择</van-button>
      </div>

      <div class="row">
        <date-select-cell
          class="text-left"
          style="margin-left:-0.15rem;"
          v-if="selectedStockOutType.id == '3' || selectedStockOutType.id == '5'"
          :title="'出库时间'"
          required
          :placeholder="'请输入出库时间'"
          :value.sync="params.outTimeVO"
        ></date-select-cell>
      </div>
      <div class="row" v-if="selectedStockOutType.id == '1'">
        <span style="margin-left:0" class="title">送货单号</span>
        <input
          type="text"
          style="text-align:right;border:0 solid rgba(0,0,0,0.25)"
          :placeholder="'请输入送货单号'"
          v-model="params.deliveryNo"
        />
      </div>
      <div
        class="row"
        v-if="selectedStockOutType.id == '3' || selectedStockOutType.id == '5' || selectedStockOutType.id == '4'"
      >
        <span style="margin-left:0" class="title">领用人</span>
        <input
          type="text"
          style="text-align:right;border:0 solid rgba(0,0,0,0.25)"
          :placeholder="'请输入领用人'"
          v-model="params.operatorUser"
        />
      </div>
    </div>
    <div class="d-flex jc-start">
      <van-button
        plain
        hairline
        size="normal"
        style="margin:0.05rem 0.27rem;border-radius:0.08rem; background:linear-gradient(135deg, #F7C77F, #FF9860);color:white;"
        @click="back(StockOutType)"
      >确认返回</van-button>
      <van-button
        plain
        hairline
        size="normal"
        style="margin:0.05rem 0.27rem;border-radius:0.08rem; background: linear-gradient(135deg, #4181ff, #2360ef);color:white;"
        @click="addItem(StockOutType)"
      >添加明细</van-button>
    </div>

    <div style="height:0.57rem;width:3.75rem;"></div>
  </div>
</template>

<script>
import { Toast } from "vant";
import PickerPopup from "@/component/PickerPopup";
import DateSelectCell from "@/component/DateSelectCell";
import { findWareHouseList, getStockOutOrderNo, saveStockOut } from "@/api/api";
import { mapGetters } from "vuex";
import { setStore, getStore, removeStore } from "@/util/util";
export default {
  data() {
    return {
      StockOutType: undefined,
      active: 1,
      params: {
        orderNo: undefined, // 入库单号
        type: undefined,
        deliveryNo: undefined,
        customer: {
          id: undefined
        },
        factory: {
          id: undefined
        },
        operatorUser: undefined,
        saleUser: "管理员",
        customerName: undefined,
        remark: undefined,
        outTimeVO: undefined
      },
      getStockOutOrderParams: {
        pageNumber: 1,
        pageSize: 99,
        sortType: "auto",
        fid: undefined,
        searchParams: {}
      },
      // 选择的入库类型
      selectedStockOutType: {
        id: "",
        name: ""
      },
      // 入库类型候选项
      stockOutTypes: [
        {
          id: "1",
          name: "销售出库"
        },
        {
          id: "2",
          name: "退货出库"
        },
        {
          id: "3",
          name: "生产使用"
        },
        {
          id: "4",
          name: "外协出库"
        },
        {
          id: "5",
          name: "借用出库"
        },
        {
          id: "6",
          name: "废品出库"
        }
      ]
    };
  },
  mounted() {
    this.getStockOutOrderParams.fid = this.fid;
    this.getStockOutOrderNo();
    let temp = getStore("customer");
    if (temp) {
      removeStore("customer");
      let temps = JSON.parse(temp);
      this.params.customerName = temps.name;
      this.params.customer.id = temps.id;
    }

    let StockOutType = getStore("StockOutType");
    if (StockOutType) {
      removeStore("StockOutType");
      this.StockOutType = StockOutType;
      console.log(this.StockOutType);
    }

    let items = getStore("selectedStockOutType");
    if (items) {
      removeStore("selectedStockOutType");
      let item = JSON.parse(items);
      console.log(item.id);
      this.selectedStockOutType.id = item.id;
      this.selectedStockOutType.name = item.name;
    }
  },
  methods: {
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
    getStockOutOrderNo() {
      // 仓库列表
      getStockOutOrderNo(this.getStockOutOrderParams)
        .then(res => {
          this.params.orderNo = res.data;
        })
        .catch(error => {
          console.log(error);
          Toast("请求仓库列表错误");
        });
    },
    back(StockOutType) {
      this.params.factory.id = this.fid;
      this.params.type = this.selectedStockOutType.id;
      if (this.selectedStockOutType.id != "1") {
        this.params.customer.id = undefined;
        this.params.customerName = undefined;
        this.params.deliveryNo = undefined;
      }
      if (
        this.selectedStockOutType.id != "3" &&
        this.selectedStockOutType.id != "5"
      ) {
        this.params.outTimeVO = undefined;
        this.params.operatorUser = undefined;
      }
      saveStockOut(this.params)
        .then(res => {
          Toast("保存成功!");
          setStore("StockOutType", StockOutType);
          this.$router.push({
            name: "StockOut"
          });
        })
        .catch(error => {
          console.log(error);
          Toast("请求仓库列表错误");
        });
    },
    addItem(StockOutType) {
      this.params.factory.id = this.fid;
      this.params.type = this.selectedStockOutType.id;
      if (this.selectedStockOutType.id != "1") {
        this.params.customer.id = undefined;
        this.params.customerName = undefined;
        this.params.deliveryNo = undefined;
      }
      if (
        this.selectedStockOutType.id != "3" &&
        this.selectedStockOutType.id != "5"
      ) {
        this.params.outTimeVO = undefined;
        this.params.operatorUser = undefined;
      }
      saveStockOut(this.params)
        .then(res => {
          Toast("保存成功!");
          setStore("StockOutType", StockOutType);
          console.log(StockOutType);
          setStore("StockOutDetailParams", res.data);
          this.$router.push({
            name: "StockOutDetail"
          });
        })
        .catch(error => {
          console.log(error);
          Toast("请求仓库列表错误");
        });
    },
    selectSupplier(selectedStockOutType) {
      setStore("StockOutType", "1");
      setStore("selectedStockOutType", selectedStockOutType);
      this.$router.push("/customer");
    },
    center() {
      this.$router.push({
        name: "Main"
      });
    },

    onTitleClickLeft(StockOutType) {
      // 返回
      setStore("StockOutType", StockOutType);
      this.$router.go(-1);
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