<template>
  <div>
    <top-bar :page-title="pageTitle"/>
  </div>
    <v-container>
      <v-row>
        <v-col cols="8">
          <v-text-field v-model="filter" label="输入人名搜索"></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-btn color="primary" @click="dialog = true">添加人员信息</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="card in filteredCards" :key="card.id" cols="12" md="6" lg="4">
          <v-card>
            <v-row>
                 <v-col cols="6">
                     
                 </v-col>
                <v-col cols="6">
                     <v-img :src="card.photo"></v-img>
                </v-col>
            </v-row>
            <v-card-text>
                <template v-if="!isEditing(card)">
                    <hr class="line-3">
                    <p>
                        <span class="label">员工号：</span>
                        <span class="id">{{ card.id }}</span>
                    </p>
                    <hr class="line-2">
                    <p>
                        <span class="label">姓名：</span>
                        <span class="id">{{ card.name }}</span>
                    </p>
                    <hr class="line-2">
                    <p>
                        <span class="label">性别：</span>
                        <span class="id">{{ card.gender }}</span>
                    </p>
                    <hr class="line-2">
                    <p>
                        <span class="label">手机号码：</span>
                        <span class="id">{{ card.Phonenumber }}</span>
                    </p>
                    <hr class="line-2">
                    <p>
                        <span class="label">身份证号：</span>
                        <span class="id">{{ card.IDnumber }}</span>
                    </p>
                    <hr class="line-2">
                    <p>
                        <span class="label">工种：</span>
                        <span class="id">{{ card.job }}</span>
                    </p>
                    <hr class="line-2">
                    <p>
                        <span class="label">现住址：</span>
                        <span class="id">{{ card.address }}</span>
                    </p>
                    <hr class="line-2">
                </template>
                <template v-else>
                     <v-text-field v-model="editedCard.id" label="员工号"></v-text-field>
                     <v-text-field v-model="editedCard.name" label="姓名"></v-text-field>
                     <v-select v-model="editedCard.gender" :items="['男','女']" label="性别"></v-select>
                     <v-text-field v-model="editedCard.Phonenumber" label="手机号码"></v-text-field>
                     <v-text-field v-model="editedCard.IDnumber" label="身份证号"></v-text-field>
                     <v-select v-model="editedCard.job" :items="['工人','经理']" label="工种"></v-select>
                     <v-text-field v-model="editedCard.address" label="现住址"></v-text-field>
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
              <v-card-title class="headline">添加新卡片</v-card-title>
              <v-card-text>
                <v-text-field v-model="newCard.id" label="员工号"></v-text-field>
                <v-text-field v-model="newCard.name" label="姓名"></v-text-field>
                <v-select v-model="editedCard.gender" :items="['男','女']" label="性别"></v-select>
                <v-text-field v-model="newCard.Phonenumber" label="手机号码"></v-text-field>
                <v-text-field v-model="newCard.IDnumber" label="身份证号"></v-text-field>
                <v-select v-model="editedCard.job" :items="['工人','经理']" label="工种"></v-select>
                <v-text-field v-model="editedCard.address" label="现住址"></v-text-field>
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
    components: {
      TopBar
    },
    data() {
      return {
        pageTitle:"人员管理",
        cards: [
          { id: 1, name: 'Liang', gender: '男', Phonenumber: '110', IDnumber: '123', job: '工人', address: '1', photo: './head-img/1.jpg' },
          { id: 2, name: 'Zou', gender: '男', Phonenumber: '120', IDnumber: '456', job: '工人', address: '2', photo: './head-img/2.jpg' },
          { id: 3, name: 'Chen', gender: '男', Phonenumber: '119', IDnumber: '789', job: '工人', address: '3', photo: './head-img/3.jpg' },
          { id: 4, name: 'Ma', gender: '女', Phonenumber: '999', IDnumber: '789', job: '经理', address: '4', photo: './head-img/4.jpg' },
        ],
        filter: '',
        editedCard: {},
        dialog: false,
        newCard: {
            id: '',
            name: '',
            gender: '',
            Phonenumber: '',
            IDnumber: '',
            job: '',
            address: '',
            photo: ''
        }
      }
    },
    computed: {
      filteredCards() {
        return this.cards.filter(card => card.name.toString().includes(this.filter))
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
  width: 38%;
  }

  .line-2 {
  border: none;
  border-top: 2px dashed #ccc;
  margin: 10px 0;
  }

  .line-3{
    width: 38%;
    margin: 10px 0;
  }


</style>