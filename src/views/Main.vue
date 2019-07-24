<template>
  <div class="h-100">
    <div >
      <router-view></router-view>
    </div>

    <div class="tab-bar d-flex jc-around b-0">
      <div>
        
        <span  @click="()=>{(this.isshow==1)?(this.isshow=0):(this.isshow=1)}" :class="(isshow==1)?'text-blue-dark':''">功能</span>
        <div v-show="this.isshow==1">
          <router-link tag="div" to="/stockIn">入库登记</router-link>
          <router-link tag="div" to="/stockOut">出库登记</router-link>
          <router-link tag="div" to="/item/search">物料查询</router-link>
          <router-link tag="div" to="/check/account">对账</router-link>
        </div>
      </div>
      <div>
        <span  @click="()=>{(this.isshow==2)?(this.isshow=0):(this.isshow=2)}" :class="(isshow==2)?'text-blue-dark':''">报表</span>
        <div v-show="this.isshow==2">
          <router-link tag="div" to="/echart">智能图标</router-link>
        </div>
      </div>
      <div>
        <span @click="()=>{(this.isshow==3)?(this.isshow=0):(this.isshow=3)}" :class="(isshow==3)?'text-blue-dark':''">我的</span>
        <div v-show="this.isshow==3">
          <router-link tag="div" to="/account/security">账号与安全</router-link>
          <router-link tag="div" to="/logOut">退出登录</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      isshow:0
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

