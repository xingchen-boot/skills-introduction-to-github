import './assets/scss/base.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/icon/iconfont.css'

import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import Dialog from './components/Dialog.vue'

import Verify from './utils/Verify'
import Request from './utils/request'
import Message from './utils/Message'
import Api from '@/utils/Api'

VueCookies.config('7d')
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)

app.component("Dialog",Dialog)

app.config.globalProperties.VueCookies = VueCookies
app.config.globalProperties.bodyMaxWidth=2000;
app.config.globalProperties.bodyMinWidth=1250;

app.config.globalProperties.Verify = Verify
app.config.globalProperties.Request = Request
app.config.globalProperties.Message = Message
app.config.globalProperties.Api=Api
app.mount('#app')
