<template>
  <div>
    <!-- <van-nav-bar title="客户查询" left-text="返回" right-text="确定" left-arrow @click-left="onTitleClickLeft(StockInType,StockOutType)" @click-right="onTitileClickRight(StockInType,StockOutType,selectedStockOutType)" />
    <van-field clearable label="客户名称" placeholder="请输入客户名称" v-model="params.LIKE_name"></van-field> -->
    <div class="content">
      <div class="row">
        <span style="margin-left:0" class="title">客户名称</span>
        <input class="ipt fs-sm"
          type="text"
          style="text-align:right;border:0 solid rgba(0,0,0,0.25)"
          :placeholder="'请输入客户名称'"
          v-model="params.LIKE_name"
        />
      </div>
    </div>
    <div
      class="confirm fs-md"
      style="border-radius:0.08rem; background: linear-gradient(135deg, #4181ff, #2360ef);color:white;"
      @click="onTitileClickRight"
    >确认</div>
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
      StockInType: undefined,
      show: false,
      loading: false,
      StockOutType: undefined,
      finished: false,
      selectedWarehouse: [],
      selectedStockOutType:[],
      records: [],
      searchParams: {},
        params: {
          LIKE_name: undefined,
        },
      
      }
    },
    mounted() {
      let item = getStore("selectedStockOutType");
    if (item) {
      removeStore("selectedStockOutType");
      console.log(item);
      this.selectedStockOutType = item;
      console.log(this.selectedStockOutType);
    }

    let StockInType = getStore("StockInType");
    if (StockInType) {
      removeStore("StockInType");
      this.StockInType = StockInType;
    }

    let StockOutType = getStore("StockOutType");
    if (StockOutType) {
      removeStore("StockOutType");
      this.StockOutType = StockOutType;
    }

    let Warehouse = getStore("selectedWarehouse");
    if (Warehouse) {
      removeStore("selectedWarehouse");
      this.selectedWarehouse = Warehouse;
      console.log(this.selectedWarehouse);
    }
      
    },
    methods: {
      
      onTitleClickLeft(StockInType,StockOutType) {
        // 返回
        setStore("StockOutType",StockOutType);
        setStore("StockInType",StockInType);
        this.$router.go(-1);
      },
      onTitileClickRight(StockInType,StockOutType,selectedStockOutType) {
        // 确定
       setStore("StockOutType",StockOutType);
       setStore("selectedStockOutType",selectedStockOutType);
       setStore("StockInType",StockInType);
        console.log(this.params)
        setStore("CustomerSearchParams", this.params);
        this.$router.push("/customer");
      },
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
  .ipt{
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