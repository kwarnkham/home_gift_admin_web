<template>
  <q-drawer
    v-model="leftDrawerOpen"
    show-if-above
    bordered
    content-class="bg-grey-2"
  >
    <q-list>
      <q-item-label header>{{ $t("adminAction") }}</q-item-label>
      <q-item>
        <LanguageButton />
      </q-item>

      <DrawerListNavItem
        v-for="navItem in navItems"
        :key="navItem.routeName"
        :routeName="navItem.routeName"
        :label="navItem.label"
        :icon="navItem.icon"
        @click.native="route(navItem.routeName)"
      />
    </q-list>
  </q-drawer>
</template>

<script>
import LanguageButton from "./LanguageButton";
import DrawerListNavItem from "./DrawerListNavItem";
export default {
  name: "LeftDrawer",
  components: {
    LanguageButton,
    DrawerListNavItem
  },
  data() {
    return {
      leftDrawerOpen: false
    };
  },
  computed: {
    navItems() {
      return [
        {
          routeName: "orders",
          label: this.$tc("order", 2),
          icon: "assignment"
        },
        { routeName: "addItem", label: this.$t("addItem"), icon: "add_box" },
        {
          routeName: "location",
          label: this.$t("location"),
          icon: "location_city"
        },
        {
          routeName: "merchant",
          label: this.$t("merchant"),
          icon: "business_center"
        },
        {
          routeName: "category",
          label: this.$tc("category", 1),
          icon: "category"
        },
        { routeName: "items", label: this.$tc("item", 2), icon: "fastfood" },
        {
          routeName: "deliveryFees",
          label: this.$t("deliveryFees"),
          icon: "attach_money"
        }
      ];
    }
  },
  methods: {
    toggleDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    route(name) {
      if (this.$route.name != name) {
        this.$router.push({ name: name });
      }
    }
  },
  created() {
    this.lang = this.$store.state.lang;
  },
  mounted() {
    this.$root.$on("toggleDrawer", this.toggleDrawer);
  },
  beforeDestroy() {
    this.$root.$off("toggleDrawer", this.toggleDrawer);
  }
};
</script>

<style></style>
