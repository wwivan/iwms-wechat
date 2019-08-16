<template>
  <div>
    <!-- <van-nav-bar title="盘点明细记录" left-text="返回" left-arrow @click-left="onTitleClickLeft" >
      <van-button slot="right" v-if="type=='2'"  @click="onClickForm(stockTake)">
        <van-icon name="plus" size="1.5em"/>
      </van-button>
      <van-button slot="right"  @click="onClickSearch">
        <van-icon name="search" size="1.5em"/>
      </van-button>
    </van-nav-bar>    -->
    <!-- <div class="top-bar">
      <div style="height:0.2rem"></div>
      <div class="stock-out-header">
        <div @click="onTitleClickLeft">
          <span style="font-size:0.24rem;color:#3F7FFE" class="iconfont icon-ai207"></span>
        </div>
        <div style="margin-left:0.48rem;">
          <span style="text-algin:center;color:#030303">盘点明细记录</span>
        </div>
        <div>
          <span
          style="margin-left:0.2rem;font-size:0.2rem;color:#4A4A4A "
          class="iconfont icon-icon-test" @click="onClickForm"
        ></span>
          <span
            style="margin-left:0.2rem;font-size:0.2rem;color:#4A4A4A "
            class="iconfont icon-iconset0157"
            @click="onClickSearch"
          ></span>
        </div>
      </div>
    </div> -->
    <van-pull-refresh v-model="loading" @refresh="onRefreshList">
      <van-list v-model="loading" :finished="finished" @load="onLoadMore">
        <div v-for="(item, index) in records" :key="index" class="stock-out" :class="(index < (records.length-1))?'bottom':''">
          <div class="header">
            <span
              v-show="item.status == 3"
              class="bot"
              style="background: linear-gradient(135deg, #4181ff, #2360ef);"
            ></span>
            <span
              v-show="item.status == 4"
              class="bot"
              style="background: linear-gradient(135deg, #FF9779, #F6617B);"
            ></span>
            <span
              v-show="item.status == 5"
              class="bot"
              style="background: linear-gradient(135deg, #F7C77F, #FF9860);"
            ></span>

            <span style="font-size:0.13rem;color:#4181FF">{{item.stockTake==undefined? '':item.stockTake.orderNo}}</span>
          </div>
          <div class="content">
            <div>
            <div>物料条码:{{item.materielSku==undefined? '':item.materielSku.barcode }}</div>
            <div>物料名称: {{item.materielSku==undefined? '':item.materielSku.name }}</div>
            <div>所在货位: {{item.cell==undefined? '':item.cell.code }}</div>
            <div>原库存: {{item.stockNum }}</div>
            <div>
              <van-field v-if="result==records" clearable label="实际库存" v-model="item.takeStockNumber" type="number" onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )" style="background-color:#F4F4F4;"></van-field>
            </div>
            <!-- <div v-if="result==records" style="background-color:#F4F4F4;">实际库存: {{item.takeStockNumber }}</div> -->
            <div v-if="result==records" style="background-color:green;">差异: {{item.takeStockNumber-item.stockNum }}</div>

              <div style="margin-bottom:0.05rem"></div>
            </div>

            <!-- <div class="confirm">
              <div
              v-if="StockOutType == 1"
                style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
                @click="findStockOutDetail(item)"
              >详情</div>
              <div
              v-if="StockOutType == 3"
                style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
                @click="findStockOutDetail(item)"
              >查看明细</div>
            </div> -->
          </div>
        </div>
       </van-list>
        <div v-if="status=='1'" class="mt-3 text-grey fs-xl">还未盘点</div>
       <van-row type="flex" justify="center" gutter="15">
          <!-- <van-col>
            <van-button v-if="status=='1'" @click="inventoryMore" type="primary" style="height:0.35rem;width:1rem;line-height:0.35rem;font-size:0.15rem;background: linear-gradient(135deg, #4181ff, #2360ef);border:none;color:white" :text="'等待盘点'"></van-button>
          </van-col> -->
          <van-col>
            <van-button v-if="result==records" @click="add" type="primary" style="height:0.35rem;line-height:0.32rem" :text="'调整库存'"></van-button>
          </van-col>
        </van-row>

      <div class="van-list__loading">
        <div
          v-if="!loading && records.length === 0"
          @click="findStockTakeItems"
          style="height: 10rem"
        >
          <span class="van-list__loading-text">暂无数据, 下拉刷新</span>
        </div>
      </div>
    </van-pull-refresh>

  </div>
</template>

<script>
  import Vue from "vue";
  import {
    Toast
  } from "vant";
  import {
    mapGetters
  } from "vuex";
  import {
    findStockTakeItems,
    getStockLogsByTrays,
    findTraysByRfids,
    getStockTakeItem,
    saveStockTakeItem
  } from "@/api/api";
  import {
    setStore,
    getStore,
    formatFen2Yuan,
    removeStore
  } from "@/util/util";
  import { Dialog } from "vant";
  export default {
    data() {
      return {
        loading: false,
        finished: false,
        show: false,
        records: [],
        item:{},
        result: [],
        status: undefined,
        takeStockNumber:"",
        type: '',
        stockTake:{},
        searchParams: {},
        params: {
          takeStockNumber: "",
          trayId: undefined,
          rfid: undefined,
          stockTakeId: undefined,
          stockTakeItemId:undefined,
          pageNumber: 1,
          pageSize: 99,
          sortType: "auto",
          fid: "42dd7498-b9d3-43b3-b736-3e9844f03ff5",
          searchParams: {}
        }
      };
    },
    mounted() {
      this.params.fid = this.fid;
      let temps = getStore("StockTakeDetailParams");
      let StockTakeDetailParams = JSON.parse(temps);
      this.stockTake = StockTakeDetailParams;
      this.type = this.stockTake.type;
      let item = getStore("StockTakeItemSearchParams");
      if (item) {
      removeStore("StockTakeItemSearchParams");
      this.searchParams = JSON.parse(item);
      }else{
        this.searchParams = {};
      }
      this.params.stockTakeId = StockTakeDetailParams.id;
      this.status=StockTakeDetailParams.status;
      console.log(this.status);
    },
    // created() {
    //   this.$parent.setComponent(this);
    // },
    methods: {
      onRefreshList() {
        // 刷新
        this.records = [];
        this.findStockTakeItems();
      },
      onLoadMore() {
        console.log(this.params.pageNumber)
        this.findStockTakeItems();
      },
      findStockTakeItems() {
        //this.params.searchParams = this.searchParams;
        this.params.searchParams["EQ_stockTake.status"] = "1";

        // 获取记录
        findStockTakeItems(this.params)
          .then(res => {
             this.loading = false;
              this.finished = res.data.last;
              console.log(JSON.stringify(res));
              this.records.push(...res.data.content);
          })
          .catch(error => {
            this.finished = true;
            this.loading = false;
            console.log(JSON.stringify(error));
            Toast(JSON.stringify(error.message));
          });
      },
      inventoryMore() {
        // 请求参数
        //this.findTraysByRfids('1432');
        let params = {
          action: 'inventoryMore',
          range: 30 //rfid功率 10最小 2-3厘米
        }
        window.android.callAndroid(JSON.stringify(params));
      },
      onNetiveCallback(response) {
        if(response.action === 'inventoryMore'){
            let temp = JSON.parse(response.result);
            let rfid="";
            for(let item in temp) {
              rfid+=temp[item]+',';
            }
            this.findTraysByRfids(rfid);
          }
      },
       findTraysByRfids(rfid) {
         Toast(rfid);
        this.params.rfid = rfid;
         findTraysByRfids(this.params)
          .then(res => {
            console.log(res.data);
            let items=res.data;
            console.log(items);
            let result = "";
            for(let item of items) {
              result+=item.id+",";
            }
            this.getStockTakeItem(result);

          })
          .catch(error => {
            console.log(JSON.stringify(error));
            Toast("请求错误");
          });
      },
      getStockTakeItem(id){
        this.params.trayId = id;
        let ids = "";
        for(let item of this.records) {
          ids+= item.id+",";
        }
        let dis= ids.substring(0,ids.length-1);
        this.params.stockTakeItemId = dis;
         getStockTakeItem(this.params)
          .then(res => {
            this.result=res.data;
            this.records = this.result;
          })
          .catch(error => {
            console.log(JSON.stringify(error));
            Toast.fail("请求错误");
          });
      },
     add() {
      let req = "";
      let id = "";
      let stockTakeId ="";
      for(let item of this.records) {
        req+=item.takeStockNumber+",";
        id+= item.id+",";
        stockTakeId+= item.stockTake.id+",";
      }
      this.params.stockTakeItemId = id;
      this.params.takeStockNumber = req;
      this.params.stockTakeId = stockTakeId;
      saveStockTakeItem(this.params)
        .then(res => {
          console.log(res.data);
          Toast("成功!");
          this.onRefreshList();
        })
        .catch(error => {
          console.log(JSON.stringify(error));
          Toast.fail(JSON.stringify(error.message));
        });
     },
     
      onClickForm(StockTake) {
       setStore("StockTake",StockTake);
       this.$router.push({
        name: "StockTakeItemForm"
      });
    },
      onTitleClickLeft() {
        // 返回
        this.$router.go(-1);
      },
      onClickSearch() {
      // 查询
      this.$router.push({
        name: "StockTakeItemSearch"
      });
    },
    },
    computed: {
      ...mapGetters(["fid"])
    },
    filters: {
      numFilter(value) {
        let realVal = formatFen2Yuan(value);
        return realVal;
      },
    }
  };
</script>

<style scoped>
.top-bar {
  background: white;
  position: sticky;
  top: 0;
  z-index: 999;
  height: 0.7rem;
  box-shadow: 0 0.1rem 0.5rem rgba(85, 82, 82, 0.25);
}
.stock-out-header {
  display: flex;
  height: 0.46rem;
  justify-content: space-around;
  align-items: center;
}
.stock-out {
  margin-left: 0.12rem;
  margin-top: 0.22rem;
  margin-right: 0.12rem;
}
.stock-out .header {
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 0.13rem;
  margin-right: 0.12rem;
}
.header .bot {
  width: 0.11rem;
  height: 0.11rem;
  border-radius: 50%;
  display: inline-block;
}
.header .context {
  margin-left: 0.07rem;
  flex: 1;
  font-size: 0.12rem;
  color: #3f7ffe;
}
.header .icon {
  margin-right: 0.1rem;
  width: 0.18rem;
  height: 0.18rem;
}
.content {
  margin-top: 0.16rem;
  margin-left: 0.13rem;
  display: flex;
  align-items: center;
}
.content div div {
  font-family: PingFangSC-Regular;
  color: #4a4a4a;
  font-size: 0.13rem;
  line-height: 0.28rem;
}
.content .confirm {
  margin-left: 0.6rem;
}
.van-tabbar {
  border-top: 0.01rem solid rgba(0, 0, 0, 0.25);
  height: 0.57rem !important;
}
.van-tabbar-item {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  line-height: 1;
  font-size: 0.11rem;
  color: #7d7e80;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.van-tabbar-item--active {
  color: #4181ff !important;
}
</style>