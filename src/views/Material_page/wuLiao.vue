<template>
  <div>
    <top-bar :page-title="pageTitle"/>
  </div>
    <v-container class="page-container">
      <v-row>
        <v-col cols="8">
          <v-text-field v-model="filter" label="输入工单号搜索"></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-btn color="primary" @click="dialog = true">添加物料</v-btn>
        </v-col>
      </v-row>
      <v-row class="card-row">
        <v-col v-for="card in filteredCards" :key="card.id" cols="12" md="6" lg="4">
          <v-card class="card">
            <v-card-title class="card-title">{{ card.title }}</v-card-title>
            <v-card-text>
              <template v-if="!isEditing(card)">
                <hr class="line-2">
                <p>
                    <span class="label">工单号：</span>
                    <span class="id">{{ card.id }}</span>
                </p>
                <hr class="line-1">
                <p>
                    <span class="label">型号：</span>
                    <span class="id">{{ card.type }}</span>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span class="label">数量：</span>
                    <span class="id">{{ card.number }}</span>
                </p>
                <hr class="line-1">
                <p>
                    <span class="label">填写人：</span>
                    <span class="id">{{ card.name }}</span>
                </p>
                <hr class="line-1">
              </template>
              <template v-else>
                <v-text-field v-model="editedCard.id" label="工单号"></v-text-field>
                <v-text-field v-model="editedCard.title" label="物料名"></v-text-field>
                <v-text-field v-model="editedCard.type" label="型号"></v-text-field>
                <v-text-field v-model="editedCard.number" label="数量"></v-text-field>
                <v-text-field v-model="editedCard.name" label="填写人"></v-text-field>
              </template>
            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" @click="editCard(card)">编辑</v-btn>
              <v-btn color="error" @click="deleteCard(card)">删除</v-btn>
              <v-btn color="green" v-if="isEditing(card)" @click="saveCard">保存</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6" lg="4">
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title class="headline">添加新工单</v-card-title>
              <v-card-text>
                <v-text-field v-model="newCard.id" label="工单号"></v-text-field>
                <v-text-field v-model="newCard.title" label="物料名"></v-text-field>
                <v-text-field v-model="newCard.type" label="型号"></v-text-field>
                <v-text-field v-model="newCard.number" label="数量"></v-text-field>
                <v-text-field v-model="newCard.name" label="填写人"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">取消</v-btn>
                <v-btn color="blue darken-1" text @click="addNewCard">确定</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  
  <script>
  import TopBar from "@/components/TopBar.vue";
  export default {
    components: {TopBar},
    data() {
      return {
        pageTitle: "物料管理",
        cards: [
          { id: 1, title: '螺母', type: '3号', number: '4', name: 'Charly' },
          { id: 2, title: '螺丝', type: '2号', number: '7', name: 'Jason' },
          { id: 3, title: '轴承', type: '1号', number: '2', name: 'Jerry' },
          { id: 4, title: '弹簧', type: '6号', number: '1', name: 'MNJ' },
        ],
        filter: '',
        editedCard: {},
        dialog: false,
        newCard: {
          title: '',
          type: '',
          number: '',
          name: ''
        }
      }
    },
    computed: {
      filteredCards() {
        return this.cards.filter(card => card.id.toString().includes(this.filter))
      }
    },
    methods: {
      editCard(card) {
        this.editedCard = { ...card }
      },
      isEditing(card) {
        return card.id === this.editedCard.id
      },
      saveCard() {
        const index = this.cards.findIndex(card => card.id === this.editedCard.id)
        this.cards.splice(index, 1, { ...this.editedCard })
        this.editedCard = {}
      },
      deleteCard(card) {
        const index = this.cards.findIndex(c => c.id === card.id)
        this.cards.splice(index, 1)
      },
      addNewCard() {
        const newId = this.cards.length + 1
        const newCard = { id: newId, ...this.newCard }
        this.cards.push(newCard)
        this.newCard = { title: '', text: '' }
        this.dialog = false
      }
    }
  }
</script> 

<style>
  .card-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 10px;
    color: rgb(0, 0, 131);
  }

  .card-text {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .card-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .card-actions button {
    font-size: 14px;
    font-weight: bold;
    padding: 10px 20px;
  }

  .card-actions button:first-child {
    margin-right: 10px;
  }

  .dialog-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .dialog-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }

  .dialog-actions button {
    font-size: 14px;
    font-weight: bold;
    padding: 10px 20px;
  }

  .dialog-actions button:first-child {
    margin-right: 10px;
  }

  .label {
    color: black;
    font-weight: bold;
  }

  .id {
    color: rgb(0, 0, 131); /* 工单号对应的ID颜色为蓝色 */
  }

  .line-1 {
  border: none;
  border-top: 2px dashed #ccc;
  margin: 10px 0;
  }

  .line-2{
    margin: 10px 0;
  }


</style>
