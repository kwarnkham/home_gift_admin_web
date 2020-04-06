const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Home.vue"),
        name: "home",
      },
      {
        path: "/order",
        component: () => import("pages/Index.vue"),
        name: "orders",
      },
      {
        path: "/add_item",
        component: () => import("pages/AddItem.vue"),
        name: "addItem",
      },
      {
        path: "/location",
        component: () => import("pages/Location.vue"),
        name: "location",
      },
      {
        path: "/merchant",
        component: () => import("pages/Merchant.vue"),
        name: "merchant",
      },
      {
        path: "/category",
        component: () => import("pages/Category.vue"),
        name: "category",
      },
      {
        path: "/items",
        component: () => import("pages/ItemList.vue"),
        name: "items",
      },
      {
        path: "/item-details/:itemId",
        component: () => import("pages/ItemDetails.vue"),
        name: "itemDetails",
      },
      {
        path: "/delivery-fees",
        component: () => import("pages/DeliveryFees.vue"),
        name: "deliveryFees",
      },
      {
        path: "/trash",
        component: () => import("pages/ItemList.vue"),
        props: { trashed: true },
        name: "trash",
      },
      {
        path: "/search",
        component: () => import("pages/Search.vue"),
        props: { trashed: true },
        name: "search",
      },
      {
        path: "/merchant-items/:merchant",
        component: () => import("pages/MerchantItems.vue"),
        props: (route) => ({ merchant: JSON.parse(route.params.merchant) }),
        name: "merchantItems",
      },
    ],
  },
  {
    path: "/login",
    component: () => import("pages/Login.vue"),
    name: "login",
    meta: { withoutAuth: true },
  },
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue"),
  });
}

export default routes;
