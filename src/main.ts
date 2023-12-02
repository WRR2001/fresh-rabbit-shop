import { createSSRApp } from 'vue'
import App from './App.vue'
import pinia from './stores'
//导入pinia实例
export function createApp() {
  //创建vue实例
  const app = createSSRApp(App)
  //使用pinia
  app.use(pinia)
  return {
    app,
  }
}
