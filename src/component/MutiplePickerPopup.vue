<template>
  <div>
    <van-field
      :border="border"
      is-link
      readonly
      :label="title"
      @click="show = true"
      :placeholder="placeholder"
      :value="selectedItem.name"
    ></van-field>
    <van-field
      v-if="selectedItem.customer"
      :border="border"
      is-link
      readonly
      :label="title2"
      :placeholder="placeholder2"
      @click="show = true"
      :value="selectedItem.customer.name"
    ></van-field>
    <van-action-sheet
      v-model="show"
      :actions="columns"
      :close-on-click-overlay="close"
      @cancel="onCancel"
      cancel-text="取消"
      @select="onSelect"
    ></van-action-sheet>
  </div>
</template>

<script>
import { setStore } from "@/util/util";
export default {
  name: "PickerPopup",
  data() {
    return {
      border: false,
      close: false,
      show: false
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: undefined
    },
    title2: {
      type: String,
      default: ""
    },
    placeholder2: {
      type: String,
      default: undefined
    },
    selectedItem: {
      name: {},
      customer: ""
    },
    columns: {
      default: []
    }
  },
  methods: {
    onSelect(item) {
      this.$emit("update:selectedItem", item);
      // this.$emit("update:selectedItemId", item);
      setStore("customer", item.customer);
      setStore("saleOrderId", item.id);
      this.show = false;
    },
    onCancel() {
      this.$emit("update:selected", undefined);
      this.show = false;
    }
  }
};
</script>

<style scoped>
.van-picker__cancel {
  color: #000 !important;
}
</style>
