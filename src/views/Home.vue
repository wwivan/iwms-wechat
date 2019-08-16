<template>
  <div class="home">
    <div class="square d-flex jc-around bg-orange text-white" @click="detailNews">
      <swiper :options="swiperOption" ref="mySwiper" >
        <!-- slides -->
        <!-- <swiper-slide v-for="(item, i) in images" :key="i">
        <a :href="item.url"> <img class="w-100" :src="item.image" alt=""/></a>
        </swiper-slide>-->
        <swiper-slide v-for="(item,index) in news" :key="index">
          <span class="iconfont icon-xiaolaba" style="height:0.39rem;line-height:0.39rem;" >
           
          </span>
          <span class="ml-3 fs-md" style="height:0.39rem;line-height:0.39rem;">{{item.title}}</span>
          <span class="ml-3 fs-md" style="height:0.39rem;line-height:0.39rem;">{{item.context}}</span>
        </swiper-slide>
        <!-- <swiper-slide v-for="(item,index) in news" :key="index" v-show="(index % 2) != 0">
          <span>
            <img src alt />公告
          </span>
          <span class="ml-3" style="height:0.39rem;line-height:0.39rem;">{{item.title}}</span>
          <span class="ml-3" style="height:0.39rem;line-height:0.39rem;">{{item.context}}</span>
        </swiper-slide> -->
      </swiper>
    </div>
    <div class="taskView w-100">
      <!-- 任务看板 -->
      <div class="col d-flex ai-center">
        
        <div class="row d-flex ai-center">
          <span class="iconfont icon-rukuliucheng"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{store.waitIn}}</div>
            <div class="text-left text-white mt-1">预约入库</div>
          </div>
        </div>
        <div class="row d-flex ai-center">
          <span class="iconfont icon-rukuguanli-"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{store.todayIn}}</div>
            <div class="text-left text-white mt-1">今日入库</div>
          </div>
        </div>
        <div class="row d-flex ai-center" @click="checkDanger">
          <span class="iconfont icon-iconfontzhizuobiaozhunbduan19"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{store.danger}} 项</div>
            <!-- <marquee class="text-left text-white" width="0.55rem">{{store.skuWaringMsg}}</marquee> -->
            <div class="text-left text-white mt-1">本月入库</div>
          </div>
        </div>
        
      </div>
      <div class="col d-flex ai-center">
        <div class="row d-flex ai-center">
          <span class="iconfont icon-daichuku"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{store.waitOut}}</div>
            <div class="text-left text-white mt-1">预约出库</div>
          </div>
        </div>
        
        <div class="row d-flex ai-center">
          <span class="iconfont icon-chuku"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{store.todayOut}}</div>
            <div class="text-left text-white mt-1">今日出库</div>
          </div>
        </div>
        <div class="row d-flex ai-center">
          <span class="iconfont icon-kucun"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{store.storage}}</div>
            <div class="text-left text-white mt-1">本月出库</div>
          </div>
        </div>
      </div>
    </div>
     <circle-echart :items="items" class="circleEchart"></circle-echart>
    <stick-echart :items="items1" class="stickEchart"></stick-echart>
    <stick-line-echart :items="items2" class="stickEchart"></stick-line-echart>
    <line-echart :items="items3" class="stickEchart"></line-echart>
    <!-- 订单管理模块 -->
    <div>
      
    </div>
  </div>
</template>

<script>
import circleEchart from "../component/Echart/circleEchart";
import stickLineEchart from "../component/Echart/stick_lineEchart"
import stickEchart from "../component/Echart/stickEchart";
import lineEchart from "../component/Echart/lineEchart"
import { mapGetters } from "vuex";
import {
  getTask,dangerStorage
} from "@/api/api";
import { getStore, setStore, formatFen2Yuan, removeStore } from "@/util/util";
export default {
   components: { circleEchart, stickEchart,stickLineEchart,lineEchart },
  data() {
    return {
      store: {
        storage: 0,
        skuWaringMsg: "",
        todayOut: 1,
        waitOut: 0,
        todayIn: 3,
        waitIn: 0,
      },
      params:{
        fid:undefined
      },
      swiperOption: {
        notNextTick: true,
        //循环
        loop: true,
        //设定初始化时slide的索引
        initialSlide: 0,
        //自动播放
        // autoplay: true,
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: true
        },
        // 设置轮播
        // effect: "flip",
        //滑动速度
        speed: 800,
        //滑动方向
        direction: "vertical",
        //小手掌抓取滑动
        // grabCursor : true,
        //滑动之后回调函数
        // on: {
        //   slideChangeTransitionEnd: function() {
        //     // console.log(this.activeIndex);//切换结束时，告诉我现在是第几个slide
        //   }
        // },
        //左右点击
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev"
        // },
        //分页器设置
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      },
       items: [
        { name: "成品", value: 95, max: "100" },
        { name: "半成品", value: 55, max: "100" },
        { name: "原材料", value: 75, max: "100" }
      ],
      items1: [
        { name: "三级垫圈", stockInValue: 10, stockOutValue: 200 },
        { name: "外六角", stockInValue: 50, stockOutValue: 200 },
        { name: "螺钉", stockInValue: 60, stockOutValue: 200 },
         { name: "三级垫圈", stockInValue: 80, stockOutValue: 200 },
        { name: "外六角", stockInValue: 100, stockOutValue: 200 },
        { name: "螺钉", stockInValue: 120, stockOutValue: 200 },
         { name: "三级垫圈", stockInValue: 200, stockOutValue: 200 },
        { name: "外六角", stockInValue: 210, stockOutValue: 200 },
        { name: "螺钉", stockInValue: 250, stockOutValue: 200 },
         { name: "三级垫圈", stockInValue: 260, stockOutValue: 200 },
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
        { name: "1", stockInValue: 30, stockOutValue: 10,storage:20 },
        { name: "2", stockInValue: 40, stockOutValue: 20,storage:20 },
        { name: "3", stockInValue: 50, stockOutValue: 30 ,storage:20},
        { name: "4", stockInValue: 30, stockOutValue: 14,storage:16 },
        { name: "5", stockInValue: 40, stockOutValue: 20,storage:20 },
        { name: "6", stockInValue: 50, stockOutValue: 40,storage:10},
        { name: "7", stockInValue: 30, stockOutValue: 10,storage:20 },
        { name: "8", stockInValue: 40, stockOutValue: 20,storage:20 },
        { name: "9", stockInValue: 50, stockOutValue: 30 ,storage:20},
        { name: "10", stockInValue: 30, stockOutValue: 14,storage:16 },
        { name: "11", stockInValue: 40, stockOutValue: 20,storage:20 },
        { name: "12", stockInValue: 50, stockOutValue: 40,storage:10}
      ],
      news: [
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成1" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成2" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成3" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成4" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成5" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成6" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成7" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" },
        { id: 1, title: "日志", context: " XXX将三级垫圈上架完成" }
      ]
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    ...mapGetters(["fid"])
  },
  mounted(){
    this.params.fid=this.fid
    // this.getTask()
  },
  methods:{
    detailNews(){
      console.log('查看公告详情')
    },
    dangerStorage(){
      dangerStorage(this.params).then(res=>{
        console.log(res.data)
      })
    },
    getTask(){
      getTask(this.params).then(res=>{
        console.log(res.data)
        console.log(res.data.outSum)
        this.store.todayIn = res.data.inSum
        this.store.todayOut = res.data.outSum
        this.store.waitIn = res.data.notfor4InItem
        this.store.waitOut = res.data.notfor4OutItem
        this.store.storage = res.data.stockSum
        this.store.skuWaringMsg = res.data.skuWaringMsg
      })
    },
    checkDanger() {
      console.log("查看库存预警");
      this.dangerStorage()
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
.square {
  height: 0.4rem;
  position: sticky;
  top:0.64rem;
  z-index: 999;
  line-height: 0.6rem;
  // border-bottom-left-radius: 0.1rem;
  // border-bottom-right-radius: 0.1rem;
  // border-bottom: 0.01rem solid rgb(199, 198, 198);
}
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
          font-size: 0.13rem
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
