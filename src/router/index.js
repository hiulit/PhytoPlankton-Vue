import Vue from 'vue'
import Router from 'vue-router'
import phytoplanktonConfig from '../config'
import PhytoplanktonPage from '@/components/PhytoplanktonPage'

Vue.use(Router)

var routes = []

for (var i = 0; i < phytoplanktonConfig.menu.length; i++) {
  for (var j = 0; j < phytoplanktonConfig.menu[i].url.length; j++) {
    routes.push({
      path: '/' + phytoplanktonConfig.menu[i].url[j],
      name: phytoplanktonConfig.menu[i].title,
      component: PhytoplanktonPage
    })
  }
}

export default new Router({
  // mode: 'history',
  routes: routes
})
