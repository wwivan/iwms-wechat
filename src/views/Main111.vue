<template>
  <div>
    <div class="header bg-dark-1 d-flex jc-between ai-center">
      <router-link tag="div" to="/authorize" class="text-white ml-3">关闭</router-link>
      <div class="text-white fs-xl">仓库管理</div>
      <div class="text-white mr-3" @click="system">我的</div>
    </div>
    <div class="nav bg-orange d-flex jc-between ai-center">
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
    </div>
    <div class="main">
      <div class="square d-flex jc-around" v-if="this.toshow" @click="changeToshow">
        <router-link class="item" tag="div" to="/stockIn" v-show="!this.act">
          <div class="icon-container" style="background:linear-gradient(135deg, #FF9779, #F6617B)">
            <div class="icon">
              <img src="../assets/images/入库登记@2x.png" style="width:100%" alt />
            </div>
          </div>入库登记
        </router-link>
        <router-link class="item" tag="div" to="/stockOut" v-show="!this.act" @click="changeToshow">
          <div class="icon-container" style="background:linear-gradient(135deg, #F8CF64, #FFCE45)">
            <div class="icon">
              <img src="../assets/images/出库登记@2x.png" style="width:100%" alt />
            </div>
          </div>出库登记
        </router-link>
        <router-link
          class="item"
          tag="div"
          to="/materiel/search"
          v-show="!this.act"
          @click="changeToshow"
        >
          <div class="icon-container" style="background:linear-gradient(135deg, #4181FF, #2360EF)">
            <div class="icon">
              <img src="../assets/images/出库存货@2x.png" style="width:100%" alt />
            </div>
          </div>物料查询
        </router-link>
        <!-- <div class="item" @click="onStockOutToCell">
            <div>
              <van-icon color="#1d8afa" name="gift-card-o" size="0.4rem" />
            </div>
            下架
        </div>-->
        <router-link
          class="item"
          tag="div"
          to="/check/account"
          v-show="!this.act"
          @click="changeToshow"
        >
          <div class="icon-container" style="background:linear-gradient(135deg, #F7C77F, #FF9860)">
            <div class="icon">
              <img src="../assets/images/盘点操作@2x.png" style="width:100%" alt />
            </div>
          </div>对账
        </router-link>
      </div>
      <!-- 主体内容展示 -->
      <div>
        <router-view></router-view>
      </div>
      <!-- <div @click="getSign">测试{{code}}</div> -->
      <!-- <div @click="getSign">{{test}}测试</div><div @click="getUserInfo">{{test}}测试</div> -->
      <!-- 信息展示 -->
      <!-- 信息展示 -->
      <scroll-y
        v-show="toshow"
        class="wrapper"
        style="height:4.4rem;overflow:hidden"
        :data="news"
        :pulldown="pulldown"
        @pulldown="loadData"
      >
        <div class="content">
          <div
            v-for="(item,index) in news"
            :key="index"
            class="d-flex jc-start ai-center"
            style="height:0.3rem;"
          >
            <span class="bot ml-4" style="background: linear-gradient(135deg, #FF9779, #F6617B);"></span>
            <span class="ml-4 text-grey-1">{{item.title}}</span>
            <span class="ml-4 text-grey-1">{{item.context}}</span>
          </div>
        </div>
      </scroll-y>
    </div>
  </div>
</template>

<script>
import Home from "./Home";
import ScrollY from "../component/scrollY";
import { mapGetters, mapMutations } from "vuex";
import { stockDetailList } from "@/api/api";
import axios from "axios";
export default {
  components: { Home, ScrollY },
  data() {
    return {
      isshow: false,
      act: false,
      toshow: true,
      navName: "功能",
      pulldown: true,
      appID: "wx08c444d8f0255f63",
      code: "",
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
      },
      news: [
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
    ...mapGetters(["fid"])
    // ...mapMutations(["toshowOpen","toshowClose"])
  },
  updated() {
    this.confirmStatus();
  },
  created() {
    this.params.fid = this.fid;
    console.log(this.params.fid);
    this.confirmStatus();
    this.stockDetailList();
  },
  methods: {
    async getSign() {
      // const res = await axios.get(
      //   `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${this.appID}&secret=${this.appserect}&code=001iMOp62phV1S0oKCo62ZuCp62iMOpH&grant_type=authorization_code`
      // );
     const res = await axios.get("http://26f096i864.zicp.vip:56836/getWxConfig")
      console.log(res.data);
      this.code = res.data
    },
    system() {
      console.log("我的");
    },
    stockDetailList() {
      console.log(11111111);
      stockDetailList(this.params).then(res => {
        console.log(res.data);
      });
    },
    loadData() {
      console.log("下拉刷新");
    },
    changeIsshow() {
      this.isshow = !this.isshow;
    },
    changeToshow() {
      console.log(1111111);
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
  display: block;
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
  height: 1.2rem;
  padding-top: 0.2rem;
  border-bottom: 0.01rem solid rgb(192, 192, 192);
  .item {
    line-height: 0.35rem;
    height: 0.9rem;
    .icon-container {
      width: 0.55rem;
      height: 0.55rem;
      border-radius: 50%;
      position: relative;
      .icon {
        position: absolute;
        width: 0.32rem;
        height: 0.32rem;
        margin-left: 0.12rem;
        margin-top: 0.12rem;
      }
    }
  }
}
</style>

