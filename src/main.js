import { createApp } from 'vue';
import App from './App.vue';
import Character from './components/Character';

const app = createApp(App)
app.component('Character', Character);
app.mount('#app')