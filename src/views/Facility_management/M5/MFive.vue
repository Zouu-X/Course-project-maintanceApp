<template>
  <div>
    <top-bar :page-title="pageTitle"/>
  </div>
  <div>
    <van-cell-group>
      <van-cell title="设备名称" value="花都新工厂-机加线CNC M5内喷电机"></van-cell>
      <van-cell title="运行状态" value="运行中"></van-cell>
      <van-cell title="负责人" value="Zoe"></van-cell>
    </van-cell-group>
  </div>

  <div>
  <ele-sensor/>
</div>
  <div>
    <inten-sity/>
  </div>
  <div>
    <line-temp/>
  </div>
</template>

<script>

import EleSensor from "@/views/Facility_management/M5/EleSensor.vue";
import IntenSity from "@/views/Facility_management/M5/IntenSity.vue";
import LineTemp from "@/views/Facility_management/M5/LineTemp.vue";
import TopBar from "@/components/TopBar.vue";
export default {
  name: "MFive",
  components: {
    TopBar,
    EleSensor,
    IntenSity,
    LineTemp
  },
  data() {
    return{
      pageTitle: "设备详情"
    }
  }
}
</script>

<style scoped>

</style>