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
import { userRelatedApi } from "./mixins/userRelatedApi";

export default {
  name: "App",
  mixins: [
    itemRelatedApi,
    merchantRelatedApi,
    locationRelatedApi,
    categoryRelatedApi,
    userRelatedApi
  ],
  methods: {
    setLanguage() {
      let lang = localStorage.getItem("lang");
      if (lang) {
        this.$i18n.locale = lang;
        import(`quasar/lang/${lang}`).then(language => {
          this.$q.lang.set(language.default);
        });
        this.$store.dispatch("setLanguage", lang);
      }
    },
    setQuasarPluginDefaults() {
      this.$q.loading.setDefaults({
        delay: 200
      });
    },
    initLocalStorageData() {
      this.initUser();
    },
    initUser() {
      let user = this.$q.localStorage.getItem("user");
      if (user) this.$store.dispatch("setUser", user);
      this.checkToken(user).then(response => {
        if (!response) {
          this.$store.dispatch("setUser", null);
          this.$router.push({ name: "login" });
        }
      });
    }
  },
  created() {
    this.initLocalStorageData();
    this.getLocations();
    this.getMerchants();
    this.getCategories();
    this.setLanguage();
    this.setQuasarPluginDefaults();
  }
};
</script>
