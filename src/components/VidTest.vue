<template>
  <div>
    <video controls>
      <source :src="videoUrl" type="video/mp4">
    </video>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      videoUrl: '',
    };
  },
  methods: {
    getVideo() {
      axios({
        method: 'get',
        url: 'http://10.112.6.250:8888/api/v2/video',
        headers: {
          'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)'
        },
        responseType: 'blob',
      })
          .then((response) => {
            console.log(response);
            const url = URL.createObjectURL(response.data);
            this.videoUrl = url;
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
  mounted() {
    this.getVideo();
  },
};
</script>