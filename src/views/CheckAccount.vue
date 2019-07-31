<template>
    <div>
        <van-pull-refresh v-model="loading"
                      @refresh="onRefreshList">
      <van-list v-model="loading"
                :finished="finished"
                @load="onLoadMore">
        <div v-for="(item, index) in records"
             :key="index"
             class="stock-take"
             :class="(index < (records.length-1))?'bottom':''">
          <div class="header">
            <span v-show="item.status == 3"
                  class="bot"
                  style="background: linear-gradient(135deg, #4181ff, #2360ef);"></span>
            <span v-show="item.status == 1"
                  class="bot"
                  style="background: linear-gradient(135deg, #FF9779, #F6617B);"></span>
            <span v-show="item.status == 2"
                  class="bot"
                  style="background: linear-gradient(135deg, #F7C77F, #FF9860);"></span>
            <span class="context">{{item.orderNo}}</span>
          </div>
          <div class="content">
            <div>
              <div>盘点员: {{item.operatorUser}}</div>
              <div>仓库: {{item.wareHouse == undefined? "":item.wareHouse.name}}</div>
              <div>盘点类型: {{item.type | typeFilter}}</div>
              <div>状态: {{item.status | formatStockTakeStatus}}</div>
              <div>创建时间: {{item.createTime}}</div>
              <div style="margin-bottom:5px"></div>
            </div>
            <div class="confirm">
              <div style="width:80px;height:33px;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:33px;color:white;border-radius:3px;font-size:15px"
                   @click="findStockTakeDetail(item)">详情</div>
            </div>
          </div>
        </div>
      </van-list>
      <div class="van-list__loading">
        <div v-if="!loading && records.length === 0"
             @click="findStockTakeList"
             style="height: 1000px">
          <span class="van-list__loading-text">暂无数据, 下拉刷新</span>
        </div>
      </div>
    </van-pull-refresh>
    <div
      class="bg-primary d-flex"
      style="position:fixed;bottom:40px;right:40px;width:92px;height:30px;border-radius:30px;overflow:hidden"
    >
      <button
        class="bg-peach-red-dark text-white"
        style="width:45px;height:30px;border:none"
        @click="checkAccountCreate"
      >新建</button>
      <div class="bg-white" style="width:2px;height:30px"></div>
      <button
        class="bg-peach-red text-white"
        style="width:45px;height:30px;border:none"
        @click="checkAccountSearch"
      >查询</button>
    </div>
    </div>
</template>
<script>
  import Vue from "vue";
  import { Toast } from "vant";
  import { mapGetters } from "vuex";
  import { findStockTakeList, doToCell } from "@/api/api";
  import {
    setStore,
    getStore,
    removeStore,
    formatStockTakeStatus
  } from "@/util/util";
  import { Dialog } from "vant";
  Vue.filter("formatStockTakeStatus", formatStockTakeStatus);
  export default {
    data() {
      return {
        active: 1,
        loading: false,
        finished: false,
        records: [],
        searchParams: {},
        params: {
          pageNumber: 1,
          pageSize: 10,
          sortType: "auto",
          fid: "", //42dd7498-b9d3-43b3-b736-3e9844f03ff5
          searchParams: {}
        }
      };
    },
    mounted() {
      this.params.fid = this.fid;
      let temp = getStore("stockTakeSearchParams");
      if (temp) {
        removeStore("stockTakeSearchParams");
        this.searchParams = JSON.parse(temp);
      } else {
        this.searchParams = {};
      }
    },
    methods: {
      checkAccountCreate(){
        console.log("新建盘点单")
        this.$router.push("/stock/take/form");
      },
      checkAccountSearch(){
        console.log("盘点查询")
        this.$router.push("/stock/take/search");
      },
      onRefreshList() {
        // 刷新
        //this.params.pageNumber = 1;
        this.records = [];
        this.findStockTakeList();
      },
      onLoadMore() {
        console.log("############");
        //this.params.pageNumber = this.params.pageNumber + 1;
        console.log(this.params.pageNumber);
        this.findStockTakeList();
      },
      findStockTakeList() {
        this.params.searchParams = this.searchParams;
        // 获取记录
        findStockTakeList(this.params)
          .then(res => {
            console.log(JSON.stringify(res));
            this.loading = false;
            this.finished = res.data.last;
            this.records.push(...res.data.content);
          })
          .catch(error => {
            this.finished = true;
            this.loading = false;
            console.log(JSON.stringify(error));
            Toast("请求错误");
          });
      },
      onTabChange(active) {
        if (active == "0") {
          this.$router.push({
            name: "Main"
          });
        } else if (active == "1") {
          this.$router.push({
            name: "Statistics"
          });
        } else if (active == "2") {
          this.$router.push({
            name: "Mine"
          });
        }
      },
      onTitleClickLeft() {
        // 返回
        this.$router.push({
          name: "Main"
        });
      },
      onClickSearch() {
        // 查询
        this.$router.push({
          name: "StockTakeSearch"
        });
      },
      findStockTakeDetail(StockTakeDetailParams) {
        //获取单个盘点单详细
        setStore("StockTakeDetailParams", StockTakeDetailParams);
        this.$router.push('/stock/take/detail');
      },
      onClickForm() {
        this.$router.push({
          name: "StockTakeForm"
        });
      }
    },
    computed: {
      ...mapGetters(["fid"])
    },
    filters: {
      typeFilter(value) {
        let realVal = "";
        if (value == 1) {
          realVal = "按区盘点";
        } else if (value == 2) {
          realVal = "按物料盘点";
        }
        return realVal;
      }
    }
  };
</script>

<style lang="scss" scoped>
 .stock-take {
    margin-left: 12px;
    margin-top: 22px;
    margin-right: 12px;
  }
  .stock-take .header {
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
    text-align: left
  }
  .header .icon {
    margin-right: 10px;
    width: 18px;
    height: 18px;
  }
  .content {
    margin-top: 16px;
    margin-left: 13px;
    display: flex;
    align-items: center;
    text-align: left
  }
  .content div div {
    font-family: PingFangSC-Regular;
    color: #4a4a4a;
    font-size: 13px;
    line-height: 28px;
  }
  .content .confirm {
    margin-left: 60px;
  }
</style>
