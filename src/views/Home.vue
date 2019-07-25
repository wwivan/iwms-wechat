<template>
    <div class="home">
         <div class="square d-flex ai-center jc-around ">
          <div class="item" v-show="!this.act"
               @click="onStockInClick">
            <div class="icon-container"
                 style="background:linear-gradient(135deg, #FF9779, #F6617B)">
              <div class="icon">
                <img src="../assets/images/入库登记@2x.png"
                     style="width:100%"
                     alt="">
              </div>
            </div>入库登记
          </div>
          <div class="item" v-show="!this.act"
               @click="onStockOutClick">
            <div class="icon-container"
                 style="background:linear-gradient(135deg, #4181FF, #2360EF)">
              <div class="icon">
                <img src="../assets/images/出库登记@2x.png"
                     style="width:100%"
                     alt="">
              </div>
            </div>出库登记
          </div>
          <div class="item" v-show="!this.act"
               @click="GetStockOutClick">
            <div class="icon-container"
                 style="background:linear-gradient(135deg, #F7C77F, #FF9860)">
              <div class="icon">
                <img src="../assets/images/出库存货@2x.png"
                     style="width:100%"
                     alt="">
              </div>
            </div>物料查询
          </div>
          <!-- <div class="item" @click="onStockOutToCell">
            <div>
              <van-icon color="#1d8afa" name="gift-card-o" size="40px" />
            </div>
            下架
          </div>-->
          <div class="item" v-show="!this.act"
               @click="onStockTakeClick">
            <div class="icon-container"
                 style="background:linear-gradient(135deg, #F7C77F, #FF9860)">
              <div class="icon">
                <img src="../assets/images/盘点操作@2x.png"
                     style="width:100%"
                     alt="">
              </div>
            </div>对账
          </div>
          <div class="item" v-show="this.act"
               @click="GetStockOutClick">
            <div class="icon-container"
                 style="background:linear-gradient(135deg, #F7C77F, #FF9860)">
              <div class="icon">
                <img src="../assets/images/出库存货@2x.png"
                     style="width:100%"
                     alt="">
              </div>
            </div>智能图表
          </div>
          
        </div>
      </div>
</template>

<script>
export default {
    // props:{act},
    data(){
        return{
            act:false
        }
    }
}
</script>
<style lang="scss" scoped>
.home{
    .square{
        padding-top:20px;
        .item{
            .icon-container{
                width: 55px;
                height: 55px;
                border-radius: 50%;
                position: relative;
                .icon{
                    position: absolute;
                    width: 32px;
                    height: 32px;
                    margin-left:12px;
                    margin-top:12px;
                }
            }
        }
    }
}
</style>
