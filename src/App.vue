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
    },
    setQuasarPluginDefaults() {
      this.$q.loading.setDefaults({
        message: this.$t("loading"),
        spinner: QSpinnerIos,
        spinnerColor: "white",
        delay: 200
      });
    }
  },
  created() {
    this.getLocations();
    this.getMerchants();
    this.getCategories();
    this.setLanguage();
    this.setQuasarPluginDefaults();
  }
};
</script>
