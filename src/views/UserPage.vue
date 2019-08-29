<template>
  <div class="userPage">
    <div class="header">
      <div class="headImg" v-if="this.userInfo">
        <img :src="userInfo.headimgurl" class="w-100" />
      </div>
      <div class="user-info">
        <div class="fs-xl text-white">{{ userInfo.nickname }}</div>
        <div class="d-flex">
          <div
            class="fs-xs mt-2 text-white ml-2"
            style="width:0.6rem;height:0.16rem;line-height:0.16rem;border-radius:0.1rem"
          >
            职务：{{ userType }}
          </div>
          <div></div>
        </div>
      </div>
    </div>
    <div class="main">
      <!-- 待处理事项 -->
      <div class="fs-xl">待处理事项</div>
      <div></div>
    </div>
  </div>
</template>
<script>
import { getStore } from "@/util/util";
export default {
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
      userType: "采购"
    };
  },
  created() {
    let temp = getStore("userInfo");
    this.userInfo = JSON.parse(temp);
    // console.log(this.userInfo);
  }
};
</script>
<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 1.5rem;
  // background: linear-gradient(-135deg, #f7c77f, #ff9860);
  background: linear-gradient(-135deg, #ff9779, #f6617b);
  // line-height: 0.8rem;
  // border-bottom-left-radius: 30%;
  // border-bottom-right-radius: 30%;
  .headImg {
    position: absolute;
    top: 0.4rem;
    left: 0.3rem;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    line-height: 0rem;
    overflow: hidden;
  }
  .user-info {
    position: absolute;
    top: 0.5rem;
    left: 1rem;
  }
}
</style>
