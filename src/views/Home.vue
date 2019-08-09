<template>
  <div class="home">
    <div class="square d-flex jc-around bg-orange text-white" @click="detailNews">
      <swiper :options="swiperOption" ref="mySwiper" >
        <!-- slides -->
        <!-- <swiper-slide v-for="(item, i) in images" :key="i">
        <a :href="item.url"> <img class="w-100" :src="item.image" alt=""/></a>
        </swiper-slide>-->
        <swiper-slide v-for="(item,index) in news" :key="index">
          <span>
            <img src alt />公告
          </span>
          <span class="ml-3" style="height:39px;line-height:39px;">{{item.title}}</span>
          <span class="ml-3" style="height:39px;line-height:39px;">{{item.context}}</span>
        </swiper-slide>
        <!-- <swiper-slide v-for="(item,index) in news" :key="index" v-show="(index % 2) != 0">
          <span>
            <img src alt />公告
          </span>
          <span class="ml-3" style="height:39px;line-height:39px;">{{item.title}}</span>
          <span class="ml-3" style="height:39px;line-height:39px;">{{item.context}}</span>
        </swiper-slide> -->
      </swiper>
    </div>
     <circle-echart :items="items" class="circleEchart"></circle-echart>
    <stick-echart :items="items1" class="stickEchart"></stick-echart>
    <stick-line-echart :items="items2" class="stickEchart"></stick-line-echart>
    <line-echart :items="items3" class="stickEchart"></line-echart>
  </div>
</template>

<script>
import circleEchart from "../component/Echart/circleEchart";
import stickLineEchart from "../component/Echart/stick_lineEchart"
import stickEchart from "../component/Echart/stickEchart";
import lineEchart from "../component/Echart/lineEchart"
export default {
   components: { circleEchart, stickEchart,stickLineEchart,lineEchart },
  data() {
    return {
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
  },
  methods:{
    detailNews(){
      console.log('查看公告详情')
    }
  }
};
</script>
<style lang="scss" scoped>
.square {
  height: 40px;
  position: sticky;
  top:64px;
  z-index: 999;
  // border-bottom: 1px solid rgb(199, 198, 198);
}
.circleEchart {
  margin: 10px auto;
  width: 80%;
  
}
.stickEchart {
  margin: 10px auto;
  width: 80%;
}
</style>
