<template>
  <q-layout view="hHh lpr fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          icon="menu"
          aria-label="Menu"
        />

        <q-toolbar-title>Home Gift Admin</q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered content-class="bg-grey-2">
      <q-list>
        <q-item-label header>Admin Actions</q-item-label>
        <q-item clickable @click="route('orders')" :active="$route.name == 'orders'">
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Orders</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="route('addItem')" :active="$route.name == 'addItem'">
          <q-item-section avatar>
            <q-icon name="add_box" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Add Item</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="route('location')" :active="$route.name == 'location'">
          <q-item-section avatar>
            <q-icon name="location_city" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Location</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="route('merchant')" :active="$route.name == 'merchant'">
          <q-item-section avatar>
            <q-icon name="business_center" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Merchant</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="route('category')" :active="$route.name == 'category'">
          <q-item-section avatar>
            <q-icon name="category" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Category</q-item-label>
          </q-item-section>
        </q-item>
        <q-item
          clickable
          @click="route('item')"
          :active="$route.name == 'item' || $route.name == 'itemDetails'"
        >
          <q-item-section avatar>
            <q-icon name="fastfood" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Items</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MyLayout",

  data() {
    return {
      leftDrawerOpen: false
    };
  },
  methods: {
    route(name) {
      if (this.$route.name != name) {
        this.$router.push({ name: name });
      }
    }
  }
};
</script>
