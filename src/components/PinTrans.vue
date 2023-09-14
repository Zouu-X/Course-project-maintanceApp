<template>
  <v-container>
    <van-collapse v-model="activeCollapse">
      <van-collapse-item title="时间戳转换器">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
                v-model="startDate"
                label="开始时间"
                placeholder="YYYY-MM-DD HH:mm:ss"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
                v-model="endDate"
                label="结束时间"
                placeholder="YYYY-MM-DD HH:mm:ss"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-button @click="convertTimestamps" type="primary">转换</v-button>
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
</template>

<script>
export default {
  data() {
    return {
      startDate: '',
      endDate: '',
      convertedStart: '',
      convertedEnd: '',
      activeCollapse: ['时间戳转换器'],
    };
  },
  computed: {
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

      } else {
        this.convertedStart = '';
        this.convertedEnd = '';
      }
    },
  },
};
</script>
