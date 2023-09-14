
<template>
  <v-app>
    <v-main>

      <router-view/>
    </v-main>
  </v-app>

</template>

<script lang="ts">

import apiTest from "@/components/ApiTest.vue";
import MonitorTest from "@/views/monitor_page/MonitorTest.vue";
import RuXian from "@/views/monitor_page/monitor_details/RuXian.vue";

import { defineComponent } from 'vue'




export default defineComponent({
  components: {},
  name: 'App',

  data () {
    return {
      //
    }
  },
})
</script>
