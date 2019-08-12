<template>
  <div>
    <!-- <van-nav-bar title="供应商" left-text="返回" left-arrow @click-left="onTitleClickLeft">
      <van-button
        slot="right"
        @click="onClickSearch(selectedStockInType,selectedWarehouse,deliveryNumber,purchaseNo)"
      >
        <van-icon name="search" size="1.5em"/>
      </van-button>
    </van-nav-bar> -->
    <van-pull-refresh v-model="loading" @refresh="onRefreshList">
      <van-list v-model="loading" :finished="finished" @load="onLoadMore">
        <van-panel v-for="(item, index) in records" :title="item.orderNo" :key="index">
          <div class="panel-item">
            <div>供应商名称: {{item.name}}</div>
            <div>联系人名称: {{item.contactName}}</div>
            <div>联系人电话: {{item.contactPhone}}</div>
            <van-row type="flex" justify="end" gutter="12">
              <van-col>
                <van-button
                  @click="useSupplier(item,selectedStockInType,selectedWarehouse,deliveryNumber,purchaseNo)"
                  type="primary"
                  style="height:35px;line-height:32px"
                  :text="'选择'"
                ></van-button>
              </van-col>
            </van-row>
          </div>
        </van-panel>
      </van-list>

      <div class="van-list__loading">
        <div
          v-if="!loading && records.length === 0"
          @click="findSupplierList"
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
import { mapGetters,mapMutations } from "vuex";
import { findSupplierList } from "@/api/api";
import { setStore, getStore, removeStore,timeFormat } from "@/util/util";
import { Dialog } from "vant";
export default {
  data() {
    return {
      show: false,
      loading: false,
      finished: false,
      act: undefined,
      selectedStockInType:[],
      selectedWarehouse:[],
      deliveryNumber: undefined,
      purchaseNo: undefined,
      records: [],
      searchParams: {},
      params: {
        checkQty:undefined,
        pageNumber: 1,
        pageSize: 99,
        sortType: "auto",
        fid: "",//42dd7498-b9d3-43b3-b736-3e9844f03ff5
      }
    };
  },
  mounted() {
    this.params.fid = this.fid;
    let temp = getStore("SupplierSearchParams");
    if (temp) {
      removeStore("SupplierSearchParams");
      this.searchParams = JSON.parse(temp);
    } else {
      this.searchParams = {};
    }

    let item = getStore("selectedStockInType");
    if (item) {
      removeStore("selectedStockInType");
      console.log(item);
      this.selectedStockInType = item;
      console.log(this.selectedStockInType);
    }

    let act = getStore("active");
    if (act) {
      removeStore("act");
      console.log(act);
      this.act = act;
      console.log(this.act);
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
    onRefreshList() {
      // 刷新
      //this.params.pageNumber = 1;
      this.records = [];
      this.findSupplierList();
    },
    onLoadMore() {
      console.log('############');
      console.log(this.fid);
     // this.params.pageNumber = this.params.pageNumber + 1;
      console.log(this.params.pageNumber)
      this.findSupplierList();
    },
    findSupplierList() {
      this.params.searchParams = this.searchParams;
      // 获取记录
      findSupplierList(this.params)
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
    useSupplier(supplier,selectedStockInType,selectedWarehouse,deliveryNumber,purchaseNo) {
      setStore("deliveryNumber",deliveryNumber);
      setStore("purchaseNo",purchaseNo);
      setStore("selectedStockInType",selectedStockInType);
      setStore("selectedWarehouse",selectedWarehouse);
      setStore('supplier',supplier);
      console.log(selectedStockInType.length)
      if(this.isshow==true) {
        this.$router.push('/reserve/order/form');
      } else if(this.isshow==false) {
        this.$router.push("/stockIn/form");
      }

       
    },
    
    onTitleClickLeft() {
      // 返回
      this.$router.go(-1);
    },
    onClickSearch(selectedStockInType,selectedWarehouse,purchaseNo,deliveryNumber){
      setStore("deliveryNumber",deliveryNumber);
      setStore("purchaseNo",purchaseNo);
      setStore("selectedStockInType",selectedStockInType);
      setStore("selectedWarehouse",selectedWarehouse);
      this.$router.push("/supplier/search")
    },
  },
  computed: {
    ...mapGetters(["fid"]),
     ...mapMutations(["resIsshow","stockInIsshow"])
  },
  created(){
    this.isshow =this.$store.state.isshow
    console.log(this.isshow)
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

<style scoped>
</style>