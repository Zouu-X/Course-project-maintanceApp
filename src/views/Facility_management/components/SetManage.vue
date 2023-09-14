<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
        <v-card :color="card.color" dark @click="goToPage(card.title)">
          <v-img :src="card.src" class="white--text align-end" height="100px"></v-img>
          <v-card-text class="text-md-button" v-text="card.title"></v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>




<script>


export default {
  components: {},
  name: "SetManage",
  data: () => ({
    cards: [
      { title: '花都新工厂-机加线CNC M3内喷电机', src :'./images/工厂.png', flex: 12, path:'/M3' },
      { title: '花都新工厂-机加线CNC M5内喷电机', src :'./images/工厂.png', flex: 12, path:'/M5', color: '#607D8B' },
      { title: '花都新工厂-机加线工控机柜', src :'./images/工厂.png', flex: 12, path:'/huadu-kong' },
      { title: '"花都新工厂-机加线立体库机器人上下件左侧进气三联件出气"', src :'./images/工厂.png', flex: 12, path:'/chuqi', color: '#607D8B' },
      { title: '花都新工厂-机加线立体库', src :'./images/工厂.png', flex: 12, path:'/huadu-ku' },
      { title: '黄埔示范线靠近立体库机床的外置电机', src :'./images/工厂.png', flex: 12, path:'/elec', color: '#607D8B' },
      { title: '黄埔示范线立体库', src :'./images/工厂.png', flex: 12, path:'/huangpu-ku' },
      { title: '黄埔示范线旁边墙上工控机柜', src :'./images/工厂.png', flex: 12, path:'/huangpu-kong', color: '#607D8B' },



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

<style scoped>

</style>