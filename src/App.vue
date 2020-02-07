<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { itemRelatedApi } from "./mixins/itemRelatedApi";
import { locationRelatedApi } from "./mixins/locationRelatedApi";
import { merchantRelatedApi } from "./mixins/merchantRelatedApi";
import { categoryRelatedApi } from "./mixins/categoryRelatedApi";

export default {
  name: "App",
  mixins: [
    itemRelatedApi,
    merchantRelatedApi,
    locationRelatedApi,
    categoryRelatedApi
  ],
  methods: {
    setLanguage() {
      let lang = localStorage.getItem("lang");
      if (lang) {
        this.$store.dispatch("setLanguage", lang);
      }
    }
  },
  created() {
    this.getLocations();
    this.getMerchants();
    this.getCategories();
    this.setLanguage();
  }
};
</script>
