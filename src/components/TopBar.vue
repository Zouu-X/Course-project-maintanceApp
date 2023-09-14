<template>
  <v-container class="topBar-container">
    <v-row align="center" no-gutters>
      <v-col class="text-center" cols="3">
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left-bold</v-icon>
        </v-btn>
      </v-col>
      <v-col class="text-center" cols="6">
        <div class="headline font-weight-bold">
          {{ pageTitle }}
        </div>
      </v-col>
      <v-col class="text-center" cols="3">
        <v-btn icon @click="home">
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.text-center {
  text-align: center;
}
.font-weight-bold {
  font-weight: bold;
}
</style>

<script>
export default {
  name: 'topBar',
  props: {
    pageTitle: {
      type: String,
      required: true
    }
  },
  // 数据区域
  data() {
    return {

    }
  },
  // 组件初始化前的准备操作，在此处执行
  created() {
    // 事件监听，this.$bus.$on事件一般在此处定义

    // 初始数据载入

  },
  // 组件初始化后需要进行的操作，在此处执行
  mounted() {
    // 组件渲染，传递参数，this.$bus.$emit

  },
  // JS方法
  methods: {
    goBack() {
      this.$router.back()
    },
    home() {
      if (this.$route.path !== '/') {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style scoped>
.topBar-container {
  background-color: steelblue;
}

.text-center {
  text-align: center;
}

.font-weight-bold {
  font-weight: bold;
}
</style>