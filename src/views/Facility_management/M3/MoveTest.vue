<template>
  <v-container>
    <van-collapse v-model="activeCollapse">
      <van-collapse-item title="选择时间段">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
                v-model="startDate"
                label="开始时间"
                placeholder="YYYY-MM-DD HH:mm:ss"
                clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
                v-model="endDate"
                label="结束时间"
                placeholder="YYYY-MM-DD HH:mm:ss"
                clearable
            ></v-text-field>
          </v-col>
        </v-row>
        <v-button @click="convertTimestamps" type="primary">确认</v-button>
        <v-divider></v-divider>
        <v-row v-if="convertedStart || convertedEnd">
          <v-col cols="12" sm="6">
            <h3>开始时间戳:</h3>
            <p>{{ paddedStartTimestamp }}</p>
          </v-col>
          <v-col cols="12" sm="6">
            <h3>结束时间戳:</h3>
            <p>{{ paddedEndTimestamp }}</p>
          </v-col>
        </v-row>
      </van-collapse-item>
    </van-collapse>
  </v-container>
  <div id="Move"></div>
  <div>
    <h3 v-if="movedata.length > 0">最大值: <span style="color: red">{{ getMaxValue() }}</span></h3>
    <h3 v-if="movedata.length > 0">最小值: <span style="color: goldenrod">{{ getMinValue() }}</span></h3>
    <h3 v-if="movedata.length > 0">平均值: <span style="color: blue">{{ getAverageValue() }}</span></h3>
    <h3 v-if="movedata.length === 0">最大值: 无</h3>
    <h3 v-if="movedata.length === 0">最小值: 无</h3>
    <h3 v-if="movedata.length === 0">平均值: 无</h3>
  </div>
</template>

<script>
import axios from 'axios';
import * as echarts from 'echarts';

export default {
  name: 'MoveTest',
  data() {
    return {

      movedata: [],
      startDate: '2023-05-01 00:00:00',
      endDate: '2023-05-01 01:00:00',
      convertedStart: '',
      convertedEnd: '',
      activeCollapse: ['选择时间段'],
    };
  },
  computed: {
    xAxisData() {
      return Array.from({ length: this.movedata.length }, (_, i) => i);
    },
    chartData() {
      return {
        title: {
          text: '位移',
          left: 'center', // 将标题置于图表中央
          top: '0', // 上方位置
        },
        grid: {
          top: '15%', // 格子上方位置，防止被标题遮挡
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: this.xAxisData,
        },
        yAxis: {
          type: 'value',
        },
        tooltip: {
          trigger: 'axis',
          formatter: '{b}: {c}', // 显示数据的格式
        },
        series: [
          {
            data: this.movedata,
            type: 'line',
          },
        ],
      };
    },
    paddedStartTimestamp() {
      return this.convertedStart.padEnd(19, '0');
    },
    paddedEndTimestamp() {
      return this.convertedEnd.padEnd(19, '0');
    },
  },
  methods: {
    convertTimestamps() {
      if (this.startDate && this.endDate) {
        const startTimestamp = Date.parse(this.startDate) / 1000;
        const endTimestamp = Date.parse(this.endDate) / 1000;
        this.convertedStart = startTimestamp.toString();
        this.convertedEnd = endTimestamp.toString();

        // 重新请求数据和绘制图表
        this.getData();
      } else {
        this.convertedStart = '';
        this.convertedEnd = '';
      }
    },
    drawChart() {
      this.chart.setOption(this.chartData);
    },
    // 获取 API 数据
    getData() {
      const beginTime = this.convertedStart.padEnd(19, '0');
      const endTime = this.convertedEnd.padEnd(19, '0');
      const url = `http://10.112.6.250:8888/api/v1/sensor?dev_id=1000004700040003&begin_time=${beginTime}&end_time=${endTime}`;

      axios({
        method: 'GET',
        headers: {
          'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
        },
        url: url,
      }).then((res) => {
        for (let x = 0; x < res.data.data.rows.length; x++) {
          this.movedata.push(res.data.data.rows[x][1]);}

        // 在获取到数据后绘制折线图
        this.drawChart();
      });
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('Move'));
      this.drawChart();
    },
    getMaxValue() {
      if (this.movedata.length > 0) {
        return Math.max(...this.movedata);
      } else {
        return '无';
      }
    },
    getMinValue() {
      if (this.movedata.length > 0) {
        return Math.min(...this.movedata);
      } else {
        return '无';
      }
    },
    getAverageValue() {
      if (this.movedata.length > 0) {
        const sum = this.movedata.reduce((acc, cur) => acc + cur, 0);
        return (sum / this.movedata.length).toFixed(2);
      } else {
        return '无';
      }
    },
  },
  mounted() {
    this.initChart();
    this.getData();
  },
};
</script>

<style scoped>
#Move {
  height: 500px;
}
</style>
