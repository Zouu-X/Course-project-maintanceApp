<template>
  <div>
    <top-bar :page-title="pageTitle"/>
  </div>
  <div class="attendance-page">
    <div class="date-picker-container">
      <el-date-picker
        v-model="selectedDate"
        type="date"
        placeholder="Select date"
        @change="handleDateChange"
      ></el-date-picker>
    </div>

    <div class="calendar-container">
      <el-calendar
        v-model="selectedDate"
        :value="selectedDate"
        :range="false"
        :cell-class-name="setCellClassName"
        @cell-click="handleCellClick"
      ></el-calendar>
    </div>

    <div class="button-row">
      <el-button type="primary" class="clock-in-btn" @click="handleClockIn" :disabled="isClockedIn">
        签到
      </el-button>
    </div>

    <div class="button-row">
      <el-button type="success" class="clock-out-btn" @click="handleClockOut" :disabled="!isClockedIn">
        签退
      </el-button>
    </div>

    <div class="attendance-log">
      <h3 class="attendance-log-title">打卡记录:</h3>
      <ul class="attendance-log-list">
        <li v-for="(log, index) in attendanceLog" :key="index" class="log-item">
          <span class="log-date">{{ log.date }}</span>
          <span class="log-time" v-if="log.clockIn">签到: {{ log.clockIn }}</span>
          <span class="log-time" v-if="log.clockOut">签退: {{ log.clockOut }}</span>
          <span class="log-status" :class="getStatusClass(log)">{{ getStatusText(log) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import TopBar from "@/components/TopBar.vue";

export default {
  components: {TopBar},
  data() {
    return {
      pageTitle: "打卡",
      selectedDate: null,
      attendanceLog: []
    };
  },
  computed: {
    isClockedIn() {
      const selectedLog = this.attendanceLog.find(log => log.date === this.selectedDate);
      return selectedLog && selectedLog.clockIn && !selectedLog.clockOut;
    }
  },
  methods: {
    handleDateChange(date) {
      const selectedLog = this.attendanceLog.find(log => log.date === date);
      if (selectedLog && !selectedLog.clockOut) {
        this.selectedDate = null;
      }
    },
    handleClockIn() {
      const selectedLog = this.attendanceLog.find(log => log.date === this.selectedDate);
      if (selectedLog) {
        selectedLog.clockIn = this.getCurrentTime();
      } else {
        this.attendanceLog.push({
          date: this.selectedDate,
          clockIn: this.getCurrentTime(),
          clockOut: null
        });
      }
    },
    handleClockOut() {
      const selectedLog = this.attendanceLog.find(log => log.date === this.selectedDate);
      if (selectedLog) {
        selectedLog.clockOut = this.getCurrentTime();
      }
    },
    getCurrentTime() {
      const now = new Date();
      return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    },
    getStatusClass(log) {
      if (log.clockIn && !log.clockOut) {
        return 'status-pending';
      } else if (log.clockIn && log.clockOut) {
        return 'status-complete';
      } else {
        return '';
      }
    },
    getStatusText(log) {
      if (log.clockIn && !log.clockOut) {
        return '上班中';
      } else if (log.clockIn && log.clockOut) {
        return '下班！';
      } else {
        return '';
      }
    },
    setCellClassName({ date }) {
      const formattedDate = this.formatDate(date);
      if (this.markedDates.includes(formattedDate)) {
        return 'marked-cell';
      }
      return '';
    },
    handleCellClick({ date }) {
      this.selectedDate = date;
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    }
  }
};
</script>

<style scoped>
.attendance-page {
  max-width: 400px;
  margin: 0 auto;
}

.date-picker-container {
  margin-bottom: 20px;
}

.calendar-container {
  max-height: 400px;
  overflow-y: auto;
}

.button-row {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.clock-in-btn,
.clock-out-btn {
  width: 200px;
}

.attendance-log {
  margin-top: 20px;
}

.attendance-log-title {
  margin-bottom: 10px;
}

.attendance-log-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.log-item {
  margin-bottom: 10px;
}

.log-date {
  font-weight: bold;
}

.log-time {
  margin-left: 10px;
  color: #888;
}

.log-status {
  margin-left: 10px;
  font-weight: bold;
}

.status-pending {
  color: orange;
}

.status-complete {
  color: green;
}

.marked-cell {
  position: relative;
}

.marked-cell::before {
  content: '';
  position: absolute;
  top: 5px;
  right: 5px;
  width: 6px;
  height: 6px;
  background-color: red;
  border-radius: 50%;
}
</style>
