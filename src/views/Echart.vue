<template>
  <div>
    <div class="taskView w-100">
      <!-- 任务看板 -->
      <div class="col d-flex ai-center">
        <div class="row d-flex ai-center">
          <span class="iconfont icon-kucun"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{ store.storage }}</div>
            <div class="text-left text-white mt-1">库存总量</div>
          </div>
        </div>
        <div class="row d-flex ai-center" @click="checkDanger">
          <span class="iconfont icon-iconfontzhizuobiaozhunbduan19"></span>
          <div class="ml-2">
            <!-- <div class="fs-xl text-white">{{store.danger}} 项</div> -->
            <marquee class="text-left text-white" width="0.55rem">{{
              store.skuWaringMsg
            }}</marquee>
            <div class="text-left text-white mt-1">库存预警</div>
          </div>
        </div>
        <div class="row d-flex ai-center">
          <span class="iconfont icon-chuku"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{ store.todayOut }}</div>
            <div class="text-left text-white mt-1">今日已出</div>
          </div>
        </div>
      </div>
      <div class="col d-flex ai-center">
        <div class="row d-flex ai-center">
          <span class="iconfont icon-daichuku"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{ store.waitOut }}</div>
            <div class="text-left text-white mt-1">待出库量</div>
          </div>
        </div>
        <div class="row d-flex ai-center">
          <span class="iconfont icon-rukuguanli-"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{ store.todayIn }}</div>
            <div class="text-left text-white mt-1">今日已入</div>
          </div>
        </div>
        <div class="row d-flex ai-center">
          <span class="iconfont icon-rukuliucheng"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{ store.waitIn }}</div>
            <div class="text-left text-white mt-1">待入库量</div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="mt-4 fs-xl text-primary">物料统计</div> -->
    <circle-echart :items="items" class="circleEchart"></circle-echart>
    <stick-echart :items="items1" class="stickEchart"></stick-echart>
    <stick-line-echart :items="items2" class="stickEchart"></stick-line-echart>
    <line-echart :items="items3" class="stickEchart"></line-echart>
  </div>
</template>
<script>
import circleEchart from "../component/Echart/circleEchart";
import stickLineEchart from "../component/Echart/stick_lineEchart";
import stickEchart from "../component/Echart/stickEchart";
import lineEchart from "../component/Echart/lineEchart";
import { mapGetters } from "vuex";
import { getTask, dangerStorage } from "@/api/api";
// eslint-disable-next-line no-unused-vars
import { getStore, setStore, formatFen2Yuan, removeStore } from "@/util/util";
export default {
  components: { circleEchart, stickEchart, stickLineEchart, lineEchart },
  data() {
    return {
      store: {
        storage: 0,
        skuWaringMsg: "",
        todayOut: 1,
        waitOut: 0,
        todayIn: 3,
        waitIn: 0
      },
      params: {
        fid: undefined
      },
      items: [
        { name: "成品", value: 95, max: "100" },
        { name: "半成品", value: 55, max: "100" },
        { name: "原材料", value: 75, max: "100" }
      ],
      items1: [
        { name: "三级垫圈", stockInValue: 300, stockOutValue: 200 },
        { name: "外六角", stockInValue: 400, stockOutValue: 200 },
        { name: "螺钉", stockInValue: 500, stockOutValue: 200 }
      ],
      items2: [
        { name: "1", stockInValue: 30, stockOutValue: 10 },
        { name: "2", stockInValue: 40, stockOutValue: 20 },
        { name: "3", stockInValue: 50, stockOutValue: 30 },
        { name: "4", stockInValue: 30, stockOutValue: 14 },
        { name: "5", stockInValue: 40, stockOutValue: 20 },
        { name: "6", stockInValue: 50, stockOutValue: 40 }
      ],
      items3: [
        { name: "1", stockInValue: 30, stockOutValue: 10, storage: 20 },
        { name: "2", stockInValue: 40, stockOutValue: 20, storage: 20 },
        { name: "3", stockInValue: 50, stockOutValue: 30, storage: 20 },
        { name: "4", stockInValue: 30, stockOutValue: 14, storage: 16 },
        { name: "5", stockInValue: 40, stockOutValue: 20, storage: 20 },
        { name: "6", stockInValue: 50, stockOutValue: 40, storage: 10 },
        { name: "7", stockInValue: 30, stockOutValue: 10, storage: 20 },
        { name: "8", stockInValue: 40, stockOutValue: 20, storage: 20 },
        { name: "9", stockInValue: 50, stockOutValue: 30, storage: 20 },
        { name: "10", stockInValue: 30, stockOutValue: 14, storage: 16 },
        { name: "11", stockInValue: 40, stockOutValue: 20, storage: 20 },
        { name: "12", stockInValue: 50, stockOutValue: 40, storage: 10 }
      ]
    };
  },
  mounted() {
    this.params.fid = this.fid;
    this.getTask();
  },
  computed: {
    ...mapGetters(["fid"])
  },
  methods: {
    dangerStorage() {
      dangerStorage(this.params).then(res => {
        // eslint-disable-next-line no-console
        console.log(res.data);
      });
    },
    getTask() {
      getTask(this.params).then(res => {
        // eslint-disable-next-line no-console
        console.log(res.data);
        // eslint-disable-next-line no-console
        console.log(res.data.outSum);
        this.store.todayIn = res.data.inSum;
        this.store.todayOut = res.data.outSum;
        this.store.waitIn = res.data.notfor4InItem;
        this.store.waitOut = res.data.notfor4OutItem;
        this.store.storage = res.data.stockSum;
        this.store.skuWaringMsg = res.data.skuWaringMsg;
      });
    },
    checkDanger() {
      // eslint-disable-next-line no-console
      console.log("查看库存预警");
      this.dangerStorage();
    },
    log() {
      // eslint-disable-next-line no-unused-vars
      let items2 = this.items1.map(Element => {
        return {
          name: Element.name
        };
      });
      // eslint-disable-next-line no-console
      console.log(this.stockOutValue);
    }
  }
};
</script>

<style lang="scss" scoped>
.taskView {
  width: 95%;
  margin: 0 auto;
  .col {
    margin-top: 0.1rem;
    width: 100%;
    .row {
      border-radius: 0.1rem;
      background: rgb(192, 192, 192);
      border-left: 0.03rem solid white;
      border-right: 0.03rem solid white;
      width: 33.3%;
      padding: 0.06rem;
      justify-content: space-between;
      span {
        font-size: 0.3rem;
        color: white;
      }
      div {
        div {
          text-align: right;
        }
      }
    }
  }
}
.circleEchart {
  margin: 0.1rem auto;
  width: 80%;
}
.stickEchart {
  margin: 0.1rem auto;
  width: 80%;
}
</style>
