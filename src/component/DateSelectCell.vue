<template>
  <div>
    <van-field :border="border" is-link readonly @click="showDataSelector" :placeholder="placeholder" :label="title"
              :value="value"></van-field>
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        @confirm="show=false"
        @cancel="show=false"></van-datetime-picker>
    </van-popup>
  </div>
</template>

<script>
  import dataformat from "date-format-lite";
  export default {
    name: "DataSelectCell",
    data() {
      return {
        border: false,
        show: false,
        currentDate: new Date()
      }
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
      value: {
        type: String,
        default: ""
      }
    },
    mounted() {
      this.$emit("update:value", this.currentDate.format("YYYY-MM-DD"));
    },
    methods: {
      onSelect(value) {
        this.$emit("update:value", value);
      },
      showDataSelector() {
        this.show = true;
      }
    },
    watch: {
      currentDate(currentDate) {
        this.onSelect(currentDate.format("YYYY-MM-DD"))
      }
    }
  }
</script>

<style scoped>

</style>
