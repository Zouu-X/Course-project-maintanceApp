<template>
  <div>
    <top-bar :page-title="pageTitle"/>
  </div>
  <div>
    <van-cell-group>
      <van-cell title="设备名称" value="花都新工厂-机加线CNC M3内喷电机	"></van-cell>
      <van-cell title="运行状态" value="运行中"></van-cell>
      <van-cell title="负责人" value="Chen"></van-cell>
    </van-cell-group>
  </div>

  <div>
    <temp-test/>
    </div>
  <div>
    <move-test/>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import TempTest from "@/views/Facility_management/M3/TempTest.vue";
import MoveTest from "@/views/Facility_management/M3/MoveTest.vue";

export default {
  name: 'MTest',
  components: {
    TempTest,
    TopBar,
    MoveTest
  },
  data() {
    return{
      pageTitle: "设备详情"
    }
  }

};
</script>
