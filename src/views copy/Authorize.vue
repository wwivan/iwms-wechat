<template>
  <div>
    <div @click="authorize">授权</div>
    <div @click="login">登录</div>
    <div @click="getUser">获取用户信息</div>
    <div @click="getUserInfo">获取用户信息</div>
    <a :href="url">点击</a>
  </div>
</template>
<script>
import { authorize, getUser, getUserInfo } from "@/api/api";
import { setStore, getStore, removeStore } from "@/util/util";
import axios from "axios";
export default {
  data() {
    return {
      url: undefined,
      params: {
        appid: "oYNm1v_3tmH0FHHqjU_yrMt-AeEE",
        token:
          "24_lI-s8FpuGvreY-z6q2ffYU5zKPizeI9idHSs4jK65ZRTAWB8_ttYO2zgoT--rISQvBaZ6YIEUOZhX9iYOJCrLc-4HBuNPhdXoxow1taxqwk"
      }
    };
  },
  created() {
    this.initstatus();
  },
  methods: {
    initstatus() {
      setStore("appid", this.params.appid);
    },
    login() {
      axios.get(
        "https://open.weixin.qq.com/connect/qrconnect?appid=12312312312312&redirect_uri=www.baidu.com&response_type=code&scope=snsapi_login&state=3072355978#wechat_redirect"
      );
    },
    authorize() {
      authorize().then(res => {
        console.log(res.data);
        this.url = res.data;
      });
      //   axios.get(
      //     "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx41da667575b81adb&redirect_uri=http://project.viphk1.ngrok.org/iwms-api/api/auth/getUserOpenIdAndSessionKey&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect"
      //   );
    },
    getUser() {
      getUser().then(res => {
        console.log(res.data);
      });
    },
    getUserInfo() {
      getUserInfo(this.params).then(res => {
        console.log(res.data);
        setStore("appid", this.params.appid);
        this.$router.push("/login");
      });
    }
  }
};
</script>
