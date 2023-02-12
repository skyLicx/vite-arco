import { createApp } from 'vue'
// import './style.css'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@/api/interceptor'
import './mock'
import i18n from './locale' // 引入国际化
import store from './store'
import router from './router'
import App from './App.vue'
// 自定义过渡动画
import '@/styles/css/transition.css'

const app = createApp(App)

app.use(i18n)
app.use(router)
app.use(store)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.mount('#app')
