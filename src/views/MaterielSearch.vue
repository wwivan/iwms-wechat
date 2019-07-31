<template>
  <div>
    <!-- <van-nav-bar title="物料查询" left-text="返回" right-text="确定" left-arrow @click-left="onTitleClickLeft" @click-right="onTitileClickRight" />
    <van-field clearable label="物料名称" placeholder="请输入物料名称" v-model="params.LIKE_name"></van-field>
      <van-field clearable label="物料型号 " placeholder="请输入物料名称" v-model="params.LIKE_model"></van-field> -->
     <div class="content">
       <div class="row">
        <span style="margin-left:0" class="title">物料名称</span>
        <input
          type="text"
          style="text-align:right;border:0 solid rgba(0,0,0,0.25)"
          :placeholder="'请输入物料名称'"
          v-model="params.LIKE_name"
        />
      </div>
      <div class="row">
        <span style="margin-left:0" class="title">物料型号</span>
        <input
          type="text"
          style="text-align:right;border:0 solid rgba(0,0,0,0.25)"
          :placeholder="'请输入物料型号'"
          v-model="params.LIKE_model"
        />
      </div>
     </div>
      <div
      class="confirm"
      style="border-radius:8px; background: linear-gradient(135deg, #4181ff, #2360ef);color:white;"
      @click="onTitileClickRight"
    >确认</div>
  </div>
</template>

<script>
  import {
    Toast
  } from "vant";
  import {
    mapGetters
  } from "vuex";
  import {
    setStore
  } from '@/util/util';
  import PickerPopup from "@/component/PickerPopup"
  export default {
    data() {
      return {
        params: {
          LIKE_name: undefined,
          LIKE_model: undefined // 托盘编号
        },
      
      }
    },
    mounted() {
      
    },
    methods: {
      
      onTitleClickLeft() {
        // 返回
        this.$router.go(-1);
      },
      onTitileClickRight() {
        // 确定
        console.log(this.params)
        setStore("MaterielSkuSearchParams", this.params);
        this.$router.push("/materiel");
      },
    },
    computed: {
      ...mapGetters(["fid"])
    }
  };
</script>

<style lang="scss" scoped>
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
.confirm {
  margin-left: 280px;
  line-height: 32px;
  width: 80px;
  height: 32px;
}
</style>