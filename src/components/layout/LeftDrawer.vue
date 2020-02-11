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
      <q-item
        clickable
        @click="route('orders')"
        :active="$route.name == 'orders'"
      >
        <q-item-section avatar>
          <q-icon name="assignment" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $tc("order", 2) }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        clickable
        @click="route('addItem')"
        :active="$route.name == 'addItem'"
      >
        <q-item-section avatar>
          <q-icon name="add_box" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t("addItem") }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        clickable
        @click="route('location')"
        :active="$route.name == 'location'"
      >
        <q-item-section avatar>
          <q-icon name="location_city" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t("location") }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        clickable
        @click="route('merchant')"
        :active="$route.name == 'merchant'"
      >
        <q-item-section avatar>
          <q-icon name="business_center" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $t("merchant") }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        clickable
        @click="route('category')"
        :active="$route.name == 'category'"
      >
        <q-item-section avatar>
          <q-icon name="category" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $tc("category", 1) }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        clickable
        @click="route('items')"
        :active="$route.name == 'items' || $route.name == 'itemDetails'"
      >
        <q-item-section avatar>
          <q-icon name="fastfood" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ $tc("item", 2) }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>
import LanguageButton from "./LanguageButton";
export default {
  name: "LayoutHeader",
  components: {
    LanguageButton
  },
  data() {
    return {
      leftDrawerOpen: false
    };
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
