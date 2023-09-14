
<template>
  <div>
    <top-bar :page-title="pageTitle"/>
  </div>
    <v-card class="mx-auto" max-width="450">


        <v-list v-for='item,index in items' :key='index' item-props lines="three">
            <div @click="infoTipIcon(index, item.message)">
                <div class="info" v-html="item.subtitle"></div>  
                <div>
                    <div class="updateTime">{{ item.updateTime }}</div>
                    <div class="unreadResumeWarning" v-if="1 != this.flag[index]"></div>
                    <div class="divide"></div>
                </div>
                
            </div> 
        </v-list>
    </v-card>

    <button v-if="this.show==true" @click="getData">获取数据</button>

    <dialog-component v-if="Visiable" ref="dialog"></dialog-component>

</template>


<script>
import EventEmitter from 'events';
import dialogComponent from './dialogComponent.vue';
import TopBar from "@/components/TopBar.vue";
/* eslint-disable */

export default {
    name: 'xiaoXiZhongXin',
    components:{
      TopBar,
        dialogComponent,
    },
    data: () => ({
      pageTitle: "消息中心",
        Visiable: false,
        show: true,
        items: [
            
        ],

        message:[],

        flag: [],

        url: 'http://47.97.219.99:8018/cloudForm/getAllFormByUid/2',

    }),

    methods: {
        infoTipIcon: function(index,info){
            this.flag[index] = 1;
            this.Visiable = true;
            this.$nextTick(() => {
                //这里的dialog与上面dialog-component组件里面的ref属性值是一致的
                //init调用的是dialog-component组件里面的init方法
                //data是传递给弹窗页面的值
                this.$refs.dialog.init(info);
            })
        },

        getData() {
            // 数据API
            var httpRequest = new XMLHttpRequest()
            // URL填写
            // 请求方法
            httpRequest.open('GET', this.url)
            // 请求头
            httpRequest.setRequestHeader(
                'Content-Type',
                'application/x-www-form-urlencoded'
            )
            var _this = this
            // 请求参数
            httpRequest.send()
            httpRequest.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    const result = JSON.parse(httpRequest.responseText)
                    // 返回结果
                    console.log(result)

                    for(var i=0; i< result.data.length; i++){
                        _this.items.push({
                            'submitPeople': '',
                            'describe': '',
                            'deviceName': '',
                            'devicePosition': '',
                            'maintenance': '',
                            'updateTime': '',
                            'message': '',
                            'subtitle': '',
                        });
                        console.log(result.data[i]['form']['submitPeople']);

                        _this.items[i]['submitPeople'] = result.data[i]['form']['submitPeople']
                        _this.items[i]['deviceName'] = result.data[i]['form']['deviceName']
                        _this.items[i]['describe'] = result.data[i]['form']['describe']
                        _this.items[i]['maintenance'] = result.data[i]['form']['maintenance']
                        _this.items[i]['devicePosition'] = result.data[i]['form']['devicePosition']

                        _this.items[i]['updateTime'] = result.data[i]['updateTime']

                        _this.items[i]['subtitle'] = '<span class="text-primary">'
                                                        + _this.items[i]['submitPeople']
                                                        + '</span> &mdash;'
                                                        + _this.items[i]['describe']
                        
                        _this.items[i]['message'] = [ '维护人员：' + _this.items[i]['maintenance'], 
                                                        '任务：' + _this.items[i]['describe'] ]
                                                       
                    }

                    
                }else{
                    console.log('error')
                }
            }
            
            this.show=false;
        },
    },

    setup(){
        // 添加事件监视器
        let emitter = new EventEmitter();
        // 说明根据传递过来的消息然后转化到item里显示在template中，其中默认每个消息的flag初始为0
        emitter.on('sendMessage',(message)=>{
            this.message = message;
        });
    },
}
</script>

<style>
    .unreadResumeWarning{
        /* float: left; */
        margin-left: auto;
        width: 10px;
        height: 10px;
        border-radius: 7px;
        background-color: #FF3B30;
    }

    .updateTime{
        text-align: right;
        font-size: 14px;
    }

    .info{
        text-align:left;
    }

    .divide{
        height:1px;
        border:none;
        border-top:1px 
        dashed #c9d9e8;
    }


    .btn1{
        display: 'true';
    }


</style>