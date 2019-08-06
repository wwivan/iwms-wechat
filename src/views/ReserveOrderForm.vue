<template>
  <div style="background-color:#ffffff;">
    <!-- <van-nav-bar title="预约登记" left-text="返回" left-arrow @click-left="onTitleClickLeft"/> -->
    <div class="content">
      <div class="row">
        <span style="margin-left:0"
              class="title">预约单号</span>
        <span class="message">{{params.reserveOrderNo}}</span>
      </div>
      <div class="row">
        <date-select-cell style="margin-left:-15px;"
        class="text-left"
                          :title="'送货时间'"
                          :placeholder="'请选择送货时间'"
                          :value.sync="params.deliveryDateVo"></date-select-cell>
      </div>
      <div class="row">
        <span style="margin-left:0"
              class="title">供应商</span>
        <span class="message">{{params.supplierName}}</span>
      </div>
      <van-button size="small"
                  @click="selectSupplier()"
                  style="border-radius:5px;background: linear-gradient(135deg, #4181ff, #2360ef);color:white;margin-top:20px;margin-left:27px;">选择</van-button>
      <div class="row">
        <span style="margin-left:0"
              class="title">送货单号</span>
        <input type="text"
               style="text-align:right;border:0 solid rgba(0,0,0,0.25);font-size:13px"
               :placeholder="'请输入送货单号'"
               v-model="params.deliveryNumber" />
      </div>
      <div class="row">
        <span style="margin-left:0"
              class="title">备注</span>
        <input type="text"
               style="text-align:right;border:0 solid rgba(0,0,0,0.25);font-size:13px"
               :placeholder="'请输入备注'"
               v-model="params.remark" />
      </div>
    </div>
    <van-button plain
                hairline
                size="normal"
                style="margin:5px 27px;border-radius:8px; background:linear-gradient(135deg, #F7C77F, #FF9860);color:white;"
                @click="back">确认返回</van-button>
    <van-button plain
                hairline
                size="normal"
                style="margin:5px 27px;border-radius:8px; background: linear-gradient(135deg, #4181ff, #2360ef);color:white;"
                @click="addItem">添加明细</van-button>
    <!-- <van-tabbar v-model="active" @change="onTabChange">
      <van-tabbar-item icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item icon="orders-o">新增入库单</van-tabbar-item>
      <van-tabbar-item icon="apps-o">选择入库单</van-tabbar-item>
    </van-tabbar>-->
  </div>
</template>

<script>
  import { Toast } from "vant";
  import PickerPopup from "@/component/PickerPopup";
  import DateSelectCell from "@/component/DateSelectCell";
  import { saveReserveOrder, getReserveOrderNo } from "@/api/api";
  import { mapGetters } from "vuex";
  import { setStore, getStore, removeStore } from "@/util/util";
  export default {
    data() {
      return {
        active: 1,
        act: undefined,
        StockInType: undefined,
        params: {
          reserveOrderNo: undefined, // 入库单号
          deliveryNumber: undefined,
          supplier: {
            id: undefined,
            name: undefined
          },
          fid: undefined,
          supplierName: undefined,
          purchaseNo: undefined,
          remark: undefined,
          operatorUser: undefined,
          deliveryDateVo: undefined
        },
        findReserveParams: {
          pageNumber: 1,
          pageSize: 99,
          sortType: "auto",
          fid: undefined,
          searchParams: {}
        }
      };
    },
    mounted() {
      this.findReserveParams.fid = this.fid;
      this.params.fid = this.fid;
      this.getReserveOrderNo();
      let temp = getStore("supplier");
      if (temp) {
        removeStore("supplier");
        let temps = JSON.parse(temp);
        this.params.supplierName = temps.name;
        this.params.supplier.id = temps.id;
      } else {
        // this.params.supplierName = temps.name;
        // this.params.supplier.id = temps.id;
      }

      let active = getStore("active");
      this.act = active;
      console.log(this.act);
    },
    methods: {
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
      getReserveOrderNo() {
        // 仓库列表
        getReserveOrderNo(this.findReserveParams)
          .then(res => {
            this.params.reserveOrderNo = res.data;
          })
          .catch(error => {
            console.log(error);
            Toast("请求仓库列表错误");
          });
      },
      back() {
        saveReserveOrder(this.params)
          .then(res => {
            Toast("保存成功!");
            this.$router.push("/stockIn");
          })
          .catch(error => {
            console.log(error);
            Toast("请求仓库列表错误");
          });
      },
      selectSupplier() {
        setStore("active", this.act);
        this.$router.push("/supplier");
      },
      addItem() {
        saveReserveOrder(this.params)
          .then(res => {
            Toast("保存成功!");
            setStore("ReserveOrderItemParams", res.data);
            this.$router.push("/reserve/order");
          })
          .catch(error => {
            console.log(error);
            Toast("请求仓库列表错误");
          });
      },
      center() {
        this.$router.push({
          name: "Main"
        });
      },
      selectCustomer(StockInType, selectedWarehouse) {
        setStore("selectedWarehouse", selectedWarehouse);
        setStore("StockInType", StockInType);
        console.log(StockInType);
        this.$router.push({
          name: "Customer"
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
      DateSelectCell
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

  .bottom {
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }
</style>