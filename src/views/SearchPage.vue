<template>
  <div class="serach mt-3">
    <div class="nav d-flex w-80 ">
      <div class="materiel-search" :class="tab1==1?'active':''" @click="tab1Active">物料查询</div>
      <div class="supplier-search" :class="tab2==1?'active':''" @click="tab2Active">供应商查询</div>
      <div class="customer-search" :class="tab3==1?'active':''" @click="tab3Active">客户查询</div>
    </div>
    <div class="main">
        <materiel v-show="tab1==1"></materiel>
        <supplier v-show="tab2==1"></supplier>
        <customer v-show="tab3==1"></customer>
    </div>
  </div>
</template>
<script>
// import "@/assets/scss/_variables.scss"
import Supplier from "@/views/SupplierSearch"
import Customer from "@/views/CustomerSearch"
import Materiel from "@/views/MaterielSearch"

export default {
    components:{Supplier,Materiel,Customer},
    data(){
        return{
            tab1:1,
            tab2:0,
            tab3:0,
        }
    },
    methods:{
        tab1Active(){
            this.tab1 = 1
            this.tab2 = this.tab3 = 0
        },
        tab2Active(){
            this.tab2 = 1
            this.tab1 = this.tab3 = 0
        },
        tab3Active(){
            this.tab3 = 1
            this.tab2 = this.tab1 = 0
        }
    }
}
</script>


<style lang="scss" scoped>
.nav {
  margin: 0 auto;
  div {
      background: grey;
      text-align: center;
      line-height: 0.3rem;
      font-size: 0.13rem;
      color: white;
      width: 33%;
      height: 0.3rem;
  }
  .active{
      background:#FF9860;
      color: white
  }
  .materiel-search {
      border-bottom-left-radius: 0.05rem;
      border-top-left-radius: 0.05rem
  }
//   .supplier-search {
//   }
  .customer-search {
      border-bottom-right-radius: 0.05rem;
      border-top-right-radius: 0.05rem
  }
}
</style>
