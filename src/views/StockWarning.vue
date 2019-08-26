<template>
  <div>
    库存预警
    <div class="list-card" v-for="(item, id) in dangerStorage" :key="id">
      <div>物料编码：{{}}</div>
      <div>物料名称：{{}}</div>
      <div>库存数量：{{}}</div>
      <div>最低库存：{{}}</div>
      <div>物料编码：{{}}</div>
      <div>物料编码：{{}}</div>
      <div>物料编码：{{}}</div>
      <div>物料编码：{{}}</div>
      <div>物料编码：{{}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
