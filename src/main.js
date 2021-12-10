
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import jquery from 'jquery';
import bootstrap from 'bootstrap';
import { createPopper } from '@popperjs/core';









const app = createApp(App);
app.use(router)
app.use(jquery)
app.use(bootstrap)
app.use(createPopper)
app.mount('#app')


