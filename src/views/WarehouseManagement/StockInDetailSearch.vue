<template>
  <div>
    <!-- <div class="top-bar">
      <div style="height:0.2rem"></div>
      <div class="stock-in-header">
        <div @click="onTitleClickLeft">
          <span
            style="font-size:0.24rem;color:#3F7FFE"
            class="iconfont icon-ai207"
          ></span>
        </div>
        <div style="margin-left:0.3rem;">
          <span style="text-algin:center;color:#030303">入库记录查询</span>
        </div>
        <div>
          <span
            style="margin-left:0.2rem;font-size:0.14rem;color:#4181FF "
            @click="onTitileClickRight"
            >确定</span
          >
        </div>
      </div>
    </div> -->
    <div class="content">
      <div class="row">
        <span style="margin-left:0" class="title">物料条码</span>
        <input
          type="text"
          style="text-align:right;border:0 solid rgba(0,0,0,0.25);font-size:0.13rem"
          :placeholder="'请输入物料条码'"
          v-model="params.EQ_barcode"
        />
      </div>
      <div class="row">
        <span style="margin-left:0" class="title">物料名称</span>
        <input
          type="text"
          style="text-align:right;border:0 solid rgba(0,0,0,0.25);font-size:0.13rem"
          :placeholder="'请输入物料名称'"
          v-model="params['LIKE_materielSku.name']"
        />
      </div>
    </div>
    <div
      class="confirm fs-md"
      style="border-radius:0.08rem; background: linear-gradient(135deg, #4181ff, #2360ef);color:white;"
      @click="onTitileClickRight"
    >
      确认
    </div>
  </div>
</template>

<script>
import { setStore } from "@/util/util";
export default {
  data() {
    return {
      params: {
        EQ_barcode: undefined, //商品编码
        "LIKE_materielSku.name": undefined //商品名称
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
      setStore("StockInDetailSearchParams", this.params);
      this.$router.go(-1);
    },
    onInStockerClick() {
      // 收货库管员
    },
    onBuyerClick() {
      // 采购员
    }
  },
  components: {}
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
.van-tabbar {
  border-top: 0.01rem solid rgba(0, 0, 0, 0.25);
  height: 0.57rem !important;
}
.van-tabbar-item {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  line-height: 1;
  font-size: 0.11rem;
  color: #7d7e80;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.van-tabbar-item--active {
  color: #4181ff !important;
}
.confirm {
  margin-left: 2.8rem;
  line-height: 0.32rem;
  width: 0.8rem;
  height: 0.32rem;
}
.bottom {
  border-bottom: 0.01rem solid rgba(0, 0, 0, 0.25);
}
</style>
