<template>
  <van-swipe autoplay="3000" :loop="true" height="300px">
    <van-swipe-item v-for="(image, index) in images" :key="index">
      <img :src="getImageUrl(image)" class="carousel-image" />
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  data() {
    return {
      images: ['images/band.jpg', 'images/news.jpg', 'images/announcement.jpg'],
      // Place the images in the "public/images" directory
    };
  },
  methods: {
    getImageUrl(image) {
      return process.env.BASE_URL + image;
    },
  },
  name: 'PicSwiper',
};
</script>

<style scoped>
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
