import { createApp } from 'vue';
import App from './App.vue';
import Character from './components/Character';
import Health from './components/Health';
import Actionbar from './components/Actionbar';

const app = createApp(App)
app.component('Health', Health);
app.component('Character', Character);
app.component('Actionbar', Actionbar);
app.mount('#app')