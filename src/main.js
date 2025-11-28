
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { createApp } from 'vue'
// importing router instance
import App from './App.vue'
import router from './router'

const app = createApp(App) // vue app created
app.use(router) // router is getting activated 
app.mount('#app') //mounting the app to dom
