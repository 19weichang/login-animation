export default [
  {
    path: 'aaa',
    name: 'aaa',
    component: ()=> import('../views/aaa.vue'),
  },
  {
    path: 'bbb',
    name: 'bbb',
    component: ()=> import('../views/bbb.vue'),
  },
]