<template>
<top-bar :page-title="pageTitle"/>
  <SetManage/>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
import SetManage from "@/views/Facility_management/components/SetManage.vue";

export default {
  name: "InDex",
  components: {SetManage, TopBar},
  data() {
    return{
      pageTitle: "设备详情"
    }
  }
}
</script>

<style scoped>

</style>