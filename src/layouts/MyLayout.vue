<template>
  <q-layout view="lHh Lpr lFf">
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
        <q-item clickable @click="route('orders')">
          <q-item-section avatar>
            <q-icon name="assignment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Orders</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="route('addItem')">
          <q-item-section avatar>
            <q-icon name="add_box" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Add Item</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="route('location')">
          <q-item-section avatar>
            <q-icon name="location_city" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Location</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="route('merchant')">
          <q-item-section avatar>
            <q-icon name="business_center" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Merchant</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://forum.quasar.dev">
          <q-item-section avatar>
            <q-icon name="record_voice_over" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Forum</q-item-label>
            <q-item-label caption>forum.quasar.dev</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://twitter.quasar.dev">
          <q-item-section avatar>
            <q-icon name="rss_feed" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Twitter</q-item-label>
            <q-item-label caption>@quasarframework</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="a" target="_blank" href="https://facebook.quasar.dev">
          <q-item-section avatar>
            <q-icon name="public" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Facebook</q-item-label>
            <q-item-label caption>@QuasarFramework</q-item-label>
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
      if (this.$route.name == name) {
        this.leftDrawerOpen = false;
      }
      if (this.$route.name != name) {
        this.$router.push({ name: name });
      }
    }
  }
};
</script>
