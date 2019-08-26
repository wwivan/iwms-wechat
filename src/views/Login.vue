<template>
  <transition name="slide">
    <div class="login">
      <h1>欢迎使用龙猫云驿wms</h1>
      <van-cell-group class="login-from">
        <van-field
          v-model="getVcodeParmas.mobileNo"
          clearable
          border
          label="手机号"
          placeholder="请输入手机号"
        />
        <!-- <van-field
          v-model="password"
          clearable
          border
          type="password"
          label="密码"
          placeholder="请输入密码"
          :error-message="passwordErr"
        />-->
        <button
          @click="getVcode"
          class="bg-primary text-white"
          style="height:0.3rem;border:none"
        >
          {{ !time ? "点击获取验证码" : time }}
        </button>
        <van-field
          v-model="params.vcode"
          clearable
          border
          label="验证码"
          placeholder="请输入验证码"
          :error-message="passwordErr"
        />
        <van-cell>
          <van-row>
            <van-col span="12" class="btn">
              <van-button
                type="primary"
                size="small"
                @click="login"
                :loading="loading"
                >登录</van-button
              >
            </van-col>
          </van-row>
        </van-cell>
      </van-cell-group>
    </div>
  </transition>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import MD5 from "crypto-js/md5";
import { mapGetters } from "vuex";
// eslint-disable-next-line no-unused-vars
import { emailCheck, pwdCheck } from "@/util/util";
// eslint-disable-next-line no-unused-vars
import { login, getUserAuth, getVcode } from "@/api/api";
// eslint-disable-next-line no-unused-vars
import { setStore, getStore, removeStore } from "@/util/util";
import { Toast } from "vant";
// eslint-disable-next-line no-unused-vars
import { setInterval, clearInterval } from "timers";
// Vue.use(Toast).use(Cell).use(CellGroup).use(Button).use(Col).use(Row);
export default {
  data() {
    return {
      isfalse: false,
      userName: "admin",
      password: "a111111",
      time: undefined,
      userNameErr: "",
      passwordErr: "",
      loading: false,
      redirect: this.$route.query.redirect,
      // params: {
      //   fid: "42dd7498-b9d3-43b3-b736-3e9844f03ff5" //42dd7498-b9d3-43b3-b736-3e9844f03ff5
      // },
      getVcodeParmas: {
        mobileNo: "18674484084"
      },
      params: {
        mobileNo: "18674484084",
        vcode: undefined,
        extUserId: "oYNm1v_3tmH0FHHqjU_yrMt-AeEE",
        fid: "42dd7498-b9d3-43b3-b736-3e9844f03ff5"
      },
      signature: "7447D0441882CAA7070646C0DA7646E7AA854778,1785",
      sysParam: {
        appid: "5032022018001"
      }
    };
  },
  created() {
    this.initstatus();
  },
  mounted() {
    this.params.fid = this.fid;
    if (this.redirect) {
      Toast({
        position: "bottom",
        message: "未登录或登陆过期，请重新登陆~"
      });
    }
  },
  methods: {
    initstatus() {
      setStore("appid", this.params.extUserId);
    },
    getVcode() {
      if (this.isfalse) {
        return;
      } else {
        this.time = 60;
        setInterval(() => {
          this.time--;
          this.isfalse = true;
          if (this.time < 0) {
            this.time = undefined;
          }
        }, 1000);
        getVcode(this.getVcodeParmas).then(res => {
          // eslint-disable-next-line no-console
          console.log(res.data);
        });
      }
    },
    login() {
      // eslint-disable-next-line no-unused-vars
      login(this.params).then(res => {
        setStore("appid", this.params.extUserId);
        this.$router.push("/");
      });
    }
    // login() {
    //   this.userNameErr = "";
    //   this.passwordErr = "";
    //   this.loading = true;
    //   console.log(this.fid);
    //   // if (!emailCheck(this.userName)) {
    //   //   this.userNameErr = '邮箱格式不正确';
    //   //   this.loading = false;
    //   //   return;
    //   // }
    //   if (!pwdCheck(this.password)) {
    //     this.passwordErr = "密码格式不正确";
    //     this.loading = false;
    //     return;
    //   }
    //   //this.$router.push('/Main');
    //   login({
    //     loginName: this.userName,
    //     password: this.password,
    //     fid: this.params.fid
    //   })
    //     .then(res => {
    //       // this.getUserInfo()
    //       this.$router.push("/");
    //       // if (res.status === 200) {
    //       //   this.loading = false;
    //       //   this.$router.push('/Main');
    //       // } else {
    //       //   this.loading = false;
    //       //   Toast.fail(res.msg);
    //       // }
    //     })
    //     .catch(error => {
    //       Toast.fail(error);
    //       this.loading = false;
    //     });
    // }
  },
  computed: {
    ...mapGetters(["fid"])
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  text-align: center;
  // background: url("./../../images/bgc/bgc.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  overflow: hidden;
  h1 {
    margin-top: 40%;
  }
}
.login-from {
  width: 80%;
  text-align: center;
  padding: 0.1rem;
  margin: 0 auto;
  box-shadow: 0 0.02rem 0.04rem 0 rgba(0, 0, 0, 0.2),
    0 0.03rem 0.08rem 0 rgba(0, 0, 0, 0.19);
  .btn {
    text-align: center;
    margin-top: 0.1rem;
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
</style>
