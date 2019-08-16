<template>
  <div>
    <van-field
      :border="border"
      is-link
      readonly
      :label="title"
      @click="show=true"
      :placeholder="placeholder"
      :value="selectedItem.name"
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
    selectedItem: {
      name: ""
    },
    columns: {
      default: []
    }
  },
  methods: {
    onSelect(item) {
      this.$emit("update:selectedItem", item);
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