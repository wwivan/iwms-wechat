<template>
  <div>
    <!-- <van-nav-bar title="物料" left-text="返回" left-arrow @click-left="onTitleClickLeft">
      <van-button slot="right" @click="onClickSearch">
        <van-icon name="search" size="1.5em"/>
      </van-button>
    </van-nav-bar>-->
    <!-- <van-pull-refresh v-model="loading" @refresh="onRefreshList">
      <van-list v-model="loading" :finished="finished" @load="onLoadMore">
        <van-panel v-for="(item, index) in records" :title="item.barcode" :key="index">
          <div class="panel-item">
            <div>物料名称: {{item.name}}</div>
            <div>物料型号: {{item.model}}</div>
            <van-row type="flex" justify="end" gutter="12">
              <van-col>
                <van-button
                  @click="useMateriel(item)"
                  type="primary"
                  style="height:0.35rem;line-height:0.32rem"
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
          @click="findMaterielList"
          style="height: 10rem"
        >
          <span class="van-list__loading-text">暂无数据, 下拉刷新</span>
        </div>
      </div>
    </van-pull-refresh>-->
    <van-pull-refresh v-model="loading" @refresh="onRefreshList">
      <van-list v-model="loading" :finished="finished" @load="onLoadMore">
        <div
          v-for="(item, index) in records"
          :key="index"
          class="stock-in-detail"
          :class="(index < (records.length-1))?'bottom':'' "
        >
          <div class="content" style="justify-content:space-between">
            <div>
              <div>物料名称: {{item.name}}</div>
              <div>物料型号: {{item.model}}</div>
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
              >选择</div>
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
import { setStore, getStore, removeStore, timeFormat } from "@/util/util";
import { Dialog } from "vant";
export default {
  data() {
    return {
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
    console.log(this.StockInType);
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
      console.log("############");
      console.log(this.fid);
      //this.params.pageNumber = this.params.pageNumber + 1;
      console.log(this.params.pageNumber);
      this.findMaterielList();
    },
    findMaterielList() {
      this.params.searchParams = this.searchParams;
      // 获取记录
      findMaterielList(this.params)
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
    useMateriel(materiel) {
      setStore("materielSku", materiel);
      if (this.isshow == true) {
        this.$router.push("/reserve/order/detail/form");
      } else if (this.isshow == false) {
        this.initStatus();
        this.$router.push("/stockIn/item/form");
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

