<template>
  <div ref="myDiv" class="radar-echart" />
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},

  mounted() {
    this.initRadar()
  },

  methods: {
    initRadar() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.myDiv)
      // 绘制图表
      myChart.setOption({
        backgroundColor: '#fff',
        title: {
          text: '基础雷达图'
        },
        tooltip: {
          trigger: 'item'
        },
        radar: {
          // shape: 'circle',
          indicator: [
            { name: '考勤', max: 100 },
            { name: '技术', max: 100 },
            { name: '管理', max: 100 },
            { name: '分享', max: 100 },
            { name: 'bug', max: 100 },
            { name: '助人', max: 100 }
          ],
          axisName: {
            color: '#fff',
            backgroundColor: '#666',
            borderRadius: 3,
            padding: [3, 5]
          },
          splitLine: {
            lineStyle: {
              // color: [
              //   'rgba(238, 197, 102, 0.1)',
              //   'rgba(238, 197, 102, 0.2)',
              //   'rgba(238, 197, 102, 0.4)',
              //   'rgba(238, 197, 102, 0.6)',
              //   'rgba(238, 197, 102, 0.8)',
              //   'rgba(238, 197, 102, 1)'
              // ].reverse()
            }
          },
          splitArea: {
            show: true
          },
          axisLine: {
            lineStyle: {
              color: '#666'
            }
          }
        },
        series: [
          {
            name: 'Budget vs spending',
            type: 'radar',
            data: [
              {
                value: [69, 0, 0, 34, 67, 35],
                name: '张三',
                itemStyle: {
                  color: '#F9713C'
                },
                areaStyle: {
                  opacity: 0.1
                },
                type: 'radar'
              },
              {
                value: [50, 14, 28, 26, 42, 21],
                name: '李四',
                itemStyle: {
                  color: '#B3E4A1'
                },
                areaStyle: {
                  opacity: 0.05
                }
              }
            ]
          }
        ]
      })
    }
  },

  computed: {}
}
</script>

<style scoped lang="scss">
.radar-echart {
  width: 600px;
  height: 400px;
}
</style>
