import Vue from 'vue'
import 'vuetify/dist/vuetify.min.css'

import Vuetify from "vuetify";


Vue.use(Vuetify);
let App = Vue.component('App', require('./App.vue').default);

window.Vue = Vue;




const app = new Vue({
    vuetify : new Vuetify(),
    render: h => h(App),

});//.$mount('#app');
app.$mount('#app');