<template>
  <div style="background-color:#ffffff;">
    <div class="content">
      <div class="row">
        <span style="margin-left:0" class="title">盘点单号</span>
        <span class="message">{{params.orderNo}}</span>
      </div>
      <picker-popup
        class="text-left"
        style="margin-left:12px"
        :title="'仓库'"
        :placeholder="'请选提仓库'"
        :selectedItem.sync="selectedWarehouse"
        :columns="sarehouses"
      />
      <picker-popup
        class="text-left"
        style="margin-left:12px"
        :title="'盘点方式'"
        :placeholder="'请选择盘点方式'"
        :selectedItem.sync="selectedStockTakeType"
        :columns="stockTakeTypes"
      />
    </div>
    <van-button
      plain
      hairline
      size="normal"
      style="margin:5px 27px;border-radius:8px; background:linear-gradient(135deg, #F7C77F, #FF9860);color:white;"
      @click="back"
    >确认返回</van-button>
    <van-button
      plain
      hairline
      size="normal"
      style="margin:5px 27px;border-radius:8px; background: linear-gradient(135deg, #4181ff, #2360ef);color:white;"
      @click="addItem"
    >添加明细</van-button>
    <van-tabbar v-model="active" @change="onTabChange">
      <van-tabbar-item>
        <div class="iconfont icon-gongnengguanli" style="font-size:23px"></div>
        <div style="line-height:17px">主页</div>
      </van-tabbar-item>
      <!-- <van-tabbar-item icon="search">功能</van-tabbar-item> -->
      <van-tabbar-item>
        <div class="iconfont icon-tongji" style="font-size:23px"></div>
        <div style="line-height:17px">统计</div>
      </van-tabbar-item>
      <van-tabbar-item>
        <div class="iconfont icon-shezhi" style="font-size:23px"></div>
        <div style="line-height:17px">设置</div>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Toast } from "vant";
import PickerPopup from "@/component/PickerPopup";
import DateSelectCell from "@/component/DateSelectCell";
import {
  findWareHouseList,
  getStockTakeOrderNo,
  createStockTake
} from "@/api/api";
import { mapGetters } from "vuex";
import { setStore, getStore, removeStore } from "@/util/util";
export default {
  data() {
    return {
      active: 1,
      StockInType: undefined,
      params: {
        orderNo: undefined, // 入库单号
        type: undefined,
        wareHouse: {
          id: undefined
        },
        supplierName: undefined,
        purchaseNo: undefined,
        remark: undefined,
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
      // 选择的盘点方式
      selectedStockTakeType: {
        id: "",
        name: ""
      },
      //选择的仓库
      selectedWarehouse: {
        id: "",
        name: ""
      },
      // 盘点方式选项
      stockTakeTypes: [
        {
          id: "1",
          name: "按库区盘点"
        },
        {
          id: "2",
          name: "按物料盘点"
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
    this.getStockTakeOrderNo();
    console.log(this.params["EQ_wareHouse.id"]);
    let StockInType = getStore("StockInType");
    this.StockInType = StockInType;
  },
  methods: {
    onTabChange(active) {
      if (active == "0") {
        this.$router.push({
          name: "Main"
        });
      }
      // Toast("2");
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
    getStockTakeOrderNo() {
      // 仓库列表
      getStockTakeOrderNo(this.findStockInOrdeParams)
        .then(res => {
          console.log(res.data);
          this.params.orderNo = res.data;
        })
        .catch(error => {
          console.log(error);
          Toast("请求仓库列表错误");
        });
    },
    back() {
      this.params.wareHouse.id = this.selectedWarehouse.id;
      this.params.type = this.selectedStockTakeType.id;
      createStockTake(this.params)
        .then(res => {
          Toast("保存成功!");
          this.$router.push({
            name: "StockTake"
          });
        })
        .catch(error => {
          console.log(error);
          Toast("请求仓库列表错误");
        });
    },
    selectSupplier() {
      this.$router.push({
        name: "Supplier"
      });
    },
    addItem() {
      this.params.wareHouse.id = this.selectedWarehouse.id;
      this.params.type = this.selectedStockTakeType.id;
      createStockTake(this.params)
        .then(res => {
          Toast("保存成功!");
          setStore("StockTakeDetailParams", res.data);
          this.$router.push({
            name: "StockTakeDetail"
          });
        })
        .catch(error => {
          console.log(error);
          Toast.fail(JSON.stringify(error.message));
        });
    },
    center() {
      this.$router.push({
        name: "Main"
      });
    },

    onTitleClickLeft() {
      // 返回
      this.$router.go(-1);
    }
  },
  computed: {
    ...mapGetters(["fid"])
  },
  components: {
    PickerPopup
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
.van-tabbar {
  border-top: 1px solid rgba(0, 0, 0, 0.25);
  height: 57px !important;
}
.van-tabbar-item {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  line-height: 1;
  font-size: 11px;
  color: #7d7e80;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.van-tabbar-item--active {
  color: #4181ff !important;
}
.bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}
</style>