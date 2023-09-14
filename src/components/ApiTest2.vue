<template>
  <div>
    <button @click="getData">获取数据</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ApiTest2",
  data() {
    return {
      movedata: [],
    };
  },

  methods: {
    getData() {
      axios({
        method: 'GET',
        headers: {
          'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)'
        },
        url: 'http://10.112.6.250:8888/api/v1/sensor?dev_id=1000004700040003&begin_time=1679393271064000000&end_time=1679393371065000000',
      })
          .then(res => {
            for (let x = 0; x < 51; x++) {
              this.movedata.push(res.data.data.rows[x][1]);
            }
            console.log(this.movedata);
          })
    }

  }
}
</script>


<style scoped>

</style>
