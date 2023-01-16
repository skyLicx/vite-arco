import { createApp } from 'vue'
// import './style.css'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@/api/interceptor'
import store from './store'
import router from './router'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.mount('#app')
