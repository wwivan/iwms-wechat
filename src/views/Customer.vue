<template>
  <div>
    <!-- <van-pull-refresh v-model="loading" @refresh="onRefreshList">
      <van-list v-model="loading" :finished="finished" @load="onLoadMore">
        <van-panel
          v-for="(item, index) in records"
          :title="item.orderNo"
          :key="index"
        >
          <div class="panel-item">
            <div>客户名称: {{item.name}}</div>
            <div>联系人名称: {{item.contactName}}</div>
            <div>联系人电话: {{item.contactPhone}}</div>
            <van-row type="flex" justify="end" gutter="12">
              <van-col>
                 <van-button @click="useSupplier(item,selectedStockOutType,StockOutType,selectedWarehouse)" type="primary" style="height:0.35rem;line-height:0.32rem" :text="'选择'"></van-button>
              </van-col>
            </van-row>
          </div>
        </van-panel>
      </van-list>

      <div class="van-list__loading">
        <div
          v-if="!loading && records.length === 0"
          @click="findCustomerList"
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
          :class="index < records.length - 1 ? 'bottom' : ''"
        >
          <div class="content" style="justify-content:space-between">
            <div>
              <div>客户名称: {{ item.name }}</div>
              <div>联系人名称: {{ item.contactName }}</div>
              <div>联系人电话: {{ item.contactPhone }}</div>
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
                @click="
                  useSupplier(
                    item,
                    selectedStockOutType,
                    StockOutType,
                    selectedWarehouse
                  )
                "
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
import { mapGetters } from "vuex";
import { findCustomerList } from "@/api/api";
// eslint-disable-next-line no-unused-vars
import { setStore, getStore, removeStore, timeFormat } from "@/util/util";
// eslint-disable-next-line no-unused-vars
import { Dialog } from "vant";
export default {
  data() {
    return {
      StockInType: undefined,
      show: false,
      loading: false,
      StockOutType: undefined,
      finished: false,
      selectedWarehouse: [],
      selectedStockOutType: [],
      records: [],
      searchParams: {},
      params: {
        checkQty: undefined,
        pageNumber: 1,
        pageSize: 10,
        sortType: "auto",
        fid: "" //42dd7498-b9d3-43b3-b736-3e9844f03ff5
      }
    };
  },
  mounted() {
    this.params.fid = this.fid;
    //  let temp = getStore("StockOutType");
    //  this.StockOutType = temp;
    let temp = getStore("CustomerSearchParams");
    if (temp) {
      removeStore("CustomerSearchParams");
      this.searchParams = JSON.parse(temp);
    } else {
      this.searchParams = {};
    }

    let item = getStore("selectedStockOutType");
    if (item) {
      removeStore("selectedStockOutType");
      // eslint-disable-next-line no-console
      console.log(item);
      this.selectedStockOutType = item;
      // eslint-disable-next-line no-console
      console.log(this.selectedStockOutType);
    }

    let StockInType = getStore("StockInType");
    if (StockInType) {
      removeStore("StockInType");
      this.StockInType = StockInType;
    }

    let StockOutType = getStore("StockOutType");
    if (StockOutType) {
      removeStore("StockOutType");
      this.StockOutType = StockOutType;
    }

    let Warehouse = getStore("selectedWarehouse");
    if (Warehouse) {
      removeStore("selectedWarehouse");
      this.selectedWarehouse = Warehouse;
      // eslint-disable-next-line no-console
      console.log(this.selectedWarehouse);
    }
  },
  methods: {
    onRefreshList() {
      // 刷新
      //this.params.pageNumber = 1;
      this.records = [];
      this.findCustomerList();
    },
    onLoadMore() {
      //this.params.pageNumber = this.params.pageNumber + 1;
      this.findCustomerList();
    },
    findCustomerList() {
      this.params.searchParams = this.searchParams;
      // 获取记录
      findCustomerList(this.params)
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
    useSupplier(
      customer,
      selectedStockOutType,
      StockOutType,
      selectedWarehouse
    ) {
      setStore("StockOutType", StockOutType);
      setStore("selectedStockOutType", selectedStockOutType);
      setStore("selectedWarehouse", selectedWarehouse);
      setStore("customer", customer);
      if (this.StockInType == "1") {
        this.$router.push("/warehouse/stockIn/form");
      }
      if (this.StockOutType == "1") {
        this.$router.push("/warehouse//stock/out/form");
      }
    },

    onTitleClickLeft(StockInType, StockOutType) {
      // 返回
      setStore("StockOutType", StockOutType);
      setStore("StockInType", StockInType);
      this.$router.go(-1);
    },
    onClickSearch(StockInType, StockOutType, selectedStockOutType) {
      setStore("selectedStockOutType", selectedStockOutType);
      setStore("StockOutType", StockOutType);
      setStore("StockInType", StockInType);
      this.$router.push({
        name: "CustomerSearch"
      });
    }
  },
  computed: {
    ...mapGetters(["fid"])
  },
  filters: {
    statusFilter(value) {
      let realVal = "";
      if (value == "0") {
        realVal = "未使用";
      } else if (value == "1") {
        realVal = "使用";
      } else if (value == "3") {
        realVal = "封闭使用中";
      }
      return realVal;
    }
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
