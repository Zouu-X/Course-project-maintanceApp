<template>
  <div>
    <PicSwiper/>
  </div>
  <v-container fluid>
    <v-row dense>
      <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
      >
        <v-card
            style="background-color: #E8EAF6;"
            dark
            @click="goToPage(card.title)"
        >
          <v-img
              :src="card.src"
              class="white--text align-end"
              height="100px"
          ></v-img>
          <v-card-text class="text-md-button" v-text="card.title"></v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PicSwiper from "@/components/PicSwiper.vue";
export default {
  components:{PicSwiper},
  data: () => ({
    cards: [
      { title: '设备管理', src :'./images/sets.png', flex: 6, path: '/facility' },
      { title: '产线监控', src :'./images/监控.png', flex: 6, path: '/monitor' },
      { title: '物料管理', src :'./images/material.png', flex: 6, path: '/material' },
      { title: '打卡', src :'./images/tick.png', flex: 6, path: '/checkin' },
      { title: '工人管理', src :'./images/worker.png', flex: 6, path: '/personnel' },
      { title: '消息中心', src :'./images/msg.png', flex: 6, path: '/message' },
    ]
  }),
  methods: {
    goToPage(title) {
      const card = this.cards.find(c => c.title === title);
      this.$router.push(card.path);
    }
  }
}
</script>
