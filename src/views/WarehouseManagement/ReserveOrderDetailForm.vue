<template>
  <div>
    <!-- <van-nav-bar
      title="预约明细登记"
      left-text="返回"
      right-text="确认"
      left-arrow
      @click-left="onTitleClickLeft"
      @click-right="onTitleClickRight"
    /> -->
    <!-- <div class="title">预约明细登记</div> -->
    <div class="content">
      <div class="row">
        <span style="margin-left:0" class="title">物料名称</span>
        <span class="message">{{ params.materielSku.name }}</span>
      </div>
      <div class="row">
        <span style="margin-left:0" class="title">物料型号</span>
        <span class="message">{{ params.materielSku.model }}</span>
      </div>
      <!-- <van-button
        size="small"
        @click="selectMaterielSku"
        style="border-radius:0.05rem;background: linear-gradient(135deg, #4181ff, #2360ef);color:white;margin-top:0.2rem;margin-left:0.27rem;"
        >选择</van-button
      > -->
      <div
        @click="selectMaterielSku"
        class="fs-sm "
        style="width:0.6rem;height:0.3rem;line-height:0.3rem;border-radius:0.05rem;background:linear-gradient(135deg, #4181ff, #2360ef);color:white;margin-left:0.27rem;"
      >
        选择
      </div>
      <div class="row">
        <span style="margin-left:0" class="title">送货数量</span>
        <input
          type="text"
          style="text-align:right;border:0 solid rgba(0,0,0,0.25);font-size:0.13rem"
          :placeholder="'请输入送货数量'"
          v-model="params.purchaseNum"
        />
      </div>
    </div>
    <div class="confirm fs-md mt-3" @click="onTitleClickRight">
      确认
    </div>
    <!-- <van-field
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
      >选择</van-button
    > -->
    <!-- <van-field
      clearable
      required
      label="送货数量"
      placeholder="请输入 送货数量"
      v-model="params.purchaseNum"
    ></van-field> -->
  </div>
</template>

<script>
import { Toast } from "vant";
// eslint-disable-next-line no-unused-vars
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
      // eslint-disable-next-line no-console
      console.log(this.params.reserveOrder.id);
    }
    let act = getStore("active");
    this.act = act;
    // eslint-disable-next-line no-console
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
        // eslint-disable-next-line no-unused-vars
        .then(res => {
          Toast("保存成功!");
          this.$router.push("/warehouse/reserve/order/detail");
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
          Toast(error.message);
        });
    },
    continueAdd() {
      // eslint-disable-next-line no-console
      console.log("继续添加");
    },
    confirmBack() {
      // eslint-disable-next-line no-console
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

<style lang="scss" scoped>
.title {
  margin: 10px 28px;
  text-align: left;
  font-size: 20px;
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
  margin: 0 auto;
  background: linear-gradient(135deg, #4181ff, #2360ef);
  color: white;
  width: 80px;
  height: 40px;
  line-height: 40px;
  border-radius: 6px;
}
</style>
