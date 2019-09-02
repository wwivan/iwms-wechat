<template>
  <div>
    <van-nav-bar
      title="库存"
      left-text="返回"
      left-arrow
      @click-left="onTitleClickLeft"
    />
    <van-pull-refresh v-model="loading" @refresh="onRefreshList">
      <van-list v-model="loading" :finished="finished" @load="onLoadMore">
        <van-panel
          v-for="(item, index) in records"
          :title="item.barcode"
          :key="index"
        >
          <div class="panel-item">
            <div>物料名称: {{item.materielSku==undefined? '':item.materielSku.name}}</div>
            <div>物料型号: {{item.materielSku==undefined? '':item.materielSku.model}}</div>
            <div>储位: {{item.cell==undefined? '':item.cell.code}}</div>
            <div>库存: {{item.stockNum}}</div>
            <div>可用量: {{item.stockUseNum}}</div>
            <div>物料条码: {{item.barcode}}</div>
            <!-- <div>生产日期: {{item.productionDate}}</div>
            <div>有效日期: {{item.useDate}}</div> -->
          </div>
        </van-panel>
      </van-list>

      <div class="van-list__loading">
        <div
          v-if="!loading && records.length === 0"
          @click="findStockLogs"
          style="height: 1000px"
        >
          <span class="van-list__loading-text">暂无数据, 下拉刷新</span>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapGetters } from "vuex";
import { findStockLogs } from "@/api/api";
import { setStore, getStore, removeStore } from "@/util/util";
import { Dialog } from "vant";
export default {
  data() {
    return {
      trayItem:{},
      stockInItem:{},
      show: false,
      loading: false,
      finished: false,
      records: [],
      searchParams: {},
      params: {
        pageNumber: 0,
        pageSize: 1,
        sortType: "auto",
        fid: "",//42dd7498-b9d3-43b3-b736-3e9844f03ff5
        stockInItem:{},
        tray:{},
        searchParams: {}
      }
    };
  },
  mounted() {
    this.params.fid = this.fid;
    let temp = getStore("stockLogsSearchParams");
    if (temp) {
      removeStore("stockLogsSearchParams");
      this.searchParams = JSON.parse(temp);
    } else {
      this.searchParams = {};
    }
  },
  methods: {
    onRefreshList() {
      // 刷新
      this.params.pageNumber = 1;
      this.records = [];
      this.findStockLogs();
    },
    onLoadMore() {
      console.log('############');
      console.log(this.fid);
      this.params.pageNumber = this.params.pageNumber + 1;
      console.log(this.params.pageNumber)
      this.findStockLogs();
    },
    findStockLogs() {
      this.params.searchParams = this.searchParams;
      // 获取记录
      findStockLogs(this.params)
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
    onTitleClickLeft() {
      // 返回
      this.$router.go(-1);
    },
    onTitileClickRight() {
      // 查询
      this.$router.push({
        name: "StockLogsSearch"
      });
    },
  },
  computed: {
    ...mapGetters(["fid"])
  },
};
</script>

<style scoped>
</style>