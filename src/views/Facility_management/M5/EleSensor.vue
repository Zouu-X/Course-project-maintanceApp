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
  <div id="EleSensor"></div>
</template>

<script>
import axios from 'axios';
import * as echarts from 'echarts';

export default {
  name: 'EleSensor',
  data() {
    return {
      //chart: null,
      ch1: [],
      ch2: [],
      ch3: [],
      startDate: '2023-05-01 00:00:00',
      endDate: '2023-05-01 01:00:00',
      convertedStart: '',
      convertedEnd: '',
      activeCollapse: ['选择时间段'],
    };
  },
  computed: {
    xAxisData() {
      return Array.from({ length: this.ch1.length }, (_, i) => i);
    },
    chartData() {
      return {
        title: {
          text: '电流',
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
          formatter: function(params) {
            let result = '';
            for (let i = 0; i < params.length; i++) {
              let seriesName = params[i].seriesName;
              let value = params[i].value;
              result += seriesName + ': ' + value + '<br>';
            }
            return result;
          },
        },

        series: [
          {
            data: this.ch1,
            type: 'line',
            name: '相1',
            itemStyle: {
              color: 'blue',
            },
          },
          {
            data: this.ch2,
            type: 'line',
            name: '相2',
            itemStyle: {
              color: 'green',
            },
          },
          {
            data: this.ch3,
            type: 'line',
            name: '相3',
            itemStyle: {
              color: 'lightcoral',
            },
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
      const url = `http://10.112.6.250:8888/api/v1/sensor?dev_id=1000004700020003&begin_time=${beginTime}&end_time=${endTime}`;

      axios({
        method: 'GET',
        headers: {
          'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
        },
        url: url,
      }).then((res) => {
        for (let x = 0; x < res.data.data.rows.length; x++) {
          this.ch1.push(res.data.data.rows[x][1]);
          this.ch2.push(res.data.data.rows[x][2]);
          this.ch3.push(res.data.data.rows[x][3]);
        }
        console.log(res, this.ch1, this.ch2, this.ch3)
        // 在获取到数据后绘制折线图
        this.drawChart();
      });
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('EleSensor'));
      this.drawChart();
    },
  },
  mounted() {
    this.initChart();
    this.getData();
  },
};

</script>

<style scoped>
#EleSensor {
  height: 500px;
}
</style>
