<template>
    <div class="reserve">
        <div class="tab">
      <div :class="isshow?'tab-active':'tab-normal'" @click="$store.commit('resIsshow')">预约入库</div>
      <div :class="!isshow?'tab-active':'tab-normal'" @click="$store.commit('stockInIsshow')">预约出库</div>
    </div>
    <div style="display:flex;justify-content:space-around">
      <div :class="isshow?'tab_line_left':'tab_line_right'"></div>
      <div :class="!isshow?'tab_line_left':'tab_line_right'"></div>
    </div>
    <div class="container">
      <reserve-order v-show="isshow"></reserve-order>
      <reserve-out v-show="!isshow"></reserve-out>
      <!-- <van-pull-refresh v-model="loading" @refresh="onRefreshList">
        <div v-show="!isshow">
          <van-list v-model="loading" :finished="finished">
            <div
              v-for="(item, index) in records"
              :key="index"
              class="stock-in-detail"
              :class="(index < (records.length-1))?'bottom':'' "
            >
              <div class="header">
                <span
                  v-show="item.status==0"
                  class="bot"
                  style="background: linear-gradient(135deg, #4181ff, #2360ef);"
                ></span>
                <span
                  v-show="item.status==1"
                  class="bot"
                  style="background: linear-gradient(135deg, #4181ff, #2360ef);"
                ></span>
                <span
                  v-show="item.status==2"
                  class="bot"
                  style="background: linear-gradient(135deg, #4181ff, #2360ef);"
                ></span>
                <span
                  v-show="item.status==3"
                  class="bot"
                  style="background: linear-gradient(135deg, #4181ff, #2360ef);"
                ></span>
                <span
                  v-show="item.status==4"
                  class="bot"
                  style="background: linear-gradient(135deg, #F7C77F, #FF9860);"
                ></span>
                <span class="context">{{item.status | statusFilter}}</span>
                <span class="icon" @click="findStockInDetail(item)">
                  <img style="width:100%" src="../assets/images/入库登记-编辑@2x.png" alt />
                </span>
              </div>
              <div class="content">
                <div>供应商：{{item.supplier == undefined? "":item.supplier.name}}</div>
                <div>仓库：{{item.wareHouse == undefined? "":item.wareHouse.name}}</div>
                <div>入库类型：{{item.inType | inTypeValue}}</div>
                <div>物料信息：{{item.skuMessage==undefined?"":item.skuMessage}}</div>
                <div style="margin-bottom:5px"></div>
              </div>
            </div>
          </van-list>
        </div>
      </van-pull-refresh> -->
    </div>
    <div
      class="bg-primary d-flex"
      style="position:fixed;bottom:40px;right:40px;width:92px;height:30px;border-radius:30px;overflow:hidden"
    >
      <button
        class="bg-peach-red-dark text-white"
        style="width:45px;height:30px;border:none"
        @click="stockInCreate"
      >新建</button>
      <div class="bg-white" style="width:2px;height:30px"></div>
      <button
        class="bg-peach-red text-white"
        style="width:45px;height:30px;border:none"
        @click="stockInSearch"
      >搜索</button>
    </div>
    </div>
</template>
<script>
import reserveOrder from "@/views/ReserveOrder";
import reserveOut from "@/views/ReserveOutOrder";
import { mapGetters, mapMutations } from "vuex";
import { setStore, getStore, removeStore } from "@/util/util";
export default {
  components: { reserveOrder,reserveOut},
  data(){
    return{
      
    }
  }
}
</script>

