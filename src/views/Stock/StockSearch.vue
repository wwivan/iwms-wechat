<template>
  <div>
    <van-nav-bar
      title="物料查询"
      left-text="返回"
      right-text="确定"
      left-arrow
      @click-left="onTitleClickLeft"
      @click-right="onTitileClickRight"
    />
    <van-field
      clearable
      label="物料名称"
      placeholder="请输入物料名称"
      v-model="name"
    ></van-field>
    <van-field
      clearable
      label="物料型号 "
      placeholder="请输入物料名称"
      v-model="model"
    ></van-field>
  </div>
</template>

<script>
// import { Toast } from "vant";
import { mapGetters } from "vuex";
import { setStore } from "@/util/util";
// import PickerPopup from "@/component/PickerPopup";
export default {
  data() {
    return {
      name: undefined,
      model: undefined,
      params: {
        "LIKE_materielSku.name": undefined,
        "LIKE_materielSku.model": undefined
      }
    };
  },
  mounted() {},
  methods: {
    onTitleClickLeft() {
      // 返回
      this.$router.go(-1);
    },
    onTitileClickRight() {
      // 确定
      this.params["LIKE_materielSku.name"] = this.name;
      this.params["LIKE_materielSku.model"] = this.model;
      setStore("StockSearchParams", this.params);
      this.$router.push({
        name: "Stock"
      });
    }
  },
  computed: {
    ...mapGetters(["fid"])
  }
};
</script>

<style></style>
