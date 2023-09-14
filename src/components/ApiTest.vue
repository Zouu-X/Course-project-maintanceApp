<template>
  <div>
    <button @click="getData">获取数据</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ApiTest",
  data() {
    return {
      tempdata: [],
    };
  },

  methods: {
    getData() {
      axios({
        method: 'GET',
        headers: {
          'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)'
        },
        url: 'http://10.112.6.250:8888/static/mino.json',
      })
          .then(res => {

            console.log(res);
          })
    }

  }
}
</script>


<style scoped>

</style>
