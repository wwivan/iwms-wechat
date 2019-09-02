<template>
  <div class="home">
    <!-- 顶部按钮 -->
    <div class="nav_btn d-flex jc-around">
      <div class="item fs-xs text-grey">
        <div
          @click="setTab('1')"
          class="icon-container"
          style="background:linear-gradient(135deg, #FF9779, #F6617B)"
        >
          <div class="icon">
            <img src="../assets/icons/仓储管理.png" style="width:100%" alt />
          </div>
        </div>
        仓储管理
      </div>
      <router-link class="item fs-xs text-grey" tag="div" to="/sap">
        <div
          class="icon-container"
          @click="setTab('2')"
          style="background:linear-gradient(135deg, #F8CF64, #FFCE45)"
        >
          <div class="icon">
            <img src="../assets/icons/销售采购.png" style="width:100%" alt />
          </div>
        </div>
        销售采购
      </router-link>
      <router-link class="item fs-xs text-grey" tag="div" to="/check/account">
        <div
          class="icon-container"
          style="background:linear-gradient(135deg, #4181FF, #2360EF)"
        >
          <div class="icon">
            <img src="../assets/icons/对账管理.png" style="width:100%" alt />
          </div>
        </div>
        对账管理
      </router-link>
      <!-- <div class="item" @click="onStockOutToCell">
            <div>
              <van-icon color="#1d8afa" name="gift-card-o" size="0.4rem" />
            </div>
            下架
      </div>-->
      <router-link class="item fs-xs text-grey" tag="div" to="/search/page">
        <div
          class="icon-container"
          style="background:linear-gradient(135deg, #F7C77F, #FF9860)"
        >
          <div class="icon">
            <img src="../assets/icons/查询.png" style="width:100%" alt />
          </div>
        </div>
        查 询
      </router-link>
      <router-link class="item fs-xs text-grey" tag="div" to="/stockOut">
        <div
          class="icon-container"
          style="background:linear-gradient(135deg, #F8CF64, #FFCE45)"
        >
          <div class="icon">
            <img src="../assets/icons/报表.png" style="width:100%" alt />
          </div>
        </div>
        报 表
      </router-link>
    </div>
    <!-- 滚动栏 -->
    <div
      class="square d-flex jc-around text-white"
      @click="detailNews"
      v-if="0"
    >
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <!-- <swiper-slide v-for="(item, i) in images" :key="i">
        <a :href="item.url"> <img class="w-100" :src="item.image" alt=""/></a>      
        </swiper-slide>-->
        <swiper-slide v-for="(item, index) in news" :key="index">
          <span
            class="iconfont icon-xiaolaba"
            style="height:0.39rem;line-height:0.39rem;"
          ></span>
          <span
            class="ml-3 fs-md"
            style="height:0.39rem;line-height:0.39rem;"
            >{{ item.title }}</span
          >
          <span
            class="ml-3 fs-md"
            style="height:0.39rem;line-height:0.39rem;"
            >{{ item.context }}</span
          >
        </swiper-slide>
        <!-- <swiper-slide v-for="(item,index) in news" :key="index" v-show="(index % 2) != 0">
          <span>
            <img src alt />公告
          </span>
          <span class="ml-3" style="height:0.39rem;line-height:0.39rem;">{{item.title}}</span>
          <span class="ml-3" style="height:0.39rem;line-height:0.39rem;">{{item.context}}</span>
        </swiper-slide>-->
      </swiper>
    </div>
    <div class="taskView w-100">
      <!-- 任务看板 -->
      <div class="col d-flex ai-center">
        <div class="row d-flex ai-center" v-if="this.userType == 1">
          <span class="iconfont icon-rukuliucheng"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{ store.waitIn }}</div>
            <div class="text-left text-white mt-1">预约入库</div>
          </div>
        </div>
        <div class="row d-flex ai-center" v-if="this.userType == 0">
          <span class="iconfont icon-rukuliucheng"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{ store.waitIn }}</div>
            <div class="text-left text-white mt-1">采购单量</div>
          </div>
        </div>
        <div class="row d-flex ai-center">
          <span class="iconfont icon-rukuguanli-"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{ store.todayIn }}</div>
            <div class="text-left text-white mt-1">今日入库</div>
          </div>
        </div>
        <div class="row d-flex ai-center">
          <span class="iconfont icon-iconfontzhizuobiaozhunbduan19"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">
              {{ store.danger ? store.danger : "0" }}
            </div>
            <!-- <marquee class="text-left text-white" width="0.55rem">{{store.skuWaringMsg}}</marquee> -->
            <div class="text-left text-white mt-1">本月入库</div>
          </div>
        </div>
      </div>
      <div class="col d-flex ai-center">
        <div class="row d-flex ai-center" v-if="this.userType == 1">
          <span class="iconfont icon-daichuku"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{ store.waitOut }}</div>
            <div class="text-left text-white mt-1">预约出库</div>
          </div>
        </div>
        <div class="row d-flex ai-center" v-if="this.userType == 0">
          <span class="iconfont icon-daichuku"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{ store.waitOut }}</div>
            <div class="text-left text-white mt-1">销售单量</div>
          </div>
        </div>
        <div class="row d-flex ai-center">
          <span class="iconfont icon-chuku"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{ store.todayOut }}</div>
            <div class="text-left text-white mt-1">今日出库</div>
          </div>
        </div>
        <div class="row d-flex ai-center">
          <span class="iconfont icon-kucun"></span>
          <div class="ml-2">
            <div class="fs-xl text-white">{{ store.storage }}</div>
            <div class="text-left text-white mt-1">本月出库</div>
          </div>
        </div>
      </div>
    </div>
    <swiper-page :items="this.items7" v-if="this.items7"></swiper-page>
    <!-- <div class="fs-xl">利润率</div> -->
    <div class="circleEchart d-flex">
      <dashboard-echart
        class="dashboard"
        :items="items8"
        :itemName="analysisMsg.name1"
        :title="analysisMsg.title"
        :color="analysisMsg.color"
        :tableColor="analysisMsg.tableColor"
      ></dashboard-echart>
      <dashboard-echart
        class="dashboard"
        :items="items9"
        :itemName="analysis2Msg.name1"
        :title="analysis2Msg.title"
        :color="analysis2Msg.color"
        :tableColor="analysis2Msg.tableColor"
      ></dashboard-echart>
    </div>
    <circle-echart
      :items="items4"
      :title="salePerMsg.title"
      :color="salePerMsg.color"
      class="circleEchart"
    ></circle-echart>
    <full-circle-echart
      :items="items6"
      :title="materielSaleMsg.title"
      :color="materielSaleMsg.color"
      class="circleEchart"
    ></full-circle-echart>
    <double-stick-echart
      :items="items5"
      class="stickEchart"
      :itemName="saleMsg.name1"
      :itemName2="saleMsg.name2"
      :title="saleMsg.title"
      :color="saleMsg.color"
      v-if="items4"
    ></double-stick-echart>
    <circle-echart
      :items="items"
      :title="materielMsg.title"
      :color="materielMsg.color"
      class="circleEchart"
    ></circle-echart>
    <stick-echart
      :items="items1"
      class="stickEchart"
      :itemName="top10Msg.name1"
      :itemName2="top10Msg.name2"
      :title="top10Msg.title"
      :color="top10Msg.color"
      v-if="items1"
    ></stick-echart>
    <stick-line-echart
      :items="items2"
      :itemName="dangerMsg.name1"
      :itemName2="dangerMsg.name2"
      :title="dangerMsg.title"
      :color="dangerMsg.color"
      class="stickEchart"
    ></stick-line-echart>
    <line-echart :items="items3" class="stickEchart"></line-echart>
    <!-- 订单管理模块 -->
    <div></div>
  </div>
</template>

<script>
import circleEchart from "../component/Echart/circleEchart";
import stickLineEchart from "../component/Echart/stick_lineEchart";
import stickEchart from "../component/Echart/stickEchart";
import lineEchart from "../component/Echart/lineEchart";
import doubleStickEchart from "../component/Echart/doubleStickEchart";
import fullCircleEchart from "../component/Echart/fullCircleEchart";
import dashboardEchart from "../component/Echart/dashboardEchart";
import swiperPage from "../component/swiper";
import { setStore, getStore } from "@/util/util";
import { mapGetters } from "vuex";
// eslint-disable-next-line no-unused-vars
import { getTask, dangerStorage } from "@/api/api";
export default {
  components: {
    circleEchart,
    stickEchart,
    stickLineEchart,
    lineEchart,
    doubleStickEchart,
    fullCircleEchart,
    dashboardEchart,
    swiperPage
  },
  data() {
    return {
      stockType: undefined,
      userType: 1,
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
      materielMsg: {
        name1: "当前库存",
        name2: "安全库存",
        title: "物料统计",
        color: [
          "#4181FF",
          "#749f83",
          "#c23531",
          "#2f4554",
          "#ca8622",
          "#bda29a",
          "#6e7074",
          "#546570",
          "#c4ccd3"
        ]
      },
      salePerMsg: {
        name1: "当前库存",
        name2: "安全库存",
        title: "个人销售情况占比",
        color: [
          "#4181FF",
          "#749f83",
          "#c23531",
          "#2f4554",
          "#ca8622",
          "#bda29a",
          "#6e7074",
          "#546570",
          "#c4ccd3"
        ]
      },
      materielSaleMsg: {
        name1: "当前库存",
        name2: "安全库存",
        title: "产品销售情况占比",
        color: [
          "#4181FF",
          "#749f83",
          "#c23531",
          "#2f4554",
          "#ca8622",
          "#bda29a",
          "#6e7074",
          "#546570",
          "#c4ccd3"
        ]
      },
      dangerMsg: {
        name1: "当前库存",
        name2: "安全库存",
        title: "库存预警",
        color: ["#FF9860", "#4181FF", "#F6617B"]
      },
      top10Msg: {
        name1: "库存",
        name2: "安全库存",
        title: "库存top10",
        color: ["#FF9860", "#4181FF", "#F6617B"]
      },
      saleMsg: {
        name1: "销售金额",
        name2: "同期销售金额",
        title: "月度销售趋势",
        color: ["#FF9860", "#4181FF", "#F6617B"]
      },
      analysisMsg: {
        name1: "业务指标",
        // name2: "同期销售金额",
        title: "毛利润率",
        color: ["#FF9860", "#4181FF", "#F6617B"],
        tableColor: [[0.25, "#FF9860"], [0.75, "#4181FF"], [1, "#F6617B"]]
      },
      analysis2Msg: {
        name1: "业务指标",
        // name2: "同期销售金额",
        title: "净利润率",
        color: ["#4181FF", "#FF9860", "#F6617B"],
        tableColor: [[0.25, "#4181FF"], [0.75, "#F6617B"], [1, "#FF9860"]]
      },
      items: [
        { name: "成品", value: 95, max: "100" },
        { name: "半成品", value: 55, max: "100" },
        { name: "原材料", value: 75, max: "100" }
      ],
      items1: undefined,
      items2: [
        { name: "三级垫圈", stockInValue: 30, stockOutValue: 10 },
        { name: "外六角", stockInValue: 40, stockOutValue: 20 },
        { name: "螺钉", stockInValue: 50, stockOutValue: 30 },
        { name: "白金卡", stockInValue: 30, stockOutValue: 14 },
        { name: "主机", stockInValue: 40, stockOutValue: 20 },
        { name: "显示器", stockInValue: 50, stockOutValue: 40 }
      ],
      items3: [
        { name: "1月份", stockInValue: 30, stockOutValue: 10, storage: 20 },
        { name: "2月份", stockInValue: 40, stockOutValue: 20, storage: 20 },
        { name: "3月份", stockInValue: 50, stockOutValue: 30, storage: 20 },
        { name: "4月份", stockInValue: 30, stockOutValue: 14, storage: 16 },
        { name: "5月份", stockInValue: 40, stockOutValue: 20, storage: 20 },
        { name: "6月份", stockInValue: 50, stockOutValue: 40, storage: 10 },
        { name: "7月份", stockInValue: 30, stockOutValue: 10, storage: 20 },
        { name: "8月份", stockInValue: 40, stockOutValue: 20, storage: 20 },
        { name: "9月份", stockInValue: 50, stockOutValue: 30, storage: 20 },
        { name: "10月份", stockInValue: 30, stockOutValue: 14, storage: 16 },
        { name: "11月份", stockInValue: 40, stockOutValue: 20, storage: 20 },
        { name: "12月份", stockInValue: 50, stockOutValue: 40, storage: 10 }
      ],
      items4: [
        { name: "张三", value: 5, max: "100" },
        { name: "李四", value: 2, max: "100" },
        { name: "王五", value: 4, max: "100" },
        { name: "周六", value: 7, max: "100" },
        { name: "姜七", value: 2, max: "100" }
      ],
      items5: [
        { name: "1月份", num1: 30, num2: 10 },
        { name: "2月份", num1: 40, num2: 20 },
        { name: "3月份", num1: 50, num2: 30 },
        { name: "4月份", num1: 30, num2: 14 },
        { name: "5月份", num1: 40, num2: 20 },
        { name: "6月份", num1: 50, num2: 40 },
        { name: "7月份", num1: 30, num2: 10 },
        { name: "8月份", num1: 40, num2: 20 },
        { name: "9月份", num1: 50, num2: 30 },
        { name: "10月份", num1: 30, num2: 14 },
        { name: "11月份", num1: 40, num2: 20 },
        { name: "12月份", num1: 50, num2: 40 }
      ],
      items6: [
        { name: "白金卡", value: 5, max: "100" },
        { name: "小米手机", value: 2, max: "100" },
        { name: "联想电脑", value: 4, max: "100" },
        { name: "显示器", value: 7, max: "100" },
        { name: "打印机", value: 2, max: "100" }
      ],
      items9: [{ value: 50 }],
      items8: [{ value: 70 }],
      items7: [
        {
          name1: "本期营业收入（万元）",
          value: "97,089.05",
          name2: "本年营业收入（万元）",
          totalValue: "173,116.18",
          color: "linear-gradient(135deg, #4181FF, #2360EF)",
          bgColor: "linear-gradient(-135deg, #F7C77F, #FF9860)"
        },
        {
          name1: "本期营业成本（万元）",
          value: "63520.05",
          name2: "本年营业成本（万元）",
          totalValue: "115,653.81",
          color: "linear-gradient(135deg, #FF9779, #F6617B)",
          bgColor: "linear-gradient(-135deg, #4181FF, #2360EF)"
        },
        {
          name1: "本期营业利润（万元）",
          value: "25,901.77",
          name2: "本年营业利润（万元）",
          totalValue: "51790.10",
          color: "linear-gradient(135deg, #F7C77F, #FF9860)",
          bgColor: "linear-gradient(-135deg, #FF9779, #F6617B)"
        },
        {
          name1: "本期净利润（万元）",
          value: "20,949.34",
          name2: "本年净利润（万元）",
          totalValue: "42,546.23",
          color: "linear-gradient(135deg, #F8CF64, #FFCE45)",
          bgColor: "linear-gradient(-135deg, #4181FF, #2360EF)"
        }
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
  mounted() {
    this.params.fid = this.fid;
    this.getTask();
  },
  methods: {
    setTab(k) {
      if (k == "1") {
        this.$router.push("/warehouse");
        this.stockType = getStore("stockType");
        if (this.stockType == undefined) {
          this.stockType = "1";
        } else if (this.stockType == "0") {
          this.$router.push("/warehouse/reserve/order");
        } else if (this.stockType == "1") {
          this.$router.push("/warehouse/stockIn");
        } else if (this.stockType == "2") {
          this.$router.push("/warehouse/reserve/order");
        } else if (this.stockType == "3") {
          this.$router.push("/warehouse/stockOut");
        }
      }
      setStore("tabActive", k);
    },
    detailNews() {},
    // dangerStorage() {
    //   dangerStorage(this.params).then(res => {
    //   });
    // },
    getTask() {
      getTask(this.params).then(res => {
        // eslint-disable-next-line no-console
        console.log(res.data);
        this.store.todayIn = res.data.inSum;
        this.store.todayOut = res.data.outSum;
        this.store.waitIn = res.data.notfor4InItem;
        this.store.waitOut = res.data.notfor4OutItem;
        this.store.storage = res.data.stockSum;
        this.store.skuWaringMsg = res.data.skuWaringMsg;
        //top10库存数据重组
        if (res.data.top10Name) {
          const names = this.reset(res.data.top10Name);
          const pieces = this.reset(res.data.top10piece);
          let i;
          this.items1 = [];
          for (i = 0; i < names.length - 1; i++) {
            let arr = { name: names[i], num1: pieces[i] };
            this.items1.push(arr);
          }
        }

        // console.log(this.items1);
      });
    },
    reset(item) {
      let name = item.replace(/\s*/g, "");
      let names = new Array();
      names = name.split(",");
      return names;
    },
    checkDanger() {
      this.dangerStorage();
    }
    // log() {
    //   let items2 = this.items1.map(Element => {
    //     return {
    //       name: Element.name
    //     };
    //   });
    //   // console.log(this.stockOutValue);
    // }
  }
};
</script>
<style lang="scss" scoped>
.nav_btn {
  width: 90%;
  margin: 0 auto;
  height: 1rem;
  padding-top: 0.16rem;
  // border-bottom: 0.01rem solid rgb(192, 192, 192);
  .item {
    line-height: 0.35rem;
    height: 0.8rem;
    .icon-container {
      width: 0.44rem;
      height: 0.44rem;
      border-radius: 50%;
      position: relative;
      margin: 0 auto;
      .icon {
        position: absolute;
        width: 0.44rem;
        height: 0.44rem;
        // margin-left: 0.09rem;
        // margin-top: 0.09rem;
      }
    }
  }
}
.square {
  // background: rgba(116, 116, 116, 0.2);
  width: 94%;
  border-radius: 8px;
  margin: 0 auto;
  background: rgba(255, 150, 121, 0.6);
  height: 0.4rem;
  // position: sticky;
  // top: 0.64rem;
  // z-index: 999;
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
      // background: rgb(192, 192, 192);
      background: rgba(65, 128, 255, 0.6);
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
          font-size: 0.13rem;
        }
      }
    }
  }
}
.circleEchart {
  margin: 0.1rem auto;
  width: 90%;
  .dashboard {
    margin: 0 auto;
  }
}
.stickEchart {
  margin: 0.1rem auto;
  width: 80%;
}
</style>
