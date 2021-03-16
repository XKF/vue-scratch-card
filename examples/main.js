import Vue from 'vue'
import App from './App.vue'
import ScratchCard from '../packages/'
import '../packages/style/index.scss'

Vue.config.productionTip = false

Vue.use(ScratchCard)

Vue.prototype.$ScratchCard = ScratchCard

new Vue({
  render: h => h(App),
}).$mount('#app')
