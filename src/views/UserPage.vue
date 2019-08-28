<template>
  <div class="userPage">
    <div class="header">
      <div class="headImg" style="width:30px;height:30px">
        <img
          v-show="this.userInfo.headimgurl"
          :src="userInfo.headimgurl"
          class="w-100"
        />
      </div>
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
      }
    };
  },
  created() {
    this.userInfo = getStore("userInfo");
    console.log(this.userInfo);
  }
};
</script>
