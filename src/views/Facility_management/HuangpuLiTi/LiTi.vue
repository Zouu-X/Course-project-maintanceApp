<template>
<div>
  <top-bar :page-title="pageTitle"/>
</div>
  <div>
    <van-cell-group>
      <van-cell title="设备名称" value="黄埔示范线立体库"></van-cell>
      <van-cell title="运行状态" value="运行中"></van-cell>
      <van-cell title="负责人" value="Zoe"></van-cell>
    </van-cell-group>
  </div>

  <div>
    <line-press/>
  </div>
  <div>
    <temp-wet/>
  </div>
</template>

<script>
import LinePress from "@/views/Facility_management/HuangpuLiTi/LinePress.vue";
import TempWet from "@/views/Facility_management/HuangpuLiTi/TempWet.vue";
import TopBar from "@/components/TopBar.vue";
export default {
  name: "LiTi",
  components: {
    LinePress,
    TempWet,
    TopBar
  },
  data() {
    return {
      pageTitle: "设备详情"
    }
  }
}
</script>

<style scoped>

</style>