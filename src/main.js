import { createApp } from 'vue';
import App from './App.vue';
import NPC from './components/NPC';
import Enemy from './components/Enemy';
import Health from './components/Health';
import Dialogue from './components/Dialogue';
import Character from './components/Character';
import Actionbar from './components/Actionbar';
import Spellbook from './components/Spellbook';
import TargetList from './components/TargetList';

const app = createApp(App)
app.component('NPC', NPC);
app.component('Enemy', Enemy);
app.component('Health', Health);
app.component('Dialogue', Dialogue);
app.component('Character', Character);
app.component('Actionbar', Actionbar);
app.component('Spellbook', Spellbook);
app.component('TargetList', TargetList);
app.mount('#app')