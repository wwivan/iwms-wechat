<template>
  <div>
    <!-- <van-nav-bar title="供应商" left-text="返回" left-arrow @click-left="onTitleClickLeft">
      <van-button
        slot="right"
        @click="onClickSearch(selectedStockInType,selectedWarehouse,deliveryNumber,purchaseNo)"
      >
        <van-icon name="search" size="1.5em"/>
      </van-button>
    </van-nav-bar>-->
    <!-- <van-pull-refresh v-model="loading" @refresh="onRefreshList">
      <van-list v-model="loading" :finished="finished" @load="onLoadMore">
        <van-panel v-for="(item, index) in records" :title="item.orderNo" :key="index">
          <div class="panel-item">
            <div>供应商名称: {{item.name}}</div>
            <div>联系人名称: {{item.contactName}}</div>
            <div>联系人电话: {{item.contactPhone}}</div>
            <van-row type="flex" justify="end" gutter="12">
              <van-col>
                <van-button
                  @click="useSupplier(item,selectedStockInType,selectedWarehouse,deliveryNumber,purchaseNo)"
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
          @click="findSupplierList"
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
              <div>供应商名称: {{ item.name }}</div>
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
                    selectedStockInType,
                    selectedWarehouse,
                    deliveryNumber,
                    purchaseNo
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
          @click="findSupplierList"
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
import { findSupplierList } from "@/api/api";
// eslint-disable-next-line no-unused-vars
import { setStore, getStore, removeStore, timeFormat } from "@/util/util";
// eslint-disable-next-line no-unused-vars
import { Dialog } from "vant";
export default {
  data() {
    return {
      show: false,
      loading: false,
      finished: false,
      stockType: undefined,
      selectedStockInType: [],
      selectedWarehouse: [],
      deliveryNumber: undefined,
      purchaseNo: undefined,
      records: [],
      searchParams: {},
      params: {
        checkQty: undefined,
        pageNumber: 1,
        pageSize: 99,
        sortType: "auto",
        fid: "" //42dd7498-b9d3-43b3-b736-3e9844f03ff5
      }
    };
  },
  mounted() {
    this.params.fid = this.fid;
    let temp = getStore("SupplierSearchParams");
    if (temp) {
      removeStore("SupplierSearchParams");
      this.searchParams = JSON.parse(temp);
    } else {
      this.searchParams = {};
    }

    let item = getStore("selectedStockInType");
    if (item) {
      removeStore("selectedStockInType");
      // eslint-disable-next-line no-console
      console.log(item);
      this.selectedStockInType = item;
      // eslint-disable-next-line no-console
      console.log(this.selectedStockInType);
    }

    // let act = getStore("active");
    // if (act) {
    //   removeStore("act");
    //   console.log(act);
    //   this.act = act;
    //   console.log(this.act);
    // }
    this.stockType = getStore("stockType");
    let Warehouse = getStore("selectedWarehouse");
    if (Warehouse) {
      removeStore("selectedWarehouse");
      this.selectedWarehouse = Warehouse;
      // eslint-disable-next-line no-console
      console.log(this.selectedWarehouse);
    }
    let deliveryNumber = getStore("deliveryNumber");
    if (deliveryNumber != "undefined") {
      removeStore("deliveryNumber");
      this.deliveryNumber = deliveryNumber;
    } else {
      this.deliveryNumber = "";
    }

    let purchaseNo = getStore("purchaseNo");
    if (purchaseNo != "undefined") {
      removeStore("purchaseNo");
      this.purchaseNo = purchaseNo;
    } else {
      this.purchaseNo = "";
    }
  },
  methods: {
    onRefreshList() {
      // 刷新
      //this.params.pageNumber = 1;
      this.records = [];
      this.findSupplierList();
    },
    onLoadMore() {
      // eslint-disable-next-line no-console
      console.log("############");
      // eslint-disable-next-line no-console
      console.log(this.fid);
      // this.params.pageNumber = this.params.pageNumber + 1;
      // eslint-disable-next-line no-console
      console.log(this.params.pageNumber);
      this.findSupplierList();
    },
    findSupplierList() {
      this.params.searchParams = this.searchParams;
      // 获取记录
      findSupplierList(this.params)
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
      supplier,
      selectedStockInType,
      selectedWarehouse,
      deliveryNumber,
      purchaseNo
    ) {
      setStore("deliveryNumber", deliveryNumber);
      setStore("purchaseNo", purchaseNo);
      setStore("selectedStockInType", selectedStockInType);
      setStore("selectedWarehouse", selectedWarehouse);
      setStore("supplier", supplier);
      // eslint-disable-next-line no-console
      console.log(selectedStockInType.length);
      if (this.stockType == "0") {
        this.$router.push("/warehouse/reserve/order/form");
      } else if (this.stockType == "1") {
        this.$router.push("/warehouse/stockIn/form");
      }
    },

    onTitleClickLeft() {
      // 返回
      this.$router.go(-1);
    },
    onClickSearch(
      selectedStockInType,
      selectedWarehouse,
      purchaseNo,
      deliveryNumber
    ) {
      setStore("deliveryNumber", deliveryNumber);
      setStore("purchaseNo", purchaseNo);
      setStore("selectedStockInType", selectedStockInType);
      setStore("selectedWarehouse", selectedWarehouse);
      this.$router.push("/supplier/search");
    }
  },
  computed: {
    ...mapGetters(["fid"]),
    ...mapMutations(["resIsshow", "stockInIsshow"])
  },
  created() {
    this.isshow = this.$store.state.isshow;
    // eslint-disable-next-line no-console
    console.log(this.isshow);
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
