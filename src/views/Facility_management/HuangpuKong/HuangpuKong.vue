<template>
  <div>
    <top-bar :page-title="pageTitle"/>
  </div>
  <div>
    <van-cell-group>
      <van-cell title="设备名称" value="黄埔示范线旁边墙上工控机柜"></van-cell>
      <van-cell title="运行状态" value="运行中"></van-cell>
      <van-cell title="负责人" value="Zoe"></van-cell>
    </van-cell-group>
  </div>

  <div>
    <temp-wet/>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import TempWet from "@/views/Facility_management/HuangpuKong/TempWet.vue";
export default {
  components: {
    TopBar,
    TempWet

  },
  name: "HuangpuKong",
  data() {
    return {
      pageTitle: "设备详情"
    }
  }
}
</script>

<style scoped>

</style>