<template>
  <div>
    <m-list-card icon="xiaolaba" title="我的审批" :categories="approvalNews">
      <template #items="{category}">
        <div
          @click="read(news, category)"
          class="py-2 fs-lg d-flex"
          v-for="(news, i) in category.content"
          :key="i"
        >
          <span class="text-grey">[{{ category.name }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis ml-2">{{
            news.orderNo
          }}</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{
            news.orderNo
          }}</span>
          <span class="text-grey-1 fs-sm">{{ news.createTime | date }}</span>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
import { purchasePlanOrder, findSaleOrderList } from "@/api/api.js";
import { Toast } from "vant";
import { mapGetters } from "vuex";
import dayjs from "dayjs";
import { setStore } from "@/util/util";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      purchasePlanParams: {
        page: 1,
        pageSize: 10,
        fid: "42dd7498-b9d3-43b3-b736-3e9844f03ff5",
        searchParams: {}
      },
      salePlanParams: {
        pageNumber: 1,
        pageSize: 30,
        sortType: "auto",
        fid: "", //42dd7498-b9d3-43b3-b736-3e9844f03ff5
        searchParams: {}
      },
      approvalNews: [
        {
          name: "销售审核",
          content: []
        },
        {
          name: "采购审核",
          content: []
        },
        {
          name: "对账审核",
          content: [
            { id: "1", orderNo: "1111", msg: "111" },
            { id: "1", orderNo: "1111", msg: "111" },
            { id: "1", orderNo: "1111", msg: "111" }
          ]
        }
      ]
    };
  },
  mounted() {
    this.purchasePlanParams.fid = this.fid;
    this.salePlanParams.fid = this.fid;
    this.purchasePlanOrder();
    this.findSaleOrderList();
  },
  computed: {
    ...mapGetters(["fid"])
  },
  methods: {
    purchasePlanOrder() {
      // this.purchasePlanParams.searchParams["EQ_status"] = "1";
      // 获取记录
      purchasePlanOrder(this.purchasePlanParams)
        .then(res => {
          // console.log(JSON.stringify(res));
          this.loading = false;
          this.finished = res.data.last;
          this.approvalNews[1].content.push(...res.data.content);
          console.log(this.approvalNews);
        })
        .catch(error => {
          this.finished = true;
          this.loading = false;
          // console.log(JSON.stringify(error));
          Toast("请求错误" + error);
        });
    },
    findSaleOrderList() {
      //   this.salePlanParams.searchParams = this.searchParams;
      //   this.salePlanParams.searchParams["EQ_status"] = "0";
      // 获取记录
      findSaleOrderList(this.salePlanParams)
        .then(res => {
          // console.log(JSON.stringify(res));
          this.loading = false;
          this.finished = res.data.last;
          this.approvalNews[0].content.push(...res.data.content);
        })
        .catch(error => {
          this.finished = true;
          this.loading = false;
          // console.log(JSON.stringify(error));
          Toast("请求错误" + error);
        });
    },
    read(news, category) {
      console.log(category);
      if (category.name == "销售审核") {
        setStore("SaleOrderItemId", news.id);
        setStore("saleOrderItemStatus", news.status);
        // this.$router.push("/sale/and/purchase/sale/order/item/detail");
        setStore("saleOrderItemStatus", news.status);
        setStore("orderType", "0");
        this.$router.push("/sap/sale/order/item/detail");
      } else if (category.name == "采购审核") {
        setStore("purchasePlanId", news.id);
        setStore("purchasePlanStatus", news.status);
        setStore("orderType", "2");
        this.$router.push("/sap/purchase/plan/order/detail");
      }
    }
  }
};
</script>
