<template>
  <div>
    <van-nav-bar
      title="预约明细查询"
      left-text="返回"
      right-text="确定"
      left-arrow
      @click-left="onTitleClickLeft"
      @click-right="onTitileClickRight"
    />
    <van-field clearable label="物料条码" placeholder="请输入物料条码" v-model="params.EQ_barcode"></van-field>
    <van-field
      clearable
      label="物料名称"
      placeholder="请输入物料名称"
      v-model="params['LIKE_materielSku.name']"
    ></van-field>
    <!-- <van-field clearable label="显示前" placeholder="100条" v-model="params.pageSize"></van-field>
    <van-field clearable label="生产批号" placeholder v-model="params.orderNo"></van-field>
    <van-field clearable label="至" placeholder v-model="params.orderNo"></van-field>-->
  </div>
</template>

<script>
import { setStore } from "@/util/util";
export default {
  data() {
    return {
      params: {
        EQ_barcode:undefined,//商品编码
        "LIKE_materielSku.name":undefined,//商品名称
      }
    };
  },
  methods: {
    onTitleClickLeft() {
      // 返回
      this.$router.go(-1);
    },
    onTitileClickRight() {
      // 确定
      console.log(this.params);
      setStore("ReserveDetailSearchParams", this.params);
      this.$router.go(-1);
    },
    onInStockerClick() {
      // 收货库管员
    },
    onBuyerClick() {
      // 采购员
    }
  },
  components: {
  }
};
</script>

<style>
</style>