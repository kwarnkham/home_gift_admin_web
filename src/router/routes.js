
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name:'orders' },
      { path: '/add_item', component: () => import('pages/AddItem.vue'), name:'addItem' },
      { path: '/location', component: () => import('pages/Location.vue'), name:'location' },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
