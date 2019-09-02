<template>
  <div>
    <div class="top-bar">
      <div style="height:20px"></div>
      <div class="stock-in-header">
        <div @click="onTitleClickLeft">
          <span style="font-size:24px;color:#3F7FFE"
                class="iconfont icon-ai207"></span>
        </div>
        <div style="margin-left:30px;">
          <span style="text-algin:center;color:#030303">物料查询</span>
        </div>
        <div>
          <span style="margin-left:20px;font-size:14px;color:#3F7FFE "
                @click="onTitileClickRight">确定</span>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="row">
        <span style="margin-left:0"
              class="title">物料编码</span>
        <input type="text"
               style="text-align:right;border:0 solid rgba(0,0,0,0.25);font-size:13px"
               :placeholder="'请输入物料编码'"
               v-model="params.EQ_barcode" />
      </div>
      <div class="row">
        <span style="margin-left:0"
              class="title">物料名称</span>
        <input type="text"
               style="text-align:right;border:0 solid rgba(0,0,0,0.25);font-size:13px"
               :placeholder="'请输入物料名称'"
               v-model="params.EQ_barcode" />
      </div>
      <div class="row">
        <span style="margin-left:0"
              class="title">储位</span>
        <input type="text"
               style="text-align:right;border:0 solid rgba(0,0,0,0.25);font-size:13px"
               :placeholder="'请输入储位'"
               v-model="params.code" />
      </div>
      <div class="row">
        <span style="margin-left:0"
              class="title">库存量</span>
        <input type="text"
               style="text-align:right;border:0 solid rgba(0,0,0,0.25);font-size:13px"
               :placeholder="'请输入库存量最小值'"
               v-model="params.GTE_stockNum" />
      </div>
      <div class="row">
        <span style="margin-left:0"
              class="title">至</span>
        <input type="text"
               style="text-align:right;border:0 solid rgba(0,0,0,0.25);font-size:13px"
               :placeholder="'请输入库存量最大值'"
               v-model="params.LTE_stockNum" />
      </div>
      <div class="row">
        <span style="margin-left:0"
              class="title">可用量</span>
        <input type="text"
               style="text-align:right;border:0 solid rgba(0,0,0,0.25);font-size:13px"
               :placeholder="'请输入可用量最小值'"
               v-model="params.LTE_stockUseNum" />
      </div>
      <div class="row">
        <span style="margin-left:0"
              class="title">至</span>
        <input type="text"
               style="text-align:right;border:0 solid rgba(0,0,0,0.25);font-size:13px"
               :placeholder="'请输入可用量最大值'"
               v-model="params.LTE_stockUseNum" />
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from "vant";
  import { mapGetters } from "vuex";
  import { setStore } from "@/util/util";
  // import PickerPopup from "@/components/pickerpop/PickerPopup"
  export default {
    data() {
      return {
        params: {
          EQ_barcode: undefined, // 物料编码
          "LIKE_materielSku.name": undefined, // 物料名称
          "EQ_cell.code": undefined, //储位
          GTE_stockNum: undefined, //库存量
          LTE_stockNum: undefined,
          GTE_stockUseNum: undefined, //可用量
          LTE_stockUseNum: undefined
        }
      };
    },
    mounted() {},
    methods: {
      onTitleClickLeft() {
        // 返回
        this.$router.push({
          name: "Main"
        });
      },
      onTitileClickRight() {
        // 确定
        console.log(this.params);
        this.params["LIKE_materielSku.name"] = this.params.name;
        this.params["EQ_cell.code"] = this.params.code;
        delete this.params.name;
        delete this.params.code;
        setStore("stockLogsSearchParams", this.params);
        this.$router.push({
          name: "StockLogs"
        });
      }
    },
    computed: {
      ...mapGetters(["fid"])
    }
    // components: {
    //   PickerPopup
    // }
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
  .van-tabbar {
    border-top: 1px solid rgba(0, 0, 0, 0.25);
    height: 57px !important;
  }
  .van-tabbar-item {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    line-height: 1;
    font-size: 11px;
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
  .bottom {
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }
</style>