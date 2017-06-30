// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

// for (var i = 0; i < window.phytoplanktonConfig.menu.length; i++) {
//   console.log(window.phytoplanktonConfig.menu[i])
//   router.options.routes.push({
//     path: '/' + window.phytoplanktonConfig.menu[i].url[0],
//     name: window.phytoplanktonConfig.menu[i].title,
//     component: PhytoplanktonPage
//   })
// }
// router.options.routes.push({
//   path: '/' + window.phytoplanktonConfig.menu[0].url[0],
//   name: window.phytoplanktonConfig.menu[0].title,
//   component: PhytoplanktonPage
// })
// console.log(router.options.routes)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
