<template>
    <div>
           <van-pull-refresh v-model="loading" @refresh="onRefreshList">
      <van-list v-model="loading" :finished="finished" @load="onLoadMore">
        <van-panel
          v-for="(item, index) in records"
          :title="item.orderNo"
          :key="index"
        >
          <div class="panel-item">
            <div>客户名称: {{item.name}}</div>
            <div>联系人名称: {{item.contactName}}</div>
            <div>联系人电话: {{item.contactPhone}}</div>
            <van-row type="flex" justify="end" gutter="12">
              <van-col>
                 <van-button @click="useSupplier(item,selectedStockOutType,StockOutType,selectedWarehouse)" type="primary" style="height:35px;line-height:32px" :text="'选择'"></van-button>
              </van-col>
            </van-row>
          </div>
        </van-panel>
      </van-list>

      <div class="van-list__loading">
        <div
          v-if="!loading && records.length === 0"
          @click="findCustomerList"
          style="height: 1000px"
        >
          <span class="van-list__loading-text">暂无数据, 下拉刷新</span>
        </div>
      </div>
    </van-pull-refresh>
    </div>
</template>

<script>
import { Toast } from "vant";
import { mapGetters } from "vuex";
import { findCustomerList } from "@/api/api";
import { setStore, getStore, removeStore,timeFormat } from "@/util/util";
import { Dialog } from "vant";
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
        checkQty:undefined,
        pageNumber: 1,
        pageSize: 10,
        sortType: "auto",
        fid: "",//42dd7498-b9d3-43b3-b736-3e9844f03ff5
      }
    };
  },
  mounted() {
    this.params.fid = this.fid;
    //  let temp = getStore("StockOutType");
    //  this.StockOutType = temp;
     let temp = getStore("CustomerSearchParams");
    if (temp) {
      removeStore("CustomerSearchParams");
      this.searchParams = JSON.parse(temp);
    } else {
      this.searchParams = {};
    }

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
    onRefreshList() {
      // 刷新
      //this.params.pageNumber = 1;
      this.records = [];
      this.findCustomerList();
    },
    onLoadMore() {
      //this.params.pageNumber = this.params.pageNumber + 1;
      this.findCustomerList();
    },
    findCustomerList() {
      this.params.searchParams = this.searchParams;
      // 获取记录
      findCustomerList(this.params)
        .then(res => {
          console.log(JSON.stringify(res));
          this.loading = false;
          this.finished = res.data.last;
          this.records.push(...res.data.content);
        })
        .catch(error => {
          this.finished = true;
          this.loading = false;
          console.log(JSON.stringify(error));
          Toast("请求错误");
        });
    },
    useSupplier(customer,selectedStockOutType,StockOutType,selectedWarehouse) {
      setStore("StockOutType",StockOutType);
      setStore("selectedStockOutType",selectedStockOutType);
      setStore("selectedWarehouse",selectedWarehouse);
      setStore('customer',customer);
      if(this.StockInType =='1') {
        this.$router.push( "StockIn/form");
      }
      if(this.StockOutType == '1'){
         this.$router.push('/stock/out/form');
      }
     
    },
    
    onTitleClickLeft(StockInType,StockOutType) {
      // 返回
      setStore("StockOutType",StockOutType);
      setStore("StockInType",StockInType);
      this.$router.go(-1);
    },
    onClickSearch(StockInType,StockOutType,selectedStockOutType){
      setStore("selectedStockOutType",selectedStockOutType);
      setStore("StockOutType",StockOutType);
      setStore("StockInType",StockInType);
      this.$router.push({
        name: "CustomerSearch",
      })
    },
  },
  computed: {
    ...mapGetters(["fid"])
  },
  filters: {
    statusFilter(value) {
      let realVal = '';
        if(value == '0'){
          realVal = '未使用';
        }else if(value == '1'){
          realVal = '使用';
        }else if(value == '3'){
          realVal = '封闭使用中';
        }
        return realVal;
    },
   
  }
};
</script>
