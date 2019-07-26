<template>
  <div class="stock-in">
    <div class="tab">
      <div :class="isshow?'tab-active':'tab-normal'" @click="$store.commit('resIsshow')">预约登记</div>
      <div :class="!isshow?'tab-active':'tab-normal'" @click="$store.commit('stockInIsshow')">入库登记</div>
    </div>
    <div style="display:flex;justify-content:space-around">
      <div :class="isshow?'tab_line_left':'tab_line_right'"></div>
      <div :class="!isshow?'tab_line_left':'tab_line_right'"></div>
    </div>
    <div class="container">
      <reserve-order v-show="isshow"></reserve-order>
      <van-pull-refresh v-model="loading" @refresh="onRefreshList">
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
      </van-pull-refresh>
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
import { mapGetters, mapMutations } from "vuex";
import { Toast } from "vant";
import { findStockInList, doToCell, findReserveOrderList } from "@/api/api";
import { setStore, getStore, removeStore } from "@/util/util";
import { Dialog } from "vant";
export default {
  components: { reserveOrder },
  data() {
    return {
      // tab_active: 0,
      // active: 1,
      // act: undefined,
      // isshow:true,
      StockInType: undefined, //1明细，2封盘，3上架
      loading: false,
      finished: false,
      records: [],
      searchParams: {},
      params: {
        pageNumber: 1,
        pageSize: 30,
        sortType: "auto",
        fid: "", //42dd7498-b9d3-43b3-b736-3e9844f03ff5
        searchParams: {}
      }
    };
  },
  created() {
    this.onRefreshList();
  },
  mounted() {
    this.params.fid = this.fid;
    let temp = getStore("stockInSearchParams");
    if (temp) {
      removeStore("stockInSearchParams");
      this.searchParams = JSON.parse(temp);
    } else {
      this.searchParams = {};
    }
    let StockInType = getStore("StockInType");
    this.StockInType = StockInType;
    // console.log(this.StockInType);
    // let act = getStore("active");
    // this.act = act;
    //this.tab_onClick();
    // this.onRefreshList();
  },
  methods: {
    stockInCreate() {
      if (this.isshow == false) {
        console.log("新建入库单");
      } else if (this.isshow == true) {
        console.log("新建预约单");
      }
    },
    stockInSearch() {
      if (this.isshow == false) {
        console.log("搜索入库单");
      } else if (this.isshow == true) {
        console.log("搜索预约单");
      }
    },
    onRefreshList() {
      // 刷新
      //this.params.pageNumber = 1;
      this.records = [];
      this.findStockInList();
    },
    // onLoadMore() {
    //   console.log("############");
    //   // this.params.pageNumber = this.params.pageNumber + 1;
    //   // console.log(this.params.pageNumber)
    //   this.findStockInList();
    // },
    findStockInList() {
      this.params.searchParams = this.searchParams;
      if (this.isshow == false) {
        //this.params.searchParams["EQ_status"] = "0";
        console.log(this.isshow);
      } else if (this.isshow == true) {
        this.params.searchParams["IN_status"] = "0,1,2";
        console.log(111122222211111);
      }

      // 获取记录
      findStockInList(this.params)
        .then(res => {
          // console.log(JSON.stringify(res));
          console.log(33333);
          this.loading = false;
          this.finished = res.data.last;
          this.records.push(...res.data.content);
        })
        .catch(error => {
          this.finished = true;
          this.loading = false;
          // console.log(JSON.stringify(error));
          Toast("请求错误");
        });
    },
    // tab_onClick(index) {
    //   //标签切换
    //   if (index == "0") {
    //     this.StockInType = 1;
    //     setStore("StockInType", this.StockInType);
    //     setStore("active", this.tab_active);
    //   } else if (index == "1") {
    //     this.StockInType = 1;
    //     setStore("active", this.tab_active);
    //   }
    // },
    //  tab1_onClick(){
    //   this.StockInType = 1;
    //   this.isshow=1
    //     setStore("StockInType", this.StockInType);
    //     console.log(StockInType)
    //     // setStore("active", 0);
    //     // console.log(active)
    // },
    // tab2_onClick(){
    //    this.StockInType = 1;
    //    this.isshow=0
    //    console.log(StockInType)
    //     // setStore("active", 0);
    //     // console.log(active)
    // },
    //   onTitleClickLeft() {
    //     // 返回
    //     this.$router.push({
    //       name: "Main"
    //     });
    //   },
    //   onTitileClickRight() {
    //     // 查询
    //     this.$router.push({
    //       name: "StockInSearch"
    //     });
    //   },
    //   onReserveSearch() {
    //     // 查询
    //     this.$router.push({
    //       name: "ReserveOrderSearch"
    //     });
    //   },
    //   onClickForm() {
    //     this.$router.push({
    //       name: "StockInForm"
    //     });
    //   },
    //   onReserveForm() {
    //     setStore("active", this.tab_active);
    //     this.$router.push({
    //       name: "ReserveOrderForm"
    //     });
    //   },
    //   onClickSearch() {
    //     this.$router.push({
    //       name: "StockInSearch"
    //     });
    //   },
    findStockInDetail(StockInDetailParams) {
      //获取单个入库单详细
      setStore("StockInDetailParams", StockInDetailParams);

      this.$router.push({
        name: "StockInDetail"
      });
    }
  },
  computed: {
    ...mapGetters(["isshow", "fid"]),
    ...mapMutations(["resIsshow()", "stockInIsshow()"])
  },
  filters: {
    statusFilter(value) {
      let realVal = "";
      if (value == 0) {
        realVal = "收货";
      } else if (value == 1) {
        realVal = "理货中";
      } else if (value == 2) {
        realVal = "理货完成";
      } else if (value == 3) {
        realVal = "上架中";
      } else if (value == 4) {
        realVal = "上架完成";
      }
      return realVal;
    },
    inTypeValue(value) {
      let realVal = "";
      if (value == 1) {
        realVal = "采购入库";
      } else if (value == 2) {
        realVal = "退货入库";
      } else if (value == 3) {
        realVal = "外协入库";
      } else if (value == 4) {
        realVal = "借用入库";
      } else if (value == 5) {
        realVal = "废品入库";
      }
      return realVal;
    }
  }
};
</script>

<style lang="scss" scoped>
.stock-in .tab {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
}
.stock-in .tab .tab-active {
  font-size: 13px;
  color: #3f7ffe;
  font-weight: 500;
}
.stock-in .tab .tab-normal {
  font-size: 13px;
  color: #4a4a4a;
}
.stock-in .tab_line_left {
  width: 20px;
  height: 3px;
  background: linear-gradient(0, #4181ff, #2360ef);
  margin-top: -10px;
  /* margin-left: 84px; */
}
.stock-in .tab_line_right {
  width: 20px;
  height: 3px;
  background: white;
  margin-top: -10px;
  /* margin-left: 272px; */
}
.stock-in-detail {
  margin-left: 12px;
  margin-top: 22px;
  margin-right: 12px;
}
.bottom {
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
}
.stock-in-detail .header {
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 13px;
  margin-right: 12px;
}
.header .bot {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  display: inline-block;
}
.header .context {
  margin-left: 7px;
  flex: 1;
  font-size: 12px;
  color: #3f7ffe;
  text-align: left;
}
.header .icon {
  margin-right: 10px;
  width: 18px;
  height: 18px;
}
.content {
  margin-top: 16px;
  margin-left: 13px;
}
.content div {
  font-family: PingFangSC-Regular;
  color: #4a4a4a;
  font-size: 13px;
  line-height: 28px;
  text-align: left;
}
</style>
