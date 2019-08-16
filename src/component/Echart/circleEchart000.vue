<template>
  <div :class="className" :id="id" :style="{height:'3rem',width:'3rem'}" ref="myEchart"></div>
</template>
<script>
import echarts from "echarts";
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
      default: "3rem"
    },
    height: {
      type: String,
      default: "3rem"
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
      let idx = 1;
      this.chart = echarts.init(this.$refs.myEchart);
      // 把配置和数据放这里
      this.chart.setOption({
        timeline: {
          data: [
            "2013-01-01",
            "2013-02-01",
            "2013-03-01",
            "2013-04-01",
            "2013-05-01",
            { name: "2013-06-01", symbol: "emptyStar6", symbolSize: 8 },
            "2013-07-01",
            "2013-08-01",
            "2013-09-01",
            "2013-10-01",
            "2013-11-01",
            { name: "2013-12-01", symbol: "star6", symbolSize: 8 }
          ],
          label: {
            formatter: function(s) {
              return s.slice(0, 7);
            }
          }
        },
        options: [
          {
            title: {
              text: "浏览器占比变化",
              subtext: "纯属虚构"
            },
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
              data: ["Chrome", "Firefox", "Safari", "IE9+", "IE8-"]
            },
            toolbox: {
              show: true,
              feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: false },
                magicType: {
                  show: true,
                  type: ["pie", "funnel"],
                  option: {
                    funnel: {
                      x: "25%",
                      width: "50%",
                      funnelAlign: "left",
                      max: 1700
                    }
                  }
                },
                restore: { show: true },
                saveAsImage: { show: true }
              }
            },
            series: [
              {
                name: "浏览器（数据纯属虚构）",
                type: "pie",
                center: ["50%", "45%"],
                radius: "50%",
                data: [
                  { value: idx * 128 + 80, name: "Chrome" },
                  { value: idx * 64 + 160, name: "Firefox" },
                  { value: idx * 32 + 320, name: "Safari" },
                  { value: idx * 16 + 640, name: "IE9+" },
                  { value: idx++ * 8 + 1280, name: "IE8-" }
                ]
              }
            ]
          },
          {
            series: [
              {
                name: "浏览器（数据纯属虚构）",
                type: "pie",
                data: [
                  { value: idx * 128 + 80, name: "Chrome" },
                  { value: idx * 64 + 160, name: "Firefox" },
                  { value: idx * 32 + 320, name: "Safari" },
                  { value: idx * 16 + 640, name: "IE9+" },
                  { value: idx++ * 8 + 1280, name: "IE8-" }
                ]
              }
            ]
          },
          {
            series: [
              {
                name: "浏览器（数据纯属虚构）",
                type: "pie",
                data: [
                  { value: idx * 128 + 80, name: "Chrome" },
                  { value: idx * 64 + 160, name: "Firefox" },
                  { value: idx * 32 + 320, name: "Safari" },
                  { value: idx * 16 + 640, name: "IE9+" },
                  { value: idx++ * 8 + 1280, name: "IE8-" }
                ]
              }
            ]
          },
          {
            series: [
              {
                name: "浏览器（数据纯属虚构）",
                type: "pie",
                data: [
                  { value: idx * 128 + 80, name: "Chrome" },
                  { value: idx * 64 + 160, name: "Firefox" },
                  { value: idx * 32 + 320, name: "Safari" },
                  { value: idx * 16 + 640, name: "IE9+" },
                  { value: idx++ * 8 + 1280, name: "IE8-" }
                ]
              }
            ]
          },
          {
            series: [
              {
                name: "浏览器（数据纯属虚构）",
                type: "pie",
                data: [
                  { value: idx * 128 + 80, name: "Chrome" },
                  { value: idx * 64 + 160, name: "Firefox" },
                  { value: idx * 32 + 320, name: "Safari" },
                  { value: idx * 16 + 640, name: "IE9+" },
                  { value: idx++ * 8 + 1280, name: "IE8-" }
                ]
              }
            ]
          },
          {
            series: [
              {
                name: "浏览器（数据纯属虚构）",
                type: "pie",
                data: [
                  { value: idx * 128 + 80, name: "Chrome" },
                  { value: idx * 64 + 160, name: "Firefox" },
                  { value: idx * 32 + 320, name: "Safari" },
                  { value: idx * 16 + 640, name: "IE9+" },
                  { value: idx++ * 8 + 1280, name: "IE8-" }
                ]
              }
            ]
          },
          {
            series: [
              {
                name: "浏览器（数据纯属虚构）",
                type: "pie",
                data: [
                  { value: idx * 128 + 80, name: "Chrome" },
                  { value: idx * 64 + 160, name: "Firefox" },
                  { value: idx * 32 + 320, name: "Safari" },
                  { value: idx * 16 + 640, name: "IE9+" },
                  { value: idx++ * 8 + 1280, name: "IE8-" }
                ]
              }
            ]
          },
          {
            series: [
              {
                name: "浏览器（数据纯属虚构）",
                type: "pie",
                data: [
                  { value: idx * 128 + 80, name: "Chrome" },
                  { value: idx * 64 + 160, name: "Firefox" },
                  { value: idx * 32 + 320, name: "Safari" },
                  { value: idx * 16 + 640, name: "IE9+" },
                  { value: idx++ * 8 + 1280, name: "IE8-" }
                ]
              }
            ]
          },
          {
            series: [
              {
                name: "浏览器（数据纯属虚构）",
                type: "pie",
                data: [
                  { value: idx * 128 + 80, name: "Chrome" },
                  { value: idx * 64 + 160, name: "Firefox" },
                  { value: idx * 32 + 320, name: "Safari" },
                  { value: idx * 16 + 640, name: "IE9+" },
                  { value: idx++ * 8 + 1280, name: "IE8-" }
                ]
              }
            ]
          },
          {
            series: [
              {
                name: "浏览器（数据纯属虚构）",
                type: "pie",
                data: [
                  { value: idx * 128 + 80, name: "Chrome" },
                  { value: idx * 64 + 160, name: "Firefox" },
                  { value: idx * 32 + 320, name: "Safari" },
                  { value: idx * 16 + 640, name: "IE9+" },
                  { value: idx++ * 8 + 1280, name: "IE8-" }
                ]
              }
            ]
          },
          {
            series: [
              {
                name: "浏览器（数据纯属虚构）",
                type: "pie",
                data: [
                  { value: idx * 128 + 80, name: "Chrome" },
                  { value: idx * 64 + 160, name: "Firefox" },
                  { value: idx * 32 + 320, name: "Safari" },
                  { value: idx * 16 + 640, name: "IE9+" },
                  { value: idx++ * 8 + 1280, name: "IE8-" }
                ]
              }
            ]
          },
          {
            series: [
              {
                name: "浏览器（数据纯属虚构）",
                type: "pie",
                data: [
                  { value: idx * 128 + 80, name: "Chrome" },
                  { value: idx * 64 + 160, name: "Firefox" },
                  { value: idx * 32 + 320, name: "Safari" },
                  { value: idx * 16 + 640, name: "IE9+" },
                  { value: idx++ * 8 + 1280, name: "IE8-" }
                ]
              }
            ]
          }
        ]
      });
    }
  }
};
</script>