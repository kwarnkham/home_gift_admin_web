
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name:'orders' },
      { path: '/add_item', component: () => import('pages/AddItem.vue'), name:'addItem' },
      { path: '/location', component: () => import('pages/Location.vue'), name:'location' },
      { path: '/merchant', component: () => import('pages/Merchant.vue'), name:'merchant' },
      { path: '/category', component: () => import('pages/Category.vue'), name:'category' },


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
