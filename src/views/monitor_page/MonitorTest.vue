<template>
  <div>
<top-bar :page-title="pageTitle"/>
  </div>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-timeline dense>
          <v-timeline-item
              dot-color="blue"
              v-for="(technique, index) in techniques"
              :key="technique.techniqueId"
              @click="goToDetailPage(index)"
              :ripple="false"
              style="cursor: pointer"
          >
            <template v-slot:icon>
              <span>{{ index + 1 }}</span>
            </template>
          </v-timeline-item>
        </v-timeline>
      </v-col>

      <v-col cols="9">
        <v-row>
          <v-col v-for="(technique, index) in techniques" :key="index" cols="10">
            <v-card @click="goToDetailPage(index)" :ripple="false" style="cursor: pointer">
              <v-card-title class="headline">{{ technique.techniqueName }}</v-card-title>
              <v-card-subtitle>ID：{{ technique.techniqueId }}</v-card-subtitle>
              <!-- 这里是卡片的详细信息内容 -->
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

import TopBar from "@/components/TopBar.vue";
export default {
  components: {TopBar},
  data() {
    return {
      pageTitle:"产线监控",
      techniques: []
    };
  },
  mounted() {
    this.getData();
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
            // 根据返回的数据进行处理
            for (let x = 0; x < 12; x++) {
              const technique = {
                techniqueName: res.data.data[x].techniqueName,
                techniqueId: res.data.data[x].techniqueId
              };
              this.techniques.push(technique);
            }
          })
          .catch(error => {
            console.error(error);
          });
    },
    getTimelineColor(index) {
      // 根据索引返回时间线项的颜色
      // 这里可以自定义颜色逻辑，例如根据不同索引返回不同颜色
      return index % 2 === 0 ? 'primary' : 'accent';
    },
    goToDetailPage(index) {
      // 跳转到详情页面
      const techniqueId = this.techniques[index].techniqueId;
      this.$router.push(`/linkx`);
    }
  }
};
</script>
