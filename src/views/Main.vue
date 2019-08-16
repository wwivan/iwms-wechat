<template>
  <div>
    <div class="header bg-dark-1 d-flex jc-between ai-center">
      <router-link
        tag="div"
        to="/authorize"
        class="text-white ml-3"
        style="width:0.4rem;height:0.64rem;line-height:0.40rem"
      >
        <img src="../assets/images/logo1.png" class="w-100" style="margin-top:0" alt />
      </router-link>
      <div class="text-white fs-xl">江苏东志信有限公司</div>
      <div class="text-white mr-3" style="width:0.4rem;height:0.64rem;line-height:0.25rem">
        <span
          v-show="!this.userInfo.headimgurl"
          class="iconfont icon-canguanyuyue"
          style="font-size:0.2rem;color:white"
        ></span>
        <img
          style="width:0.25rem;height:0.25rem"
          v-show="this.userInfo.headimgurl"
          :src="userInfo.headimgurl"
        />
      </div>
    </div>
    <!-- <div class="nav bg-orange d-flex jc-between ai-center">
      <div class="text-white ml-3" @click="back">返回</div>
      <div class="text-white fs-xl">{{this.navName}}</div>
      <div class="text-white mr-3" @click="changeIsshow">菜单</div>
    </div>
    <div
      :class="(this.isshow)?'active':'normal'"
      class="menu bg-dark mr-3 text-white posi-a jc-center"
    >
      <div class="mt-2" @click="operation">功能</div>
      <div class="mt-2" @click="statistical">统计</div>
    </div>-->
    <div class="main bg-white">
      <router-view></router-view>
    </div>
    <div style="height:0.57rem;width:100%"></div>
    <div class="tabbar d-flex jc-around w-100">
      <router-link tag="div" to="/home" class="w-25 border-right">
        <div class="box">
          <span
            class="iconfont icon-gongnengguanli"
            @click="tab1Active"
            :class="this.tab1?'active':''"
          ></span>
        </div>
        <div class="text fs-sm" :class="this.tab1?'active':''">首页</div>
      </router-link>
      <router-link tag="div" to="/StockIn" class="w-25 border-right">
        <div class="box">
          <span
            class="iconfont icon-canguanyuyue"
            @click="tab2Active"
            :class="this.tab2?'active':''"
          ></span>
        </div>
        <div class="text fs-sm" :class="this.tab2?'active':''">入库</div>
      </router-link>
      <router-link tag="div" to="/StockOut" class="w-25 border-right">
        <div class="box">
          <span class="iconfont icon-daichuku" @click="tab3Active" :class="this.tab3?'active':''"></span>
        </div>
        <div class="text fs-sm" :class="this.tab3?'active':''">出库</div>
      </router-link>
      <router-link tag="div" to="/search/page" class="w-25 border-right">
        <div class="box">
          <span class="iconfont icon-query1" @click="tab4Active" :class="this.tab4?'active':''"></span>
        </div>
        <div class="text fs-sm" :class="this.tab4==1?'active':''">查询</div>
      </router-link>
      <router-link tag="div" to="/check/account" class="w-25">
        <div class="box">
          <span
            class="iconfont icon-shuxingliebiaoxiangqing"
            @click="tab5Active"
            :class="this.tab5?'active':''"
          ></span>
        </div>
        <div class="text fs-sm" :class="this.tab5?'active':''">对账</div>
      </router-link>
    </div>
  </div>
</template>

<script>
// import ScrollY from "../component/scrollY";
import { mapGetters } from "vuex";
import { stockDetailList } from "@/api/api";
import axios from "axios";
export default {
  // components: { ScrollY },
  data() {
    return {
      userInfo: {
        openid: "",
        nickname: "",
        sex: 1,
        language: "",
        city: "",
        province: "",
        country: "",
        headimgurl: "",
        privilege: []
      },
      code: "",
      tab1: true,
      tab2: false,
      tab3: false,
      tab4: false,
      tab5: false,
      isshow: false,
      act: false,
      toshow: true,
      navName: "功能",
      pulldown: true,
      appID: "wx08c444d8f0255f63",
      code: undefined,
      appserect: "ee2d5ba41eabb66b7b39229d4405db75",
      params: {
        pageNumber: 1,
        pageSize: 30,
        sortType: "auto",
        fid: "42dd7498-b9d3-43b3-b736-3e9844f03ff5",
        searchParams: {}
      },
      signature: "7447D0441882CAA7070646C0DA7646E7AA854778,1785",
      sysParam: {
        appid: "5032022018001"
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    ...mapGetters(["fid"])

    // ...mapMutations(["toshowOpen","toshowClose"])
  },
  updated() {
    this.confirmStatus();
  },
  created() {
    this.params.fid = this.fid;
    // console.log(this.params.fid);
    this.confirmStatus();
    // this.stockDetailList();
    this.getCode();
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    getCode() {
      let name = "code";
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); // 匹配目标参数
      // this.code = unescape(r[2]);
      if (r != null) {
        this.code = unescape(r[2]);
      } else {
        this.code = null;
      }
      // console.log(this.code);
    },
    async getUserInfo() {
      if (this.code != null) {
        const res = await axios.get(`http://49.235.41.147:3000/${this.code}`);
        this.userInfo = res.data;
        // console.log(this.userInfo);
      } else {
        return;
      }
    },
    tab1Active() {
      this.tab1 = true;
      this.tab5 = this.tab2 = this.tab3 = this.tab4 = false;
    },
    tab2Active() {
      this.tab2 = true;
      this.tab5 = this.tab1 = this.tab3 = this.tab4 = false;
    },
    tab3Active() {
      this.tab3 = true;
      this.tab5 = this.tab2 = this.tab1 = this.tab4 = false;
    },
    tab4Active() {
      this.tab4 = true;
      this.tab5 = this.tab2 = this.tab3 = this.tab1 = false;
    },
    tab5Active() {
      this.tab5 = true;
      this.tab4 = this.tab2 = this.tab3 = this.tab1 = false;
    },

    system() {
      // console.log("我的");
    },
    stockDetailList() {
      // console.log(11111111);
      stockDetailList(this.params).then(res => {
        // console.log(res.data);
      });
    },
    loadData() {
      // console.log("下拉刷新");
    },
    changeIsshow() {
      this.isshow = !this.isshow;
    },
    changeToshow() {
      // console.log(1111111);
      this.toshow = false;
    },
    operation() {
      this.navName = "功能";
      this.act = false;
      this.toshow = true;
      this.isshow = false;
      this.$router.push("/");
    },
    statistical() {
      this.navName = "统计";
      this.toshow = false;
      this.isshow = false;
      this.$router.push("/echart");
    },
    back() {
      if (this.$router.currentRoute.fullPath == "/reserve/order") {
        this.$router.push("/");
      } else if (
        this.$router.currentRoute.fullPath == "/reserve/order/detail"
      ) {
        this.$router.push("/reserve/order");
      } else if (this.$router.currentRoute.fullPath == "/reserve/order/form") {
        this.$router.push("/reserve/order");
      } else if (
        this.$router.currentRoute.fullPath == "/reserve/order/search"
      ) {
        this.$router.push("/reserve/order");
      } else if (
        this.$router.currentRoute.fullPath == "/reserve/order/detail/form"
      ) {
        this.$router.push("/reserve/order/detail");
      } else if (
        this.$router.currentRoute.fullPath == "/reserve/order/detail/search"
      ) {
        this.$router.push("/reserve/order/detail");
      } else if (this.$router.currentRoute.fullPath == "/stockIn") {
        this.$router.push("/");
      } else if (this.$router.currentRoute.fullPath == "/stockIn/form") {
        this.$router.push("/stockIn");
      } else if (this.$router.currentRoute.fullPath == "/stockIn/detail") {
        this.$router.push("/stockIn");
      } else if (this.$router.currentRoute.fullPath == "/stockIn/search") {
        this.$router.push("/stockIn");
      } else if (this.$router.currentRoute.fullPath == "/stockOut") {
        this.$router.push("/");
      } else if (this.$router.currentRoute.fullPath == "/stockOut/detail") {
        this.$router.push("/stockOut");
      } else if (this.$router.currentRoute.fullPath == "/stockOut/form") {
        this.$router.push("/stockOut");
      } else if (this.$router.currentRoute.fullPath == "/stockOut/search") {
        this.$router.push("/stockOut");
      } else if (
        this.$router.currentRoute.fullPath == "/stockOut/item/detail"
      ) {
        this.$router.push("/stockOut/detail");
      } else {
        this.$router.go("-1");
      }
    },
    confirmStatus() {
      if (this.$router.currentRoute.fullPath == "/") {
        this.toshow = true;
      }
      if (this.$router.currentRoute.fullPath != "/") {
        this.toshow = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  padding: 0;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 0;
  background: #f1f1f1;
}
.tabbar {
  height: 0.57rem;
  position: fixed;
  bottom: 0;
  border-top: 0.01rem solid #f0f0f0;
  background: white;
  .box {
    line-height: 0;
    // margin-top: 0.1rem
    // // align-items: center;
    // // height: 0.3rem;
  }
}
.iconfont {
  width: 0.3rem;
  height: 0.3rem;
  line-height: 0.3rem;
  font-size: 0.3rem;
  color: grey;
}
.text {
  color: grey;
}
.header {
  width: 100%;
  height: 0.64rem;
  position: sticky;
  top: 0;
  z-index: 999;
}
.nav {
  position: sticky;
  top: 0.64rem;
  z-index: 999;
  width: 100%;
  height: 0.4rem;
}
.active {
  color: #ff9860;
}
.normal {
  display: none;
}
.menu {
  z-index: 999;
  width: 0.2rem;
  height: 0.8rem;
  right: -0.13rem;
}
.bot {
  width: 0.11rem;
  height: 0.11rem;
  border-radius: 50%;
  display: inline-block;
}
.square {
  height: 0.4rem;
  border-bottom: 0.01rem solid rgb(199, 198, 198);
}
</style>

