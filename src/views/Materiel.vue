/* eslint-disable no-console */
<template>
  <div>
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
              <div>物料名称: {{ item.name }}</div>
              <div>物料型号: {{ item.model }}</div>
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
                @click="useMateriel(item)"
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
          @click="findMaterielList"
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
import { mapGetters, mapMutations } from "vuex";
import { findMaterielList } from "@/api/api";
// eslint-disable-next-line no-unused-vars
import { setStore, getStore, removeStore, timeFormat } from "@/util/util";
// eslint-disable-next-line no-unused-vars
import { Dialog } from "vant";
export default {
  data() {
    return {
      stockType: undefined,
      StockInType: undefined,
      show: false,
      loading: false,
      finished: false,
      act: undefined,
      records: [],
      searchParams: {},
      params: {
        pageNumber: 1,
        pageSize: 30,
        sortType: "auto",
        fid: "" //42dd7498-b9d3-43b3-b736-3e9844f03ff5
      }
    };
  },
  created() {
    this.StockInType = getStore("StockInType");
    // eslint-disable-next-line no-console
    console.log(this.StockInType);
    // eslint-disable-next-line no-console
    console.log(11111111110000);
  },
  mounted() {
    this.params.fid = this.fid;
    let temp = getStore("MaterielSkuSearchParams");
    if (temp) {
      removeStore("MaterielSkuSearchParams");
      this.searchParams = JSON.parse(temp);
    } else {
      this.searchParams = {};
    }
    let act = getStore("active");
    if (act) {
      //removeStore("active");
      this.act = act;
      // eslint-disable-next-line no-console
      console.log(this.act);
    }
  },
  methods: {
    initStatus() {
      removeStore("StockInType");
    },
    onRefreshList() {
      // 刷新
      //this.params.pageNumber = 1;
      this.records = [];
      this.findMaterielList();
    },
    onLoadMore() {
      // eslint-disable-next-line no-console
      this.findMaterielList();
    },
    findMaterielList() {
      this.params.searchParams = this.searchParams;
      // 获取记录
      findMaterielList(this.params)
        .then(res => {
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(res));
          this.loading = false;
          this.finished = res.data.last;
          this.records.push(...res.data.content);
        })
        .catch(error => {
          this.finished = true;
          this.loading = false;
          // eslint-disable-next-line no-console
          console.log(JSON.stringify(error));
          Toast("请求错误");
        });
    },
    useMateriel(materiel) {
      setStore("materielSku", materiel);
      this.stockType = getStore("stockType");
      if (this.stockType == "0") {
        this.$router.push("/warehouse/reserve/order/detail/form");
      } else if (this.stockType == "1") {
        this.initStatus();
        this.$router.push("/warehouse/stockIn/item/form");
      } else if (this.stockType == "3") {
        this.$router.push("/warehouse/stock/out/item/form");
      }
    },

    onClickSearch() {
      this.$router.push("/materiel/search");
    },
    onTitleClickLeft() {
      // 返回
      this.$router.go(-1);
    },
    onTitileClickRight() {}
  },
  computed: {
    ...mapGetters(["fid", "isshow"]),
    ...mapMutations(["resIsshow", "stockInIsshow"])
  }
  // created(){
  //   this.isshow =this.$store.state.isshow
  //   console.log(this.isshow)
  // }
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
