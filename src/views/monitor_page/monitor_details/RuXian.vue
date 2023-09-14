<template>
  <div>
    <top-bar :page-title="pageTitle"></top-bar>
  </div>
  <v-container fluid>
    <!-- 顶部图片 -->
    <v-img
        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.dDuAsYRCcdYRhVwZSSP6tQHaFB%26pid%3DApi&f=1&ipt=ab15813698a73f736831159ecdd9345245ee4946c8d0056bc24733a49cab414f&ipo=images"
        height="400"
        width="100%"
        contain
    ></v-img>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        检测
      </th>
      <th class="text-left">
        结果
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="item in issues"
        :key="item.name"
    >
      <td>{{ item.name }}</td>
      <td>{{ item.result }}</td>
    </tr>
    </tbody>
  </v-table>
    </v-container>
</template>

<script>
import TopBar from "@/components/TopBar.vue";
export default {
  components: {TopBar},
  data() {
    return {
      pageTitle:"产线详情",
      issues: [
        {
          name: '工人数量',
          result: 2,
        },
        {
          name: '是否正确佩戴安全帽',
          result: "是",
        },
        {
          name: '操作是否规范',
          result: "是",
        },

      ],
    };
  },
};
</script>
