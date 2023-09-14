<template>
  <div>
    <top-bar :page-title="pageTitle"/>
  </div>
    <div class="attendance-calendar">
      <div class="date-picker-container">
        <el-date-picker
          v-model="selectedDate"
          type="date"
          placeholder="Select date"
          @change="handleDateChange"
          :picker-options="pickerOptions"
        ></el-date-picker>
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
  
      <div class="calendar-container">
        <el-calendar
          v-model="selectedDate"
          :value="selectedDate"
          :range="false"
          :cell-class-name="setCellClassName"
          :range-state="rangeState"
        ></el-calendar>
      </div>
  
      <h3 class="attendance-log-title">打卡记录:</h3>
      <ul class="attendance-log-list">
        <li v-for="(log, index) in attendanceLog" :key="index" class="log-item">
          <span class="log-date">{{ formatDate(log.date) }}</span>
          <span class="log-time" v-if="log.clockIn">签到: {{ log.clockIn }}</span>
          <span class="log-time" v-if="log.clockOut">签退: {{ log.clockOut }}</span>
          <span class="log-status" :class="getStatusClass(log)">{{ getStatusText(log) }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import TopBar from "@/components/TopBar.vue";
  export default {
    components: {TopBar},
    data() {
      return {
        pageTitle: '打卡签到',
        selectedDate: null,
        attendanceLog: [],
        markedDates: [],
        rangeState: {}
      };
    },
    created() {
      this.attendanceLog.push(
        { date: '2023/05/01', clockIn: '09:00 AM', clockOut: '05:00 PM' },
        { date: '2023/05/05', clockIn: '08:30 AM', clockOut: '04:30 PM' },
        { date: '2023/05/10', clockIn: '09:15 AM', clockOut: '05:15 PM' }
      );
  
      this.markedDates = this.attendanceLog.map(log => log.date);
      this.updateRangeState();
    },
    computed: {
      isClockedIn() {
        const selectedLog = this.attendanceLog.find(log => log.date === this.selectedDate);
        return selectedLog && selectedLog.clockIn && !selectedLog.clockOut;
      },
      pickerOptions() {
        return {
          disabledDate: this.isDateDisabled
        };
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
        this.updateRangeState();
      },
      handleClockOut() {
        const selectedLog = this.attendanceLog.find(log => log.date === this.selectedDate);
        if (selectedLog) {
          selectedLog.clockOut = this.getCurrentTime();
        }
        this.updateRangeState();
      },
      getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString();
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
        return this.rangeState[formattedDate];
      },
      handleCellClick({ date }) {
        this.selectedDate = date;
      },
      updateRangeState() {
        this.rangeState = {};
        this.attendanceLog.forEach(log => {
          const { date, clockIn, clockOut } = log;
          const formattedDate = this.formatDate(date);
          if (clockIn && clockOut) {
            this.rangeState[formattedDate] = 'clockOut';
          } else if (clockIn && !clockOut) {
            this.rangeState[formattedDate] = 'clockIn';
          }
        });
      }
    }
  };
  </script>
  
  
  <style scoped>
  .attendance-calendar {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .date-picker-container {
    margin-bottom: 20px;
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
  
  .calendar-container {
    max-height: 400px;
    overflow-y: auto;
  }
  
  .attendance-log-title {
    margin-top: 20px;
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
  
  .marked-cell-clockIn::before {
    background-color: red;
  }
  
  .marked-cell-clockOut::before {
    background-color: green;
  }
  </style>
  