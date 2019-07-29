<template>
  <div>
    <circle-echart :items="items" class="ml-3"></circle-echart>
    <stick-echart :items="items1" ></stick-echart>
  </div>
</template>
<script>
import circleEchart from "../component/Echart/circleEchart";

import stickEchart from "../component/Echart/stickEchart";
export default {
  components: { circleEchart, stickEchart },
  data() {
    return {
      items: [
        { name: "成品", value: 95, max: "100" },
        { name: "半成品", value: 55, max: "100" },
        { name: "原材料", value: 75, max: "100" },
      ],
      items1: [
        { name: "三级垫圈", stockInValue: 300, stockOutValue: 200 },
        { name: "外六角", stockInValue: 400, stockOutValue: 200 },
        { name: "螺钉", stockInValue: 500, stockOutValue: 200 }
      ]
    };
  },
  methods: {
    log() {
      let items2 = this.items1.map(Element => {
        return {
          name: Element.name
        };
      });
      console.log(this.stockOutValue);
    }
  }
};
</script>