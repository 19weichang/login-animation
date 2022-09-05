import { createRouter, createWebHistory,createWebHashHistory  } from 'vue-router'
import login from '/src/views/login.vue'
// import main from '/src/views/main.vue'
// process.env.VUE_APP_ROUTER
console.log(import.meta.env);

let history = createWebHashHistory()
let routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/',
    name: 'main',
    component: ()=> import('/src/views/main.vue')
  },
  // {path: "/:domain(.*)*",
  // name:"notfuond",
  // component: ()=> import('/src/views/404')}
]

export default createRouter({ history, routes })