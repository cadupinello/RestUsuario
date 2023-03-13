import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '../node_modules/bulma/css/bulma.css'

const app = createApp(App)

app.config.globalProperties.$filters = {
  processRole: function(value) {
    if(value == 1) {
      return "Administrador"
    } else if(value == 0) {
      return "Usuário"
    }
  }
}

app.use(router)

app.mount('#app')
