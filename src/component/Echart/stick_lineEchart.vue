<template>
  <!-- 库存预警 -->
  <div
    :class="className"
    :id="id"
    :style="{ height: height, width: width }"
    ref="myEchart"
  ></div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    items: { type: Array },
    itemName: { type: String },
    itemName2: { type: String },
    title: { type: String },
    color: { type: Array },
    className: {
      type: String,
      default: "yourClassName"
    },
    id: {
      type: String,
      default: "yourID"
    },
    width: {
      type: String,
      default: "3.5rem"
    },
    height: {
      type: String,
      default: "2.8rem"
    }
  },
  data() {
    return {
      chart: null,
      names: [],
      stockInValues: [],
      stockOutValues: []
    };
  },
  created() {
    this.initData();
  },
  mounted() {
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initData() {
      let names = this.items.map(e => {
        return e.name;
      });
      let stockInValues = this.items.map(e => {
        return e.stockInValue;
      });
      let stockOutValues = this.items.map(e => {
        return e.stockOutValue;
      });
      this.names = names;
      this.stockInValues = stockInValues;
      this.stockOutValues = stockOutValues;
      // console.log(this.names)
    },
    initChart() {
      this.chart = echarts.init(this.$refs.myEchart);
      // 把配置和数据放这里
      this.chart.setOption({
        title: {
          text: this.title,
          textStyle: {
            color: this.color[1]
          }
          // subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        // legend: {
        //   data: ["入库", "出库"]
        // },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            // dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: this.names,
            axisLabel: {
              fontSize: 10,
              interval: 0,
              rotate: 40
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: this.itemName,
            type: "bar",
            data: this.stockOutValues,
            itemStyle: {
              color: this.color[1]
            }
            // itemStyle: {
            //   normal: {
            //     //好，这里就是重头戏了，定义一个list，然后根据所以取得不同的值，这样就实现了，
            //     color: function(params) {
            //       // build a color map as your need.
            //       var colorList = ["#FF9779", "#2360EF"];
            //       return colorList[params.dataIndex];
            //     }, //以下为是否显示，显示位置和显示格式的设置了
            //     label: {
            //       show: true,
            //       position: "top",
            //       //                             formatter: '{c}'
            //       formatter: "{b}\n{c}"
            //     }
            //   }
            // },
            // markPoint: {
            //   data: [
            //     {
            //       name: "年最高",
            //       value: 182.2,
            //       yxAxis: 7,
            //       xAxis: 183,
            //       symbolSize: 18
            //     },
            //     { name: "年最低", value: 2.3, yAxis: 11, xAxis: 3 }
            //   ]
            // },
            // markLine: {
            //   data: [{ type: "average", name: "平均值" }]
            // }
          },
          {
            name: this.itemName2,
            type: "line",
            symbolSize: 10,
            data: this.stockInValues,
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 6
                }
              },
              color: this.color[2]
            }
            // markPoint: {
            //   data: [
            //     { type: "max", name: "最大值" },
            //     { type: "min", name: "最小值" }
            //   ]
            // },
            // markLine: {
            //   data: [{ type: "average", name: "平均值" }]
            // }
          }
        ]
      });
    }
  }
};
</script>
