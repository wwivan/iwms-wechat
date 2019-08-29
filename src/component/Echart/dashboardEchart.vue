<template>
  <!-- 物料分布 -->
  <div
    :class="className"
    :id="id"
    :style="{ height: '1.7rem', width: '1.5rem' }"
    ref="myEchart"
  ></div>
</template>
<script>
import echarts from "echarts";
// eslint-disable-next-line no-unused-vars
import { totalmem } from "os";
export default {
  props: {
    items: {
      type: Array,
      default() {
        //默认数据，没有数剧的情况下启用
        return [
          { name: "生物", value: 95, max: "100" },
          { name: "数学", value: 55, max: "100" },
          { name: "语文", value: 86, max: "100" },
          { name: "物理", value: 54, max: "100" },
          { name: "美术", value: 59, max: "100" }
        ];
      }
    },
    itemName: { type: String },
    itemName2: { type: String },
    title: { type: String },
    color: { type: Array },
    tableColor: { type: Array },
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
      default: "3.5rem"
    }
  },
  data() {
    return {
      chart: null,
      data: [],
      dataValue: []
    };
  },
  created() {},
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
    initChart() {
      // var i = 0;
      // var colors = this.color;
      this.chart = echarts.init(this.$refs.myEchart);
      // 把配置和数据放这里
      this.chart.setOption({
        title: {
          text: this.title,
          x: "center",
          y: "bottom",
          textStyle: {
            bottom: "0rem",
            color: this.color[0]
          }
          // subtext: "纯属虚构"
        },
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        // toolbox: {
        //   feature: {
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },
        series: [
          {
            name: this.itemName,
            type: "gauge",
            radius: "80%",
            // startAngle: 150,
            // endAngle: 30,
            splitNumber: 5,
            axisLine: {
              //仪表盘轴线相关配置
              // show: false,
              lineStyle: {
                color: this.tableColor,
                width: 25
                // opacity: 0.2
                // shadowColor: [
                //   [0.2, "#FF9860"],
                //   [0.8, "#4181FF"],
                //   [1, "#F6617B"]
                // ]
              }
            },
            splitLine: {
              //分隔线样式
              show: false
            },
            axisTick: {
              //刻度样式
              splitNumber: 5
            },
            axisLabel: {
              show: false
              // distance: 2
            },
            pointer: {
              length: "40%"
            },
            detail: {
              formatter: "{value}%",
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontSize: 15
              }
            },
            data: this.items
          }
        ]
        // tooltip: {
        //   formatter: "{a} <br/>{b} : {c}%"
        // },
        // toolbox: {
        //   show: true,
        //   feature: {
        //     mark: { show: true },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        // series: [
        //   {
        //     name: "业务指标",
        //     type: "gauge",
        //     startAngle: 180,
        //     endAngle: 0,
        //     center: ["50%", "90%"], // 默认全局居中
        //     radius: 100,
        //     axisLine: {
        //       // 坐标轴线
        //       lineStyle: {
        //         // 属性lineStyle控制线条样式
        //         width: 60
        //       }
        //     },
        //     axisTick: {
        //       // 坐标轴小标记
        //       splitNumber: 0, // 每份split细分多少段
        //       length: 0 // 属性length控制线长
        //     },
        //     axisLabel: {
        //       // 坐标轴文本标签，详见axis.axisLabel
        //       formatter: function(v) {
        //         switch (v + "") {
        //           case "10":
        //             return "低";
        //           case "50":
        //             return "中";
        //           case "90":
        //             return "高";
        //           default:
        //             return "";
        //         }
        //       },
        //       textStyle: {
        //         // 其余属性默认使用全局文本样式，详见TEXTSTYLE
        //         color: "#fff",
        //         // fontSize: 15,
        //         fontWeight: "bolder"
        //       }
        //     },
        //     pointer: {
        //       width: 25,
        //       length: "80%"
        //     },
        //     itemStyle: {
        //       normal: {
        //         color: "#fff"
        //       }
        //     },
        //     title: {
        //       show: true,
        //       offsetCenter: [0, "-60%"], // x, y，单位px
        //       textStyle: {
        //         // 其余属性默认使用全局文本样式，详见TEXTSTYLE
        //         color: "#fff",
        //         fontSize: 30
        //       }
        //     },
        //     detail: {
        //       show: true,
        //       backgroundColor: "rgba(0,0,0,0)",
        //       borderWidth: 0,
        //       borderColor: "#ccc",
        //       width: 20,
        //       height: 20,
        //       offsetCenter: [0, -40], // x, y，单位px
        //       formatter: "{value}%",
        //       textStyle: {
        //         // 其余属性默认使用全局文本样式，详见TEXTSTYLE
        //         fontSize: 20,
        //         color: "#4181FF"
        //       }
        //     },
        //     data: [{ value: 30, name: "完成率" }]
        //   }
        // ]
      });

      // setInterval(function() {
      //   this.chart.series[0].data[0].value =
      //     (Math.random() * 100).toFixed(2) - 0;
      // }, 2000);
    }
  }
};
</script>
