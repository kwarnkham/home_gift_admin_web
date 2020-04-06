<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        @click="toggleDrawer"
        icon="menu"
        aria-label="Menu"
      />

      <q-toolbar-title
        @click="$router.push({ name: 'home' })"
        class="cursor-pointer"
        :class="{ 'is-active': $route.name == 'home' }"
      >
        Home Gift {{ $t("admin") }}
      </q-toolbar-title>
      <!-- <q-btn
        v-if="$route.name == 'items'"
        icon="delete"
        :color="showTrash ? 'lime' : 'white'"
        :class="[showTrash ? 'text-black' : 'text-brown']"
        @click="$store.dispatch('setShowTrash', !showTrash)"
      /> -->
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: "LayoutHeader",
  computed: {
    showTrash() {
      return this.$store.state.showTrash;
    },
  },
  methods: {
    toggleDrawer() {
      this.$root.$emit("toggleDrawer");
    },
  },
  mounted() {
    this.$root.$emit("showTrash", this.showTrash);
  },
};
</script>

<style scoped>
.is-active {
  color: #00bcd4;
}
</style>
