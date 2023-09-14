import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import ElementPlus from 'element-plus'

import { ElMessage, ElDialog } from 'element-plus'
import mitt from 'mitt'
import 'element-plus/dist/index.css'
import { loadFonts } from './plugins/webfontloader'




loadFonts()

const app = createApp(App)

app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$bus = mitt()
app
    .use(router)
    .use(store)
    .use(vuetify)
    .use(ElementPlus)
    .use(ElDialog)


    .mount('#app')