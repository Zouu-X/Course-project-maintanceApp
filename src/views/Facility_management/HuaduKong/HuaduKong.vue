<template>
<div>
  <top-bar :page-title="pageTitle"/>
</div>
  <div>
    <van-cell-group>
      <van-cell title="设备名称" value="花都新工厂-机加线工控机柜"></van-cell>
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
import TempWet from "@/views/Facility_management/HuaduKong/TempWet.vue";
export default {
  components: {
    TopBar,
    TempWet

  },
  name: "HuaduKong",
  data() {
    return{
      pageTitle: "设备详情"
    }
  }
}
</script>

<style scoped>

</style>