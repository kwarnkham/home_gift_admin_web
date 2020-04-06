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
      <DropDownSetting />
    </q-toolbar>
  </q-header>
</template>

<script>
import { userRelatedApi } from "../../mixins/userRelatedApi";
import DropDownSetting from "./DropDownSetting";
export default {
  name: "LayoutHeader",
  mixins: [userRelatedApi],
  components: { DropDownSetting },
  computed: {
    showTrash() {
      return this.$store.state.showTrash;
    },
  },
  methods: {
    toggleDrawer() {
      this.$root.$emit("toggleDrawer");
    },
    editUser() {},
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
