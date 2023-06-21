<script setup>
import { getCurrentInstance, onMounted, ref } from 'vue';
import { useMsgDataStore } from '../../../store/MsgData.js';

// 引入echarts
const { $echarts } = getCurrentInstance().appContext.config.globalProperties
const msgInfo = useMsgDataStore()

const box = ref('box')

const init = () => {

  const myChart = $echarts.init(box.value)
  msgInfo.getData()

  let data = {
    title: {
      text: '2023药品销售信息'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['中成药', '西药外用', '西药内用', '丸散膏', '西药注射']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '中成药',
        type: 'line',
        stack: 'Total',
        data: [120, 132, 101, 134, 90, 230, 210, 240, 220, 195, 188, 174]
      },
      {
        name: '西药外用',
        type: 'line',
        stack: 'Total',
        data: [220, 182, 191, 234, 290, 330, 310, 313, 325, 368, 355, 310]
      },
      {
        name: '西药内用',
        type: 'line',
        stack: 'Total',
        data: [150, 232, 201, 154, 190, 330, 410, 455, 468, 420, 433, 450]
      },
      {
        name: '丸散膏',
        type: 'line',
        stack: 'Total',
        data: [320, 332, 301, 334, 390, 330, 320, 378, 390, 400, 359, 370]
      },
      {
        name: '西药注射',
        type: 'line',
        stack: 'Total',
        data: [820, 932, 901, 934, 1290, 1330, 1320, 1350, 1400, 1200, 1230, 1300]
      }
    ]
  }

  myChart.setOption(data)
}

onMounted(() => {
  init()
})
</script>

<template>
  <div class="max-box">
    <input type="date">
    <div ref="box" :class="box"></div>
  </div>
</template>

<style>
.box {
  width: 1200px;
  height: 400px;
}

.max-box {
  margin: 100px 0 0 100px;
}
</style>