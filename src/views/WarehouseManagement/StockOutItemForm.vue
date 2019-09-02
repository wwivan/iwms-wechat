<template>
  <div>
    <!-- <van-nav-bar
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
    ></van-field> -->
    <div class="content">
      <div class="row">
        <span style="margin-left:0" class="title">物料名称</span>
        <span class="message">{{ stockOutItem.materielSku.name }}</span>
      </div>
      <div class="row">
        <span style="margin-left:0" class="title">物料条码</span>
        <span class="message">{{ stockOutItem.materielSku.barcode }}</span>
      </div>
      <div
        @click="selectMaterielSku"
        class="fs-sm "
        style="width:0.6rem;height:0.3rem;line-height:0.3rem;border-radius:0.05rem;background:linear-gradient(135deg, #4181ff, #2360ef);color:white;margin-left:0.27rem;"
      >
        选择
      </div>
      <div class="row">
        <span style="margin-left:0" class="title">出库数量</span>
        <input
          type="text"
          style="text-align:right;border:0 solid rgba(0,0,0,0.25);font-size:0.13rem"
          :placeholder="'请输入出库数量'"
          v-model="stockOutItem.qty"
        />
      </div>
    </div>
    <div class="confirm fs-md mt-3" @click="onTitleClickRight">
      确认
    </div>
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
    let temp = getStore("StockOutDetailParams");
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
      this.$router.push("/stock");
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
