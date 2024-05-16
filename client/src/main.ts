import './assets/main.css'

import { createApp } from 'vue'
import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/theme-bulma/dist/bulma.css';
import App from './App.vue'
import router from './router'

const app = createApp(App)

app
    .use(router)
    .use(Oruga)

app.mount('#app')