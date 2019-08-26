<template>
  <div>
    <!-- <div class="top-bar">
      <div style="height:0.2rem"></div>
      <div class="stock-in-header">
        <div @click="onTitleClickLeft">
          <span style="font-size:0.24rem;color:#3F7FFE" class="iconfont icon-ai207"></span>
        </div>
        <div style="margin-left:0.3rem;">
          <span style="text-algin:center;color:#030303">盘点查询</span>
        </div>
        <div>
          <span style="margin-left:0.2rem;font-size:0.14rem;color:#4181FF " @click="onTitileClickRight">确认</span>
        </div>
      </div>
    </div>-->
    <div class="content">
      <picker-popup
        class="text-left"
        style="margin-left:0.12rem"
        :title="'盘点类型'"
        :placeholder="'请选择盘点类型'"
        :selectedItem.sync="selectedStockTakeType"
        :columns="stockTakeTypes"
      />
      <picker-popup
        class="text-left"
        style="margin-left:0.12rem"
        :title="'仓库'"
        :placeholder="'请选择仓库'"
        :selectedItem.sync="selectedWarehouse"
        :columns="sarehouses"
      />
    </div>
    <div
      class="confirm fs-md"
      style="border-radius:0.08rem; background: linear-gradient(135deg, #4181ff, #2360ef);color:white;"
      @click="onTitileClickRight"
    >
      确认
    </div>
    <!-- <van-field clearable label="入库单号" placeholder="请输入入库单号" v-model="params.EQ_orderNo"></van-field> -->
    <!-- <van-field clearable label="盘点单号" placeholder="请输入盘点单号" v-model="params.EQ_orderNo"></van-field> -->
  </div>
</template>

<script>
import { Toast } from "vant";
import PickerPopup from "@/component/PickerPopup";
// eslint-disable-next-line no-unused-vars
import DateSelectCell from "@/component/DateSelectCell";
// eslint-disable-next-line no-unused-vars
import { findWareHouseList, findSupplierList } from "@/api/api";
import { mapGetters } from "vuex";
import { setStore } from "@/util/util";
export default {
  data() {
    return {
      params: {
        EQ_type: undefined, // 入库类型 1一般采购入库 2退货入库 3内部生产入库 4取消订单入库
        "EQ_wareHouse.id": undefined //仓库
        //GTEDATE_createTime: undefined,
      },
      findWareHouseListParams: {
        pageNumber: 1,
        pageSize: 99,
        sortType: "auto",
        fid: undefined,
        searchParams: {}
      },
      // 选择的入库类型
      selectedStockTakeType: {
        id: "",
        name: ""
      },
      // 选择的状态
      selectedStatus: {
        name: ""
      },
      // 入库类型候选项
      stockTakeTypes: [
        {
          name: "全部"
        },
        {
          id: "1",
          name: "按库区盘点"
        },
        {
          id: "2",
          name: "按物料盘点"
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
    this.findWareHouseListParams.fid = this.fid;
    this.findWareHouseList();
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
          // eslint-disable-next-line no-console
          console.log(error);
          Toast("请求仓库列表错误");
        });
    },

    onTitleClickLeft() {
      // 返回
      this.$router.go(-1);
    },
    onTitileClickRight() {
      // 确定
      // eslint-disable-next-line no-console
      console.log(this.params);
      this.params.EQ_type = this.selectedStockTakeType.id;
      this.params["EQ_wareHouse.id"] = this.selectedWarehouse.id;
      setStore("stockTakeSearchParams", this.params);
      this.$router.go(-1);
    },
    onInStockerClick() {
      // 收货库管员
    },
    onBuyerClick() {
      // 采购员
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

.confirm {
  margin-left: 2.8rem;
  line-height: 0.32rem;
  width: 0.8rem;
  height: 0.32rem;
}
.bottom {
  border-bottom: 0.01rem solid rgba(0, 0, 0, 0.25);
}
</style>
