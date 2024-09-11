import { createApp } from 'vue'
import App from './App.vue';
import './registerServiceWorker';

// Vue.config.productionTip = false;
const app = createApp(App)
app.mount('#app');
