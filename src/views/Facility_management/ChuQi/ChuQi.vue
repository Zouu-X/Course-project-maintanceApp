<template>
<div>
  <top-bar :page-title="pageTitle"/>
</div>
  <div>
    <van-cell-group>
      <van-cell title="设备名称" value="花都新工厂-机加线立体库机器人上下件左侧进气三联件出气"></van-cell>
      <van-cell title="运行状态" value="运行中"></van-cell>
      <van-cell title="负责人" value="Zoe"></van-cell>
    </van-cell-group>
  </div>
  <div>
    <line-press/>
  </div>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import LinePress from "@/views/Facility_management/ChuQi/LinePress.vue";
export default {
  components: {
    TopBar,
    LinePress
  },
  name: "ChuQi",
  data() {
    return {
      pageTitle: "设备详情",
    };
  }
}
</script>

<style scoped>

</style>