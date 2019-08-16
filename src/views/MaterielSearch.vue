<template>
  <div>
    <!-- <van-nav-bar title="物料查询" left-text="返回" right-text="确定" left-arrow @click-left="onTitleClickLeft" @click-right="onTitileClickRight" />
    <van-field clearable label="物料名称" placeholder="请输入物料名称" v-model="params.LIKE_name"></van-field>
    <van-field clearable label="物料型号 " placeholder="请输入物料名称" v-model="params.LIKE_model"></van-field>-->
    <div class="content">
      <div class="row">
        <span style="margin-left:0" class="title">物料名称</span>
        <input
          class="ipt fs-sm"
          type="text"
          style="text-align:right;border:0 solid rgba(0,0,0,0.25)"
          :placeholder="'请输入物料名称'"
          v-model="params.LIKE_name"
        />
      </div>
      <div class="row">
        <span style="margin-left:0" class="title">物料型号</span>
        <input
          class="ipt fs-sm"
          type="text"
          style="text-align:right;border:0 solid rgba(0,0,0,0.25)"
          :placeholder="'请输入物料型号'"
          v-model="params.LIKE_model"
        />
      </div>
    </div>
    <div
      class="confirm fs-md"
      style="border-radius:0.08rem; background: linear-gradient(135deg, #4181ff, #2360ef);color:white;"
      @click="onTitileClickRight"
    >确认</div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapGetters } from "vuex";
import { setStore } from "@/util/util";
import PickerPopup from "@/component/PickerPopup";
export default {
  data() {
    return {
      params: {
        LIKE_name: undefined,
        LIKE_model: undefined // 托盘编号
      }
    };
  },
  mounted() {},
  methods: {
    onTitleClickLeft() {
      // 返回
      this.$router.go(-1);
    },
    onTitileClickRight() {
      // 确定
      console.log(this.params);
      setStore("MaterielSkuSearchParams", this.params);
      this.$router.push("/materiel");
    }
  },
  computed: {
    ...mapGetters(["fid"])
  }
};
</script>

<style lang="scss" scoped>
.content .row {
  width: 3.26rem;
  height: 0.52rem;
  margin-left: 0.27rem;
  display: flex;
  /* justify-content: space-around; */
  justify-content: space-between;
  align-items: center;
  .ipt {
    width: 1.68rem;
    height: 0.17rem;
  }
}
.content .row .title {
  color: #333333;
  font-size: 0.145rem;
}
.content .row .message {
  color: #333333;
  font-size: 0.13rem;
}
.confirm {
  margin-left: 2.8rem;
  line-height: 0.32rem;
  width: 0.8rem;
  height: 0.32rem;
}
</style>