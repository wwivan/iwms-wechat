<template>
  <div>
    <van-nav-bar
      title="预约明细登记"
      left-text="返回"
      right-text="确认"
      left-arrow
      @click-left="onTitleClickLeft"
      @click-right="onTitleClickRight"
    />
    <van-field
      clearable
      required
      readonly
      label="物料名称"
      v-model="params.materielSku.name"
      style="background-color:#F4F4F4;"
    ></van-field>
    <van-field
      clearable
      required
      readonly
      label="物料型号"
      v-model="params.materielSku.model"
      style="background-color:#F4F4F4;"
    ></van-field>
    <van-button
      size="small"
      @click="selectMaterielSku"
      style="background-color:#337ab7;color:white;"
    >选择</van-button>
    <van-field clearable required label="送货数量" placeholder="请输入 送货数量" v-model="params.purchaseNum"></van-field>
  </div>
</template>

<script>
import { Toast } from "vant";
import DateSelectCell from "@/component/DateSelectCell";
import { saveReserveOrderItem } from "@/api/api";
import { getStore, setStore, removeStore } from "@/util/util";
export default {
  name: "ReserveOrderDetailForm",
  data() {
    return {
      active: 1,
      act: undefined,
      params: {
        reserveOrder: { id: "" },
        materielSku: { id: "", name: "", model: "" },
        purchaseNum: ""
      }
    };
  },
  mounted() {
    let temp = getStore("reserveOrdertail");
    if (temp) {
      let reserveOrder = JSON.parse(temp);
      this.params.reserveOrder.id = reserveOrder.id;
      console.log(this.params.reserveOrder.id);
    }
    let act = getStore("active");
    this.act = act;
    console.log(this.act);
    temp = getStore("materielSku");
    if (temp) {
      this.params.materielSku = JSON.parse(temp);
    }
    removeStore("materielSku");
  },
  methods: {
    onTitleClickLeft() {
      this.$router.go(-1);
    },
    selectMaterielSku() {
      setStore("active", this.act);
      this.$router.push("/materiel");
    },
    onTitleClickRight() {
      saveReserveOrderItem(this.params)
        .then(res => {
          Toast("保存成功!");
          this.$router.push("/reserve/order/detail");
        })
        .catch(error => {
          console.log(error);
          Toast(error.message);
        });
    },
    continueAdd() {
      console.log("继续添加");
    },
    confirmBack() {
      console.log("确认返回");
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
    }
  }
};
</script>

