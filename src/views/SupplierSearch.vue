<template>
  <div>
    <van-nav-bar title="供应商查询" left-text="返回" right-text="确定" left-arrow @click-left="onTitleClickLeft" @click-right="onTitileClickRight(selectedStockInType,selectedWarehouse,deliveryNumber,purchaseNo)" />
    <van-field clearable label="供应商名称" placeholder="请输入供应商名称" v-model="params.LIKE_name"></van-field>
  </div>
</template>

<script>
  import {
    Toast
  } from "vant";
  import {
    mapGetters
  } from "vuex";
  import {
    setStore,
    getStore,
    removeStore
  } from '@/util/util';
  import PickerPopup from "@/component/PickerPopup"
  export default {
    data() {
      return {
        deliveryNumber:undefined,
        purchaseNo: undefined,
       selectedStockInType:[],
       selectedWarehouse:[],
        params: {
          LIKE_name: undefined,
        },
      
      }
    },
    mounted() {
    let item = getStore("selectedStockInType");
    if (item) {
      removeStore("selectedStockInType");
      console.log(item);
      this.selectedStockInType = item;
      console.log(this.selectedStockInType);
    }

    let Warehouse = getStore("selectedWarehouse");
    if (Warehouse) {
      removeStore("selectedWarehouse");
      this.selectedWarehouse = Warehouse;
      console.log(this.selectedWarehouse);
    }

     let deliveryNumber = getStore("deliveryNumber");
      if (deliveryNumber!="undefined") {
      removeStore("deliveryNumber");
      this.deliveryNumber = deliveryNumber;
     } else {
       this.deliveryNumber = "";
     }

     let purchaseNo = getStore("purchaseNo");
      if (purchaseNo!="undefined") {
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
      onTitileClickRight(selectedStockInType,selectedWarehouse,deliveryNumber,purchaseNo) {
        // 确定
        setStore("deliveryNumber",deliveryNumber);
        setStore("purchaseNo",purchaseNo);
        setStore("selectedStockInType",selectedStockInType);
        setStore("selectedWarehouse",selectedWarehouse);
        console.log(this.params);
        setStore("SupplierSearchParams", this.params);
        this.$router.push("/supplier");
      },
    },
    computed: {
      ...mapGetters(["fid"])
    }
  };
</script>

<style>
</style>