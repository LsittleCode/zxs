import 'element-plus/theme-chalk/dark/css-vars.css'
import './styles/dark/css-vars.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '/src/assets/css/common.css'
import router from '@/router/main'
import { Initpinia } from './store/init'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)

app.use(Initpinia)

app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
