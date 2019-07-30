<template>
  <div>
    <div class="taskView w-100">
      <!-- 任务看板 -->
      <div class="col d-flex ai-center">
        <div class="row d-flex ai-center">
          <span class="iconfont icon-kucun"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{store.storage}}</div>
            <div class="text-left text-white mt-1">库存总量</div>
          </div>
        </div>
        <div class="row d-flex ai-center" @click="checkDanger">
          <span class="iconfont icon-iconfontzhizuobiaozhunbduan19"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{store.danger}} 项</div>
            <div class="text-left text-white mt-1">库存预警</div>
          </div>
        </div>
        <div class="row d-flex ai-center">
          <span class="iconfont icon-chuku"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{store.todayOut}}</div>
            <div class="text-left text-white mt-1">今日已出</div>
          </div>
        </div>
      </div>
      <div class="col d-flex ai-center">
        <div class="row d-flex ai-center">
          <span class="iconfont icon-daichuku"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{store.waitOut}}</div>
            <div class="text-left text-white mt-1">待出库量</div>
          </div>
        </div>
        <div class="row d-flex ai-center">
          <span class="iconfont icon-rukuguanli-"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{store.todayIn}}</div>
            <div class="text-left text-white mt-1">今日已入</div>
          </div>
        </div>
        <div class="row d-flex ai-center">
          <span class="iconfont icon-rukuliucheng"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{store.waitIn}}</div>
            <div class="text-left text-white mt-1">待入库量</div>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 fs-xl text-primary">物料统计</div>
    <circle-echart :items="items" class="circleEchart"></circle-echart>
    <stick-echart :items="items1" class="stickEchart"></stick-echart>
  </div>
</template>
<script>
import circleEchart from "../component/Echart/circleEchart";

import stickEchart from "../component/Echart/stickEchart";
export default {
  components: { circleEchart, stickEchart },
  data() {
    return {
      store:{
        storage:0,
        danger:3,
        todayOut:1,
        waitOut:0,
        todayIn:3,
        waitIn:0
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
      ]
    };
  },
  methods: {
    checkDanger(){
      console.log("查看库存预警")
    },
    log() {
      let items2 = this.items1.map(Element => {
        return {
          name: Element.name
        };
      });
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
    margin-top: 10px;
    width: 100%;
    .row {
      border-radius: 10px;
      background: rgb(192, 192, 192);
      border-left: 3px solid white;
      border-right: 3px solid white;
      width: 33.3%;
      padding: 6px;
      justify-content: space-between;
      span {
        font-size: 30px;
        color: white;
      };
      div{
        div{
          text-align: right
        }
      }
    }
  }
}
.circleEchart{
  margin: 10px auto;
  width: 80%;
}
.stickEchart{
  margin: 10px auto;
  width: 80%;
}
</style>
