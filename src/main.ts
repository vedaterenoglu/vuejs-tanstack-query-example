import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'

import App from './App.vue'
import { queryClient } from './lib/query/queryClient'
import router from './router'

import './style.css'

const app = createApp(App)

// Install Vue Query plugin with our configured client
app.use(VueQueryPlugin, {
  queryClient,
})

// Install Vue Router
app.use(router)

// Mount the application
app.mount('#app')
