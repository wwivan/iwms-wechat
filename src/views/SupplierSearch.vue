<template>
  <div>
    <!-- <van-nav-bar title="供应商查询" left-text="返回" right-text="确定" left-arrow @click-left="onTitleClickLeft" @click-right="onTitileClickRight(selectedStockInType,selectedWarehouse,deliveryNumber,purchaseNo)" /> -->
    <!-- <van-field clearable label="供应商名称" placeholder="请输入供应商名称" v-model="params.LIKE_name"></van-field> -->
    <div class="content">
      <div class="row">
        <span style="margin-left:0" class="title">供应商名称</span>
        <input
          class="ipt fs-sm"
          type="text"
          style="text-align:right;border:0 solid rgba(0,0,0,0.25)"
          :placeholder="'请输入供应商名称'"
          v-model="params.LIKE_name"
        />
      </div>
    </div>
    <div
      class="confirm fs-md"
      style="border-radius:0.08rem; background: linear-gradient(135deg, #4181ff, #2360ef);color:white;"
      @click="onTitileClickRight"
    >
      确认
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { Toast } from "vant";
import { mapGetters } from "vuex";
import { setStore, getStore, removeStore } from "@/util/util";
// eslint-disable-next-line no-unused-vars
import PickerPopup from "@/component/PickerPopup";
export default {
  data() {
    return {
      deliveryNumber: undefined,
      purchaseNo: undefined,
      selectedStockInType: [],
      selectedWarehouse: [],
      params: {
        LIKE_name: undefined
      }
    };
  },
  mounted() {
    let item = getStore("selectedStockInType");
    if (item) {
      removeStore("selectedStockInType");
      // eslint-disable-next-line no-console
      console.log(item);
      this.selectedStockInType = item;
      // eslint-disable-next-line no-console
      console.log(this.selectedStockInType);
    }

    let Warehouse = getStore("selectedWarehouse");
    if (Warehouse) {
      removeStore("selectedWarehouse");
      this.selectedWarehouse = Warehouse;
      // eslint-disable-next-line no-console
      console.log(this.selectedWarehouse);
    }

    let deliveryNumber = getStore("deliveryNumber");
    if (deliveryNumber != "undefined") {
      removeStore("deliveryNumber");
      this.deliveryNumber = deliveryNumber;
    } else {
      this.deliveryNumber = "";
    }

    let purchaseNo = getStore("purchaseNo");
    if (purchaseNo != "undefined") {
      removeStore("purchaseNo");
      this.purchaseNo = purchaseNo;
    } else {
      this.purchaseNo = "";
    }
  },
  methods: {
    onTitleClickLeft() {
      // 返回
      this.$router.go(-1);
    },
    onTitileClickRight(
      selectedStockInType,
      selectedWarehouse,
      deliveryNumber,
      purchaseNo
    ) {
      // 确定
      setStore("deliveryNumber", deliveryNumber);
      setStore("purchaseNo", purchaseNo);
      setStore("selectedStockInType", selectedStockInType);
      setStore("selectedWarehouse", selectedWarehouse);
      // eslint-disable-next-line no-console
      console.log(this.params);
      setStore("SupplierSearchParams", this.params);
      this.$router.push("/supplier");
    }
  },
  computed: {
    ...mapGetters(["fid"])
  }
};
</script>

<style lang="scss" scoped>
.content .row {
  width: 3.26rem;
  height: 0.52rem;
  margin-left: 0.27rem;
  display: flex;
  /* justify-content: space-around; */
  justify-content: space-between;
  align-items: center;
  .ipt {
    width: 1.68rem;
    height: 0.17rem;
  }
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
</style>
