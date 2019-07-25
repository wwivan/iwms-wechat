<template>
  <div>
      <circle-echart></circle-echart>
      <stick-echart></stick-echart>
  </div>
</template>
<script>
import circleEchart from "../component/Echart/circleEchart"

import stickEchart from "../component/Echart/stickEchart"
export default {
    components:{circleEchart,stickEchart},

    // initChart() {
    //   this.chart = echarts.init(this.$refs.myEchart);
    //   // 把配置和数据放这里
    //   this.axios.get('/url').then((data) => {
    //     this.chart.setOption({

    //     })
    //   })
    // }
}
</script>