<template>
  <div>
    <van-nav-bar
      title="明细登记"
      left-text="返回"
      right-text="确认"
      left-arrow
      @click-left="onTitleClickLeft"
      @click-right="onTitleClickRight"
    />
    <van-field
      clearable
      label="出库单号"
      v-model="orderNo"
      readonly
    ></van-field>
    <van-field
      clearable
      required
      readonly
      label="物料名称"
      v-model="stockOutItem.materielSku.name"
      style="background-color:#F4F4F4;"
    ></van-field>
    <van-field
      clearable
      required
      readonly
      label="物料条码"
      v-model="stockOutItem.materielSku.barcode"
      style="background-color:#F4F4F4;"
    ></van-field>
    <van-button
      size="small"
      @click="selectMaterielSku"
      style="background-color:#337ab7;color:white;"
      >选择</van-button
    >
    <van-field
      clearable
      required
      label="出库数量"
      placeholder="请输入 出库数量"
      v-model="stockOutItem.qty"
    ></van-field>
    <van-tabbar v-model="active" @change="onTabChange">
      <van-tabbar-item icon="home-o">主页</van-tabbar-item>
      <!-- <van-tabbar-item icon="search">功能</van-tabbar-item> -->
      <van-tabbar-item icon="orders-o">新增入库单</van-tabbar-item>
      <van-tabbar-item icon="apps-o">选择入库单</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapGetters } from "vuex";
// import DateSelectCell from "@/component/DateSelectCell";
import { saveStockOutItem, findStockList } from "@/api/api";
import { getStore, removeStore } from "@/util/util";
export default {
  name: "StockOutItemForm",
  components: {
    //DateSelectCell,
  },
  data() {
    return {
      active: 1,
      params: {
        page: 1,
        pageSize: 10,
        sortType: "auto",
        fid: "",
        searchParams: {}
      },
      stockOutItem: {
        stockOut: { id: "", orderNo: "" },
        materielSku: { id: "", name: "", model: "" },
        // productionDateVO: '',
        // shelfLife: '',
        qty: ""
      }
    };
  },
  mounted() {
    this.params.fid = this.fid;
    let temp = getStore("stockOut");
    if (temp) {
      this.stockOutItem.stockOut = JSON.parse(temp);
    }
    temp = getStore("materielSku");
    if (temp) {
      this.stockOutItem.materielSku = JSON.parse(temp);
    }
    removeStore("materielSku");
  },
  computed: {
    ...mapGetters(["fid"]),
    orderNo: {
      get: function() {
        if (this.stockOutItem.stockOut) {
          return this.stockOutItem.stockOut.orderNo;
        }
        return "";
      },
      set: function(newValue) {
        this.stockOutItem.stockOut.orderNo = newValue;
      }
    }
  },
  methods: {
    onTitleClickLeft() {
      this.$router.go(-1);
    },
    selectMaterielSku() {
      this.$router.push("/materiel");
    },
    onTitleClickRight() {
      this.params.searchParams[
        "EQ_materielSku.id"
      ] = this.stockOutItem.materielSku.id;
      // 获取记录
      findStockList(this.params)
        .then(res => {
          let stockUseNum = res.data.content[0].stockUseNum;
          if (stockUseNum < this.stockOutItem.qty) {
            Toast("库存不足，库存为：" + stockUseNum);
          } else {
            this.saveStockOutItem();
          }
        })
        .catch(error => {
          this.finished = true;
          this.loading = false;
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(error));
          Toast("请求错误");
        });
    },
    saveStockOutItem() {
      saveStockOutItem(this.stockOutItem)
        // eslint-disable-next-line no-unused-vars
        .then(res => {
          Toast("保存成功!");
          // this.$router.push({
          //   name: "StockOutDetail"
          // });
          this.$router.push("/warehouse/stock/out/detail");
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
