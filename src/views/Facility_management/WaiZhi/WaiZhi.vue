<template>
  <div>
    <top-bar :page-title="pageTitle"/>
  </div>
  <div>
    <van-cell-group>
      <van-cell title="设备名称" value="黄埔示范线靠近立体库机床的外置电机	"></van-cell>
      <van-cell title="运行状态" value="运行中"></van-cell>
      <van-cell title="负责人" value="Liang"></van-cell>
    </van-cell-group>
  </div>

  <div>
  <DisPlace/>
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
import DisPlace from "@/views/Facility_management/WaiZhi/DisPlace.vue";
import EleSensor from "@/views/Facility_management/WaiZhi/EleSensor.vue";
import IntenSity from "@/views/Facility_management/WaiZhi/IntenSity.vue";
import LineTemp from "@/views/Facility_management/WaiZhi/LineTemp.vue";
import TopBar from "@/components/TopBar.vue";
export default {
  name: "WaiZhi",
  components: {
    DisPlace,
    EleSensor,
    IntenSity,
    LineTemp,
    TopBar
  },
  data() {
    return{
      pageTitle: '设备详情'
    }
  }
}
</script>

<style scoped>

</style>