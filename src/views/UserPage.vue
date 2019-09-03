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
      <need-approval></need-approval>
      <stock-warning></stock-warning>
      <receipt-remind></receipt-remind>
      <payment-remind></payment-remind>
    </div>
  </div>
</template>
<script>
import { getStore } from "@/util/util";
import NeedApproval from "./UserPage/NeedApproval";
import StockWarning from "./UserPage/StockWarning";
import ReceiptRemind from "./UserPage/ReceiptRemind";
import PaymentRemind from "./UserPage/PaymentRemind";
export default {
  components: { NeedApproval, StockWarning, ReceiptRemind, PaymentRemind },
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
  position: sticky;
  // width: 95%;
  top: 0;
  z-index: 1000;
  margin: -0.64rem auto;
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
.main {
  margin-top: 0.64rem;
}
</style>
