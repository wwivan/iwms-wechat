<template>
  <div>
    <!-- <div class="top-bar">
      <div style="height:0.2rem"></div>
      <div class="stock-in-header">
        <div @click="onTitleClickLeft">
          <span style="font-size:0.24rem;color:#3F7FFE" class="iconfont icon-ai207"></span>
        </div>
        <div style="margin-left:0.3rem;">
          <span style="text-algin:center;color:#030303">明细登记</span>
        </div>
        <div>
          <span style="margin-left:0.2rem;font-size:0.14rem;color:#4181FF " @click="onTitleClickRight">确认</span>
        </div>
      </div>
    </div>-->
    <div class="content">
      <div class="row">
        <span style="margin-left:0" class="title">入库单号</span>
        <span class="message">{{ orderNo }}</span>
      </div>
      <div class="row">
        <span style="margin-left:0" class="title">物料名称</span>
        <span class="message">{{ stockInItem.materielSku.name }}</span>
      </div>
      <div class="row">
        <span style="margin-left:0" class="title">物料条码</span>
        <span class="message">{{ stockInItem.materielSku.barcode }}</span>
      </div>
      <van-button
        size="small"
        @click="selectMaterielSku"
        style="border-radius:0.05rem;background: linear-gradient(135deg, #4181ff, #2360ef);color:white;margin-top:0.2rem;margin-left:0.27rem;"
        >选择</van-button
      >
      <div class="row">
        <span style="margin-left:0" class="title">入库数量</span>
        <input
          type="text"
          style="text-align:right;border:0 solid rgba(0,0,0,0.25);font-size:0.13rem"
          :placeholder="'请输入 入库数量'"
          v-model="stockInItem.qty"
        />
      </div>
      <div class="row">
        <date-select-cell
          class="text-left"
          style="margin-left:-0.15rem;"
          :title="'生产时间'"
          :placeholder="'请输入 生产时间'"
          :value.sync="stockInItem.productionDateVO"
        ></date-select-cell>
      </div>
    </div>
    <div
      class="confirm fs-md"
      style="border-radius:0.08rem; background: linear-gradient(135deg, #4181ff, #2360ef);color:white;"
      @click="onTitleClickRight"
    >
      确认
    </div>
  </div>
</template>

<script>
import { Toast } from "vant";
import DateSelectCell from "@/component/DateSelectCell";
import { saveStockInItem } from "@/api/api";
import { getStore, setStore, removeStore } from "@/util/util";
export default {
  name: "StockInItemForm",
  components: {
    DateSelectCell
  },
  data() {
    return {
      active: 1,
      stockInItem: {
        stockIn: { id: "", orderNo: "" },
        materielSku: { id: "", name: "", model: "" },
        productionDateVO: "",
        shelfLife: "",
        qty: ""
      }
    };
  },
  created() {
    let stockIn = getStore("StockInDetailParams");
    // eslint-disable-next-line no-console
    console.log(stockIn);
    let obj = JSON.parse(stockIn);
    this.stockInItem.stockIn.orderNo = obj.orderNo;
  },
  mounted() {
    let temp = getStore("stockIn");
    if (temp) {
      this.stockInItem.stockIn = JSON.parse(temp);
    }
    temp = getStore("materielSku");
    if (temp) {
      this.stockInItem.materielSku = JSON.parse(temp);
    }
    removeStore("materielSku");
  },
  computed: {
    orderNo: {
      get: function() {
        if (this.stockInItem.stockIn) {
          // eslint-disable-next-line no-console
          console.log("bucunzai");
          // eslint-disable-next-line no-console
          console.log(this.stockInItem.stockIn);
          return this.stockInItem.stockIn.orderNo;
        }
        return "";
      },
      set: function(newValue) {
        this.stockInItem.stockIn.orderNo = newValue;
      }
    }
  },
  methods: {
    initStatus() {
      setStore("StockInType", "1");
    },
    onTitleClickLeft() {
      this.$router.go(-1);
    },
    selectMaterielSku() {
      this.initStatus();
      this.$router.push("/materiel");
    },
    onTitleClickRight() {
      // eslint-disable-next-line no-console
      console.log("确认：", this.stockInItem);
      saveStockInItem(this.stockInItem)
        // eslint-disable-next-line no-unused-vars
        .then(res => {
          Toast("保存成功!");
          this.$router.push("/stockIn/detail");
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
<style scoped>
.flex-1 {
  flex: 1;
}
.top-bar {
  background: white;
  position: sticky;
  top: 0;
  z-index: 999;
  height: 0.7rem;
  /* box-shadow: 0 0.1rem 0.5rem rgba(85, 82, 82, 0.25); */
}
.stock-in-header {
  display: flex;
  height: 0.46rem;
  justify-content: space-around;
  align-items: center;
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
  margin-left: 0.2rem;
  line-height: 0.32rem;
  width: 0.8rem;
  height: 0.32rem;
}
.bottom {
  border-bottom: 0.01rem solid rgba(0, 0, 0, 0.25);
}
</style>
