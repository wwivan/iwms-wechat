<template>
  <div>
    <div class="header bg-dark-1 d-flex jc-between ai-center">
      <div class="text-white ml-3">关闭</div>
      <div class="text-white fs-xl">仓库管理</div>
      <div class="text-white mr-3">我的</div>
    </div>
    <div class="nav bg-orange d-flex jc-between ai-center">
      <div class="text-white ml-3">返回</div>
      <div class="text-white fs-xl">功能</div>
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
          <div class="icon-container" style="background:linear-gradient(135deg, #4181FF, #2360EF)">
            <div class="icon">
              <img src="../assets/images/出库登记@2x.png" style="width:100%" alt />
            </div>
          </div>出库登记
        </router-link>
        <router-link
          class="item"
          tag="div"
          to="/item/search"
          v-show="!this.act"
          @click="changeToshow"
        >
          <div class="icon-container" style="background:linear-gradient(135deg, #F7C77F, #FF9860)">
            <div class="icon">
              <img src="../assets/images/出库存货@2x.png" style="width:100%" alt />
            </div>
          </div>物料查询
        </router-link>
        <!-- <div class="item" @click="onStockOutToCell">
            <div>
              <van-icon color="#1d8afa" name="gift-card-o" size="40px" />
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
        <router-link class="item" tag="div" to="/echart" v-show="this.act" @click="changeToshow">
          <div class="icon-container" style="background:linear-gradient(135deg, #F7C77F, #FF9860)">
            <div class="icon">
              <img src="../assets/images/出库存货@2x.png" style="width:100%" alt />
            </div>
          </div>智能图表
        </router-link>
      </div>
      <!-- 主体内容展示 -->
      <div>
        <router-view></router-view>
      </div>
      <!-- 信息展示 -->
      <!-- 信息展示 -->
      <div>
        <h3>最新消息</h3>
      </div>
    </div>
  </div>
</template>

<script>
import Home from "./Home";
import {mapGetters,mapMutations} from "vuex"
export default {
  components: { Home },
  data() {
    return {
      isshow: false,
      act: false,
      toshow: true
    };
  },
  computed:{
...mapGetters(['toshow']),
...mapMutations(["toshowOpen","toshowClose"])
  },
  methods: {
    changeIsshow() {
      this.isshow = !this.isshow;
    },
    changeToshow() {
      console.log(1111111);
      this.toshow = false;
    },
    operation() {
      this.act = false;
      this.toshow = true;
      this.isshow = false;
      this.$router.push("/")
    },
    statistical(){
      this.act = true;
      this.toshow = true;
      this.isshow = false;
      this.$router.push("/")
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 4.9231rem;
}
.nav {
  width: 100%;
  height: 3.0769rem;
}
.active {
  display: block;
}
.normal {
  display: none;
}
.menu {
  z-index: 999;
  width:1.5385rem;
  height: 6.1538rem;
  right: -1rem;
}
.square {
  height:120px;
  padding-top: 1.5385rem;
  border-bottom: 1px solid rgb(192, 192, 192);
  .item {
    line-height: 35px;
    height: 90px;
    .icon-container {
      width: 55.0004px;
      height: 55.0004px;
      border-radius: 50%;
      position: relative;
      .icon {
        position: absolute;
        width: 2.4615rem;
        height: 2.4615rem;
        margin-left: 0.9231rem;
        margin-top: 0.9231rem;
      }
    }
  }
}
</style>

