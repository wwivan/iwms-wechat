<template>
  <!-- 物料分布 -->
  <div
    :class="className"
    :id="id"
    :style="{ height: '2rem', width: '3.5rem' }"
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
      var i = 0;
      var colors = [
        // "#F6617B",
        // "#4181FF",
        "#F7C77F",
        "#749f83",
        "#c23531",
        "#2f4554",
        "#ca8622",
        "#bda29a",
        "#6e7074",
        "#546570",
        "#c4ccd3"
      ];
      this.chart = echarts.init(this.$refs.myEchart);
      // 把配置和数据放这里
      this.chart.setOption({
        title: {
          text: "物料统计",
          x: "left",
          y: "top",
          textStyle: {
            bottom: "0rem",
            color: "#FF9860"
          }
          // subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          //导航栏
          orient: "vertical",
          x: "left",
          y: "center",
          data: this.items
        },
        toolbox: {
          //工具部分
          show: true,
          feature: {
            mark: { show: true },
            // dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"],
              option: {
                funnel: {
                  x: "25%",
                  width: "100%",
                  funnelAlign: "right",
                  max: 1548
                }
              }
            },
            restore: { show: true },
            saveAsImage: { show: true } //保存为图片
          }
        },
        calculable: true,
        series: [
          {
            name: "访问来源",
            x: "right",
            type: "pie",
            radius: ["30%", "60%"],
            itemStyle: {
              normal: {
                color: function() {
                  return colors[i++];
                },
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              },
              emphasis: {
                label: {
                  show: true,
                  position: "right",
                  textStyle: {
                    fontSize: "13",
                    fontWeight: "bold"
                  }
                }
              }
            },
            data: this.items
          }
        ]
      });
    }
  }
};
</script>
