<template>
  <div>
    <!-- <van-nav-bar
      title="物料"
      left-text="返回"
      left-arrow
      @click-left="onTitleClickLeft"
    >
      <van-button slot="right" @click="onClickSearch">
        <van-icon name="search" size="1.5em" />
      </van-button>
    </van-nav-bar>
    <van-pull-refresh v-model="loading" @refresh="onRefreshList">
      <van-list v-model="loading" :finished="finished" @load="onLoadMore">
        <van-panel
          v-for="(item, index) in records"
          :title="item.barcode"
          :key="index"
        >
          <div class="panel-item">
            <div>物料名称: {{ item.materielSku.name }}</div>
            <div>物料型号: {{ item.materielSku.model }}</div>
            <div>总库存: {{ item.stockUseNum }}</div>
            <van-row type="flex" justify="end" gutter="12">
              <van-col>
                <van-button
                  @click="useMateriel(item.materielSku)"
                  type="primary"
                  style="height:35px;line-height:32px"
                  :text="'选择'"
                ></van-button>
              </van-col>
            </van-row>
          </div>
        </van-panel>
      </van-list>
      <div class="van-list__loading">
        <div
          v-if="!loading && records.length === 0"
          @click="findStockList"
          style="height: 1000px"
        >
          <span class="van-list__loading-text">暂无数据, 下拉刷新</span>
        </div>
      </div>
    </van-pull-refresh> -->
    <van-pull-refresh v-model="loading" @refresh="onRefreshList">
      <van-list v-model="loading" :finished="finished" @load="onLoadMore">
        <div
          v-for="(item, index) in records"
          :key="index"
          class="stock-in-detail"
          :class="index < records.length - 1 ? 'bottom' : ''"
        >
          <div class="content" style="justify-content:space-between">
            <div>
              <div>物料名称: {{ item.materielSku.name }}</div>
              <div>物料型号: {{ item.materielSku.model }}</div>
              <div>总库存: {{ item.stockUseNum }}</div>
              <div style="margin-bottom:0.05rem"></div>
            </div>
            <div class="confirm">
              <!-- <div
                v-if="StockInType"
                style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #4181ff, #2360ef);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
                @click="useMateriel(item)"
              >选择入库</div>-->
              <div
                style="width:0.8rem;height:0.33rem;background:linear-gradient(135deg, #FF9779, #F6617B);text-align:center;line-height:0.33rem;color:white;border-radius:0.03rem;font-size:0.15rem"
                @click="useMateriel(item.materielSku)"
              >
                选择
              </div>
            </div>
          </div>
        </div>
      </van-list>
      <div class="van-list__loading">
        <div
          v-if="!loading && records.length === 0"
          @click="findStockList"
          style="height: 10rem"
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
import { findStockList } from "@/api/api";
import { setStore, getStore, removeStore } from "@/util/util";
// import { Dialog } from "vant";
export default {
  data() {
    return {
      show: false,
      loading: false,
      finished: false,
      records: [],
      searchParams: {},
      params: {
        pageNumber: 1,
        pageSize: 99,
        sortType: "auto",
        fid: "", //42dd7498-b9d3-43b3-b736-3e9844f03ff5
        searchParams: {
          NEQ_stockUseNum: undefined
        }
      }
    };
  },
  mounted() {
    this.params.fid = this.fid;
    let temp = getStore("StockSearchParams");
    if (temp) {
      removeStore("StockSearchParams");
      this.searchParams = JSON.parse(temp);
    } else {
      this.searchParams = {};
    }
  },
  methods: {
    onRefreshList() {
      // 刷新
      //this.params.pageNumber = 1;
      this.records = [];
      this.findStockList();
    },
    onLoadMore() {
      //this.params.pageNumber = this.params.pageNumber + 1;
      this.findStockList();
    },
    findStockList() {
      this.params.searchParams = this.searchParams;
      this.params.searchParams["NEQ_stockUseNum"] = "0";
      // 获取记录
      findStockList(this.params)
        .then(res => {
          this.loading = false;
          this.finished = res.data.last;
          this.records.push(...res.data.content);
        })
        // eslint-disable-next-line no-unused-vars
        .catch(error => {
          this.finished = true;
          this.loading = false;
          Toast("请求错误");
        });
    },
    useMateriel(materiel) {
      setStore("materielSku", materiel);
      this.$router.push("/warehouse/stock/out/item/form");
    },
    onClickSearch() {
      this.$router.push("/stock/search");
    },
    onTitleClickLeft() {
      // 返回
      this.$router.go(-1);
    },
    onTitileClickRight() {}
  },
  computed: {
    ...mapGetters(["fid"])
  }
};
</script>
<style lang="scss" scoped>
.stock-in-detail {
  margin-left: 0.12rem;
  margin-top: 0.22rem;
  margin-right: 0.12rem;
  /* display: flex;
                 justify-content: space-between; */
}
.stock-in-detail .header {
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
  text-align: left;
}
.content .confirm {
  margin-left: 0.6rem;
}
.bottom {
  border-bottom: 0.01rem solid rgba(0, 0, 0, 0.25);
}
</style>
