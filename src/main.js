import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './style.css'

const app = createApp(App)
const vuetify = createVuetify()

app.use(vuetify,axios,VueAxios)

app.mount('#app')


