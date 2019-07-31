<template>
  <div>
    <!-- <div class="top-bar">
      <div style="height:20px"></div>
      <div class="stock-in-header">
        <div @click="onTitleClickLeft">
          <span style="font-size:24px;color:#3F7FFE" class="iconfont icon-ai207"></span>
        </div>
        <div style="margin-left:30px;">
          <span style="text-algin:center;color:#030303;">出库记录查询</span>
        </div>
        <div>
          <span style="margin-left:20px;font-size:14px;color:#4181FF " @click="onTitileClickRight">确认</span>
        </div>
      </div>
    </div>-->
    <div class="content">
      <div class="row">
        <span style="margin-left:0" class="title">出库单号</span>
        <input
          type="text"
          style="text-align:right;border:0 solid rgba(0,0,0,0.25);font-size:13px"
          :placeholder="'请输入出库单号'"
          v-model="params.EQ_orderNo"
        />
      </div>
      <picker-popup
        class="text-left"
        style="margin-left:12px"
        :title="'出库类型'"
        :placeholder="'请选择出库类型'"
        :selectedItem.sync="selectedStockOutType"
        :columns="stockOutTypes"
      />
      <picker-popup
        class="text-left"
        style="margin-left:12px"
        :title="'仓库'"
        :placeholder="'请选择仓库'"
        :selectedItem.sync="selectedWarehouse"
        :columns="sarehouses"
      />
      <div class="row">
        <date-select-cell
          class="text-left"
          style="margin-left:-15px;"
          :title="'开始日期'"
          :placeholder="'请输入开始日期'"
          :value.sync="params.GTEDATE_outTime"
        ></date-select-cell>
      </div>
    </div>
    <div
      class="confirm"
      style="border-radius:8px; background: linear-gradient(135deg, #4181ff, #2360ef);color:white;"
      @click="onTitileClickRight"
    >确认</div>
  </div>
</template>

<script>
import { Toast } from "vant";
import PickerPopup from "@/component/PickerPopup";
import DateSelectCell from "@/component/DateSelectCell";
import { findWareHouseList, findSupplierList } from "@/api/api";
import { mapGetters } from "vuex";
import { setStore } from "@/util/util";
export default {
  data() {
    return {
      params: {
        EQ_orderNo: undefined, // 入库单号
        EQ_type: undefined, // 入库类型 1一般采购入库 2退货入库 3内部生产入库 4取消订单入库
        "EQ_wareHouse.id": undefined, //仓库
        // "EQ_supplier.id":undefined,//供应仓
        GTEDATE_outTime: undefined,
        LTEDATE_outTime: undefined
      },
      findWareHouseListParams: {
        pageNumber: 1,
        pageSize: 99,
        sortType: "auto",
        fid: undefined,
        searchParams: {}
      },
      findSupplierListParams: {
        pageNumber: 1,
        pageSize: 99,
        sortType: "auto",
        fid: undefined,
        searchParams: {}
      },
      // 选择的出库类型
      selectedStockOutType: {
        id: "",
        name: ""
      },
      // 选择的供应商
      selectedSupplier: {
        name: ""
      },
      //选择的仓库
      selectedWarehouse: {
        name: ""
      },
      // 出库类型候选项
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
      ],
      sarehouses: [
        {
          id: undefined,
          name: undefined,
          loading: true
        }
      ],
      suppliers: [
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
    this.findSupplierListParams.fid = this.fid;
    this.findWareHouseList();
    this.findSupplierList();
  },
  methods: {
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
    findSupplierList() {
      // 供应商列表
      findSupplierList(this.findSupplierListParams)
        .then(res => {
          this.suppliers = [];
          let items = res.data.content;
          this.suppliers.push(...items);
        })
        .catch(error => {
          console.log(error);
          Toast("请求供应商列表错误");
        });
    },
    onTitleClickLeft() {
      // 返回
      this.$router.go(-1);
    },
    onTitileClickRight() {
      // 确定
      console.log(this.params);
      this.params.EQ_type = this.selectedStockOutType.id;
      this.params["EQ_wareHouse.id"] = this.selectedWarehouse.id;
      // this.params["EQ_supplier.id"] = this.selectedSupplier.id;
      setStore("stockOutSearchParams", this.params);
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
  height: 70px;
  /* box-shadow: 0 10px 50px rgba(85, 82, 82, 0.25); */
}
.stock-in-header {
  display: flex;
  height: 46px;
  justify-content: space-around;
  align-items: center;
}
.content .row {
  width: 326px;
  height: 52px;
  margin-left: 27px;
  display: flex;
  /* justify-content: space-around; */
  justify-content: space-between;
  align-items: center;
}
.content .row .title {
  color: #333333;
  font-size: 14.5px;
}
.content .row .message {
  color: #333333;
  font-size: 13px;
}
.confirm {
  margin-left: 280px;
  line-height: 32px;
  width: 80px;
  height: 32px;
}
.bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}
</style>